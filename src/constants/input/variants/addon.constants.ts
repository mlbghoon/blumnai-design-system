/**
 * InputAddOn component constants
 *
 * Based on Figma design specifications
 *
 * Structure:
 * - Outer container: white background, 15% border all sides, 8px radius
 * - Prefix/Suffix sections: NO background, only border for divider
 * - Input area: NO background, NO border
 */

// Add-on section base styles (NO background, transparent)
export const ADDON_SECTION_BASE = 'flex items-center justify-center' as const;

// Add-on text styles (Figma: 14px, 500 weight, -0.6px letter-spacing, text-muted #6F6F77)
export const ADDON_TEXT_STYLE = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal font-medium text-muted whitespace-nowrap' as const;

// Inline add-on styles (inside the input)
export const INLINE_ADDON_STYLE = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal text-muted whitespace-nowrap' as const;

// Size-specific configurations for add-on
export const ADDON_SIZE_CONFIG = {
  xs: {
    addOnPadding: 'padding-x-10 padding-y-4',
    inputPadding: 'padding-x-6 padding-y-4',
    prefixBorder: 'border-r-darker',
    suffixBorder: 'border-l-darker',
  },
  sm: {
    // Add-on section: 12px horizontal padding (Figma spec)
    addOnPadding: 'padding-x-12 padding-y-6',
    // Input area: 8px horizontal padding (Figma spec)
    inputPadding: 'padding-x-8 padding-y-6',
    // Border for divider
    prefixBorder: 'border-r-darker',
    suffixBorder: 'border-l-darker',
  },
  lg: {
    addOnPadding: 'padding-x-14 padding-y-8',
    inputPadding: 'padding-x-10 padding-y-8',
    prefixBorder: 'border-r-darker',
    suffixBorder: 'border-l-darker',
  },
} as const;
