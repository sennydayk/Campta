import type {
  RegisterUserData,
  RegisterResponse,
} from "../../lib/auth/signup/types";

export async function registerUser(
  userData: RegisterUserData
): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "회원가입에 실패했습니다.");
  }

  return data;
}

export async function checkNicknameAvailability(
  nickname: string
): Promise<boolean> {
  const response = await fetch(
    `/api/auth/signup/nicknameCheck?nickname=${encodeURIComponent(nickname)}`
  );
  const data = await response.json();
  return data.available;
}
