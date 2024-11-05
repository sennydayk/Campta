import { Home, Bookmark, Send, User } from "lucide-react";
import { FooterButton } from "./FooterButton";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();
  const routes = {
    Home: "/",
    Bookmark: "/scrap",
    Send: "/campting",
    User: "/profile",
  };
  const FooterButtonHandler = (path: string) => {
    router.push(path);
  };
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <nav className="flex justify-around">
        <FooterButton
          icon={Home}
          label="홈"
          onClick={() => FooterButtonHandler(routes.Home)}
        />
        <FooterButton
          icon={Bookmark}
          label="스크랩"
          onClick={() => FooterButtonHandler(routes.Bookmark)}
        />
        <FooterButton
          icon={Send}
          label="Campting"
          onClick={() => FooterButtonHandler(routes.Send)}
        />
        <FooterButton
          icon={User}
          label="프로필"
          onClick={() => FooterButtonHandler(routes.User)}
        />
      </nav>
    </footer>
  );
}
