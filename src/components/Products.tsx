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

    const handleProductClick = (productSlug: string) => {
        router.push(`/${lang}/p/${productSlug}`);
    }
    return (
        <section className="px-4 sm:px-6 lg:px-8 lg:py-8 py-6 sm:py-10 bg-white w-[75%] mx-auto rounded-lg" id="deals">
            <div className="max-w-8xl mx-auto">
                <h2 className="text-3xl font-semilight text-gray-600 mb-6">Our choice to you</h2>
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
                                    className="border hover:border-red-900 rounded-lg shadow hover:shadow-lg cursor-pointer group h-full flex flex-col"
                                    onClick={() => router.push(`/${lang}/p/${product.slug}`)}
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-4 border border-transparent  transition-colors duration-300">
                                        <Image
                                            src={product.image ?? '/images/products/placeholder.png'}
                                            alt={product.name}
                                            width={200}
                                            height={200}
                                            className="w-full h-48 object-contain"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between">
                                        <h3 className="text-2xl text-gray-800 mb-2 line-clamp-2 px-2 group-hover:text-blue-600 transition-colors text-center ">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto">
                                         
                                            <button className="w-full bg-gray-100 font-bold text-green-700 text-2xl py-2 px-4 rounded-md transition-colors duration-200">
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