import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface PostImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export function PostImageUploader({
  images,
  setImages,
}: PostImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      setError("최대 5개의 이미지만 업로드할 수 있습니다.");
      return;
    }
    setError(null);

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Uploaded image ${index + 1}`}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <button type="button" className="cursor-pointer">
            이미지 업로드 ({images.length}/5)
          </button>
        </label>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
