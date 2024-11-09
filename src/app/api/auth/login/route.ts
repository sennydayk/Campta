import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const token = await user.getIdToken();

    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email,
        nickname: user.displayName,
      },
      token,
    });
  } catch (error) {
    console.error("로그인 에러", error);
    return NextResponse.json({ error: "로그인 실패" }, { status: 401 });
  }
}
