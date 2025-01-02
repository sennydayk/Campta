import { useRef } from "react";
import Image from "next/image";
import type { ProfileImageUploaderProps } from "@/lib/auth/signup/types";

export function ProfileImageUploader({
  profileImg,
  onImageChange,
}: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="shrink-0">
      <div
        className="h-24 w-24 rounded-full bg-sub flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
        style={{ width: "96px", height: "96px" }}
      >
        {profileImg ? (
          <Image
            src={profileImg}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        ) : (
          <span className="text-font_btn text-sm">프로필사진</span>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
