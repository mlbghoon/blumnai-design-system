import type { CheckboxStyle, CheckboxPosition } from './Checkbox.types';

/**
 * CheckboxCard 배경 스타일
 */
export type CheckboxCardBackground = 'default' | 'soft';

/**
 * CheckboxCard 레이아웃
 */
export type CheckboxCardLayout = 'vertical' | 'horizontal';

/**
 * CheckboxCard 콘텐츠 섹션
 */
export interface CheckboxCardSection {
  /**
   * 섹션 제목
   */
  title: string;
  /**
   * 섹션 설명
   */
  description: string;
}

/**
 * CheckboxCard Props
 */
export interface CheckboxCardProps {
  /**
   * 카드 제목
   */
  title: string;
  /**
   * 카드 설명
   */
  description: string;
  /**
   * 추가 섹션 (예: Supporter 정보)
   * Vertical layout: 세로로 쌓임
   * Horizontal layout: 오른쪽에 표시됨 (첫 번째 섹션만 사용)
   */
  sections?: CheckboxCardSection[];
  /**
   * 레이아웃 방향
   * @default 'vertical'
   */
  layout?: CheckboxCardLayout;
  /**
   * 체크 상태
   */
  checked?: boolean;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  /**
   * 배경 스타일
   * @default 'default'
   */
  background?: CheckboxCardBackground;
  /**
   * 체크박스 위치
   * @default 'right'
   */
  checkboxPosition?: CheckboxPosition;
  /**
   * 체크박스 스타일
   * @default 'with-shadow'
   */
  checkboxStyle?: CheckboxStyle;
  /**
   * 폼 필드 이름
   */
  name?: string;
  /**
   * 폼 필드 값
   */
  value?: string;
  /**
   * 변경 이벤트 핸들러
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * 추가 클래스명
   */
  className?: string;
}
