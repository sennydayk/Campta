"use client";

import { Home, Bookmark, Send, User } from "lucide-react";
import { FooterButton } from "./FooterButton";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/authStore";
import { useEffect } from "react";

export function Footer() {
  const router = useRouter();
  const { isLogin, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const routes = {
    Home: "/",
    Bookmark: "/scrap",
    Send: "/campting",
    User: "/profile",
  };

  const FooterAuthCheckHandler = (path: string) => {
    if (path === routes.Home) {
      router.push(path);
    } else {
      alert("회원만 이용 가능한 서비스입니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
    }
  };

  const FooterButtonHandler = (path: string) => {
    if (isLogin) {
      router.push(path);
    } else {
      FooterAuthCheckHandler(path);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <nav className="flex justify-around">
        <FooterButton
          icon={Home}
          label="홈"
          onClick={() => FooterButtonHandler(routes.Home)}
        />
        <FooterButton
          icon={Bookmark}
          label="스크랩"
          onClick={() => FooterButtonHandler(routes.Bookmark)}
        />
        <FooterButton
          icon={Send}
          label="Campting"
          onClick={() => FooterButtonHandler(routes.Send)}
        />
        <FooterButton
          icon={User}
          label="프로필"
          onClick={() => FooterButtonHandler(routes.User)}
        />
      </nav>
    </footer>
  );
}
