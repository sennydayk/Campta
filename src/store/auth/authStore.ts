import Cookies from "js-cookie";
import { create } from "zustand";
import { auth, db } from "@/lib/firebase/firebaseConfig";
import { IUser, AuthStore } from "./types";
import { persist } from "zustand/middleware";
import { doc, getDoc } from "firebase/firestore";
import {
  signInWithCustomToken,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";

export const useAuthStore = create(
  persist<
    AuthStore & {
      firebaseUser: FirebaseUser | null;
      getIdToken: () => Promise<string | null>;
    }
  >(
    (set, get) => ({
      isLogin: !!Cookies.get("accessToken"),
      user: null,
      firebaseUser: null,
      // 로그인
      login: async (uid: string) => {
        try {
          // 디버깅
          console.log("Attempting to call /api/generateCustomtoken");
          // Call the API to generate a custom token
          const response = await fetch("/api/auth/generateCustomtoken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid }),
          });

          if (!response.ok) {
            throw new Error("Failed to generate custom token");
          }

          const { customToken } = await response.json();

          // Sign in with Firebase using the custom token
          const userCredential = await signInWithCustomToken(auth, customToken);

          // Retrieve the ID token after signing in and save it in a cookie
          const idToken = await userCredential.user.getIdToken();
          if (idToken) {
            Cookies.set("accessToken", idToken, {
              secure: true,
              sameSite: "Lax",
            });
            set({ isLogin: true, firebaseUser: userCredential.user });
          }
        } catch (error) {
          console.error("Error during login:", error);
          set({ isLogin: false, user: null, firebaseUser: null });
        }
      },

      checkLoginStatus: async () => {
        const token = Cookies.get("accessToken");
        if (token) {
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
                      profileImg: userData.profileImg || "",
                    },
                    isLogin: true,
                    firebaseUser: currentUser,
                  });
                }
              } else {
                set({
                  user: null,
                  isLogin: false,
                  firebaseUser: null,
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
            set({ user: null, isLogin: false, firebaseUser: null });
          }
        } else {
          set({ isLogin: false, user: null, firebaseUser: null });
        }
      },
      logout: async () => {
        try {
          // Firebase 로그아웃
          await signOut(auth);
          // 쿠키 제거
          Cookies.remove("accessToken");
          // 서버 측 로그아웃 처리
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include", // 쿠키 포함
          });
          // 로컬 상태 업데이트
          set({
            isLogin: false,
            user: null,
            firebaseUser: null,
          });
          console.log("로그아웃 성공");
        } catch (error) {
          console.error("로그아웃 중 오류 발생:", error);
        }
      },
      setIsLogin: (isLogin: boolean) => {
        set({ isLogin });
      },
      setUser: (user: IUser) => {
        set({ user, isLogin: true });
      },
      getIdToken: async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          try {
            const token = await currentUser.getIdToken(true);
            console.log("Generated token:", token); // 디버깅용
            return token;
          } catch (error) {
            console.error("ID 토큰을 가져오는 중 오류 발생:", error);
            return null;
          }
        }
        console.log("No current user"); // 디버깅용
        return null;
      },
    }),
    {
      name: "userInfo",
    }
  )
);
