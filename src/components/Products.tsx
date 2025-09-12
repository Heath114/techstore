'use client';

import { ProductList } from '@/app/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ProductsSection() {
    const router = useRouter();

    return (
        <section className="px-4 sm:px-6 lg:px-8 lg:py-8 py-6 sm:py-10 bg-white w-[90%] mx-auto rounded-lg">
            <div className="max-w-8xl mx-auto">
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
                                    className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg hover:border- cursor-pointer group bg-white h-full flex flex-col"
                                    onClick={() => router.push(`/products/${product.id}`)}
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-4">
                                        <Image 
                                            src={product.image}
                                            alt={product.name}
                                            width={200}
                                            height={200}
                                            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    
                                    <div className="flex-grow flex flex-col justify-between">
                                        <h3 className="text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto">
                                         
                                            <button className="w-full bg-gray-100 font-bold text-green-800 hover:bg-blue-700 py-2 px-4 rounded-md transition-colors duration-200">
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