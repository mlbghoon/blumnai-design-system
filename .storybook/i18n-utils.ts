/**
 * Internationalization utilities for Storybook stories
 * 한국어/영어 번역 유틸리티
 * 
 * Note: This file is separate from preview.ts to avoid import issues
 */

export type Locale = 'ko' | 'en';

export interface Translations {
  [key: string]: {
    ko: string;
    en: string;
  };
}

// Common translations for Storybook stories
export const storyTranslations: Translations = {
  'story.overview': {
    ko: '개요',
    en: 'Overview',
  },
  'story.variants': {
    ko: '변형',
    en: 'Variants',
  },
  'story.sizes': {
    ko: '크기',
    en: 'Sizes',
  },
  'story.states': {
    ko: '상태',
    en: 'States',
  },
  'story.examples': {
    ko: '예제',
    en: 'Examples',
  },
  'story.darkMode': {
    ko: '다크 모드',
    en: 'Dark Mode',
  },
  'story.default': {
    ko: '기본',
    en: 'Default',
  },
  'story.hover': {
    ko: '호버',
    en: 'Hover',
  },
  'story.disabled': {
    ko: '비활성화',
    en: 'Disabled',
  },
  'story.opened': {
    ko: '열림',
    en: 'Opened',
  },
  'story.closed': {
    ko: '닫힘',
    en: 'Closed',
  },
};

/**
 * Get translated text based on locale
 * @param key - Translation key
 * @param locale - Current locale ('ko' or 'en')
 * @returns Translated text
 */
export function t(key: string, locale: Locale = 'ko'): string {
  const translation = storyTranslations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[locale] || translation.ko;
}

/**
 * Get all translations for a locale
 * @param locale - Current locale ('ko' or 'en')
 * @returns Object with all translations
 */
export function getTranslations(locale: Locale = 'ko'): Record<string, string> {
  const result: Record<string, string> = {};
  Object.keys(storyTranslations).forEach((key) => {
    result[key] = storyTranslations[key][locale] || storyTranslations[key].ko;
  });
  return result;
}
