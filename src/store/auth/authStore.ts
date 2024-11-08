import Cookies from "js-cookie";
import { create } from "zustand";
import { auth } from "@/firebase/firebaseConfig";
import { IUser, AuthStore } from "./types";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: !!Cookies.get("accessToken"),
      user: null,
      checkLoginStatus: async () => {
        const token = Cookies.get("accessToken");
        if (token) {
          set({ isLogin: true });
          try {
            const unsubscribe = auth.onAuthStateChanged((currentUser) => {
              if (currentUser) {
                set({
                  user: {
                    uid: currentUser.uid,
                    email: currentUser.email ?? "",
                    nickname: currentUser.displayName ?? "",
                    profileImg: currentUser.photoURL ?? "",
                  },
                  isLogin: true,
                });
              } else {
                set({
                  user: null,
                  isLogin: false,
                });
                console.error("유저 정보를 가져올 수 없습니다.");
              }
            });
            unsubscribe();
          } catch (error) {
            console.error(
              "유저 정보를 가져오는 중 에러가 발생했습니다.",
              error
            );
            set({ user: null, isLogin: false });
          }
        } else {
          set({ isLogin: false, user: null });
        }
      },
      logout: () => {
        Cookies.remove("accessToken");
        set({
          isLogin: false,
          user: null,
        });
        auth.signOut();
      },
      setIsLogin: (isLogin: boolean) => {
        set({ isLogin });
      },
      setUser: (user: IUser) => {
        set({ user, isLogin: true });
      },
    }),
    {
      name: "userInfo",
    }
  )
);
