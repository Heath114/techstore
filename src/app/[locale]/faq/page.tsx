import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/locales/business-config';
import Link from 'next/link';

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || 'en';
  const t = getTranslations(currentLocale, 'legal');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${currentLocale}`}
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← {currentLocale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t.faq.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {t.faq.intro}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Ordering Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">
              {t.faq.ordering.title}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.ordering.q1.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.ordering.q1.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.ordering.q2.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.ordering.q2.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.ordering.q3.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.ordering.q3.answer}
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">
              {t.faq.shipping_faq.title}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.shipping_faq.q1.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.shipping_faq.q1.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.shipping_faq.q2.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.shipping_faq.q2.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.shipping_faq.q3.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.shipping_faq.q3.answer}
                </p>
              </div>
            </div>
          </section>

          {/* Returns Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">
              {t.faq.returns_faq.title}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.returns_faq.q1.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.returns_faq.q1.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.returns_faq.q2.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.returns_faq.q2.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.returns_faq.q3.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.returns_faq.q3.answer}
                </p>
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">
              {t.faq.products_faq.title}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.products_faq.q1.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.products_faq.q1.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.products_faq.q2.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.products_faq.q2.answer}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.faq.products_faq.q3.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t.faq.products_faq.q3.answer}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
