// src/components/Header.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, X, Menu, ChevronRight } from 'lucide-react';
import { ProductList } from '@/app/data/products'; 
import type { Product } from '@/app/data/products';
import { useParams } from 'next/navigation';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    // The header is fixed to the top of the viewport.
    <header className="bg-white fixed inset-x-0 py-4 px-4 md:px-8 lg:px-16 w-full z-50 top-0">
      {/* Mobile Layout */}
      <div className="md:hidden flex items-center justify-between">
        {/* Left: Menu & Search */}
        <div className="flex items-center gap-2">
          <MenuButton onClick={() => setIsMenuOpen(true)} />
          <SearchIconButton onClick={() => setIsSearchOpen(true)} />
        </div>
        
        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image 
            src="/images/logos/logo.avif" 
            alt="TechShop Logo" 
            width={100} 
            height={33}
            priority
          />
        </Link>
        
        {/* Right: Language & Call */}
        <div className="flex items-center  gap-2">
          <LanguageButton />
          <CallUsButton />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 items-center py-1 gap-4">
        {/* Left: Search Bar */}
        <div className="flex justify-start">
          <div className="max-w-xl w-full">
            <SearchBar />
          </div>
        </div>
        
        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image 
              src="/images/logos/logo.png" 
              alt="TechShop Logo" 
              width={120} 
              height={40} 
              priority
            />
          </Link>
        </div>

        {/* Right: Call Button */}
        <div className="flex items-center justify-end">
          <CallUsButton />
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

function SearchBar() {
  const [ query, setQuery ] = React.useState('');
  const results = ProductList.filter((product: Product) => product.name.toLowerCase().includes(query.toLowerCase()));
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const params = useParams();
  const lang = params.lang || 'en';
  
  // Prevent scroll propagation to the page when scrolling in the dropdown
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const dropdown = dropdownRef.current;
      if (!dropdown) return;

      const isScrollable = dropdown.scrollHeight > dropdown.clientHeight;
      if (!isScrollable) return;

      const isAtTop = dropdown.scrollTop === 0;
      const isAtBottom = dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        // Allow scroll to propagate only when at boundaries
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      dropdown.scrollTop += e.deltaY;
    };

    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.addEventListener('wheel', handleWheel, { passive: false });
      return () => dropdown.removeEventListener('wheel', handleWheel);
    }
  }, [query, results.length]);
  
  return (
    <div className="relative flex items-center bg-lavender rounded-lg max-w-4xl">
      <div className="absolute px-3">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full text-gray-900 border-gray-200 bg-white rounded-md pl-10 pr-4 py-2  focus:ring-1 focus:ring-gray-900 focus:border-transparent transition-all duration-500"
      />
      {query && results.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto z-10 shadow-lg scrollbar-thin"
          onWheel={(e) => e.stopPropagation()}
        >
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/${lang}/p/${product.slug}`}
              onClick={() => setQuery('')} 
              className="block"
            >
              <div className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300">
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
                  <div className="text-base font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {product.brand}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIconButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Search"
      className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-white text-gray-900 rounded-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
    >
      <Search size={24} />
    </button>
  );
}

function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const params = useParams();
  const lang = params.lang || 'en';
  const results = ProductList.filter((product: Product) => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input after modal animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Prevent scroll propagation in results area
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const resultsDiv = resultsRef.current;
      if (!resultsDiv) return;

      const isScrollable = resultsDiv.scrollHeight > resultsDiv.clientHeight;
      if (!isScrollable) return;

      const isAtTop = resultsDiv.scrollTop === 0;
      const isAtBottom = resultsDiv.scrollTop + resultsDiv.clientHeight >= resultsDiv.scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      resultsDiv.scrollTop += e.deltaY;
    };

    const resultsDiv = resultsRef.current;
    if (resultsDiv) {
      resultsDiv.addEventListener('wheel', handleWheel, { passive: false });
      return () => resultsDiv.removeEventListener('wheel', handleWheel);
    }
  }, [query, results.length]);

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-20 px-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center border-b border-gray-200 p-4">
          <Search className="text-gray-400 absolute left-7" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full text-gray-900 bg-gray-50 rounded-md pl-10 pr-12 py-3 focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="absolute right-7 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close search"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Results */}
        {query && (
          <div 
            ref={resultsRef}
            className="max-h-96 overflow-y-auto scrollbar-thin"
            onWheel={(e) => e.stopPropagation()}
          >
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/${lang}/p/${product.slug}`}
                  onClick={() => {
                    setQuery('');
                    onClose();
                  }}
                  className="block"
                >
                  <div className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-14 h-14 mr-4">
                      <Image
                        src={product.image || '/images/products/placeholder.png'}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-medium text-gray-900 truncate">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {product.brand}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No products found
              </div>
            )}
          </div>
        )}
        
        {/* Empty state */}
        {!query && (
          <div className="p-8 text-center text-gray-400">
            Start typing to search products...
          </div>
        )}
      </div>
    </div>
  );
}

function CallUsButton() {
  return (
    <Link
      href="#contact"
      aria-label="Call us"
      className="flex-shrink-0 inline-flex items-center justify-center gap-2 w-10 h-10 md:w-auto md:px-6 bg-white text-gray-900 rounded-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
    >
      <Phone size={24} />
      <span className="hidden lg:inline font-medium">Contact Us</span>
    </Link>
  );
}

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-white text-gray-900 rounded-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
    >
      <Menu size={24} />
    </button>
  );
}

function LanguageButton() {
  const params = useParams();
  const currentLang = params.locale || 'en';
  const displayLang = currentLang.toString().toUpperCase();

  return (
    <button
      aria-label="Change language"
      className="flex-shrink-0 inline-flex items-center justify-center gap-1 px-3 h-10 bg-white text-gray-900 rounded-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
    >
      <span className="text-sm font-medium">{displayLang}</span>
      <ChevronRight size={20} />
    </button>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`fixed left-0 top-0 bottom-0 w-64 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                onClick={onClose}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/brands"
                onClick={onClose}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}