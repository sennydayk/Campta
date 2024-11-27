import { db, storage } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

// 이미지 업로드
const uploadImageAndGetURL = async (
  file: File,
  postId: string,
  index: number
): Promise<string> => {
  const fileExtension = file.name.split(".").pop();
  const fileName = `${postId}_${index}.${fileExtension}`;
  const storageRef = ref(storage, `posts/${fileName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// GET: 단일 게시글 조회 로직
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postData = docSnap.data();

      // 작성자 정보 가져오기
      const authorRef = doc(db, "users", postData.authorId);
      const authorSnap = await getDoc(authorRef);
      const authorData = authorSnap.exists() ? authorSnap.data() : null;

      const postWithAuthor = {
        id: docSnap.id,
        ...postData,
        author: authorData
          ? {
              id: authorSnap.id,
              nickname: authorData.nickname || "",
              profileImg: authorData.profileImg || "",
            }
          : null,
      };

      console.log("Post with author data:", postWithAuthor);
      return NextResponse.json(postWithAuthor);
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

// PUT: 게시글 수정 로직
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "수정할 게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const existingData = docSnap.data();
    const existingImages: string[] = (existingData.images || []) as string[];

    type UpdateData = {
      [key: string]: string | string[] | undefined;
      images?: string[];
    };

    const updateData: UpdateData = {};
    const imageUploadPromises: Promise<string>[] = [];
    const newImages: string[] = [];
    const imagesToKeep: string[] = [];

    formData.forEach((value, key) => {
      if (key === "keepImages") {
        imagesToKeep.push(value as string);
      } else if (key.startsWith("image") && value instanceof File) {
        const uploadPromise = uploadImageAndGetURL(
          value,
          params.id,
          imageUploadPromises.length
        );
        imageUploadPromises.push(uploadPromise);
      } else {
        updateData[key] = value as string;
      }
    });

    existingImages.forEach((imageUrl: string) => {
      if (imagesToKeep.includes(imageUrl)) {
        newImages.push(imageUrl);
      } else {
        const imageRef = ref(storage, imageUrl);
        deleteObject(imageRef).catch((error) => {
          console.error("이미지 삭제 실패:", error);
        });
      }
    });

    const uploadedImageUrls = await Promise.all(imageUploadPromises);
    newImages.push(...uploadedImageUrls);
    updateData.images = newImages;

    await updateDoc(docRef, updateData);
    const updatedDocSnap = await getDoc(docRef);

    return NextResponse.json({
      message: "게시글이 성공적으로 수정되었습니다.",
      post: { id: updatedDocSnap.id, ...updatedDocSnap.data() },
    });
  } catch (error) {
    console.error("게시글 업데이트 오류:", error);
    return NextResponse.json(
      { error: "게시글 수정에 실패했습니다: " + (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: 게시글 삭제 로직
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "삭제할 게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const postData = docSnap.data();

    if (postData.images && postData.images.length > 0) {
      await Promise.all(
        postData.images.map(async (imageUrl: string) => {
          const imageRef = ref(storage, imageUrl);
          try {
            await deleteObject(imageRef);
          } catch (error) {
            console.error("이미지 삭제 실패:", error);
          }
        })
      );
    }

    await deleteDoc(docRef);

    return NextResponse.json({
      message: "게시글이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("게시글 삭제 오류:", error);
    return NextResponse.json(
      { error: "게시글 삭제에 실패했습니다: " + (error as Error).message },
      { status: 500 }
    );
  }
}
