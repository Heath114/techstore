// Relative path: /src/app/[locale]/page.tsx
import HeroSlider from '@/components/HeroSlider';
import Products from '@/components/Products';
import Products2 from '@/components/Products2';
import BrandsSection from '@/components/Brands';
import WhyChooseUs from '@/components/Why';
import ImageSection from '@/components/Image';
import { Locale } from '@/locales/business-config';
import { getLocaleFromParams } from '@/lib/locale-utils';

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocaleFromParams(params);
  
  return (
    <main className="relative">
      {/* Left alignment guide line
      <div className="fixed left-1/2 -translate-x-1/2 top-0 bottom-0 w-[95%] border-l-2 border-red-500 pointer-events-none z-[9999]" />
      
       Right alignment guide line *
      <div className="fixed left-1/2 -translate-x-1/2 top-0 bottom-0 w-[95%] border-r-2 border-red-500 pointer-events-none z-[9999]" />
       */}
      <section id="hero">
        <HeroSlider />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="brands">
        <BrandsSection />
      </section>
      <section id="gallery">
        <ImageSection />
      </section>
      <section id="featured">
        <Products2 />
      </section>
      <section id="why">
        <WhyChooseUs />
      </section>
    </main>
  );
}
