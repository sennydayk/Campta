import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// 게시글 조회 로직
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      return NextResponse.json(
        { error: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "게시글 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

// 게시글 삭제 로직
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteDoc(doc(db, "posts", params.id));
    return NextResponse.json({
      message: "게시글이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "게시글 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
