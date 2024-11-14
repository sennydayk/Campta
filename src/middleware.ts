import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log(
    "Middleware - Token from cookie:",
    token ? "exists" : "not found"
  );
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // 인증이 필요한 페이지 목록
  const protectedRoutes = ["/scrap", "/profile", "/settings"];

  if (token) {
    try {
      // API를 통한 토큰 검증
      const response = await fetch(
        `${request.nextUrl.origin}/api/auth/verifyuser`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Middleware - Token verification response status:",
        response.status
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Token verification failed:", errorData);
        throw new Error("Token verification failed");
      }

      // 로그인 상태에서 인증 페이지 접근 시 홈으로 리디렉션
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      // 토큰이 유효하지 않은 경우, 쿠키를 삭제하고 로그인 페이지로 리디렉션
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }
  } else {
    // 토큰이 없는 경우, 보호된 라우트 접근 시 로그인 페이지로 리디렉션
    if (
      protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      )
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/scrap/:path*",
    "/profile",
    "/settings/:path*",
  ],
};
