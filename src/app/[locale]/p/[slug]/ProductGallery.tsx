// src/app/[locale]/[slug]/ProductGallery.tsx
'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

type ProductGalleryProps = {
  mainImage: string;
  images: string[];
  productName: string;
};

export function ProductGallery({ mainImage, images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const allImages = [mainImage, ...images];

  // Lock body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isFullscreen]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <>
      <div className="flex flex-col gap-1 h-full">
        {/* Main Image with Hover Zoom */}
        <div 
          ref={imageRef}
          className="flex-1 w-full overflow-hidden bg-gray-50 relative cursor-zoom-in group"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={activeImage}
            alt={productName}
            width={1200}
            height={1200}
            className="h-full w-full object-cover transition-transform duration-200"
            style={{
              transform: showZoom ? `scale(1.5)` : 'scale(1)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
            priority
          />
          
          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-md items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
            <ZoomIn size={16} />
            <span className="text-sm">Click to enlarge</span>
          </div>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-1 pb-2 w-full md:w-[70%] overflow-x-auto md:overflow-x-visible scrollbar-hide">
            {allImages.map((img, idx) => (
              <button
                type="button"
                title={`View image ${idx + 1}`}
                key={idx}
                onClick={() => setActiveImage(img)}
                className="relative aspect-square w-20 md:w-28 flex-shrink-0 overflow-hidden bg-gray-50 transition-opacity"
              >
                <Image
                  src={img}
                  alt={`${productName} view ${idx + 1}`}
                  width={160}
                  height={160}
                  className={`h-full w-full object-cover transition-opacity hover:opacity-80
                    ${activeImage === img ? 'opacity-100' : 'opacity-60'}`}
                />
                {activeImage === img && (
                  <div className="absolute inset-0 border border-gray-800 rounded-sm pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] flex cursor-zoom-out overflow-hidden"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Solid backdrop layer to ensure coverage */}
          <div className="absolute inset-0 bg-black/70" />
          
          {/* Blur layer */}
          <div className="absolute inset-0 backdrop-blur-3xl" />
          
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/40 rounded-full p-2"
            aria-label="Close fullscreen"
          >
            <X size={24} className="md:w-8 md:h-8" />
          </button>

          {/* Left sidebar with small thumbnail icons */}
          {allImages.length > 1 && (
            <div 
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-12 h-12 md:w-20 md:h-20 overflow-hidden rounded-lg transition-all ${
                    activeImage === img 
                      ? 'ring-2 ring-white scale-110 shadow-xl' 
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${idx + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main fullscreen image */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-16">
            <div 
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt={productName}
                width={1920}
                height={1920}
                className="max-h-[85vh] md:max-h-[90vh] w-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}