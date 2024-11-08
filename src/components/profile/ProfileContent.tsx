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
    <div className="bg-white shadow rounded-lg p-8 w-full max-w-4xl m-4">
      <div className="flex items-center mb-8">
        <ProfileImage imageUrl={profileData.imageUrl} />
        <div className="ml-8 flex-grow">
          <ProfileInfo
            nickname={profileData.nickname}
            onEdit={() => setIsEditing(!isEditing)}
          />
        </div>
      </div>
      <ProfileDetails
        name={profileData.name}
        email={profileData.email}
        birthDate={profileData.birthDate}
      />
    </div>
  );
}
