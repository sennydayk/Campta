"use client";

import { ProfileContent } from "@/components/profile/ProfileContent";
import type { ProfileData } from "./types";
import { Footer } from "@/components/common/ui/footer/Footer";

const mockProfileData: ProfileData = {
  nickname: "nickname",
  name: "name",
  email: "user@gmail.com",
  birthDate: "2000년 1월 1일",
  followers: 10,
  following: 7,
};

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProfileContent profileData={mockProfileData} />
      <Footer />
    </div>
  );
}
