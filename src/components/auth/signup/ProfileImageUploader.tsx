import { useRef } from "react";
import Image from "next/image";
import type { ProfileImageUploaderProps } from "@/app/signup/types";

export function ProfileImageUploader({
  profileImage,
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
        {profileImage ? (
          <Image
            src={profileImage}
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