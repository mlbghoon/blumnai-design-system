/**
 * InputButton component constants
 *
 * Based on Figma design specifications
 *
 * Structure (from Figma):
 * - Outer Container: white bg, shadow-based border (10% outer + 40% inset), 8px radius
 * - Inner Container (input area): flex-1, padding 8px, itemSpacing 6
 * - Divider: VECTOR, 1px stroke at 15% opacity (border-darker), full height
 * - tail-button: INLINE button (NOT regular Button component!)
 *   - Transparent background
 *   - No border-radius (flat edges)
 *   - Padding: 10px horizontal, 6px (sm) / 8px (lg) vertical
 *   - Text: dark color, 14px, font-weight 500
 */

// Size-specific configurations
export const BUTTON_SIZE_CONFIG = {
  sm: {
    // Container height
    container: 'height-32',
    // Input area: 8px padding all around, 6px gap
    inputPadding: 'padding-8',
    inputGap: 'gap-6',
    // Inline button: 10px horizontal, 6px vertical, 4px gap
    buttonPadding: 'padding-x-10 padding-y-6',
    buttonGap: 'gap-4',
    // Icon size
    iconSize: 16,
  },
  lg: {
    // Container height
    container: 'height-36',
    // Input area: 8px padding all around, 6px gap
    inputPadding: 'padding-8',
    inputGap: 'gap-6',
    // Inline button: 10px horizontal, 8px vertical, 4px gap
    buttonPadding: 'padding-x-10 padding-y-8',
    buttonGap: 'gap-4',
    // Icon size
    iconSize: 16,
  },
} as const;

// Inline button text style (from Figma: 14px, weight 500, -0.6 letter-spacing)
export const INLINE_BUTTON_TEXT = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight font-medium' as const;

// Inline button base styles (transparent bg, no border-radius, flex layout)
export const INLINE_BUTTON_BASE = 'flex items-center justify-center bg-transparent cursor-pointer select-none' as const;

// Inline button hover state
export const INLINE_BUTTON_HOVER = 'hover:bg-state-ghost-hover active:bg-state-ghost-press' as const;

// Divider styles (1px vertical line, uses border-darker for theme support)
export const DIVIDER_STYLE = 'w-px self-stretch bg-divider' as const;
