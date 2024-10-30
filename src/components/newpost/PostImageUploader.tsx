import { useState, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface PostImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export function PostImageUploader({
  images,
  setImages,
}: PostImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      setError("이미지 등록은 최대 5개까지 가능합니다.");
      return;
    }
    setError(null);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              src={preview}
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
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 bg-bg border-2 border-border text-font_btn rounded-md hover:bg-sub transition-colors"
        >
          이미지 업로드 ({images.length}/5)
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
