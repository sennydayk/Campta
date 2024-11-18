import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/posts/PostContent";
import { CommentSection } from "@/components/comments/CommentSection";
import { AuthorInfo } from "@/components/posts/AuthorInfo";
import { fetchPost } from "@/api/posts/posts";

export default async function PostDetailPage({
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
    <div className="min-h-screen bg-gray-100">
      <main className="py-8">
        <div className="max-w-4xl mx-auto bg-bg rounded-lg overflow-hidden">
          <div className="p-6">
            <AuthorInfo author={post.author} />
            <PostContent post={post} />
          </div>
        </div>
        <Suspense fallback={<div>Loading comments...</div>}>
          <CommentSection postId={postId} />
        </Suspense>
      </main>
    </div>
  );
}
