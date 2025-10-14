// ProductShowcase.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Product } from '@/app/data/products';
import { ProductGallery } from './ProductGallery';
import { ContactButtons } from './ContactButtons';
import Link from 'next/link';
import { getColorObjects } from '@/lib/colorMap';

// SVG Icons
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BoxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0);

  const toggle = () => {
    const el = contentRef.current;
    if (!el) return;

    if (!isOpen) {
      // opening: go to px first
      setHeight(el.scrollHeight);
      setIsOpen(true);
    } else {
      // closing: from auto → px → 0
      const h = el.scrollHeight;
      setHeight(h);
      requestAnimationFrame(() => setHeight(0));
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onEnd = () => {
      if (isOpen) setHeight('auto');   // allow natural growth after open
    };
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200">
      <button onClick={toggle} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-base font-normal text-gray-900 uppercase tracking-wider">{title}</span>
        <div className="relative w-5 h-5 text-gray-600 group-hover:text-gray-900">
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}>
            <PlusIcon className="h-5 w-5" />
          </div>
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <MinusIcon className="h-5 w-5" />
          </div>
        </div>
      </button>

      <div
        style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
        className="overflow-hidden transition-[height] duration-500 ease-in-out"
      >
        <div ref={contentRef} className="pb-6">{children}</div>
      </div>
    </div>
  );
}


type ProductShowcaseProps = {
  product: Product;
};

export function ProductShowcase({ product }: ProductShowcaseProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Get colors from product data or use defaults
  const colors = product.colors && product.colors.length > 0 
    ? getColorObjects(product.colors)
    : []; // No default colors

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
    console.log('Quantity:', quantity);
  };

  const locale = 'en'; // Replace with actual locale logic if needed
  
  return (
    <div className="py-32 pt-24">
      <div className="text-black text-xs mb-4 mt-[-12px] w-[80%] mx-auto text-left">
        <Link href={`/${locale}`} className="text-gray-400 hover:text-gray-600 transition-colors">Home</Link>
        <span className="text-gray-900"> {'>'} </span>
        <Link href={`/${locale}/category/${product.category}`} className="text-gray-400 hover:text-gray-600 transition-colors">{product.category}</Link>
        <span className="text-gray-900"> {'>'} </span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="w-[75%] mx-auto">
        <div className="lg:flex lg:gap-12">
          {/* Left: Product Gallery */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-12rem)]">
            <ProductGallery
              mainImage={product.image ?? '/images/products/placeholder.png'}
              images={product.images ?? []}
              productName={product.name}
            />
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-8 mt-4">
              <h1 className="text-3xl text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg  text-gray-800 mb-4">
                {(Number(product.price || 0) * quantity).toFixed(2)} JOD
              </p>

              {/* In Stock Indicator */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.inStock !== false ? 'bg-green-500 ring-2 ring-gray-200' : 'bg-red-500'}`} />
                <span className="text-base text-gray-700 font-medium">
                  {product.inStock !== false ? 'In stock' : 'Out of stock'}
                </span>
              </div>

              {/* Color Options - Only show if colors are available */}
              {colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-3">
                    <p className="text-base text-gray-700">Color:</p>
                    <span className="text-base font-semibold text-gray-900">{colors[selectedColor].name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-1 transition-all duration-200 hover:scale-110 ${
                          selectedColor === index 
                            ? 'border-gray-900 ring-1 ring-gray-900 ring-offset-2' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name} color`}
                      >
                        {color.hex === '#FFFFFF' && (
                          <div className="w-full h-full rounded-full border border-gray-200" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selector */}
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                  className="w-8 h-10 flex items-center justify-center border-t border-b border-l border-gray-200 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="h-4 w-4 text-gray-600" />
                </button>
                <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-200 bg-white">
                  <span className="text-base font-medium text-gray-900">{quantity}</span>
                </div>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="w-8 h-10 flex items-center justify-center border-t border-b border-r border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Contact Buttons */}
            <ContactButtons productName={product.name} />

            {/* Accordion Sections */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              {/* Features Accordion */}
              {product.features && product.features.length > 0 && (
                <AccordionItem title="Description" defaultOpen={true}>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              )}

              {/* Specifications Accordion */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <AccordionItem title="DETAILS">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(product.specifications).map(([key, val]) => (
                          <tr key={key}>
                            <td className="w-2/5 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionItem>
              )}

              {/* What's in the Box Accordion */}
              {product.whatsInTheBox && product.whatsInTheBox.length > 0 && (
                <AccordionItem title="What's in the Box">
                  <ul className="space-y-3">
                    {product.whatsInTheBox.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <BoxIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
