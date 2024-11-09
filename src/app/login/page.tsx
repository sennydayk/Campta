"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Button from "@/components/common/ui/Button";
import { useAuthStore } from "@/store/auth/authStore";
import { FormInput } from "@/components/common/ui/FormInput";
import { RememberMe } from "@/components/auth/login/RememberMe";
import { loginUser } from "../../api/auth/login";
import type {
  LoginCredentials,
  LoginResponse,
} from "../../lib/auth/login/types";
import { useStore } from "@/lib/auth/hooks/useStore";
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { isLogin, setUser, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
    if (isLogin) {
      router.push("/");
    }
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, [isLogin, router, checkLoginStatus]);

  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      // 디버깅
      console.log("Full API response:", JSON.stringify(data, null, 2));

      Cookies.set("accessToken", data.token, {
        expires: 7,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      const userData = {
        uid: data.user.uid,
        email: data.user.email ?? "",
        nickname: data.user.nickname ?? "",
        profileImg: data.user.photoURL ?? "",
        name: data.user.name ?? "",
        birthdate: data.user.birthdate ?? "",
      };

      console.log("User data before setting in store:", userData);
      setUser(userData);
      console.log("User data set in store:", data.user);
      console.log("name", data.user.name);
      console.log("birth", data.user.birthdate);
      console.log("img", data.user.photoURL);

      if (rememberMe) {
        localStorage.setItem("savedEmail", formData.email);
      } else {
        localStorage.removeItem("savedEmail");
      }
      console.log("Calling checkLoginStatus");
      await checkLoginStatus();
      console.log("checkLoginStatus completed");
      console.log("로그인 완료", { email: formData.email, rememberMe });
      alert("로그인이 완료되었습니다. 홈으로 이동합니다");
      router.push("/");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("로그인 실패", error.message);
        alert(`로그인에 실패했습니다: ${error.message}`);
      } else {
        console.error("로그인 실패", error);
        alert("로그인에 실패했습니다.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">로그인</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="email"
            label="Email"
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
          <RememberMe checked={rememberMe} onChange={setRememberMe} />
          <Button label="로그인" type="submit" disabled={mutation.isPending} />
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-font_sub">
            회원이 아니시라면?{" "}
            <Link
              href="/signup"
              className="font-medium text-font_main hover:text-font_btn"
            >
              회원가입하고 CAMPTA 이용하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
