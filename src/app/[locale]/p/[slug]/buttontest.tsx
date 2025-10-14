'use client'
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';


export default function ButtonTest() {

  const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.fromTo(buttonRef.current, 
    { opacity: 0, y: 100 }, 
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 80%",
        end: "+=3000",
        pin: true,
        scrub: true,
        markers: true,
      },
    }
  );
}, []);

    return <button ref={buttonRef} className="bg-gray-900 text-white py-2 px-4 rounded-md">Join Waitlist</button>; 
}