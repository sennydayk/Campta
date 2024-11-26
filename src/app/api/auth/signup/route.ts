import { auth, db, storage } from "@/lib/firebase/firebaseConfig";
import { IUser } from "@/store/auth/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/auth/signup/validationSchemas";

export async function POST(request: Request) {
  console.log("회원가입 요청 시작");
  try {
    const body = await request.json();
    const validationResult = signupSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password, nickname, birthdate, profileImg } =
      validationResult.data;

    // 이메일 중복 확인
    const emailDoc = await getDoc(doc(db, "users", email));
    if (emailDoc.exists()) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다." },
        { status: 400 }
      );
    }

    // 닉네임 중복 확인
    const nicknameQuery = query(
      collection(db, "users"),
      where("nickname", "==", nickname)
    );
    const nicknameQuerySnapshot = await getDocs(nicknameQuery);
    if (!nicknameQuerySnapshot.empty) {
      return NextResponse.json(
        { error: "이미 사용 중인 닉네임입니다." },
        { status: 400 }
      );
    }

    console.log("Firebase Authentication으로 사용자 생성 시도");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("사용자 생성 성공:", user.uid);

    let profileImgUrl = null;

    if (profileImg) {
      const imageRef = ref(storage, `profile-images/${user.uid}`);
      await uploadString(imageRef, profileImg, "data_url");
      profileImgUrl = await getDownloadURL(imageRef);
    }

    await updateProfile(user, {
      displayName: nickname,
      photoURL: profileImgUrl,
    });
    console.log("사용자 프로필 업데이트 성공");

    const userData: IUser = {
      uid: user.uid,
      email: user.email!,
      name: name,
      nickname: nickname,
      birthdate: birthdate,
      profileImg: profileImgUrl,
    };
    console.log("Firestore에 사용자 데이터 저장 시도:", userData);
    await setDoc(doc(db, "users", user.uid), userData);
    console.log("Firestore에 사용자 데이터 저장 성공");

    console.log("액세스 토큰 생성 시도");
    const accessToken = await user.getIdToken();
    console.log("액세스 토큰 생성 성공");

    console.log("회원가입 프로세스 완료");
    return NextResponse.json({
      user: userData,
      accessToken,
    });
  } catch (error) {
    console.error("회원가입 에러", error);
    if (error instanceof Error) {
      console.error("에러 세부 정보:", error.message);
      console.error("에러 스택:", error.stack);
    }
    return NextResponse.json({ error: "회원가입 실패" }, { status: 500 });
  }
}
