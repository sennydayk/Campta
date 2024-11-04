import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const COMMENTS_COLLECTION = "comments";

// 에러 응답 생성 함수
const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

// 댓글 조회 로직
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return createErrorResponse("Post ID is required", 400);
  }

  try {
    const commentsRef = collection(db, COMMENTS_COLLECTION);
    const q = query(
      commentsRef,
      where("postId", "==", postId),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate().toISOString(),
    }));

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return createErrorResponse("Failed to fetch comments", 500);
  }
}

// 댓글 작성 로직
export async function POST(request: NextRequest) {
  try {
    const { postId, username, content } = await request.json();

    if (!postId || !username || !content) {
      return createErrorResponse("Missing required fields", 400);
    }

    const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
      postId,
      username,
      content,
      timestamp: Timestamp.now(),
    });

    return NextResponse.json({
      id: docRef.id,
      postId,
      username,
      content,
      timestamp: Timestamp.now().toDate().toISOString(),
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return createErrorResponse("Failed to add comment", 500);
  }
}

// 댓글 수정 로직
export async function PUT(request: NextRequest) {
  try {
    const { id, content } = await request.json();

    if (!id || !content) {
      return createErrorResponse("Missing required fields", 400);
    }

    const commentRef = doc(db, COMMENTS_COLLECTION, id);
    await updateDoc(commentRef, {
      content,
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comment:", error);
    return createErrorResponse("Failed to update comment", 500);
  }
}

// 댓글 삭제 로직
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return createErrorResponse("Comment ID is required", 400);
  }

  try {
    await deleteDoc(doc(db, COMMENTS_COLLECTION, id));
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return createErrorResponse("Failed to delete comment", 500);
  }
}
