// src/app/[locale]/[slug]/page.tsx

import { ProductList, type Product } from '@/app/data/products';
import { getProductPrice } from '@/app/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductShowcase } from './ProductShowcase';

function RelatedProductCard({ product, locale }: { product: Product, locale: string }) {
    return (
      <Link href={`/${locale}/p/${product.slug}`} className="group block">
          <div className="relative aspect-square overflow-hidden mb-4">
              <Image
                src={product.image ?? '/images/products/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.isSale && (
                <div className="absolute top-2 left-2 bg-red-700 text-white px-[8px] py-[2px] text-[10px]">
                  ON SALE
                </div>
              )}
          </div>
          <div>
              <h3 className="text-base text-gray-700 font-normal mb-1">{product.name}</h3>
              <div className="mt-2">
                {product.isSale ? (
                  <>
                    <span className="text-sm text-gray-300 line-through">{`$${product.originalPrice.toFixed(2)}`}</span>
                    <span className="text-sm text-gray-700 ml-2">{`$${getProductPrice(product).toFixed(2)}`}</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-700">{`$${getProductPrice(product).toFixed(2)}`}</span>
                )}
              </div>
          </div>
      </Link>
    );
}

export default async function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  
  const { slug, locale } = await params;
  const product = ProductList.find((p) => p.slug === slug);

  // Use the Next.js notFound function for a proper 404
  if (!product) {
    notFound();
  }

  const relatedProducts = ProductList.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto">
        {/* Product Showcase - All product info in one component */}
        <ProductShowcase product={product} />
      </main>

      {/* Related products */}
      {relatedProducts.length > 0 && (
          <aside className="border-t border-gray-200 py-20 bg-gray-50">
              <div className="mx-auto max-w-6xl px-6">
                <h2 className="text-4xl text-gray-900 mb-12 text-center">Related Products</h2>
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                    {relatedProducts.map((p) => (
                        <RelatedProductCard key={p.id} product={p} locale={locale} />
                    ))}
                </div>
              </div>
          </aside>
      )}
    </div>
  );
}

// generateStaticParams remains the same.
export async function generateStaticParams() {
  const locales = ['en', 'ar'];
  return locales.flatMap((locale) =>
    ProductList.map((product) => ({
      slug: product.slug,
      locale,
    }))
  );
}