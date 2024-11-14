import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export async function POST() {
  try {
    // Firebase 인증 로그아웃
    await signOut(auth);

    // 서버 측 세션 또는 토큰 제거
    // Next.js API 라우트에서는 쿠키를 직접 조작할 수 없으므로,
    // 클라이언트 측에서 쿠키를 제거하도록 지시
    const response = NextResponse.json({ message: "로그아웃 성공" });

    // 'Set-Cookie' 헤더를 사용하여 클라이언트에 쿠키 제거 지시
    response.headers.set(
      "Set-Cookie",
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict"
    );

    return response;
  } catch (error) {
    console.error("로그아웃 에러", error);
    return NextResponse.json({ error: "로그아웃 실패" }, { status: 500 });
  }
}
