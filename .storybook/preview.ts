import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Locale configuration - Korean and English support
    locale: 'ko', // Default to Korean
    locales: {
      ko: {
        title: '한국어',
        left: '🇰🇷',
      },
      en: {
        title: 'English',
        left: '🇺🇸',
      },
    },
    // Korean translations for Storybook UI
    docs: {
      toc: {
        title: '목차',
        contentsLabel: '내용',
      },
    },
    // Additional Korean translations for Storybook UI elements
    options: {
      storySort: {
        order: ['Components', 'Icons'],
      },
    },
  },
  globalTypes: {
    locale: {
      description: '국제화 언어 설정',
      defaultValue: 'ko',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어', right: '🇰🇷' },
          { value: 'en', title: 'English', right: '🇺🇸' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
