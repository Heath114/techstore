/**
 * Translation System
 * Lightweight, type-safe translation utilities
 */

import { businessConfig, type Locale } from '@/locales/business-config';

// Cache for loaded translations
const translationCache: Record<string, any> = {};

/**
 * Get translations for a specific namespace and locale
 * @param locale - The locale to load (e.g., 'en', 'es', 'fr')
 * @param namespace - The namespace/file to load (e.g., 'common', 'home', 'product')
 * @returns The translation object
 */
export function getTranslations(locale: Locale, namespace: string) {
  const cacheKey = `${locale}-${namespace}`;
  
  // Return cached version if available
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    // Dynamically import the JSON file
    const translations = require(`@/locales/${locale}/${namespace}.json`);
    translationCache[cacheKey] = translations;
    return translations;
  } catch (error) {
    console.error(`Failed to load translations: ${locale}/${namespace}`, error);
    
    // Fallback to default locale if not already using it
    if (locale !== businessConfig.defaultLocale) {
      try {
        const fallback = require(`@/locales/${businessConfig.defaultLocale}/${namespace}.json`);
        return fallback;
      } catch {
        return {};
      }
    }
    
    return {};
  }
}

/**
 * Get a nested translation value by dot notation path
 * @param translations - The translation object
 * @param path - Dot notation path (e.g., 'nav.home', 'why.features.quality.title')
 * @param fallback - Optional fallback value if path not found
 * @returns The translation string or fallback
 */
export function t(translations: any, path: string, fallback?: string): string {
  const keys = path.split('.');
  let result = translations;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return fallback || path;
    }
  }

  return typeof result === 'string' ? result : fallback || path;
}

/**
 * Validate if a locale is supported
 * @param locale - The locale to validate
 * @returns True if the locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return businessConfig.locales.includes(locale as Locale);
}

/**
 * Get the default locale
 * @returns The default locale from business config
 */
export function getDefaultLocale(): Locale {
  return businessConfig.defaultLocale;
}

/**
 * Get all supported locales
 * @returns Array of supported locales
 */
export function getSupportedLocales(): readonly Locale[] {
  return businessConfig.locales;
}

/**
 * Format currency based on business config
 * @param amount - The amount to format
 * @param locale - Optional locale for number formatting
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, locale?: Locale): string {
  const { currency, currencySymbol } = businessConfig;
  
  try {
    return new Intl.NumberFormat(locale || businessConfig.defaultLocale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch {
    // Fallback to simple formatting
    return `${currencySymbol}${amount.toFixed(2)}`;
  }
}
