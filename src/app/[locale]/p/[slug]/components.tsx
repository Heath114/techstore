// src/app/[locale]/[slug]/components.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/app/data/products'; // Assuming you have a Product type
import { ContactButtons } from './ContactButtons';

// A reusable Icon component for WhatsApp
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.5-.02.94-.1.44-.65.81-1.22.84-.57.03-1.05-.1-1.92-.44a7.48 7.48 0 01-2.9-2.61c-.57-.84-.9-1.84-.9-2.84 0-1 .33-1.84.92-2.58.58-.75 1.35-1.16 2.1-1.16.25 0 .48.04.68.08.2.03.3.07.33.4a1 1 0 01-.13 1.15l-.22.33c-.1.13-.2.27-.36.4-.17.13-.3.23-.33.3.04.07.1.17.18.28.38.57.85 1.1 1.4 1.56.57.47 1.13.82 1.63.96.1.03.2.04.3.02h.02c.1-.03.2-.13.3-.26l.22-.36c.13-.2.3-.33.5-.4.2-.07.4-.04.54.06l.85.64c.2.14.3.28.36.42.07.15.04.3-.06.42l-.4.6zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
  </svg>
);

// Star rating component
export const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${Math.floor(rating) > i ? 'text-yellow-400' : 'text-slate-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className="text-sm text-slate-500">({reviews} reviews)</span>
  </div>
);

// Product Information section
export function ProductInfo({ product }: { product: Product }) {

  return (
    <div className="flex h-full flex-col">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{product.name}</h1>
      <p className="mt-4 text-slate-600 text-xl">{product.description}</p>
      
      <div className="mt-6 flex items-center gap-6 border-y border-slate-200 py-4">
        <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-6 w-6 text-green-500" />
            <span className="text-lg font-medium text-slate-600">Premium Quality</span>
        </div>
        <div className="flex items-center gap-2">
            <TruckIcon className="h-6 w-6 text-green-500" />
            <span className="text-lg font-medium text-slate-600">Fast Shipping</span>
        </div>
      </div>

      <p className="mt-6 text-4xl font-bold text-green-600">${product.price.toFixed(2)}</p>

      <ContactButtons productName={product.name} />
      
    </div>
  );
}

const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h9.75a3.375 3.375 0 003.375 3.375v1.875M16.5 12h-9m9 0a1.5 1.5 0 00-1.5-1.5h-6a1.5 1.5 0 00-1.5 1.5m9 0a1.5 1.5 0 01-1.5 1.5h-6a1.5 1.5 0 01-1.5-1.5m0 0V5.625c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v6.75" />
    </svg>
);

// Info Section (Features, Specs, etc.)
export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}