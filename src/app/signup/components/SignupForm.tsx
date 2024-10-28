"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth/authStore";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  nickname: string;
  birthdate: string;
  profileImage: string | null;
}

interface RegisterResponse {
  user: { uid: string; email: string; nickName: string };
  accessToken: string;
}

async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
  nickname: string;
  birthdate: string;
  profileImage: string | null;
}) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();

  const mutation = useMutation<RegisterResponse, Error, RegisterUserData>({
    mutationFn: (userData: RegisterUserData) => registerUser(userData),
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
      alert(`${name}님, 회원가입이 완료되었습니다. 홈 페이지로 이동합니다.`);
      router.push("/");
    },
    onError: (error) => {
      console.error("Registration error", error);
      alert("회원가입에 실패했습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    mutation.mutate({
      name,
      email,
      password,
      nickname,
      birthdate,
      profileImage,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            <div
              className="h-24 w-24 rounded-full bg-sub flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
              style={{ width: "96px", height: "96px" }}
            >
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="text-font_btn text-sm">프로필사진</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex-grow">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-font_main"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-border focus:border-border"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-font_main"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-border focus:border-border"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-font_main"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-border focus:border-border"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-font_main"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 한 번 더 입력해주세요."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-border focus:border-border"
            required
          />
        </div>
        <div>
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-font_main"
          >
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="사용하실 닉네임을 입력해주세요."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-border focus:border-border"
            required
          />
        </div>
        <div>
          <label
            htmlFor="birthdate"
            className="block text-sm font-medium text-font_main"
          >
            생년월일
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-border focus:border-border"
            required
          />
        </div>
        <Button label="회원가입" type="submit" disabled={mutation.isPending} />
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
  );
}
