// src/components/Products.tsx
'use client';

import { ProductList } from '@/app/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ProductsSection() {
    const [mounted, setMounted] = React.useState(false);
    const router = useRouter();
    const params = useParams();
    const lang = params?.locale as string || 'en';
    
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
         return null;
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white w-[75%] mx-auto rounded-lg" id="deals">
            <div className="max-w-8xl mx-auto">
                <h2 className="text-3xl font-medium text-gray-900 mb-12 tracking-wide">Our choice to you</h2>
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 24,
                            },
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                      
                        loop={ProductList?.length > 5}
                        className="pro-swiper pb-16"
                    >
                        {ProductList?.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div
                                    className="border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer group h-full flex flex-col transition-all duration-300 hover:border-gray-400"
                                    onClick={() => router.push(`/${lang}/p/${product.slug}`)}
                                >
                                    <div className="relative overflow-hidden rounded-t-lg mb-4">
                                        <Image
                                            src={product.image ?? '/images/products/placeholder.png'}
                                            alt={product.name}
                                            width={200}
                                            height={200}
                                            className="w-full h-48 object-contain"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between px-4 pb-4">
                                        <h3 className="text-base text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors text-center">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto">
                                            <button className="w-full bg-gray-50 font-medium text-gray-900 text-base py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-300 border border-gray-200">
                                                {product.price.toFixed(2)} JOD
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}