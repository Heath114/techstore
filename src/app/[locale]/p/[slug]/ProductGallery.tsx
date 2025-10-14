// src/app/[locale]/[slug]/ProductGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

type ProductGalleryProps = {
  mainImage: string;
  images: string[];
  productName: string;
};

export function ProductGallery({ mainImage, images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);
  const allImages = [mainImage, ...images];

  return (
    <div className="flex flex-col gap-1 h-full">
      {/* Main Image */}
      <div className="flex-1 w-full overflow-hidden bg-gray-50">
        <Image
          src={activeImage}
          alt={productName}
          width={1200}
          height={1200}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-1 pb-2 w-[70%]">
          {allImages.map((img, idx) => (
            <button
              type="button"
              title={`View image ${idx + 1}`}
              key={idx}
              onClick={() => setActiveImage(img)}
              className="relative aspect-square w-28 flex-shrink-0 overflow-hidden bg-gray-50 transition-opacity"
            >
              <Image
                src={img}
                alt={`${productName} view ${idx + 1}`}
                width={160}
                height={160}
                className={`h-full w-full object-cover transition-opacity
                  ${activeImage === img ? 'opacity-100' : 'opacity-60'}`}
              />
              {/* Border overlay - doesn't affect layout */}
              {activeImage === img && (
                <div
                  className="absolute inset-0 border border-gray-800 rounded-sm pointer-events-none"
                />
              )}

            </button>
          ))}
        </div>
      )}
    </div>
  );
}