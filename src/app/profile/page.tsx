"use client";

import { ProfileContent } from "@/components/profile/ProfileContent";
import type { ProfileData } from "../../lib/profile/types";
import { Footer } from "@/components/common/ui/footer/Footer";
import { useStore } from "@/lib/auth/hooks/useStore";
import { useAuthStore } from "@/store/auth/authStore";

export default function Profile() {
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });
  const ProfileData: ProfileData = {
    nickname: user?.nickname ?? "",
    email: user?.email ?? "",
    profileImg: user?.profileImg ?? "",
    uid: user?.uid ?? "",
    name: user?.name ?? "",
    birthdate: user?.birthdate ?? "",
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex justify-center items-center">
        <ProfileContent profileData={ProfileData} />
      </main>
      <Footer />
    </div>
  );
}
