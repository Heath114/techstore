'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Photo() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!containerRef.current) return;
        
        const blocks = containerRef.current.querySelectorAll('.photo-block');
        
        blocks.forEach((block, index) => {
            gsap.fromTo(
                block,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 2.5,
                    ease: 'power2.out',
                    delay: index * 0.3, // Each image delays by 0.3s more than the previous
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef}>
            {/* Mobile/Tablet Layout - Stacked */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 px-4 py-12 md:py-16 lg:py-20 2xl:hidden">
                <div className="photo-block w-full h-[40vh] md:h-[45vh] lg:h-[50vh] relative">
                    <Image 
                        src="/slider/ht.webp" 
                        alt="Photo" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="photo-block w-full h-[40vh] md:h-[45vh] lg:h-[50vh] relative">
                    <Image 
                        src="/slider/ht.webp" 
                        alt="Photo" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                
                <div className="photo-block w-full h-[40vh] md:h-[45vh] lg:h-[50vh] relative">
                    <Image 
                        src="/slider/ht.webp" 
                        alt="Photo" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Desktop Layout - Original Design */}
            <div className="hidden 2xl:flex 2xl:mb-40">
                <div className="photo-block w-[25%] h-[65vh] my-20 relative ml-56">
                    <Image 
                        src="/slider/ht.webp" 
                        alt="Photo" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="photo-block w-[18%] h-[50vh] mt-80 relative ml-52">
                    <Image 
                        src="/slider/ht.webp" 
                        alt="Photo" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                
                <div className="photo-block w-[18%] h-[50vh] mt-80 relative ml-[2px]">
                    <Image 
                        src="/slider/ht.webp" 
                        alt="Photo" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}