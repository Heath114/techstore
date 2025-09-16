// src/app/[locale]/[slug]/page.tsx
import { ProductList, type Product } from '@/app/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Import our new components
import { ProductGallery } from './ProductGallery';
import { InfoSection, ProductInfo } from './components';

// A nicely styled card for related products
function RelatedProductCard({ product, locale }: { product: Product, locale: string }) {
    return (
      <Link href={`/${locale}/${product.slug}`} className="group block overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image ?? '/images/products/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
          </div>
          <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-800">{product.name}</h3>
              <p className="mt-1 text-lg font-bold text-primary-600">${product.price.toFixed(2)}</p>
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
    <div className="bg-slate-50 min-h-screen w-[90%] mx-auto rounded-lg shadow-md my-8">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery
            mainImage={product.image ?? '/images/products/placeholder.png'}
            images={product.images ?? []}
            productName={product.name}
          />

          <ProductInfo product={product} />
        </div>

        {/* Details sections */}
        <div className="mt-16 space-y-12">
          {product.features && (
            <InfoSection title="Key Features">
              <ul className="list-inside space-y-2 text-slate-600">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-600 mt-0.5" />
                    <span className="text-xl">{feature}</span>
                  </li>
                ))}
              </ul>
            </InfoSection>
          )}

          {product.specifications && (
            <InfoSection title="Specifications">
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-xl">
                  <tbody className="divide-y divide-slate-200">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="even:bg-slate-50/50">
                        <td className="w-1/3 px-4 py-3 font-medium text-slate-800">{key}</td>
                        <td className="px-4 py-3 text-slate-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfoSection>
          )}

          {product.whatsInTheBox && (
            <InfoSection title="What's in the Box">
               <ul className="list-inside space-y-2 text-slate-700">
                {product.whatsInTheBox.map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                    <BoxIcon className="h-8 w-8 flex-shrink-0 text-primary-600 mt-0.5" />
                    <span className="text-2xl">{item}</span>
                  </li>
                ))}
              </ul>
            </InfoSection>
          )}
        </div>
      </main>

      {/* Related products */}
      {relatedProducts.length > 0 && (
          <aside className="border-t border-slate-200 bg-white py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-800">You Might Also Like</h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

const BoxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);


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