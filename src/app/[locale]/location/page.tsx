import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/locales/business-config';
import Link from 'next/link';

export default async function StoreLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || 'en';
  const t = getTranslations(currentLocale, 'legal');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${currentLocale}`}
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← {currentLocale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t.location.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {t.location.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t.location.directions}
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {t.location.directions}
              </a>
            </div>
          </div>

          {/* Store Information */}
          <div className="space-y-6">
            {/* Address */}
            <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.location.address.title}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-1">
                <p>{t.location.address.street}</p>
                <p>{t.location.address.city}</p>
                <p>{t.location.address.country}</p>
                <p>{t.location.address.postal}</p>
              </div>
            </section>

            {/* Hours */}
            <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.location.hours.title}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p>{t.location.hours.weekdays}</p>
                <p>{t.location.hours.saturday}</p>
                <p>{t.location.hours.sunday}</p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.location.contact.title}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p>{t.location.contact.phone}</p>
                <p>{t.location.contact.email}</p>
                <p>{t.location.contact.whatsapp}</p>
              </div>
            </section>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t.location.parking.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t.location.parking.content}
            </p>
          </section>

          <section className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t.location.public_transport.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t.location.public_transport.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
