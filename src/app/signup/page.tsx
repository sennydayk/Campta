"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Button from "@/components/common/ui/Button";
import { useAuthStore } from "@/store/auth/authStore";
import { ProfileImageUploader } from "@/components/auth/signup/ProfileImageUploader";
import { FormInput } from "@/components/common/ui/FormInput";
import { registerUser, checkNicknameAvailability } from "../../api/auth/signup";
import {
  SignupFormData,
  emailSchema,
  passwordSchema,
  signupSchema,
} from "../../lib/auth/signup/validationSchemas";
import { RegisterResponse } from "@/lib/auth/signup/types";

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    nickname: "",
    birthdate: "",
    profileImg: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof SignupFormData, boolean>>
  >({});
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);

  const router = useRouter();
  const { setUser } = useAuthStore();

  const mutation = useMutation<RegisterResponse, Error, SignupFormData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
      alert(
        `${formData.name}님, 회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.`
      );
      router.push("/login");
    },
    onError: (error: Error) => {
      console.error("회원가입 에러", error);
      alert("회원가입에 실패했습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("폼 제출됨"); // 디버깅
    const validationResult = signupSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors: Partial<Record<keyof SignupFormData, string>> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as keyof SignupFormData] = issue.message;
        }
      });
      setErrors(newErrors);
      console.log("유효성 검사 실패"); // 디버깅
      return;
    }
    if (!isNicknameAvailable) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setTouchedFields((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const validateField = async (field: "email" | "password") => {
      if (!touchedFields[field]) return;

      try {
        const schema = field === "email" ? emailSchema : passwordSchema;
        await schema.parseAsync(formData[field]);
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      } catch (error: unknown) {
        const errorMessage =
          error instanceof z.ZodError
            ? error.errors[0].message
            : "알 수 없는 오류가 발생했습니다.";

        console.error(`Error validating ${field}:`, error);
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      }
    };

    validateField("email");
    validateField("password");
  }, [formData.email, formData.password, touchedFields]);

  const handleCheckNickname = async () => {
    if (!formData.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      const isAvailable = await checkNicknameAvailability(formData.nickname);
      setIsNicknameAvailable(isAvailable);
      alert(
        isAvailable
          ? "사용 가능한 닉네임입니다."
          : "이미 사용 중인 닉네임입니다."
      );
    } catch (error) {
      console.error("닉네임 확인 에러", error);
      alert("닉네임 확인에 실패했습니다.");
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.nickname &&
      formData.birthdate &&
      isNicknameAvailable
      // Object.keys(errors).length === 0
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mt-8 mb-8">회원가입</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <ProfileImageUploader
              profileImg={formData.profileImg}
              onImageChange={(image) =>
                setFormData((prev) => ({ ...prev, profileImg: image }))
              }
            />
            <div className="flex-grow">
              <FormInput
                id="name"
                label="이름"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력해주세요."
                error={touchedFields.name ? errors.name : undefined}
              />
            </div>
          </div>
          <FormInput
            id="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요."
            error={touchedFields.email ? errors.email : undefined}
          />
          <FormInput
            id="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요."
            error={touchedFields.password ? errors.password : undefined}
          />
          <div className="space-y-2">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <div className="flex items-center gap-2">
              <input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="사용하실 닉네임을 입력해주세요."
                className={`flex-1 rounded-md border ${
                  touchedFields.nickname && errors.nickname
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-border focus:border-border`}
              />
              <Button
                label="중복확인"
                onClick={handleCheckNickname}
                type="button"
              />
            </div>
            {touchedFields.nickname && errors.nickname && (
              <p className="text-sm text-red-500">{errors.nickname}</p>
            )}
            {isNicknameAvailable === false && (
              <p className="text-red-500 text-sm">
                이미 사용 중인 닉네임입니다.
              </p>
            )}
          </div>
          <FormInput
            id="birthdate"
            label="생년월일"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            placeholder=""
            error={touchedFields.birthdate ? errors.birthdate : undefined}
          />
          <Button
            label="회원가입"
            type="submit"
            disabled={mutation.isPending || !isFormValid()}
          />
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-font_sub">
            이미 회원이시라면?{" "}
            <Link
              href="/login"
              className="font-medium text-font_main hover:text-font_btn"
            >
              로그인하고 CAMPTA 이용하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
