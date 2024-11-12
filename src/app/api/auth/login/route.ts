import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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

    // Firestore에서 추가 사용자 정보 가져오기
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email,
        nickname: user.displayName || userData.nickname || "",
        name: userData.name || "",
        birthdate: userData.birthdate || "",
        profileImg: userData.profileImg || "",
      },
      token,
    });
  } catch (error) {
    console.error("로그인 에러", error);
    return NextResponse.json({ error: "로그인 실패" }, { status: 401 });
  }
}
