"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-font_main">CAMPTA</h1>
        <SearchBar />
        <Link href="/login" className="text-font_main hover:text-font_sub">
          로그인
        </Link>
      </div>
    </header>
  );
}