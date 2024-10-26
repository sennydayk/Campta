import Button from "@/components/ui/Button";

interface NewPostFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export function NewPostForm({
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
  children,
}: NewPostFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h2 className="mb-1">제목</h2>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시글 제목을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
          required
        />
      </div>
      <div>
        <h2 className="mb-1">내용</h2>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="게시글 내용을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
          rows={6}
          required
        />
      </div>
      {children}
      <Button type="submit" label="게시글 작성" />
    </form>
  );
}
