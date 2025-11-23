// ProductShowcase.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Product, getProductPrice } from '@/app/data/products';
import { ProductGallery } from './ProductGallery';
import { ContactButtons } from './ContactButtons';
import Link from 'next/link';
import { getColorObjects } from '@/lib/colorMap';
import { Cross } from 'lucide-react';
import router from 'next/router';
import { useCart } from '@/context/CartContext';
import { useParams } from 'next/navigation';
import { 
  FacebookIcon, 
  InstagramIcon, 
  WhatsAppIcon, 

} from '@/app/data/icons';

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
const CheckMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
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
  const lang = 'en'; // Replace with actual locale logic if needed

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
      <button onClick={toggle} className="w-full flex items-center justify-between py-4 md:py-5 text-left group">
        <span className="text-sm md:text-base font-normal text-gray-900 uppercase tracking-wider">{title}</span>
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
        <div ref={contentRef} className="pb-4 md:pb-6">{children}</div>
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
  const { addToCart } = useCart();
  const params = useParams();
  const locale = params.locale || 'en';
  
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

  // Share functionality
  const handleShare = (platform: 'facebook' | 'whatsapp' | 'instagram') => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out ${product.name} at TechStore!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        break;
      
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        break;
      
      case 'instagram':
        // Instagram doesn't support direct web sharing, so we copy the link to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText(currentUrl).then(() => {
            alert('Link copied to clipboard! You can now share it on Instagram.');
          }).catch(() => {
            alert('Unable to copy link. Please copy manually: ' + currentUrl);
          });
        } else {
          alert('Please copy this link to share on Instagram: ' + currentUrl);
        }
        break;
    }
  };

  
  return (
    <div className="py-12 md:py-24 lg:py-32 pt-16 md:pt-20 lg:pt-24">
      <div className="text-black text-xs mb-4 mt-[-12px] mx-4 md:mx-6 lg:mx-8 text-left">
        <Link href={`/${locale}`} className="text-gray-400 hover:text-gray-600 transition-colors">Home</Link>
        <span className="text-gray-900"> {'>'} </span>
        <Link href={`/${locale}/category/${product.category}`} className="text-gray-400 hover:text-gray-600 transition-colors">{product.category}</Link>
        <span className="text-gray-900"> {'>'} </span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="w-full px-4 md:w-[90%] md:px-0 lg:w-[85%] xl:w-[75%] mx-auto">
        <div className="lg:flex lg:gap-12">
          {/* Left: Product Gallery */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-12rem)] mb-8 lg:mb-0">
            <ProductGallery
              mainImage={product.image ?? '/images/products/placeholder.png'}
              images={product.images ?? []}
              productName={product.name}
            />
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-8 mt-4">
              <h1 className="text-2xl md:text-3xl text-gray-900">{product.name}</h1>
              
              {/* Price Display */}
              <div className="mb-4 md:mb-6">
                {product.isSale ? (
                  <>
                    <span className="text-base md:text-lg text-gray-400 line-through mr-2">
                      {(product.originalPrice * quantity).toFixed(2)} JOD
                    </span>
                    <span className="text-base md:text-lg text-gray-800">
                      {(getProductPrice(product) * quantity).toFixed(2)} JOD
                    </span>
                    <span className="ml-2 bg-red-700 text-white px-2 py-1 text-xs">
                      -{product.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-base md:text-lg text-gray-800">
                    {(getProductPrice(product) * quantity).toFixed(2)} JOD
                  </span>
                )}
              </div>

              {/* In Stock Indicator */}
              <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                <div className={`w-3 h-3 rounded-full ${product.inStock !== false ? 'bg-green-500 ring-2 ring-gray-200' : 'bg-red-500'}`} />
                <span className="text-sm md:text-base text-gray-800">
                  {product.inStock !== false ? 'In stock' : 'Out of stock'}
                </span>
              </div>
              {/* Color Options - Only show if colors are available */}
              {colors.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center gap-1 mb-3">
                    <p className="text-sm md:text-base text-gray-800">Color:</p>
                    <span className="text-sm md:text-base font-medium text-gray-900">{colors[selectedColor].name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-1 transition-all duration-200 hover:scale-110 ${
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
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => {
                  addToCart({
                    id: `${product.id}-${colors[selectedColor]?.name || 'default'}`,
                    name: product.name,
                    price: getProductPrice(product),
                    image: product.image ?? '/images/products/placeholder.png',
                    slug: product.slug || '',
                    selectedColor: colors[selectedColor]?.name,
                  });
                }}
                className="flex-1 bg-gray-900 text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.inStock === false}
              >
                Add to Cart
              </button>
            </div>
            <ContactButtons productName={product.name} />
            
            {/**Available Section */}
            <div className="mt-6 md:mt-8 flex items-center gap-2 text-gray-800 text-base md:text-lg">
              <CheckMark className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
              <h4>Pickup Available at TechStore - Amman</h4>
            </div>
            <div className="mt-2 text-gray-800 ml-7 md:ml-8">
              <p 
                className="underline-offset-2 underline text-base md:text-lg cursor-pointer hover:text-gray-600 transition-colors" 
                onClick={() => {
                  const locationSection = document.getElementById('location');
                  if (locationSection) {
                    locationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                View Store Information
              </p>
            </div>
            
            {/** Share Section */}
            <div className="mb-8 mt-8 flex gap-2">
              <h4 className="mb-4 text-gray-900 font-medium mr-2">Share</h4>
              {/* Social media share buttons can be added here */}
              <div className="flex gap-4">
                {/* use the same svgs for facebook and whatsapp */}
                <FacebookIcon 
                  className="h-5 w-5 text-gray-900 hover:text-blue-600 cursor-pointer transition-colors" 
                  onClick={() => handleShare('facebook')}
                />
                <WhatsAppIcon 
                  className="h-5 w-5 text-gray-900 hover:text-green-600 cursor-pointer transition-colors" 
                  onClick={() => handleShare('whatsapp')}
                />
                <InstagramIcon 
                  className="h-5 w-5 text-gray-900 hover:text-pink-600 cursor-pointer transition-colors" 
                  onClick={() => handleShare('instagram')}
                />
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="border-t border-gray-200 mt-8 md:mt-12 pt-6 md:pt-8">
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
