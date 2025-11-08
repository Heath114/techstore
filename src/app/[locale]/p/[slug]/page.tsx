import { ProductList, type Product } from '@/app/data/products';
import { getProductPrice } from '@/app/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductShowcase } from './ProductShowcase';
import Location from './Location';

function RelatedProductCard({ product, locale }: { product: Product, locale: string }) {
    return (
      <Link href={`/${locale}/p/${product.slug}`} className="group block">
          <div className="relative aspect-square overflow-hidden mb-3 md:mb-4">
              <Image
                src={product.image ?? '/images/products/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {product.isSale && (
                <div className="absolute top-2 left-2 bg-red-700 text-white px-[6px] md:px-[8px] py-[2px] text-[9px] md:text-[10px]">
                  ON SALE
                </div>
              )}
          </div>
          <div>
              <h3 className="text-sm md:text-base text-gray-700 font-normal mb-1">{product.name}</h3>
              <div className="mt-2">
                {product.isSale ? (
                  <>
                    <span className="text-xs md:text-sm text-gray-300 line-through">{`$${product.originalPrice.toFixed(2)}`}</span>
                    <span className="text-xs md:text-sm text-gray-700 ml-2">{`$${getProductPrice(product).toFixed(2)}`}</span>
                  </>
                ) : (
                  <span className="text-xs md:text-sm text-gray-700">{`$${getProductPrice(product).toFixed(2)}`}</span>
                )}
              </div>
          </div>
      </Link>
    );
}

export default async function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  
  const { slug, locale } = await params;
  const product = ProductList.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = ProductList.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto">
        <ProductShowcase product={product} />
      </main>

      {relatedProducts.length > 0 && (
          <aside className="border-t border-gray-200 py-12 md:py-16 lg:py-24 bg-gray-50">
              <div className="mx-auto max-w-6xl px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-8 md:mb-10 lg:mb-12 text-center">Related Products</h2>
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-3">
                    {relatedProducts.map((p) => (
                        <RelatedProductCard key={p.id} product={p} locale={locale} />
                    ))}
                </div>
              </div>
          </aside>
      )}

    <Location />
    </div>
  );
}

export async function generateStaticParams() {
  const locales = ['en', 'ar'];
  return locales.flatMap((locale) =>
    ProductList.map((product) => ({
      slug: product.slug,
      locale,
    }))
  );
}
