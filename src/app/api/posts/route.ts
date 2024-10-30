import { db, storage } from "@/firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { NextResponse } from "next/server";

// 게시글 불러오기 요청 로직
export async function GET() {
  try {
    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "게시글을 가져오는 데 실패했습니다." },
      { status: 500 }
    );
  }
}

// 게시글 작성하기 요청 로직
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      return NextResponse.json(
        { error: "제목과 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const imageUrls = [];
    for (let i = 0; i < 5; i++) {
      const image = formData.get(`image${i}`) as File | null;
      if (image) {
        console.log(`Processing image${i}:`, image.name, image.size);
        // 이미지 제한
        if (image.size > 20 * 1024 * 1024) {
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
        const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, await image.arrayBuffer());
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }
    }

    const docRef = await addDoc(collection(db, "posts"), {
      title,
      content,
      images: imageUrls,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      id: docRef.id,
      title,
      content,
      images: imageUrls,
    });
  } catch (error) {
    console.error("게시글 등록 중 에러 발생:", error);
    return NextResponse.json(
      { error: "게시글 등록에 실패했습니다." },
      { status: 500 }
    );
  }
}
