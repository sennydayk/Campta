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

  setAccessToken: (token: string) => {
    Cookies.set("accessToken", token, { expires: 7 });
    set({ accessToken: token, isLogin: true });
  },

  checkLoginStatus: () => {
    const token = Cookies.get("accessToken");
    if (token) {
      set({ isLogin: true, accessToken: token });
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          set({
            user: {
              uid: currentUser.uid,
              email: currentUser.email || "",
              nickName: currentUser.displayName || "",
            },
            isLogin: true,
          });
        } else {
          set({
            user: null,
            isLogin: false,
            accessToken: null,
          });
          Cookies.remove("accessToken");
        }
      });
    } else {
      set({ isLogin: false, user: null, accessToken: null });
    }
  },

  logout: () => {
    Cookies.remove("accessToken");
    set({
      isLogin: false,
      user: null,
      accessToken: null,
    });
    auth.signOut();
  },
}));

useAuthStore.getState().checkLoginStatus();
