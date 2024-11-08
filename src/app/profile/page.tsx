"use client";

import { ProfileContent } from "@/components/profile/ProfileContent";
import type { ProfileData } from "../../lib/profile/types";
import { Footer } from "@/components/common/ui/footer/Footer";
import { useStore } from "@/lib/auth/hooks/useStore";
import { useAuthStore } from "@/store/auth/authStore";

const mockProfileData: ProfileData = {
  nickname: "nickname",
  name: "name",
  email: "user@gmail.com",
  birthDate: "2000년 1월 1일",
  uid: "",
  imageUrl: "",
};

export default function Profile() {
  const userData = useStore(useAuthStore, (state) => {
    return state.user;
  });
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex justify-center items-center">
        <div>{userData?.email}</div>
        <ProfileContent profileData={mockProfileData} />
      </main>
      <Footer />
    </div>
  );
}
