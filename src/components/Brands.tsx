// Relative path: /src/components/Brands.tsx
'use client';
import React from 'react';
import { BrandList } from '@/app/data/brands';
import Image from 'next/image';


export default function BrandsSection() {
  return (
    <div className="flex items-center gap-4 py-4 w-[75%] mx-auto mb-12">
      <div className="flex-1">
        <Image 
          src="/images/brands/anker.png"
          alt="Anker"
          width={400}
          height={200}
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>
      <div className="flex-1">
        <Image
          src="/images/brands/xiaomi.png"
          alt="Xiaomi"
          width={400}
          height={200}
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  )
}