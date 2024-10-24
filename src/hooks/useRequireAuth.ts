import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const router = useRouter();
  const { isLogin, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin, checkLoginStatus, router]);
  return isLogin;
}
