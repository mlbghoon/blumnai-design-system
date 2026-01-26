/**
 * Effects tokens extracted from Figma REST API
 * Source: https://www.figma.com/design/hNwky49HL9rYtxWb5smgqZ/Sort-UI-%E2%80%94-1.3-Source?node-id=4245-140762
 * Fetched: 2026-01-18
 * 
 * Effects are organized into:
 * - global-shadows: Shadows for global UI elements (cards, modals)
 * - components-shadows: Shadows for component states (default, focus, etc.)
 */
import { color } from './color';

export const effects = {
  'global-shadows': {
    card: `0px 1px 2px 0px rgba(0, 0, 0, 0.05), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1)`,
    'modal-sm': `0px 1px 1px -0.5px rgba(0, 0, 0, 0.04), 0px 3px 3px -1.5px rgba(0, 0, 0, 0.04), 0px 6px 6px -3px rgba(0, 0, 0, 0.04), 0px 12px 12px -6px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px ${color.border.default}`,
    'modal-md': `0px 0px 0px 1px ${color.border.default}, 0px 12px 12px 0px rgba(0, 0, 0, 0.04), 0px 6px 6px 0px rgba(0, 0, 0, 0.04), 0px 3px 3px 0px rgba(0, 0, 0, 0.04), 0px 1px 1px -0.5px rgba(0, 0, 0, 0.04)`,
    'modal-lg': `0px 0px 0px 1px ${color.border.default}, 0px 16px 16px 0px rgba(0, 0, 0, 0.04), 0px 12px 12px 0px rgba(0, 0, 0, 0.04), 0px 6px 6px 0px rgba(0, 0, 0, 0.04), 0px 3px 3px 0px rgba(0, 0, 0, 0.04), 0px 1px 1px -0.5px rgba(0, 0, 0, 0.04)`,
  },
  'components-shadows': {
    default: `0px 1px 2px 0px rgba(0, 0, 0, 0.05), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.08)`,
    focus: `0px 0px 0px 3px rgba(101, 160, 253, 0.4), 0px 0px 0px 1px ${color.bg.default}, 0px 1px 2px 0px rgba(0, 0, 0, 0.05), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1)`,
    'destructive-focus': `0px 0px 0px 3px rgba(238, 110, 108, 0.4), 0px 0px 0px 1px ${color.bg.default}, 0px 1px 2px 0px rgba(0, 0, 0, 0.05), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1)`,
    'input-focus': `0px 0px 0px 3px ${color.border.default}, inset 0px 0px 0px 1px rgba(39, 39, 42, 0.4)`,
  },
} as const;
