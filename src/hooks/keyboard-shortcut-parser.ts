export interface ParsedShortcut {
  key: string;
  meta: boolean;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  hasModifier: boolean;
}

const SYMBOL_MAP: Record<string, keyof Pick<ParsedShortcut, 'meta' | 'ctrl' | 'shift' | 'alt'>> = {
  '⌘': 'meta',
  '⇧': 'shift',
  '⌥': 'alt',
  '⌃': 'ctrl',
};

const TEXT_TOKEN_MAP: Record<string, keyof Pick<ParsedShortcut, 'meta' | 'ctrl' | 'shift' | 'alt'>> = {
  ctrl: 'ctrl',
  control: 'ctrl',
  cmd: 'meta',
  meta: 'meta',
  command: 'meta',
  shift: 'shift',
  alt: 'alt',
  option: 'alt',
  opt: 'alt',
};

const SPECIAL_KEY_MAP: Record<string, string> = {
  esc: 'escape',
  return: 'enter',
  space: ' ',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
  del: 'delete',
  backspace: 'backspace',
  '⌫': 'backspace',
  '⌦': 'delete',
};

export function parseShortcut(shortcut: string): ParsedShortcut {
  const result: ParsedShortcut = {
    key: '',
    meta: false,
    ctrl: false,
    shift: false,
    alt: false,
    hasModifier: false,
  };

  if (shortcut.includes('+')) {
    const parts = shortcut.split('+').map((s) => s.trim());
    for (const part of parts) {
      if (part in SYMBOL_MAP) {
        result[SYMBOL_MAP[part]] = true;
      } else {
        const lower = part.toLowerCase();
        if (lower in TEXT_TOKEN_MAP) {
          result[TEXT_TOKEN_MAP[lower]] = true;
        } else {
          result.key = SPECIAL_KEY_MAP[lower] ?? lower;
        }
      }
    }
  } else {
    let remaining = shortcut;
    for (const [symbol, modifier] of Object.entries(SYMBOL_MAP)) {
      if (remaining.includes(symbol)) {
        result[modifier] = true;
        remaining = remaining.replace(symbol, '');
      }
    }
    const key = remaining.trim().toLowerCase();
    result.key = SPECIAL_KEY_MAP[key] ?? key;
  }

  result.hasModifier = result.meta || result.ctrl || result.shift || result.alt;

  return result;
}
