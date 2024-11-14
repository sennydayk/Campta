import { auth, db, storage } from "@/lib/firebase/firebaseConfig";
import { IUser } from "@/store/auth/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";

// const MAX_PROFILE_URL_LENGTH = 1024; // Firebase의 최대 URL 길이

export async function POST(request: Request) {
  console.log("회원가입 요청 시작");
  try {
    const { name, email, password, nickname, birthdate, profileImg } =
      await request.json();
    console.log("요청 데이터:", {
      name,
      email,
      nickname,
      birthdate,
      profileImg: profileImg ? "있음" : "없음",
    });

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
      // Firebase Storage에 이미지 업로드
      const imageRef = ref(storage, `profile-images/${user.uid}`);
      await uploadString(imageRef, profileImg, "data_url");
      profileImgUrl = await getDownloadURL(imageRef);
    }

    // 프로필 업데이트
    await updateProfile(user, {
      displayName: nickname,
      photoURL: profileImgUrl,
    });
    console.log("사용자 프로필 업데이트 성공");

    // Firestore에 사용자 데이터 저장
    const userData: IUser = {
      uid: user.uid,
      email: user.email!,
      name: name,
      nickname: nickname,
      birthdate: birthdate,
      profileImg: profileImgUrl, // 프로필 이미지는 url만 저장
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
