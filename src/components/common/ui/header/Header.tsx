"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useAuthStore } from "@/store/auth/authStore";

export default function Header() {
  const { isLogin, logout, checkLoginStatus } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    setIsMounted(true);
  }, [checkLoginStatus]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        logout();
      }
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-font_main">CAMPTA</h1>
        <SearchBar />
        {isLogin ? (
          <button
            onClick={handleLogout}
            className="text-font_main hover:text-font_sub"
          >
            로그아웃
          </button>
        ) : (
          <Link href="/login" className="text-font_main hover:text-font_sub">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
