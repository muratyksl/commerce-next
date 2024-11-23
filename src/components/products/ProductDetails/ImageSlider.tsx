"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-square">
      <Image
        src={images[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        fill
        className="object-cover rounded-lg"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
