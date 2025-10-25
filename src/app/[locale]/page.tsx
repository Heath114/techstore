// Relative path: /src/app/[locale]/page.tsx
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Products from '@/components/Products';
import Products2 from '@/components/Products2';
import BrandsSection from '@/components/Brands';
import WhyChooseUs from '@/components/Why';
import Footer from '@/components/Footer';
import Image from '@/components/Image';

export default function Page() {
  return (
    <main className="">
      <HeroSlider />
      <Products />
      <BrandsSection />
      <Image />
      <Products2 />
      <WhyChooseUs />
    </main>
  );
}
