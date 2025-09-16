// Relative path: /src/components/HeroSlider.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import React from 'react';
import { ItemList } from '@/app/data/items';
import { useRouter } from 'next/navigation';


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
    title: 'browse on the go',
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

function ProHeroSlider() {
  return (
    <section className=" pt-24 w-[75%] mx-auto mb-6" id="home">
      <div className="relative rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] cursor-pointer">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
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
                  <div className="max-w-7xl mx-auto w-full px-8">
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
                          className="inline-flex mt-5 items-center rounded-lg bg-white/90 hover:bg-white transition px-12 py-2.5 text-3xl font-medium text-gray-900 backdrop-blur"
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


export default function Hero() {
  return (
    <>
      <ProHeroSlider />
      <ItemsSection />
    </>
  )
}


function ItemsSection() {
  const router = useRouter();

  return (
    <div className="flex items-start gap-16 py-4 w-[75%] mx-auto mb-8 py-4 bg-white rounded-lg shadow-lg">
      {ItemList.map((item) => (
        <div key={item.id} className="flex-1 cursor-pointer">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="object-contain bg-[#f1edfc] rounded-lg mx-auto w-24 h-24"
            onClick={() => router.push(item.link || '/')}
          />
          <p className="text-center mt-2 text-gray-900 text-xl">{item.name}</p>
        </div>
      ))}
    </div>
  )
}

