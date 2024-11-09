"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/common/ui/Button";
import { useAuthStore } from "@/store/auth/authStore";
import { ProfileImageUploader } from "@/components/auth/signup/ProfileImageUploader";
import { FormInput } from "@/components/common/ui/FormInput";
import { registerUser } from "../../api/auth/signup";
import type {
  RegisterUserData,
  RegisterResponse,
} from "../../lib/auth/signup/types";
import { data } from "autoprefixer";

// FormData 타입 정의
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  birthdate: string;
  profileImg: string | null;
};

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    birthdate: "",
    profileImg: null,
  });

  const router = useRouter();
  const { setUser } = useAuthStore();

  const mutation = useMutation<RegisterResponse, Error, RegisterUserData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
      alert(
        `${formData.name}님, 회원가입이 완료되었습니다. 홈 페이지로 이동합니다.`
      );
      router.push("/");
    },
    onError: (error) => {
      console.error("Registration error", error);
      alert("회원가입에 실패했습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // Omit을 사용하여 confirmPassword를 제외한 새로운 객체 생성
    const userData: RegisterUserData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      birthdate: formData.birthdate,
      profileImg: formData.profileImg,
    };
    mutation.mutate(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mt-8 mb-8">회원가입</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <ProfileImageUploader
              profileImage={formData.profileImg}
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
          />
          <FormInput
            id="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요."
          />
          <FormInput
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />
          <FormInput
            id="nickname"
            label="닉네임"
            type="text"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="사용하실 닉네임을 입력해주세요."
          />
          <FormInput
            id="birthdate"
            label="생년월일"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            placeholder=""
          />
          <Button
            label="회원가입"
            type="submit"
            disabled={mutation.isPending}
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
