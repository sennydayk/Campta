"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ContentBox from "@/components/common/ui/ContentBox";
import WriteButton from "@/components/common/ui/WriteButton";
import { Footer } from "@/components/common/ui/footer/Footer";
import { fetchPosts, POSTS_PER_PAGE } from "@/lib/api";
import { Post } from "@/lib/posts/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function PostList() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === POSTS_PER_PAGE ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.flatMap((group) =>
          group.map(
            (post: Post) => (
              console.log("Post object:", post),
              (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  scroll={false}
                  passHref
                  legacyBehavior
                >
                  <ContentBox
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.content}
                    comments={post.comments}
                    scraps={post.scraps}
                    imageUrl={
                      post.images && post.images.length > 0
                        ? post.images[0]
                        : undefined
                    }
                  />
                </Link>
              )
            )
          )
        )}
      </div>
      <div
        ref={ref}
        className="flex justify-center mt-10 text-font_sub text-sm font-sans"
      >
        {isFetchingNextPage ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : hasNextPage ? (
          "더보기"
        ) : (
          "더 이상 작성글이 없습니다."
        )}
      </div>
      <Footer />
      <WriteButton />
    </>
  );
}
