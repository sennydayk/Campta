import Header from "@/components/Header";
import WriteButton from "@/components/WriteButton";
import ContentBox from "@/components/ContentBox";

export default function Home() {
  const contentBoxes = Array(6).fill({
    title: "게시물 제목",
    description: "상세 내용입니다.",
    likes: 3,
    comments: 3,
  });

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentBoxes.map((box, index) => (
            <ContentBox key={index} {...box} />
          ))}
        </div>
      </main>
      <WriteButton />
    </div>
  );
}
