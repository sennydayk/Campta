import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // accessToken 쿠키가 있는지 확인
  const token = request.cookies.get("accessToken")?.value;

  // 접근하려는 경로가 /login 또는 /signup인지 확인
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // 로그인 상태인데 /login 또는 /signup 경로에 접근하면 홈으로 리디렉션
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 그렇지 않다면 요청을 그대로 진행
  return NextResponse.next();
}

// matcher 설정을 통해 /login과 /signup 페이지에 대해 미들웨어를 적용
export const config = {
  matcher: ["/login", "/signup"],
};
