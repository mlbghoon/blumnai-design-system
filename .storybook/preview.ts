import type { Preview } from '@storybook/react-vite';
import * as React from 'react';

import '../src/index.css';

const preview: Preview = {
  parameters: {
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
        order: [
          'Components',
          'Icons',
          'UI Cases',
          [
            '01. 리스트 + 상세',
            '02. 설정 / 폼',
            '03. 대시보드',
            '04. 빈 상태',
            '05. 모달 / 다이얼로그',
          ],
        ],
      },
    },
  },
  initialGlobals: {
    locale: 'ko',
    theme: 'theme-a-light',
  },
  globalTypes: {
    locale: {
      description: '국제화 언어 설정',
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
    theme: {
      description: '테마 설정',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'theme-a-light', title: 'Theme-A Light', icon: 'circlehollow' },
          { value: 'dark', title: 'Theme-A Dark', icon: 'circle' },
          { value: 'theme-b-light', title: 'Theme-B Light', icon: 'circlehollow' },
          { value: 'theme-b-dark', title: 'Theme-B Dark', icon: 'circle' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'theme-a-light';

      // Map theme values to data-theme and class names
      const themeMap: Record<string, { dataTheme: string; className?: string }> = {
        'theme-a-light': { dataTheme: '' }, // default, no data-theme needed
        'dark': { dataTheme: 'dark', className: 'dark' },
        'theme-b-light': { dataTheme: 'theme-b-light', className: 'theme-b-light' },
        'theme-b-dark': { dataTheme: 'theme-b-dark', className: 'theme-b-dark' },
      };

      const themeConfig = themeMap[theme] || themeMap['theme-a-light'];

      // Apply theme to document.documentElement so portaled content inherits it
      React.useEffect(() => {
        const root = document.documentElement;
        // Clear previous theme
        root.removeAttribute('data-theme');
        root.classList.remove('dark', 'theme-b-light', 'theme-b-dark');

        if (themeConfig.dataTheme) {
          root.setAttribute('data-theme', themeConfig.dataTheme);
        }
        if (themeConfig.className) {
          root.classList.add(themeConfig.className);
        }
      }, [theme, themeConfig.dataTheme, themeConfig.className]);

      const props: React.HTMLAttributes<HTMLDivElement> = {
        style: {
          backgroundColor: 'var(--bg-default)',
          minHeight: '100%',
          width: '100%',
          padding: '1rem',
        },
      };

      return React.createElement(
        'div',
        props,
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
