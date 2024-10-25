import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative flex-grow max-w-2xl mx-4">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main"
      />
      <Search className="absolute right-3 top-2.5 text-gray-400" />
    </div>
  );
}
