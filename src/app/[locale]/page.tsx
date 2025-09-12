import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Products from '@/components/Products';

export default function Page() {
  return (
    <>
      <Header />
      <HeroSlider />
      <Products />
      <div className="h-[300vh]"></div>
    </>
  );
}