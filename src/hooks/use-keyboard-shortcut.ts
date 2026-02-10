import { useEffect, useRef } from 'react';
import { parseShortcut } from './keyboard-shortcut-parser';

export interface UseKeyboardShortcutOptions {
  enabled?: boolean;
  ignoreInputFields?: boolean;
  preventDefault?: boolean;
}

const INPUT_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

function isInputField(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  return INPUT_TAGS.has(target.tagName) || target.isContentEditable;
}

/**
 * 키보드 단축키에 대한 글로벌 keydown 리스너를 바인딩합니다.
 *
 * @remarks
 * 브라우저가 예약한 단축키(⌘W, ⌘N, ⌘T, ⌘Q 등)는 JavaScript로 차단할 수 없습니다.
 * 이러한 단축키는 브라우저가 이벤트를 JavaScript에 전달하기 전에 처리합니다.
 * 다음 단축키는 사용을 피하세요: ⌘W, ⌘N, ⌘⇧N, ⌘T, ⌘Q, ⌘L
 */
export function useKeyboardShortcut(
  shortcut: string | undefined | null,
  handler: () => void,
  options?: UseKeyboardShortcutOptions,
): void {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  const {
    enabled = true,
    ignoreInputFields = true,
    preventDefault = true,
  } = options ?? {};

  useEffect(() => {
    if (!shortcut || !enabled) return;

    const parsed = parseShortcut(shortcut);
    if (!parsed.key) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.metaKey !== parsed.meta) return;
      if (e.ctrlKey !== parsed.ctrl) return;
      if (e.shiftKey !== parsed.shift) return;
      if (e.altKey !== parsed.alt) return;
      if (e.key.toLowerCase() !== parsed.key) return;

      if (ignoreInputFields && !parsed.hasModifier && isInputField(e.target)) {
        return;
      }

      if (preventDefault) e.preventDefault();
      handlerRef.current();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut, enabled, ignoreInputFields, preventDefault]);
}
