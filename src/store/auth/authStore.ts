import { create } from "zustand";
import { auth } from "@/firebase/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthState } from "./types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setUser: (user: User | null, token: string | null) =>
    set({
      user,
      accessToken: token,
      isAuthenticated: !!user,
    }),

  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
}));

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const accessToken = await user.getIdToken();
    useAuthStore.getState().setUser(user, accessToken);
  } else {
    useAuthStore.getState().logout();
  }
});
