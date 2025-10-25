'use client';

import Image from 'next/image';

export default function Photo() {
    return (
        <div className="flex">
            <div className="w-[25%] h-[65vh] my-20 relative ml-56">
                <Image 
                    src="/slider/ht.webp" 
                    alt="Photo" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>
            
            <div className="w-[18%] h-[50vh] my-80 relative ml-52">
                <Image 
                    src="/slider/ht.webp" 
                    alt="Photo" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>
            <div className="w-[18%] h-[50vh] my-80 relative ml-[2px]">
                <Image 
                    src="/slider/ht.webp" 
                    alt="Photo" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
}