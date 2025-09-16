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
    <div >
      {/* Main Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Image
          src={activeImage}
          alt={productName}
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          priority // Prioritize loading the main product image
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-4">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`group aspect-square overflow-hidden rounded-lg ring-offset-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500
                ${activeImage === img ? 'ring-2 ring-green-500' : 'ring-1 ring-slate-200 hover:ring-green-400'}`}
            >
              <Image
                src={img}
                alt={`${productName} view ${idx + 1}`}
                width={150}
                height={150}
                className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}