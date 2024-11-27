import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nickname = searchParams.get("nickname");

  if (!nickname) {
    return NextResponse.json(
      { error: "닉네임이 제공되지 않았습니다." },
      { status: 400 }
    );
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);

    const isAvailable = querySnapshot.empty;

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    console.error("닉네임 확인 중 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
