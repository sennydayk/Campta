import Cookies from "js-cookie";
import { create } from "zustand";
import { auth, db } from "@/firebase/firebaseConfig";
import { IUser, AuthStore } from "./types";
import { persist } from "zustand/middleware";
import { doc, getDoc } from "firebase/firestore";

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
            const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
              if (currentUser) {
                // Firestore에서 추가 사용자 정보 가져오기
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                  const userData = userDoc.data();
                  console.log("Firestore에서 가져온 사용자 데이터:", userData);
                  set({
                    user: {
                      uid: currentUser.uid,
                      email: currentUser.email ?? "",
                      name: userData.name || "",
                      nickname: userData.nickname || "",
                      birthdate: userData.birthdate || "",
                      profileImg: userData.photoURL || "",
                    },
                    isLogin: true,
                  });
                }
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
