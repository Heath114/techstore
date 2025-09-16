// src/components/Footer/index.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Phone, Mail, Map } from 'lucide-react';
import { collection, doc, addDoc, query, where, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function AboveFooter() {
  return (
    <section className="flex flex-col bg-gray-900 py-8 px-8 md:px-40 border-b border-gray-700" id="contact">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-2xl text-white">You can call us any time.</p>
        </div>
        <div className="flex items-end gap-2 ">
          <button
            className="bg-lavender text-xl py-2 px-8 rounded hover:text-blue-600 text-blue-400 cursor-pointer"
            onClick={() => window.open('https://www.google.com/maps', '_blank')}>
              <Map className="inline mr-2"/> Get Directions
          </button>
          <button
            className="bg-lavender text-xl py-2 px-8 rounded hover:text-blue-600 text-blue-400 cursor-pointer"
            onClick={() => window.open('tel:203997333333')}>
              <Phone className="inline mr-2"/> Make a Call
          </button>
        </div>
      </div>
    </section>
  )
}

function FooterContent() {
  const { lang } = useParams();

  return (
    <div
      className="
        bg-gray-900 text-white
        py-10 px-4
        sm:py-12 sm:px-8
        h-full w-full
        flex flex-col justify-between
        relative
      "
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <FooterNav />
      <FooterBottom />
    </div>
  );
}

// Navigation section
const FooterNav = () => {
  const { lang } = useParams();
  const currentLang = lang === 'ar' ? 'ar' : 'en';

  return (
    <div className={`flex items-start justify-between flex-row px-8`}>
      <div className={`flex flex-col gap-4`}>
        <h3 className={`mb-2 sm:mb-4 uppercase text-gray-400 font-semibold lg:text-4xl`}>
          Contact Us 
        </h3>
        <div className={`flex gap-2 items-center`}>
          <Phone className="text-gray-400" />
          <p className="text-2xl px-4 hover:underline cursor-pointer" onClick={() => window.open('tel:203997333333')}>203997333333</p>
        </div>
        <div className={`flex gap-2 items-center`}>
          <Mail className="text-gray-400" />
          <p className="text-2xl px-4 hover:underline cursor-pointer" onClick={() => window.open('mailto:info@example.com')}>info@example.com</p>
        </div>
        <div className={`flex gap-2 items-center`}>
          <Map className="text-gray-400" />
          <p className="text-2xl px-4 hover:underline cursor-pointer" onClick={() => window.open('https://www.google.com/maps', '_blank')}>123 Main St, Anytown, USA</p>
        </div>
      </div>

      <div className={`flex flex-col gap-3`}>
        <h3 className={`mb-2 sm:mb-4 uppercase text-gray-400 font-semibold lg:text-4xl ${lang === 'ar' ? 'text-base sm:text-lg' : 'text-base'}`}>
          Quick Links
        </h3>
        <div className={`flex gap-2 items-center`}>
          <Link href="#home" className="text-2xl px-4 hover:underline">- Home</Link>
        </div>
        <div className={`flex gap-2 items-center`}>
          <Link href="#deals" className="text-2xl px-4 hover:underline">- Deals</Link>
        </div>
        <div className={`flex gap-2 items-center`}>
          <Link href="#contact" className="text-2xl px-4 hover:underline">- Contact</Link>
        </div>
      </div>

      <NumberInputComponent />
      
      <div className={`flex flex-col gap-3`}>
        <h3 className={`mb-2 sm:mb-4 uppercase text-gray-400 font-semibold lg:text-4xl ${lang === 'ar' ? 'text-base sm:text-lg' : 'text-base'}`}>
          Opening Hours
        </h3>
        <p className="text-2xl px-4">Mon-Fri: 9am - 6pm</p>
        <p className="text-2xl px-4">Sat: 10am - 4pm</p>
        <p className="text-2xl px-4">Sun: Closed</p>
      </div>
    </div>
  );
};

function NumberInputComponent() {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!phoneNumber.trim()) {
      setMessage('Please enter a phone number');
      return;
    }
    
    if (phoneNumber.length < 10) {
      setMessage('Please enter a valid phone number (at least 10 digits)');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      
      const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
      const subscriberDocRef = doc(db, 'subscribers', sanitizedPhoneNumber);

    
      // Add new subscriber to Firestore
      await setDoc(subscriberDocRef, {
        phoneNumber: sanitizedPhoneNumber,
        subscribedAt: serverTimestamp(),
        source: 'website_footer',
        status: 'active'
      }, { merge: true });
      
      setMessage('Success! You are now subscribed to our deals list.');
      setPhoneNumber('');
      
      // Optional: Log success to console for debugging
      console.log('New subscriber added:', phoneNumber);
      
    } catch (error) {
      console.error('Error adding subscriber:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-sm">
      <h3 className={`mb-2 sm:mb-4 uppercase text-gray-400 font-semibold lg:text-4xl`}>
        Join our Deals List
      </h3>
      <div className="relative w-full">
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => {
            // Only allow numbers and common phone characters
            const value = e.target.value.replace(/[^\d+\-\s()]/g, '');
            setPhoneNumber(value);
          }}
          disabled={isSubmitting}
          className="w-full border-b border-gray-600 bg-transparent py-2 pr-10 text-3xl placeholder-gray-600 focus:outline-none focus:border-white disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:translate-x-1 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>
      {message && (
        <p className={`text-xl mt-2 ${
          message.includes('Success') ? 'text-green-400' : 
          message.includes('already') ? 'text-yellow-400' : 
          'text-red-400'
        }`}>
          {message}
        </p>
      )}
    </form>
  );
}

