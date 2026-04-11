import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react';

/**
 * AccordionItem 스타일 variant
 */
export type AccordionItemStyle = 'default' | 'soft' | 'ghost' | 'line';

/**
 * AccordionItem 패딩 값 (px)
 */
export type AccordionPadding = 0 | 1 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/**
 * 헤더 버튼에 전달할 추가 props
 */
export type AccordionHeaderProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled' | 'aria-expanded' | 'aria-controls' | 'aria-disabled'
> & {
  ref?: Ref<HTMLButtonElement>;
};

/**
 * AccordionItem props
 */
export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick' | 'style' | 'onToggle'> {
  /** 아코디언 아이템의 스타일 variant */
  style?: AccordionItemStyle;
  /** 아코디언 아이템이 열려있는지 여부 */
  isOpen?: boolean;
  /** 비제어 모드에서 초기 열림 상태 */
  defaultIsOpen?: boolean;
  /** 아코디언 아이템이 토글될 때 호출되는 콜백 (새 상태 값을 전달받음) */
  onToggle?: (isOpen: boolean) => void;
  /** 헤더 내용 (질문) */
  header: ReactNode;
  /** 열렸을 때 표시될 내용 (답변) */
  children: ReactNode;
  /** 아코디언 아이템이 비활성화되어 있는지 여부 */
  disabled?: boolean;
  /**
   * 아코디언 헤더의 heading 레벨 (WAI-ARIA Accordion Pattern)
   * @default 3
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** 추가 CSS 클래스 이름 */
  className?: string;
  /** 헤더 버튼에 전달할 추가 props (ref, onKeyDown 등 포함 가능) */
  headerProps?: AccordionHeaderProps;
  /** 컨테이너 패딩 (px). 미지정 시 기본 24px */
  padding?: AccordionPadding;
}
