import type { ReactNode } from 'react';
import type {
  SwitchProps as RadixSwitchProps,
} from '@radix-ui/react-switch';

/**
 * Switch 위치
 */
export type SwitchPosition = 'left' | 'right';

/**
 * Switch 색상
 */
export type SwitchColor =
  | 'gray'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

/**
 * Switch 크기
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Switch Props
 */
export interface SwitchProps
  extends Omit<RadixSwitchProps, 'children'> {
  /**
   * Switch 라벨 텍스트 (Title)
   */
  label?: ReactNode;
  /**
   * 라벨 아래 설명 텍스트
   */
  description?: ReactNode;
  /**
   * 스위치 위치 (라벨 기준)
   * @default 'left'
   */
  switchPosition?: SwitchPosition;
  /**
   * 활성화 시 스위치 색상
   * @default 'green'
   */
  color?: SwitchColor;
  /**
   * 스위치 크기
   * @default 'sm'
   */
  size?: SwitchSize;
  /**
   * 로딩 상태 — 스피너를 표시하고 인터랙션을 비활성화합니다
   * @default false
   */
  loading?: boolean;
  /**
   * 활성화 시 트랙 내 표시 텍스트
   */
  onLabel?: ReactNode;
  /**
   * 비활성화 시 트랙 내 표시 텍스트
   */
  offLabel?: ReactNode;
  /**
   * 라벨 표시 시 트랙 너비 (px). 미지정 시 사이즈별 기본값 사용
   */
  trackWidth?: number;
  /**
   * 썸(토글 핸들) 내부에 표시할 아이콘. ReactNode 또는 상태별 아이콘 함수
   * @example
   * ```tsx
   * // 고정 아이콘
   * <Switch thumbIcon={<Icon iconType={['system', 'check']} size={10} />} />
   * // 상태별 아이콘
   * <Switch thumbIcon={(checked) => <Icon iconType={checked ? ['system', 'check'] : ['system', 'close']} size={10} />} />
   * ```
   */
  thumbIcon?: ReactNode | ((checked: boolean) => ReactNode);
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * 입력 필드 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
}
