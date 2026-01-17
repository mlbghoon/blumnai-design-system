import { color } from './color';

export const effects = {
  shadows: {
    card: `0px 1px 2px 0px #0000000D, inset 0px -1px 0px 0px #0000001A`,

    modalSm: `0px 0px 0px 1px ${color.border.default}, 0px 12px 12px -6px #0000000A, 0px 6px 6px -3px #0000000A, 0px 3px 3px -1.5px #0000000A, 0px 1px 1px -0.5px #0000000A, inset 0px -1px 0px 0px ${color.border.darker}`,
    modalMd: `0px 0px 0px 1px ${color.border.default}, 0px 12px 12px 0px #0000000A, 0px 6px 6px 0px #0000000A, 0px 3px 3px 0px #0000000A, 0px 1px 1px -0.5px #0000000A`,
    modalLg: `0px 0px 0px 1px ${color.border.default}, 0px 16px 16px 0px #0000000A, 0px 12px 12px 0px #0000000A, 0px 6px 6px 0px #0000000A, 0px 3px 3px 0px #0000000A, 0px 1px 1px -0.5px #0000000A`,
  },

  components: {
    default: `0px 1px 2px 0px #0000000D, inset 0px -1px 0px 0px #00000014, inset 0px 0px 0px 1px ${color.border.darker}`,

    focus: `0px 0px 0px 3px ${color.border.highlight}, 0px 0px 0px 1px ${color.bg.default}, 0px 1px 2px 0px #0000000D, inset 0px -1px 0px 0px #0000001A, inset 0px 0px 0px 1px ${color.border.darker}`,
    destructiveFocus: `0px 0px 0px 3px ${color.border['highlight-destructive']}, 0px 0px 0px 1px ${color.bg.default}, 0px 1px 2px 0px #0000000D, inset 0px -1px 0px 0px #0000001A`,
    inputFocus: `0px 0px 0px 3px ${color.border.default}, inset 0px 0px 0px 1px ${color.border['input-highlight']}`,
  },
} as const;
