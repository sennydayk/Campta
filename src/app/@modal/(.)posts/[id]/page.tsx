import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/posts/PostContent";
import { AuthorInfo } from "@/components/posts/AuthorInfo";
import { fetchPost } from "@/api/posts/posts";
import Modal from "@/components/modal/Modal";

export default async function PostDetailModal({
  params,
}: {
  params: { id: string };
}) {
  const postId = params.id;
  const post = await fetchPost(postId);

  if (!post) {
    notFound();
  }

  return (
    <Modal>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="bg-bg rounded-lg overflow-hidden">
          <div className="p-6">
            <AuthorInfo author={post.author} />
            <PostContent post={post} />
          </div>
        </div>
      </Suspense>
    </Modal>
  );
}
