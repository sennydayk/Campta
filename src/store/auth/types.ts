import { User } from "firebase/auth";

export interface IUser {
  uid: string;
  email: string;
  name: string;
  nickname: string;
  birthdate: string;
  profileImg: string | null;
}

export interface AuthStore {
  isLogin: boolean;
  user: IUser | null;
  login: (uid: string) => Promise<void>;
  setUser: (user: IUser) => void;
  checkLoginStatus: () => void;
  setIsLogin: (isLogin: boolean) => void;
  logout: () => void;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
}
