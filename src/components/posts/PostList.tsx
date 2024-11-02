"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ContentBox from "@/components/common/ui/ContentBox";
import WriteButton from "@/components/common/ui/WriteButton";
import { Footer } from "@/components/common/ui/footer/Footer";
import { fetchPosts } from "@/lib/api";
import { Post } from "@/app/posts/types";

export default function Posts() {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length + 1 : undefined;
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
        {data?.pages.map((group, i) =>
          group.map((post: Post) => (
            <ContentBox
              key={post.id}
              title={post.title}
              description={post.content}
              comments={post.comments}
              scraps={post.scraps}
            />
          ))
        )}
      </div>
      <div ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </div>
      <Footer />
      <WriteButton />
    </>
  );
}