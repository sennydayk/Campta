import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { getApps, initializeApp, cert } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Firebase 사용자 인증
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 커스텀 토큰 생성
    const adminAuth = getAuth();
    const customToken = await adminAuth.createCustomToken(user.uid);

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
      customToken,
    });
  } catch (error) {
    console.error("로그인 에러", error);
    return NextResponse.json({ error: "로그인 실패" }, { status: 401 });
  }
}
