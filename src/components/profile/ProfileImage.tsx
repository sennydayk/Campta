import Image from "next/image";

interface ProfileImageProps {
  imageUrl?: string;
}

export function ProfileImage({ imageUrl }: ProfileImageProps) {
  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden mr-8">
      <Image
        src={imageUrl || "/placeholder.svg?height=128&width=128"}
        alt="Profile"
        fill
        className="object-cover"
      />
    </div>
  );
}
