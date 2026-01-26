import type { ButtonHTMLAttributes } from 'react';

import type { IconType } from '../../icons/Icon/Icon.types';

export type ControlButtonSize = 'sm' | 'md' | 'lg';

export type ControlButtonShape = 'rounded' | 'circle';

export type ControlButtonStyle = 'default' | 'inverted';

export interface ControlButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'style'> {
  /**
   * 컨트롤 버튼의 스타일
   * @default 'default'
   */
  style?: ControlButtonStyle;
  /**
   * 컨트롤 버튼의 크기
   * @default 'md'
   */
  size?: ControlButtonSize;
  /**
   * 컨트롤 버튼의 모양
   * @default 'rounded'
   */
  shape?: ControlButtonShape;
  /**
   * 아이콘 타입 (필수)
   * @example icon={['media', 'play']}
   */
  icon: IconType;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 접근성 라벨 (아이콘 전용 버튼에 필수)
   */
  'aria-label': string;
}
