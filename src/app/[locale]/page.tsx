// Relative path: /src/app/[locale]/page.tsx
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Products from '@/components/Products';
import BrandsSection from '@/components/Brands';
import WhyChooseUs from '@/components/Why';
import Footer from '@/components/Footer';


export default function Page() {
  return (
    <main className="">
      <HeroSlider />
      <BrandsSection />
      <Products />
      <WhyChooseUs />
      <div className="h-[10vh]"></div>
    </main>
  );
}
