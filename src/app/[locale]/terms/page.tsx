import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/locales/business-config';
import Link from 'next/link';

export default async function TermsOfServicePage({
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
            {t.terms.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.terms.last_updated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t.terms.intro}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.terms.acceptance.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.terms.acceptance.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.terms.use_license.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.terms.use_license.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.terms.disclaimer.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.terms.disclaimer.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.terms.limitations.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.terms.limitations.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.terms.privacy.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.terms.privacy.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.terms.changes.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.terms.changes.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.terms.contact.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.terms.contact.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
