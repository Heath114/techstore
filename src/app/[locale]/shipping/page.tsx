import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/locales/business-config';
import Link from 'next/link';

export default async function ShippingPolicyPage({
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
            {t.shipping.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.shipping.last_updated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t.shipping.intro}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.shipping.processing.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.shipping.processing.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.shipping.rates.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t.shipping.rates.content}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t.shipping.rates.standard}</li>
              <li>{t.shipping.rates.express}</li>
              <li>{t.shipping.rates.overnight}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.shipping.tracking.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.shipping.tracking.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.shipping.international.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.shipping.international.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.shipping.damages.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.shipping.damages.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
