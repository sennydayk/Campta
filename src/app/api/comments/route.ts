import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebaseConfig";
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
  getDoc,
} from "firebase/firestore";

const COMMENTS_COLLECTION = "comments";
const USERS_COLLECTION = "users";

const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

// 작성자 프로필 조회 로직
async function fetchUserProfile(uid: string) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    return {
      uid,
      nickname: userData.nickname || "Anonymous",
      profileImg: userData.profileImg || "/default-avatar.png",
    };
  }
  return null;
}

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
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    const comments = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const commentData = doc.data();
        const userProfile = await fetchUserProfile(commentData.uid);
        return {
          id: doc.id,
          ...commentData,
          timestamp: commentData.timestamp.toDate().toISOString(),
          depth: commentData.depth || 0,
          userProfile,
        };
      })
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return createErrorResponse("Failed to fetch comments", 500);
  }
}

// 댓글 작성 로직
export async function POST(request: NextRequest) {
  try {
    const { postId, uid, content, parentId, depth } = await request.json();

    if (!postId || !uid || !content) {
      return createErrorResponse("Missing required fields", 400);
    }

    const newComment = {
      postId,
      uid,
      content,
      parentId: parentId || null,
      depth: depth || 0,
      timestamp: Timestamp.now(),
    };

    const docRef = await addDoc(
      collection(db, COMMENTS_COLLECTION),
      newComment
    );

    const userProfile = await fetchUserProfile(uid);

    return NextResponse.json({
      id: docRef.id,
      ...newComment,
      timestamp: newComment.timestamp.toDate().toISOString(),
      userProfile,
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
