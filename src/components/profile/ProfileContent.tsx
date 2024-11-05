import { useState } from "react";
import { ProfileImage } from "./ProfileImage";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileDetails } from "./ProfileDetails";
import type { ProfileData } from "@/lib/profile/types";

interface ProfileContentProps {
  profileData: ProfileData;
}

export function ProfileContent({ profileData }: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <div className="flex items-center mb-8">
        <ProfileImage imageUrl={profileData.imageUrl} />
        <ProfileInfo
          nickname={profileData.nickname}
          followers={profileData.followers}
          following={profileData.following}
          onEdit={() => setIsEditing(!isEditing)}
        />
      </div>
      <ProfileDetails
        name={profileData.name}
        email={profileData.email}
        birthDate={profileData.birthDate}
      />
    </div>
  );
}
