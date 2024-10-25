"use client";

import { useState } from "react";
import Image from "next/image";
import { Footer } from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";

const ProfileContent = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <div className="flex items-center mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden mr-8">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">nickname</h1>
          <div className="flex space-x-4 mb-4">
            <span>팔로워 10</span>
            <span>팔로잉 7</span>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-main text-font_btn rounded font-bold hover:bg-sub"
          >
            수정하기
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">이름</h2>
          <p className="mt-1 text-gray-600">name</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">이메일</h2>
          <p className="mt-1 text-gray-600">user@gmail.com</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">생년월일</h2>
          <p className="mt-1 text-gray-600">2000년 1월 1일</p>
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <ProfileContent />
      </div>
      <Footer />
    </div>
  );
}
