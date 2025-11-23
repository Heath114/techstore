/**
 * Locale Utilities
 * Helper functions for locale detection and management
 */

import { businessConfig, type Locale } from '@/locales/business-config';
import { isValidLocale, getDefaultLocale } from './i18n';

/**
 * Extract and validate locale from URL params
 * @param params - URL params object
 * @returns Valid locale or default locale
 */
export function getLocaleFromParams(params: { locale?: string }): Locale {
  const { locale } = params;
  
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  
  return getDefaultLocale();
}

/**
 * Get locale metadata for HTML lang attribute and SEO
 * @param locale - The current locale
 * @returns Locale metadata object
 */
export function getLocaleMetadata(locale: Locale) {
  const localeInfo: Record<Locale, { 
    name: string; 
    nativeName: string; 
    dir: 'ltr' | 'rtl';
    htmlLang: string;
  }> = {
    en: { 
      name: 'English', 
      nativeName: 'English', 
      dir: 'ltr',
      htmlLang: 'en'
    },
    ar: { 
      name: 'Arabic', 
      nativeName: 'العربية', 
      dir: 'rtl',
      htmlLang: 'ar'
    },
  };

  return localeInfo[locale] || localeInfo[getDefaultLocale()];
}

/**
 * Generate alternate links for SEO (hreflang)
 * @param pathname - Current pathname without locale
 * @returns Array of alternate link objects
 */
export function getAlternateLinks(pathname: string = '/') {
  return businessConfig.locales.map(locale => ({
    locale,
    href: `/${locale}${pathname}`,
  }));
}

/**
 * Get browser's preferred locale
 * @returns Browser locale if supported, otherwise default locale
 */
export function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return getDefaultLocale();
  }

  const browserLang = navigator.language.split('-')[0];
  
  if (isValidLocale(browserLang)) {
    return browserLang;
  }
  
  return getDefaultLocale();
}
