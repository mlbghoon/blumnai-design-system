import type { HTMLAttributes, ReactNode } from 'react';
import type { IconType } from '../icons/Icon/Icon.types';

export type InfoBoxVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export type InfoBoxStyle = 'default' | 'subtle';

export interface InfoBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: InfoBoxVariant;
  /**
   * 외관 스타일
   * - 'default': 좌측 인디케이터 바 + 색상 배경
   * - 'subtle': 인디케이터 바 없음, 회색 배경 (컴팩트)
   * @default 'default'
   */
  styleType?: InfoBoxStyle;
  icon?: IconType;
  visible?: boolean;
  title?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  /**
   * 접을 수 있는 상태 (title 필수)
   * @default false
   */
  collapsible?: boolean;
  /**
   * collapsible일 때 초기 열림 상태
   * @default true
   */
  defaultOpen?: boolean;
  children: ReactNode;
}
