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
  limit,
  startAfter,
} from "firebase/firestore";

const COMMENTS_COLLECTION = "comments";
const USERS_COLLECTION = "users";
const COMMENTS_PER_PAGE = 10;

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
  const page = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = parseInt(
    searchParams.get("limit") || String(COMMENTS_PER_PAGE),
    10
  );

  if (!postId) {
    return createErrorResponse("Post ID is required", 400);
  }

  try {
    const commentsRef = collection(db, COMMENTS_COLLECTION);
    let q = query(
      commentsRef,
      where("postId", "==", postId),
      orderBy("timestamp"),
      limit(pageSize + 1) // 다음 페이지 존재 여부를 확인하기 위해 1개 더 가져옵니다.
    );

    // 첫 페이지가 아닌 경우, 시작점을 설정합니다.
    if (page > 0) {
      const lastVisibleSnapshot = await getLastVisibleSnapshot(
        postId,
        page,
        pageSize
      );
      if (lastVisibleSnapshot) {
        q = query(q, startAfter(lastVisibleSnapshot));
      }
    }

    const querySnapshot = await getDocs(q);
    const comments = await Promise.all(
      querySnapshot.docs.slice(0, pageSize).map(async (doc) => {
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

    const hasNextPage = querySnapshot.docs.length > pageSize;

    return NextResponse.json({
      comments,
      hasNextPage,
      nextPage: hasNextPage ? page + 1 : null,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return createErrorResponse("Failed to fetch comments", 500);
  }
}

async function getLastVisibleSnapshot(
  postId: string,
  page: number,
  pageSize: number
) {
  const commentsRef = collection(db, COMMENTS_COLLECTION);
  const q = query(
    commentsRef,
    where("postId", "==", postId),
    orderBy("timestamp", "desc"),
    limit(page * pageSize)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[querySnapshot.docs.length - 1];
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
