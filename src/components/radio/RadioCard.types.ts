import type { RadioStyle, RadioPosition } from './Radio.types';

/**
 * RadioCard 배경 스타일
 */
export type RadioCardBackground = 'default' | 'soft';

/**
 * RadioCard 레이아웃
 */
export type RadioCardLayout = 'vertical' | 'horizontal';

/**
 * RadioCard 콘텐츠 섹션
 */
export interface RadioCardSection {
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
 * RadioCard Props
 */
export interface RadioCardProps {
  /**
   * Radio value (RadioGroup 내에서 고유해야 함)
   */
  value: string;
  /**
   * 카드 제목
   */
  title: string;
  /**
   * 카드 설명
   */
  description?: string;
  /**
   * 추가 섹션 (예: Supporter 정보)
   * Vertical layout: 세로로 쌓임
   * Horizontal layout: 오른쪽에 표시됨 (첫 번째 섹션만 사용)
   */
  sections?: RadioCardSection[];
  /**
   * 레이아웃 방향
   * @default 'vertical'
   */
  layout?: RadioCardLayout;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  /**
   * 배경 스타일
   * @default 'default'
   */
  background?: RadioCardBackground;
  /**
   * 라디오 버튼 위치
   * @default 'right'
   */
  radioPosition?: RadioPosition;
  /**
   * 라디오 버튼 스타일
   * @default 'with-shadow'
   */
  radioStyle?: RadioStyle;
  /**
   * 추가 클래스명
   */
  className?: string;
}
