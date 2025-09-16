// ContactButtons.tsx
'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/app/data/products';

// You can reuse the WhatsApp icon from components.tsx
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.5-.02.94-.1.44-.65.81-1.22.84-.57.03-1.05-.1-1.92-.44a7.48 7.48 0 01-2.9-2.61c-.57-.84-.9-1.84-.9-2.84 0-1 .33-1.84.92-2.58.58-.75 1.35-1.16 2.1-1.16.25 0 .48.04.68.08.2.03.3.07.33.4a1 1 0 01-.13 1.15l-.22.33c-.1.13-.2.27-.36.4-.17.13-.3.23-.33.3.04.07.1.17.18.28.38.57.85 1.1 1.4 1.56.57.47 1.13.82 1.63.96.1.03.2.04.3.02h.02c.1-.03.2-.13.3-.26l.22-.36c.13-.2.3-.33.5-.4.2-.07.4-.04.54.06l.85.64c.2.14.3.28.36.42.07.15.04.3-.06.42l-.4.6zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
);

// New iMessage/SMS Icon
const MessageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

type ContactButtonsProps = {
  productName: string;
};

export function ContactButtons({ productName }: ContactButtonsProps) {
  const [isIos, setIsIos] = useState(false);
  
  // This effect runs only on the client, after the component mounts
  useEffect(() => {
    // Check userAgent to see if it's an Apple mobile device
    const userAgent = window.navigator.userAgent;
    setIsIos(/iPhone|iPad|iPod/i.test(userAgent));
  }, []);

  // Use an environment variable for the phone number for flexibility
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '962788661142';
  console.log('Using WhatsApp number:', WHATSAPP_NUMBER);
  
  const messageText = `Hello! I'm interested in buying the ${productName}.`;
  
  // Encode the message text so it can be safely used in a URL
  const encodedMessage = encodeURIComponent(messageText);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  const smsUrl = `sms:&body=${encodedMessage}`; // For iOS, no number is needed to open the app

  return (
    <div className="mt-8 space-y-4">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <WhatsAppIcon className="h-6 w-6" />
        Order Now
      </a>

      {/* Conditionally render the iMessage/SMS link only if we detect an iOS device */}
      {isIos && (
        <a
          href={smsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <MessageIcon className="h-6 w-6" />
          or Send an iMessage/SMS
        </a>
      )}
    </div>
  );
}