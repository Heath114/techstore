import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/locales/business-config';
import Link from 'next/link';

export default async function RefundPolicyPage({
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
            {t.refund.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.refund.last_updated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t.refund.intro}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.refund.returns.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.refund.returns.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.refund.conditions.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t.refund.conditions.content}
            </p>
            <p className="font-semibold text-gray-900 dark:text-white mb-2">
              {t.refund.conditions.list_title}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {t.refund.conditions.list.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.refund.process.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t.refund.process.content}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t.refund.process.step1}</li>
              <li>{t.refund.process.step2}</li>
              <li>{t.refund.process.step3}</li>
              <li>{t.refund.process.step4}</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.refund.refund_time.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.refund.refund_time.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.refund.exchanges.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.refund.exchanges.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t.refund.shipping_cost.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.refund.shipping_cost.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
