import PostList from "@/components/posts/PostList";
import { fetchPosts, POSTS_PER_PAGE } from "@/lib/api";
import { Post } from "@/lib/posts/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  const initialPosts = await fetchPosts(1);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Post[], allPages: Post[][]) => {
      return lastPage.length === POSTS_PER_PAGE
        ? allPages.length + 1
        : undefined;
    },
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostList initialPosts={initialPosts} />
      </HydrationBoundary>
    </main>
  );
}
