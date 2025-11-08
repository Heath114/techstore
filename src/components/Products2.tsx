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
import styles from './style.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ProductsSection() {
    const [mounted, setMounted] = React.useState(false);
    const [filter, setFilter] = React.useState<string>('All');
    const [indicatorStyle, setIndicatorStyle] = React.useState({ width: 0, left: 0 });
    const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const router = useRouter();
    const params = useParams();
    const lang = params?.locale as string || 'en';
    
    // Add more categories as needed
    const categoryMap = {
        'All': 'All Products',
        'Phones': 'Phones',
        'Tablets': 'Tablets',
        'iPads': 'iPads',
        // 'Laptops': 'Laptops',
        // 'Computers': 'Computers',
        // 'Wearables': 'Wearables',
        'Accessories': 'Accessories'
    }
    
    const filteredProjects = filter === 'All'
        ? ProductList
        : ProductList.filter(p => 
            p.category?.toLowerCase() === categoryMap[filter as keyof typeof categoryMap]?.toLowerCase()
        );

    // I was working here on adding filtering logic
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Update indicator position when filter changes
    React.useEffect(() => {
        const activeIndex = Object.keys(categoryMap).indexOf(filter);
        const activeButton = buttonRefs.current[activeIndex];
        
        if (activeButton) {
            const { offsetLeft, offsetWidth } = activeButton;
            setIndicatorStyle({
                width: offsetWidth,
                left: offsetLeft
            });
        }
    }, [filter, mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <section className="w-full max-w-[1440px] mx-auto lg:px-0 px-4 pb-40 bg-white" id="deals">
            <div className="">
                <h3 className="text-[32px] font-medium text-gray-900 mb-2 tracking-wide">OUR PRODUCTS</h3>
                <div className={styles.filterContainer}>
                    {Object.keys(categoryMap).map((category, index) =>  (
                        <button
                            key={category}
                            ref={(el) => { buttonRefs.current[index] = el; }}
                            onClick={() => setFilter(category)}
                            className={`${styles.filterButton} ${filter === category ? styles.active : ''}`}
                        >
                            {categoryMap[category as keyof typeof categoryMap]}
                        </button>
                    ))}
                    <div 
                        className={styles.indicator}
                        style={{
                            width: `${indicatorStyle.width}px`,
                            left: `${indicatorStyle.left}px`
                        }}
                    />
                </div>
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
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        loop={filteredProjects?.length > 5}
                        className="pro-swiper pb-16"
                    >
                        {filteredProjects?.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div
                                    className="hover:shadow-md
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
                                        {product.isSale && (
                                            <div className="absolute top-2 left-2 bg-red-700 text-white px-[8px] py-[2px] text-[10px]">
                                                ON SALE
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-black font-normal px-2">
                                        <h4 className="text-base text-gray-700 font-normal">{product.name}</h4>
                                        <div className="mt-2">
                                            {product.isSale ? (
                                                <>
                                                    <span className="text-sm text-gray-300 line-through">${(product.originalPrice).toFixed(2)}</span>
                                                    <span className="text-sm text-black text-gray-700 ml-2">{`From $${getProductPrice(product).toFixed(2)}`}</span>
                                                </>
                                            ) : (
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
