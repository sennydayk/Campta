"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ContentBox from "@/components/common/ui/ContentBox";
import WriteButton from "@/components/common/ui/WriteButton";
import { Footer } from "@/components/common/ui/footer/Footer";
import { fetchPosts, POSTS_PER_PAGE } from "@/lib/api";
import { Post } from "@/lib/posts/types";

export default function PostList() {
  const { ref, inView } = useInView();

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
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((group) =>
          group.map((post: Post) => (
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
          ))
        )}
      </div>
      <div
        ref={ref}
        className="flex justify-center mt-10 text-font_sub text-sm font-sans"
      >
        {isFetchingNextPage
          ? "로드 중..."
          : hasNextPage
          ? "더보기"
          : "더 이상 작성글이 없습니다."}
      </div>
      <Footer />
      <WriteButton />
    </>
  );
}
