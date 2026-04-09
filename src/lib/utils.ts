import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/**
 * 주어진 EventTarget이 편집 가능한 필드인지 판별합니다.
 * `<input>`, `<textarea>`, `<select>` 또는 `contenteditable` 요소에 대해 true를 반환합니다.
 *
 * 전역 키보드 단축키 핸들러에서 사용자가 입력 중일 때 키를 가로채지 않기 위해 사용합니다.
 *
 * @example
 * document.addEventListener('keydown', (e) => {
 *   if (isEditableTarget(e.target)) return;  // 타이핑 중이면 무시
 *   // ... 단축키 처리 ...
 * });
 */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  return EDITABLE_TAGS.has(target.tagName) || target.isContentEditable;
}
