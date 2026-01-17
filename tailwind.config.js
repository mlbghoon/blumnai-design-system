import { color } from './src/tokens/color';
import { radius } from './src/tokens/radius';
import { typography } from './src/tokens/typography';
import { effects } from './src/tokens/effects';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Color tokens - using CSS variables to match Figma format
      colors: {
        // Palette colors (zinc, stone, gray, slate, red, orange, etc.)
        ...Object.fromEntries(
          Object.entries(color.palette).map(([name, shades]) => [
            name,
            Object.fromEntries(
              Object.entries(shades).map(([key, value]) => [key, value])
            ),
          ])
        ),
        // Text colors - matches Figma CSS variables (--text-default, etc.)
        text: {
          DEFAULT: 'var(--text-default)',
          subtle: 'var(--text-subtle)',
          muted: 'var(--text-muted)',
          hint: 'var(--text-hint)',
          destructive: 'var(--text-destructive)',
          success: 'var(--text-success)',
          warning: 'var(--text-warning)',
          informative: 'var(--text-informative)',
          'inverted-default': 'var(--text-inverted-default)',
          'inverted-subtle': 'var(--text-inverted-subtle)',
          'inverted-muted': 'var(--text-inverted-muted)',
          'inverted-hint': 'var(--text-inverted-hint)',
        },
        // Background colors - matches Figma CSS variables (--bg-default, etc.)
        bg: {
          DEFAULT: 'var(--bg-default)',
          subtle: 'var(--bg-subtle)',
          muted: 'var(--bg-muted)',
          inverted: 'var(--bg-inverted)',
          card: 'var(--bg-card)',
          'card-subtle': 'var(--bg-card-subtle)',
          'card-inverted': 'var(--bg-card-inverted)',
          sidebar: 'var(--bg-sidebar)',
          'sidebar-subtle': 'var(--bg-sidebar-subtle)',
          input: 'var(--bg-input)',
          'input-soft': 'var(--bg-input-soft)',
          'input-disabled': 'var(--bg-input-disabled)',
          overlay: 'var(--bg-overlay)',
          'state-soft': 'var(--bg-state-soft)',
          'state-soft-hover': 'var(--bg-state-soft-hover)',
          'state-soft-press': 'var(--bg-state-soft-press)',
          'state-primary': 'var(--bg-state-primary)',
          'state-primary-hover': 'var(--bg-state-primary-hover)',
          'state-primary-press': 'var(--bg-state-primary-press)',
          'state-primary-loading': 'var(--bg-state-primary-loading)',
          'state-secondary': 'var(--bg-state-secondary)',
          'state-secondary-hover': 'var(--bg-state-secondary-hover)',
          'state-secondary-press': 'var(--bg-state-secondary-press)',
          'state-ghost': 'var(--bg-state-ghost)',
          'state-ghost-hover': 'var(--bg-state-ghost-hover)',
          'state-ghost-press': 'var(--bg-state-ghost-press)',
          'state-ghost-inverted': 'var(--bg-state-ghost-inverted)',
          'state-ghost-hover-inverted': 'var(--bg-state-ghost-hover-inverted)',
          'state-ghost-press-inverted': 'var(--bg-state-ghost-press-inverted)',
          'state-destructive': 'var(--bg-state-destructive)',
          'state-destructive-hover': 'var(--bg-state-destructive-hover)',
          'state-destructive-press': 'var(--bg-state-destructive-press)',
          'state-destructive-loading': 'var(--bg-state-destructive-loading)',
          'state-brand': 'var(--bg-state-brand)',
          'state-brand-hover': 'var(--bg-state-brand-hover)',
          'state-brand-press': 'var(--bg-state-brand-press)',
          'state-brand-loading': 'var(--bg-state-brand-loading)',
          'state-gray': 'var(--bg-state-gray)',
          'state-disabled': 'var(--bg-state-disabled)',
        },
        // Border colors - matches Figma CSS variables (--border-default, etc.)
        border: {
          DEFAULT: 'var(--border-default)',
          darker: 'var(--border-darker)',
          strong: 'var(--border-strong)',
          inverted: 'var(--border-inverted)',
          accent: 'var(--border-accent)',
          'accent-inverted': 'var(--border-accent-inverted)',
          destructive: 'var(--border-destructive)',
          informative: 'var(--border-informative)',
          success: 'var(--border-success)',
          warning: 'var(--border-warning)',
          highlight: 'var(--border-highlight)',
          'highlight-destructive': 'var(--border-highlight-destructive)',
          'input-highlight': 'var(--border-input-highlight)',
        },
      },
      // Border radius tokens
      borderRadius: {
        ...radius.global,
        card: radius.card,
      },
      // Typography tokens
      fontFamily: {
        body: [typography.font.family.body, 'sans-serif'],
        headline: [typography.font.family.headline, 'sans-serif'],
      },
      fontSize: {
        ...typography.size,
      },
      fontWeight: {
        ...typography.font.weight,
      },
      lineHeight: {
        ...Object.fromEntries(
          Object.entries(typography.lineHeight).map(([key, value]) => [
            key.replace('leading', ''),
            value,
          ])
        ),
      },
      letterSpacing: {
        ...Object.fromEntries(
          Object.entries(typography.letterSpacing).map(([key, value]) => [
            key.replace('tracking', '').replace('neg', '-'),
            value,
          ])
        ),
      },
      // Box shadow tokens (effects)
      boxShadow: {
        card: effects.shadows.card,
        'modal-sm': effects.shadows.modalSm,
        'modal-md': effects.shadows.modalMd,
        'modal-lg': effects.shadows.modalLg,
        'component-default': effects.components.default,
        'component-focus': effects.components.focus,
        'component-destructive-focus': effects.components.destructiveFocus,
        'component-input-focus': effects.components.inputFocus,
      },
    },
  },
  plugins: [],
}
