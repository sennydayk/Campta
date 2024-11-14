import { db, storage } from "@/lib/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { NextResponse } from "next/server";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB

// GET: 게시글 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    const postsRef = collection(db, "posts");
    let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

    if (limitParam) {
      const limitValue = parseInt(limitParam, 10);
      if (pageParam) {
        const pageValue = parseInt(pageParam, 10);
        postsQuery = query(postsQuery, limit(limitValue * pageValue));
      } else {
        postsQuery = query(postsQuery, limit(limitValue));
      }
    }

    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(posts);
  } catch (error) {
    console.error("게시글 가져오기 오류:", error);
    return NextResponse.json(
      { error: "게시글을 가져오는 데 실패했습니다." },
      {
        status:
          error instanceof Error && error.message === "PERMISSION_DENIED"
            ? 403
            : 500,
      }
    );
  }
}

// POST: 새 게시글 작성
export async function POST(request: Request) {
  try {
    console.log("POST 요청 시작");
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");

    console.log("제목:", title);
    console.log("내용:", content);

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
    });
    console.log("Firestore에 문서 추가 완료:", docRef.id);

    return NextResponse.json({
      id: docRef.id,
      title,
      content,
      images: imageUrls,
      createdAt: new Date().toISOString(),
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
