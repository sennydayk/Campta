import { useRouter } from "next/navigation";
import Button from "./Button";

export default function WriteButton() {
  const router = useRouter();

  const writeButtonHandler = () => {
    router.push("/posts/create");
  };
  return (
    <div className="fixed bottom-20 right-10">
      <Button
        type="button"
        label="글쓰기"
        width="w-20"
        fontWeight="font-bold"
        rounded="rounded-full"
        onClick={writeButtonHandler}
      />
    </div>
  );
}