// Bottom section with social links and copyright
// Bottom section with social links and copyright
const FooterBottom = () => {
  const { lang } = useParams();

  return (
    <div
      className={`${lang === 'ar' ? 'flex-row-reverse' : ''}
         flex justify-between items-end pt-6 gap-4 relative
      `}
    >
      {/* Left side - Company name */}
      <div className="flex items-center flex-shrink-0 border-t border-gray-700">
        <h2 className={`${lang === 'ar' ? 'text-[12vw] sm:text-[5vw] lg:text-[4rem]' : 'text-[14vw] sm:text-[6vw] lg:text-[6rem]'} font-light leading-none`}>
          placeholder text shop
        </h2>
      </div>

      {/* Right side - Social media icons */}
      <div className={`${lang === 'ar' ? 'text-left' : 'text-right'} flex-shrink-0`}>
        <div className={`flex gap-3 sm:gap-4 mb-2 sm:mb-4 ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
          <Link
            href="https://www.instagram.com/newlook_jo/?next=%2Fdirect%2Ft%2F117471066306121%2F"
            className="hover:opacity-70 transition-opacity"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src="/images/icons/instagram.png" alt="Instagram" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-16 lg:h-16" />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=100064126295491"
            className="hover:opacity-70 transition-opacity"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src="/images/icons/facebook.png" alt="Facebook" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-16 lg:h-16" />
          </Link>
        </div>
      </div>
      
      {/* Payment cards - centered at bottom */}
      <div className="absolute top-[98%] left-1/2 transform -translate-x-1/2 text-xs flex justify-between px-4">
        <div className="flex gap-2 items-center">
          <img src="/images/logos/card1.png" alt="Visa" className="w-6 h-4 sm:w-8 sm:h-5 lg:w-4 lg:h-4" />
          <img src="/images/logos/card2.png" alt="MasterCard" className="w-6 h-4 sm:w-8 sm:h-5 lg:w-4 lg:h-4" />
          <img src="/images/logos/card3.png" alt="PayPal" className="w-6 h-4 sm:w-8 sm:h-5 lg:w-4 lg:h-4" />
        </div>
      </div>
    </div>
  );
};

export default function StickyFooter() {
  return (
    <>
      <AboveFooter />
      <div
        className="relative h-[500px]"
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <div className="relative h-[calc(100vh+500px)] -top-[100vh]">
          <div className="sticky z-10 top-[calc(100vh-500px)] h-[500px]">
            <FooterContent />
          </div>
        </div>
      </div>
    </>
  );
}