import Link from "next/link";
import { Bookmark, Send } from "lucide-react";

export default function Sidebar() {
  const links = [
    { href: "/mypage", label: "나의 회원정보" },
    { href: "/mypage/posts", label: "내가 작성한 글" },
    { href: "/mypage/comments", label: "내가 작성한 댓글" },
    {
      href: "/scraps",
      label: "스크랩",
      icon: <Bookmark className="inline-block mr-2" size={18} />,
    },
    {
      href: "/campting",
      label: "Campting",
      icon: <Send className="inline-block mr-2" size={18} />,
    },
  ];

  return (
    <aside className="w-56 bg-sub shadow-md">
      <nav className="p-5">
        <h2 className="text-lg font-semibold mb-4">Mypage</h2>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 px-4 rounded hover:bg-main text-font_main font-semibold"
              >
                {link.icon && link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
