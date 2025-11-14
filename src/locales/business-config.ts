/**
 * Business Configuration
 * Edit this file for each client/business deployment
 */

export const businessConfig = {
  // Business Identity
  businessName: 'TechStore',
  businessType: 'electronics', // electronics, fashion, food, etc.
  
  // Localization Settings
  defaultLocale: 'en' as const,
  locales: ['en', 'ar'] as const, // English and Arabic
  
  // Regional Settings
  currency: 'USD',
  currencySymbol: '$',
  dateFormat: 'MM/DD/YYYY',
  
  // Features (enable/disable per business)
  features: {
    multiLanguage: true,
    rtlSupport: true, // Set true for Arabic/Hebrew
    currencySelector: false,
  }
} as const;

export type Locale = typeof businessConfig.locales[number];
export type BusinessConfig = typeof businessConfig;
