export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        404 - 페이지를 찾을 수 없습니다
      </h1>
      <p className="text-xl mb-8">요청하신 페이지를 찾을 수 없습니다.</p>
      <a href="/" className="text-blue-500 hover:underline">
        홈으로 돌아가기
      </a>
    </div>
  );
}
