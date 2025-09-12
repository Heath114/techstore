'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';


type Slide = {
  id: number;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl: string;
  alt?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Fast Charging',
    subtitle:
      'A power bank that stays with you wherever you go, ensuring safe and fast charging.',
    ctaText: 'Shop now',
    ctaHref: '/products/power-banks',
    imageUrl: '/slider/img1.jpg',
    alt: 'Anker fast charging power bank',
  },
  {
    id: 2,
    title: 'Work. Create. Repeat.',
    subtitle:
      'Power your day with reliable capacity and premium build quality.',
    ctaText: 'Explore',
    ctaHref: '/collections/new',
    imageUrl: '/slider/img2.jpg',
    alt: 'Lifestyle tech setup',
  },
  {
    id: 3,
    title: 'Travel-Ready',
    subtitle:
      'Compact design that fits anywhere without compromising performance.',
    ctaText: 'See details',
    ctaHref: '/collections/travel',
    imageUrl: '/slider/img3.jpg',
    alt: 'Travel gear and accessories',
  },
  {
    id: 4,
    title: 'Ultimate Durability',
    subtitle:
      'Rugged and reliable power banks built to withstand the toughest conditions.',
    ctaText: 'Buy now',
    ctaHref: '/products/durable-power-banks',
    imageUrl: '/slider/img4.jpg',
    alt: 'Durable power bank in outdoor setting',
  }
];

export default function ProHeroSlider() {
  return (
    <section className="px-4 sm:px-6 py-6 sm:py-10 lg:py-16 xl:py-32 w-[90%] mx-auto">
      <div className="relative rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={900}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-[260px] sm:h-[360px] lg:h-[500px] xl:h-[600px] pro-swiper"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative w-full h-full">
                {/* Background image */}
                <Image
                  src={s.imageUrl}
                  alt={s.alt ?? s.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                />

                {/* Left gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
                    <div className="max-w-xl">
                      <h2 className="text-white text-1xl sm:text-2xl lg:text-5xl font-semibold tracking-tight">
                        {s.title}
                      </h2>
                      <p className="mt-3 text-white/90 text-sm sm:text-base lg:text-3xl leading-relaxed">
                        {s.subtitle}
                      </p>
                      {s.ctaText && s.ctaHref && (
                        <Link
                          href={s.ctaHref}
                          className="inline-flex mt-5 items-center rounded-lg bg-white/90 hover:bg-white transition px-15 py-2.5 text-3xl font-medium text-gray-900 backdrop-blur"
                        >
                          {s.ctaText}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
      </div>
    </section>
  );
}