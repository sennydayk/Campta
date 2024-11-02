"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import Cookies from "js-cookie";

export default function AuthCheck() {
  const { isLogin, setUser, setAccessToken } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token && !isLogin) {
      // 토큰이 있지만 로그인 상태가 아닌 경우에만 상태 업데이트
      setAccessToken(token);
      // 여기서 서버에 토큰 유효성을 확인하는 API 호출을 추가할 수 있습니다.
      // 예: validateToken(token).then(userData => setUser(userData));
    }
  }, [isLogin, setUser, setAccessToken]);

  return null;
}
