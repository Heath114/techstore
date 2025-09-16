// src/components/Header.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search } from 'lucide-react';
import { ProductList } from '@/app/data/products'; 
import type { Product } from '@/app/data/products';
import { useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function Header() {
  const params = useParams();
  const lang = params.lang || 'en';

  return (
    // The header is fixed to the top of the viewport.
    <header className="bg-white shadow fixed w-full z-50 top-0 left-0">
      <div className="flex justify-between items-center p-4 px-8">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image 
              src="/images/logos/logo.png" 
              alt="TechShop Logo" 
              width={120} 
              height={40} 
              priority // Add priority for LCP (Largest Contentful Paint) optimization
            />
          </Link>
        </div>

        <SearchBar />

        <CallUsButton />
      </div>
    </header>
  );
}

function SearchBar() {
  const [ query, setQuery ] = React.useState('');
  const results = ProductList.filter((product: Product) => product.name.toLowerCase().includes(query.toLowerCase()));

  const params = useParams();
  const lang = params.lang || 'en';
  
  return (
    <div className="relative flex-1 mx-4 max-w-6xl hidden md:flex items-center bg-lavender rounded-lg">
      <div className="absolute left-3">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full border text-black border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white text-black border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/${lang}/p/${product.slug}`}
              onClick={() => setQuery('')} 
              className="block" // Make the entire card clickable
            >
              <div className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 mr-3">
                  <Image
                    src={product.image || '/images/products/placeholder.png'}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-lg text-gray-500 truncate">
                    {product.brand}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <ChevronRight className="text-gray-800" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


function CallUsButton() {
  return (
    <Link
      href="#contact"
      aria-label="Call us"
      className="flex-shrink-0 inline-flex items-center py-2 px-20 bg-lavender text-xl rounded-lg text-blue-500 transition hover:text-blue-700"
    >
      <Phone size={20} />
      <span className="ml-2 hidden lg:inline font-medium">Call Us</span>
    </Link>
  );
}
