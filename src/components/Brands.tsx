'use client';
import React from 'react';
import { BrandList } from '@/app/data/brands';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

export default function BrandsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto lg:px-0 px-4 py-16 md:py-24 lg:py-32 2xl:py-40 bg-white">
      <div className="mb-8 md:mb-10 2xl:mb-12 text-center">
        <h2 className="text-2xl 2xl:text-[32px] font-medium text-gray-900 tracking-wide">
          Shop from {BrandList.length}+ Trusted Brands
        </h2>
      </div>
      
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 60,
          },
        }}
        className="brands-swiper"
      >
        {BrandList.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="flex items-center justify-center h-32 px-4 transition-all duration-300 hover:opacity-100">
              <Image
                src={brand.image}
                alt={brand.name}
                width={150}
                height={80}
                className="w-auto h-auto max-h-16 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
