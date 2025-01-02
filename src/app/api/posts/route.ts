import { db, storage } from "@/lib/firebase/firebaseConfig";
import { adminAuth } from "@/lib/firebase/firebase.admin";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
  startAfter,
} from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB

// GET: 게시글 목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const sortParam = searchParams.get("sort") || "createdAt";
  const orderParam = searchParams.get("order") || "desc";

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const pageSize = limitParam ? parseInt(limitParam, 10) : 9;

  try {
    const postsRef = collection(db, "posts");
    let postsQuery = query(
      postsRef,
      orderBy(sortParam, orderParam as "desc" | "asc"),
      limit(pageSize)
    );

    if (page > 1) {
      const lastVisiblePost = await getLastVisiblePost(
        page - 1,
        pageSize,
        sortParam,
        orderParam as "desc" | "asc"
      );
      if (lastVisiblePost) {
        postsQuery = query(postsQuery, startAfter(lastVisiblePost));
      }
    }

    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error("게시글 가져오기 오류:", error);
    return NextResponse.json(
      { error: "게시글을 가져오는 데 실패했습니다." },
      { status: 500 }
    );
  }
}

async function getLastVisiblePost(
  page: number,
  pageSize: number,
  sortField: string,
  orderDirection: "desc" | "asc"
) {
  const postsRef = collection(db, "posts");
  const q = query(
    postsRef,
    orderBy(sortField, orderDirection),
    limit(page * pageSize)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs[snapshot.docs.length - 1];
}

// POST: 새 게시글 작성
export async function POST(request: Request) {
  try {
    console.log("POST 요청 시작");

    // 헤더에서 토큰 가져오기
    const headersList = headers();
    const authHeader = headersList.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "인증 토큰이 없습니다." },
        { status: 401 }
      );
    }
    const idToken = authHeader.split("Bearer ")[1];
    console.log("Server-side token:", idToken); // 디버깅용

    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      return NextResponse.json(
        { error: "인증 토큰이 유효하지 않습니다." },
        { status: 401 }
      );
    }
    const authorId = decodedToken.uid;
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");

    console.log("제목:", title);
    console.log("내용:", content);
    console.log("작성자 ID:", authorId);

    if (typeof title !== "string" || typeof content !== "string") {
      return NextResponse.json(
        { error: "제목과 내용은 문자열이어야 합니다." },
        { status: 400 }
      );
    }

    if (title.trim() === "" || content.trim() === "") {
      return NextResponse.json(
        { error: "제목과 내용은 비어있을 수 없습니다." },
        { status: 400 }
      );
    }

    const imageUrls = [];
    for (let i = 0; i < 5; i++) {
      const image = formData.get(`image${i}`) as File | null;
      if (image) {
        console.log(`이미지${i} 크기:`, image.size);
        if (image.size > MAX_IMAGE_SIZE) {
          return NextResponse.json(
            {
              error: `이미지 크기는 20MB를 초과할 수 없습니다. (현재 크기: ${(
                image.size /
                (1024 * 1024)
              ).toFixed(2)}MB)`,
            },
            { status: 400 }
          );
        }
        try {
          const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
          await uploadBytes(imageRef, await image.arrayBuffer());
          const url = await getDownloadURL(imageRef);
          imageUrls.push(url);
          console.log(`이미지${i} 업로드 성공:`, url);
        } catch (error) {
          console.error(`이미지${i} 업로드 실패:`, error);
          throw new Error(
            `이미지 업로드 실패: ${
              error instanceof Error ? error.message : "알 수 없는 오류"
            }`
          );
        }
      }
    }

    console.log("Firestore에 문서 추가 시작");
    const docRef = await addDoc(collection(db, "posts"), {
      title,
      content,
      images: imageUrls,
      createdAt: new Date().toISOString(),
      authorId,
    });
    console.log("Firestore에 문서 추가 완료:", docRef.id);

    const authorDoc = await getDoc(doc(db, "users", authorId));
    const authorData = authorDoc.data();

    return NextResponse.json({
      id: docRef.id,
      title,
      content,
      images: imageUrls,
      createdAt: new Date().toISOString(),
      author: {
        id: authorId,
        name: authorData?.name,
        nickname: authorData?.nickname,
        profileImg: authorData?.profileImg,
      },
    });
  } catch (error) {
    console.error("게시글 등록 중 에러 발생:", error);
    let errorMessage = "게시글 등록에 실패했습니다.";
    let statusCode = 500;

    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
      if (error.message.includes("storage/unauthorized")) {
        errorMessage =
          "Firebase Storage 접근 권한이 없습니다. Firebase 설정을 확인해주세요.";
        statusCode = 403;
      } else {
        errorMessage += ` 오류 내용: ${error.message}`;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
