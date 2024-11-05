import { User } from "firebase/auth";

export interface IUser {
  uid: string;
  email: string;
  nickName: string;
}

export interface AuthStore {
  isLogin: boolean;
  user: IUser | null;
  accessToken: string | null;
  setUser: (user: IUser) => void;
  setAccessToken: (token: string) => void;
  checkLoginStatus: () => void;
  logout: () => void;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
}
