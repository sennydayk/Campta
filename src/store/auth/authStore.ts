import Cookies from "js-cookie";
import { create } from "zustand";
import { auth } from "@/firebase/firebaseConfig";
import { IUser, AuthStore } from "./types";

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  accessToken: Cookies.get("accessToken") || null,

  setUser: (user: IUser) => {
    set({ user, isLogin: true });
  },

  setAccessToken: (token) => {
    set({ accessToken: token });
    Cookies.set("accessToken", token, {
      expires: 7,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  },

  checkLoginStatus: () => {
    const token = Cookies.get("accessToken");
    if (token) {
      set({ isLogin: true, accessToken: token });
    } else {
      set({ isLogin: false, accessToken: null, user: null });
    }
  },

  logout: () => {
    Cookies.remove("accessToken", { path: "/" });
    set({
      isLogin: false,
      user: null,
      accessToken: null,
    });
    auth.signOut();
  },
}));

useAuthStore.getState().checkLoginStatus();
