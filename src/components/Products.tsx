// src/components/Products.tsx
'use client';

import { ProductList } from '@/app/data/products';
import { getProductPrice } from '@/app/data/products';
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
    const [disableSwiper, setDisableSwiper] = React.useState(false);
    const router = useRouter();
    const params = useParams();
    const lang = params?.locale as string || 'en';
    
    React.useEffect(() => {
        setMounted(true);
        setDisableSwiper(true);
    }, []);

    if (!mounted) {
         return null;
    }

    return (
        <section className="w-full max-w-[1440px] mx-auto lg:px-0 px-4 py-16 bg-white"
 id="deals">
            <div className="">
                <h3 className="text-[32px] font-medium text-gray-900 mb-12 tracking-wide">BESTSELLERS</h3>
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={10}
                        slidesPerView={1.6}
                        slidesPerGroup={1}
                        centeredSlides={false}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 2,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 2,
                            },
                            1025: {
                                slidesPerView: 4,
                                slidesOffsetAfter: 0,
                                slidesOffsetBefore: 0,
                                spaceBetween: 2,
                            }
                        }}
                        pagination={{
                            type: "progressbar",
                            el: ".pro-pagination",
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                      
                        loop={ProductList?.length > 5}
                        className="pro-swiper pb-16"
                    >
                        {ProductList?.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div
                                    className=" hover:shadow-md
                                     cursor-pointer group flex flex-col transition-all duration-300
                                      h-full w-full border-r border-neutral-200 last:border-r-0"
                                    onClick={() => router.push(`/${lang}/p/${product.slug}`)}
                                >
                                <div className="aspect-[4/5] w-full bg-gray-50 flex items-center justify-center overflow-hidden mb-2">
                                        <Image
                                            src={product.image ?? '/images/products/placeholder.png'}
                                            alt={product.name}
                                            width={500}
                                            height={600}
                                            className="w-full h-full object-contain"
                                        />
                                        {
                                            product.isSale && (
                                                <div className="absolute top-2 left-2 bg-red-700 text-white px-[8px] py-[2px] text-[10px]">
                                                    ON SALE
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="text-black font-normal px-2">
                                        <h4 className="text-base text-gray-700 font-normal">{product.name}</h4>
                                        <div className="mt-2">
                                            {product.isSale ? (
                                                <>
                                                    <span className="text-sm text-gray-300 line-through">{`$${(product.originalPrice).toFixed(2)}`}</span>
                                                    <span className="text-sm text-black text-gray-700 ml-2">{`From $${getProductPrice(product).toFixed(2)}`}</span>
                                                </>
                                            ) :
                                            (
                                                <span className="text-sm text-gray-700">{`From $${getProductPrice(product).toFixed(2)}`}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="pro-pagination swiper-pagination mt-8" />
                </div>
            </div>
        </section>
    );
}