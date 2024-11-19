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
    <div className="flex flex-col items-center mb-12">
      <div
        className="relative w-full max-w-lg mx-auto"
        style={{
          aspectRatio: "3 / 4",
          overflow: "hidden",
        }}
      >
        <Image
          src={images[currentImage] || "/fallback-image.jpg"}
          alt="Post image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZ2YzZjNmIiAvPjwvc3ZnPg=="
          priority={currentImage === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg"
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
