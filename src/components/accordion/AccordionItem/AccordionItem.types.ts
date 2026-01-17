import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

/**
 * AccordionItem 스타일 variant
 */
export type AccordionItemStyle = 'default' | 'soft' | 'ghost' | 'line';

/**
 * AccordionItem props
 */
export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick' | 'style'> {
  /** 아코디언 아이템의 스타일 variant */
  style?: AccordionItemStyle;
  /** 아코디언 아이템이 열려있는지 여부 */
  isOpen?: boolean;
  /** 아코디언 아이템이 토글될 때 호출되는 콜백 */
  onToggle?: () => void;
  /** 헤더 내용 (질문) */
  header: ReactNode;
  /** 열렸을 때 표시될 내용 (답변) */
  children: ReactNode;
  /** 아코디언 아이템이 비활성화되어 있는지 여부 */
  disabled?: boolean;
  /** 다크 모드가 활성화되어 있는지 여부 */
  darkMode?: boolean;
  /** 추가 CSS 클래스 이름 */
  className?: string;
  /** 헤더 버튼에 전달할 추가 props */
  headerProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'aria-expanded'>;
}
