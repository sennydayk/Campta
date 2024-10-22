import Button from "./ui/Button";

export default function WriteButton() {
  return (
    <div className="fixed bottom-10 right-10">
      <Button
        label="글쓰기"
        width="w-20"
        fontWeight="font-bold"
        rounded="rounded-full"
      />
    </div>
  );
}
