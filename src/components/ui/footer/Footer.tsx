import { Home, Bookmark, Send, User } from "lucide-react";
import { FooterButton } from "./FooterButton";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <nav className="flex justify-around">
        <FooterButton icon={Home} label="홈" />
        <FooterButton icon={Bookmark} label="스크랩" />
        <FooterButton icon={Send} label="Campting" />
        <FooterButton icon={User} label="프로필" />
      </nav>
    </footer>
  );
}
