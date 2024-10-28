import { auth, db } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, nickname, birthdate, profileImage } =
      await request.json();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      nickname,
      birthdate,
      profileImage,
    });

    const accessToken = await user.getIdToken();

    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email,
        nickName: nickname,
      },
      accessToken,
    });
  } catch (error) {
    console.error("회원가입 에러", error);
    return NextResponse.json({ error: "회원가입 실패" }, { status: 500 });
  }
}
