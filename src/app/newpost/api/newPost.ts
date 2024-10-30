export async function createPost(postData: FormData) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: postData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "게시글 등록에 실패했습니다.");
  }
  return response.json();
}
