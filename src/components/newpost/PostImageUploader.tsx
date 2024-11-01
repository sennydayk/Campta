import { useState, useEffect } from "react";
import Image from "next/image";

interface PostImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  initialImages?: string[];
}

export function PostImageUploader({
  images,
  setImages,
  initialImages = [],
}: PostImageUploaderProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    // Create preview URLs for initial images
    setPreviewUrls(initialImages);
  }, [initialImages]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...newFiles]);

      // Create preview URLs for new images
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label htmlFor="images">이미지 업로드</label>
      <input
        id="images"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        multiple
      />
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                width={200}
                height={200}
                objectFit="cover"
                className="rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => removeImage(index)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
