"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/store/auth/authStore";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { isLogin, setUser, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [isLogin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      Cookies.set("accessToken", token, { expires: 7 });

      setUser({
        uid: user.uid,
        email: user.email ?? "",
        nickName: user.displayName ?? "",
      });

      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      checkLoginStatus();
      console.log("로그인 완료", { email, rememberMe });
      alert("로그인이 완료되었습니다. 홈으로 이동합니다");
      router.push("/");
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-font_main"
          >
            Email
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
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-main focus:ring-border border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-font_main"
          >
            아이디 저장
          </label>
        </div>
        <Button label="로그인" type="submit" />
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
  );
}
