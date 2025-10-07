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
    <div className="flex flex-col gap-4 lg:h-[calc(110vh-70px)]">
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
        <div className="flex gap-4 pb-2">
          {allImages.map((img, idx) => (
            <button
              type="button"
              title={`View image ${idx + 1}`}
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`aspect-square w-20 flex-shrink-0 overflow-hidden transition-opacity bg-gray-50
                ${activeImage === img ? 'opacity-100 ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'}`}
            >
              <Image
                src={img}
                alt={`${productName} view ${idx + 1}`}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}