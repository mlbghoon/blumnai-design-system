import type { ButtonHTMLAttributes } from 'react';

import type { IconType, IconTypeWithFill, RemixiconLikeComponent } from '../icons/Icon/Icon.types';
import type { ButtonColor } from './Button.types';

export type ControlButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ControlButtonShape = 'rounded' | 'circle';

export type ControlButtonStyle = 'default' | 'inverted';

export interface ControlButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 컨트롤 버튼의 스타일
   * @default 'default'
   */
  buttonStyle?: ControlButtonStyle;
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
   * 아이콘 (필수).
   *
   * - tuple `[category, name]` / `[category, name, isFill]` (dynamic-string back-compat)
   * - Remixicon component (`RiPlayLine` 등; tree-shaking 권장)
   *
   * @example icon={['media', 'play']}
   * @example icon={['system', 'star', true]}
   * @example icon={RiPlayLine}
   */
  icon: IconType | IconTypeWithFill | RemixiconLikeComponent;
  /**
   * 아이콘 색상 오버라이드. 배경/호버 스타일에는 영향 없음
   * @example colorOverride="yellow"
   * @example colorOverride="red"
   */
  colorOverride?: ButtonColor;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 접근성 라벨 (아이콘 전용 버튼에 필수)
   */
  'aria-label': string;
  /**
   * If true, renders the component as its child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
}
