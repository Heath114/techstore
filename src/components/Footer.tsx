'use client';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Phone, Mail, Map } from 'lucide-react';
import NumberInputComponent from './Subscribe'
import Image from 'next/image'
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  WhatsAppIcon, 
  PhoneIcon,
  VisaIcon,
  MastercardIcon,
  PayPalIcon,
  ApplePayIcon,
  AmexIcon,
  GooglePayIcon
} from '@/app/data/icons';

function AboveFooter() {
  return (
    <section className="flex flex-col bg-gray-900 py-8 md:py-12 px-4 md:px-8 lg:px-40 border-b border-gray-800" id="contact">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-400">Contact Us</h1>
          <p className="text-sm md:text-base text-white">You can call us any time.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 md:gap-4 w-full sm:w-auto">
          <button
            className="bg-white text-sm md:text-base font-medium py-2.5 md:py-3 px-4 md:px-6 hover:bg-gray-300 text-gray-900 cursor-pointer transition-colors duration-300 whitespace-nowrap"
            onClick={() => window.open('https://www.google.com/maps', '_blank')}>
              <Map className="inline mr-2 w-4 h-4"/> Get Directions
          </button>
          <button
            className="bg-white text-sm md:text-base font-medium py-2.5 md:py-3 px-4 md:px-6 hover:bg-gray-300 text-gray-900 cursor-pointer transition-colors duration-300 whitespace-nowrap"
            onClick={() => window.open('tel:203997333333')}>
              <Phone className="inline mr-2 w-4 h-4"/> Make a Call
          </button>
        </div>
      </div>
    </section>
  )
}

// Navigation section
const FooterNav = () => {
  const { lang } = useParams();
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const [openSections, setOpenSections] = React.useState<string[]>([]);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const toggleSection = (section: string) => {
    if (!isDesktop) {
      setOpenSections(prev => 
        prev.includes(section) 
          ? prev.filter(s => s !== section)
          : [...prev, section]
      );
    }
  };

  const isSectionOpen = (section: string) => {
    return isDesktop || openSections.includes(section);
  };

  return (
    <div className={`flex flex-col md:flex-row items-start justify-between px-4 md:px-8 gap-6 md:gap-12 flex-1`}>
      {/* Newsletter Section - Always visible */}
      <div className="flex flex-col gap-4 md:gap-6 justify-start h-full w-full md:max-w-sm">
        <NumberInputComponent />
      </div>

      {/* Support Section */}
      <div className="w-full md:w-auto border-b border-gray-800 md:border-0 pb-4 md:pb-0">
        <button
          onClick={() => toggleSection('support')}
          className="flex items-center justify-between w-full md:cursor-default"
        >
          <h3 className="mb-2 uppercase text-gray-400 font-medium text-sm sm:text-base md:text-lg tracking-wider">
            Support
          </h3>
          <span className="md:hidden text-gray-400 text-xl">
            {isSectionOpen('support') ? '−' : '+'}
          </span>
        </button>
        <div className={`flex flex-col gap-2 md:gap-3 overflow-hidden transition-all duration-500 ease-in-out ${
          isSectionOpen('support') ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <Link href="#terms" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            Terms of Service
          </Link>
          <Link href="#shipping" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            Shipping Policy
          </Link>
          <Link href="#refund" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            Refund Policy
          </Link>
          <Link href="#faq" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            FAQ
          </Link>
          <Link href="#location" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            Store Location
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="w-full md:w-auto border-b border-gray-800 md:border-0 pb-4 md:pb-0">
        <button
          onClick={() => toggleSection('quick')}
          className="flex items-center justify-between w-full md:cursor-default"
        >
          <h3 className="mb-2 uppercase text-gray-400 font-medium text-sm sm:text-base md:text-lg tracking-wider">
            Quick Links
          </h3>
          <span className="md:hidden text-gray-400 text-xl">
            {isSectionOpen('quick') ? '−' : '+'}
          </span>
        </button>
        <div className={`flex flex-col gap-2 md:gap-3 overflow-hidden transition-all duration-300 ease-in-out ${
          isSectionOpen('quick') ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <Link href="#home" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link href="#deals" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            Deals
          </Link>
          <Link href="#contact" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
            Contact
          </Link>
        </div>
      </div>

      {/* Opening Hours Section */}
      <div className="w-full md:w-auto border-b border-gray-800 md:border-0 pb-4 md:pb-0">
        <button
          onClick={() => toggleSection('hours')}
          className="flex items-center justify-between w-full md:cursor-default"
        >
          <h3 className="mb-2 uppercase text-gray-400 font-medium text-sm sm:text-base md:text-lg tracking-wider">
            Opening Hours
          </h3>
          <span className="md:hidden text-gray-400 text-xl">
            {isSectionOpen('hours') ? '−' : '+'}
          </span>
        </button>
        <div className={`flex flex-col gap-2 md:gap-3 overflow-hidden transition-all duration-300 ease-in-out ${
          isSectionOpen('hours') ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <p className="text-sm md:text-base text-gray-300">Mon-Fri: 9am - 6pm</p>
          <p className="text-sm md:text-base text-gray-300">Sat: 10am - 4pm</p>
          <p className="text-sm md:text-base text-gray-300">Sun: Closed</p>
        </div>
      </div>
    </div>
  );
};


// Bottom section with social links and copyright
const FooterBottom = () => {
  const { lang } = useParams();

  return (
    <div className={`px-4 md:px-8 lg:px-12 2xl:px-16 w-full flex flex-col gap-6 mt-8 md:mt-10 lg:mt-12`}>
      {/* Icons Container - Mobile: stacked, Desktop: same row */}
      <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between gap-6">
        {/* Social media icons - left on desktop */}
        <div className='flex bg-gray-800 border border-gray-700'>
          {/** Facebook Icon */}
          <a href="#" className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <FacebookIcon />
          </a>
          {/** Twitter Icon */}
          <a href="#" className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <TwitterIcon />
          </a>
          {/** Instagram Icon */}
          <a href="#" className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <InstagramIcon />
          </a>
          {/** WhatsApp Icon */}
          <a href="#" className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <WhatsAppIcon />
          </a>
          {/** Phone Icon */}
          <a href="#" className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <PhoneIcon />
          </a>
        </div>

        {/* Payment options - right on desktop */}
        <div className='flex bg-gray-800 border border-gray-700'>
          <div className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <VisaIcon />
          </div>
          <div className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <MastercardIcon />
          </div>
          <div className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <PayPalIcon />
          </div>
          <div className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <ApplePayIcon />
          </div>
          <div className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center border-r border-gray-700 cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <AmexIcon />
          </div>
          <div className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-gray-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <GooglePayIcon />
          </div>
        </div>
      </div>

      {/* Copyright text - absolute bottom */}
      <div className="text-sm md:text-base lg:text-base text-gray-400 text-center mt-8 md:mt-10 lg:mt-12 pb-4">
        © {new Date().getFullYear()} TechStore. All rights reserved.
      </div>
    </div>
  );
};


function FooterContent() {
  const { lang } = useParams();

  return (
    <div
      className="bg-gray-900 text-white pt-12 md:pt-16 px-4 w-full flex flex-col min-h-full"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <FooterNav />
      <div className="flex-1"></div>
      <FooterBottom />
    </div>
  );
}

export default function StickyFooter() {
  return (
    <>
      <AboveFooter />
      <FooterContent />
    </>
  );
}