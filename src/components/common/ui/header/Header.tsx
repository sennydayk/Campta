"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { useAuthStore } from "@/store/auth/authStore";

export default function Header() {
  const { isLogin, logout, checkLoginStatus } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname(); // 현재 경로 가져오기

  useEffect(() => {
    setIsClient(true);
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = () => {
    if (isClient) {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        logout();
      }
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold text-font_main">CAMPTA</h1>
        </Link>
        {pathname === "/" && <SearchBar />}{" "}
        {/* "/" 경로에서만 SearchBar 표시 */}
        {isClient ? (
          isLogin ? (
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
          )
        ) : null}
      </div>
    </header>
  );
}
