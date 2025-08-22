"use client";

import { useConfig } from "@/hooks/use-config";
import { usePreloadImages } from "@/hooks/use-preload-images";
import { cn } from "@/lib/utils";
import { useState } from "react";
import MangaImage from "./manga-image";

interface LongStripProps {
  images: string[];
}

export default function LongStrip({ images }: LongStripProps) {
  const [config] = useConfig();
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount === images.length;
  // console.log(images);

  // Hook để preload ảnh
  const { registerImageElement, preloadedImages } = usePreloadImages({
    images,
    preloadCount: 5, // Preload 5 ảnh tiếp theo
    visibilityThreshold: 0.1
  });

  return (
    <div
      className={cn(
        "min-w-0 relative mt-2",
        allLoaded ? "min-h-0" : "min-h-lvh"
      )}
    >
      <div
        className={cn(
          "overflow-x-auto flex flex-col items-center h-full select-none bg-transparent justify-center"
        )}
        style={{
          gap: `${config.reader.imageGap}px`,
        }}
      >
        {images.map((image, index) => (
          <span
            key={index + 1}
            className="block overflow-hidden"
            style={{
              minHeight: allLoaded ? "auto" : "500px",
            }}
            ref={(element) => registerImageElement(index, element)}
          >
            <MangaImage
              src={image}
              alt={`Trang ${index + 1}`}
              onLoaded={() => setLoadedCount((prev) => prev + 1)}
              isPreloaded={preloadedImages.has(image)}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
