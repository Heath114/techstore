// src/app/[locale]/[slug]/page.tsx
import { ProductList, type Product } from '@/app/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Import our new components
import { ProductGallery } from './ProductGallery';
import { InfoSection, ProductInfo } from './components';

// A elegantly styled card for related products
function RelatedProductCard({ product, locale }: { product: Product, locale: string }) {
    return (
      <Link href={`/${locale}/${product.slug}`} className="group block">
          <div className="relative aspect-square overflow-hidden mb-4">
              <Image
                src={product.image ?? '/images/products/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
          </div>
          <div>
              <h3 className="text-lg font-serif text-gray-900 mb-1">{product.name}</h3>
              <p className="text-base text-gray-600">${product.price.toFixed(2)}</p>
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
      <main className="mx-auto  px-6 py-16">
        
        <div className="mb-20 py-16 flex items-center flex-col border-t border-b border-gray-100">
          <div className="text-center max-w-2xl mx-auto px-6">
            <h1 className="text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Early access to our<br />
              <em className="font-light">exclusive collections</em>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
              Join our private list and receive 10% off your first purchase
            </p>
            <form className="max-w-sm mx-auto">
              <div className="relative mb-6">
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-2 font-medium">
                  Phone number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    🇯🇴 +962
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={9}
                    pattern="[7-9][0-9]{8}"
                    className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-none focus:border-gray-400 focus:outline-none text-base transition-colors bg-white"
                    placeholder="7X XXX XXXX"
                    title="Please enter a valid Jordanian phone number (9 digits starting with 7, 8, or 9)"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-none text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Join waitlist
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="lg:w-[50vw] lg:h-screen">
            <ProductGallery
              mainImage={product.image ?? '/images/products/placeholder.png'}
              images={product.images ?? []}
              productName={product.name}
            />
          </div>

          <div className="lg:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product details sections */}
        <div className="space-y-16">
          {product.features && (
            <section>
              <h2 className="text-3xl font-serif text-gray-900 mb-8">Features</h2>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-gray-400 mt-1" />
                    <span className="text-lg text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.specifications && (
            <section>
              <h2 className="text-3xl font-serif text-gray-900 mb-8">Specifications</h2>
              <div className="border border-gray-200">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key}>
                        <td className="w-1/3 px-6 py-4 text-base font-medium text-gray-900 bg-gray-50">{key}</td>
                        <td className="px-6 py-4 text-base text-gray-700">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {product.whatsInTheBox && (
            <section>
              <h2 className="text-3xl font-serif text-gray-900 mb-8">What's included in the Box</h2>
              <ul className="space-y-4">
                {product.whatsInTheBox.map((item, i) => (
                   <li key={i} className="flex items-start gap-4">
                    <BoxIcon className="h-6 w-6 flex-shrink-0 text-gray-400 mt-1" />
                    <span className="text-lg text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      {/* Related products */}
      {relatedProducts.length > 0 && (
          <aside className="border-t border-gray-200 py-20 bg-gray-50">
              <div className="mx-auto max-w-6xl px-6">
                <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">You might also like</h2>
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
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