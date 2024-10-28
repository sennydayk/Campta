import Cookies from "js-cookie";
import { create } from "zustand";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

interface IUser {
  uid: string;
  email: string;
  nickName: string;
}

interface AuthStore {
  isLogin: boolean;
  user: IUser | null;
  accessToken: string | null;
  setUser: (user: IUser) => void;
  setAccessToken: (token: string) => void;
  checkLoginStatus: () => void;
  logout: () => void;
}

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
