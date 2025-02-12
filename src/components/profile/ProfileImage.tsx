import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileImageProps {
  imageUrl?: string;
}

export function ProfileImage({ imageUrl }: ProfileImageProps) {
  const [imgSrc, setImgSrc] = useState("/images/user.png");

  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl);
    }
  });

  return (
    <div className="flex justify-center w-28 h-28 rounded-full overflow-hidden mx-auto">
      <Image
        src={imgSrc}
        alt="Profile"
        width={112}
        height={112}
        className="object-cover"
        onError={() => setImgSrc("/images/user.png")}
      />
    </div>
  );
}
