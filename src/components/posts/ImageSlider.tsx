import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
        No Image
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center max-w-2xl mx-auto">
        <Image
          src={images[currentImage]}
          alt="Post image"
          width={300}
          height={200}
          className="w-80 rounded-lg"
        />
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
              onClick={() =>
                setCurrentImage(
                  (prev) => (prev - 1 + images.length) % images.length
                )
              }
            >
              <ChevronLeft className="text-gray-600" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
              onClick={() =>
                setCurrentImage((prev) => (prev + 1) % images.length)
              }
            >
              <ChevronRight className="text-gray-600" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImage ? "bg-main" : "bg-sub"
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
