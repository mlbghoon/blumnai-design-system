import type {
  SliderProps as RadixSliderProps,
} from '@radix-ui/react-slider';

/**
 * 슬라이더 색상 옵션
 */
export type SliderColor =
  | 'gray'
  | 'brand'
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
 * 슬라이더 공통 Props
 */
export interface SliderBaseProps {
  /**
   * 슬라이더 색상
   * @default 'gray'
   */
  color?: SliderColor;
  /**
   * 라벨
   */
  label?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 최소값
   * @default 0
   */
  min?: number;
  /**
   * 최대값
   * @default 100
   */
  max?: number;
  /**
   * 스텝 단위
   * @default 1
   */
  step?: number;
  /**
   * 눈금 표시 여부
   * @default false
   */
  showTicks?: boolean;
  /**
   * 눈금 개수 (showTicks가 true일 때)
   * @default 11
   */
  tickCount?: number;
  /**
   * 눈금 라벨 포맷 함수
   * @example (v) => `$${v}` // "$0", "$10", "$20"...
   * @example (v) => `${v}%` // "0%", "10%", "20%"...
   */
  formatTick?: (value: number) => string;
  /**
   * 추가 className
   */
  className?: string;
}

/**
 * 슬라이더 방향 Props (Slider, SliderRange 전용)
 */
export interface SliderOrientationProps {
  /**
   * 슬라이더 방향
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * 세로 모드에서의 높이 (px)
   * @default 200
   */
  height?: number;
}

type SliderPrimitiveProps = Omit<
  RadixSliderProps,
  'onChange' | 'value' | 'defaultValue' | 'color' | 'orientation'
>;

/**
 * Slider 컴포넌트 Props (기본 단일 슬라이더)
 */
export interface SliderProps extends SliderBaseProps, SliderOrientationProps, SliderPrimitiveProps {
  /**
   * 현재 값
   */
  value?: number;
  /**
   * 기본값
   */
  defaultValue?: number;
  /**
   * 현재 값 표시 여부
   * @default false
   */
  showValue?: boolean;
  /**
   * 값 포맷 함수
   */
  formatValue?: (value: number) => string;
  /**
   * 값 변경 콜백
   */
  onChange?: (value: number) => void;
}

/**
 * SliderRange 컴포넌트 Props (범위 슬라이더)
 */
export interface SliderRangeProps extends SliderBaseProps, SliderOrientationProps, SliderPrimitiveProps {
  /**
   * 현재 범위 값 [min, max]
   */
  value?: [number, number];
  /**
   * 기본 범위 값
   */
  defaultValue?: [number, number];
  /**
   * 현재 값 표시 여부
   * @default false
   */
  showValue?: boolean;
  /**
   * 값 포맷 함수
   */
  formatValue?: (value: number) => string;
  /**
   * 범위 변경 콜백
   */
  onChange?: (value: [number, number]) => void;
}

/**
 * DataRangeSlider 컴포넌트 Props (데이터 범위 슬라이더)
 */
export interface DataRangeSliderProps extends SliderBaseProps, SliderPrimitiveProps {
  /**
   * 현재 범위 값 [min, max]
   */
  value?: [number, number];
  /**
   * 기본 범위 값
   */
  defaultValue?: [number, number];
  /**
   * 값 포맷 함수 (기본: 퍼센트)
   */
  formatValue?: (value: number) => string;
  /**
   * 범위 구분자
   * @default '~'
   */
  separator?: string;
  /**
   * 차트 데이터 (각 바의 높이를 0-1 사이 값으로 표현)
   */
  chartData?: number[];
  /**
   * 범위 변경 콜백
   */
  onChange?: (value: [number, number]) => void;
}

/**
 * SliderInput 컴포넌트 Props (슬라이더 + 입력 필드)
 */
export interface SliderInputProps extends SliderBaseProps, SliderPrimitiveProps {
  /**
   * 현재 값
   */
  value?: number;
  /**
   * 기본값
   */
  defaultValue?: number;
  /**
   * 값 포맷 함수 (표시용)
   */
  formatValue?: (value: number) => string;
  /**
   * 입력 필드 접미사
   */
  suffix?: string;
  /**
   * 값 변경 콜백
   */
  onChange?: (value: number) => void;
}

/**
 * SliderRangeInput 컴포넌트 Props (범위 슬라이더 + 입력 필드)
 */
export interface SliderRangeInputProps extends SliderBaseProps, SliderPrimitiveProps {
  /**
   * 현재 범위 값 [min, max]
   */
  value?: [number, number];
  /**
   * 기본 범위 값
   */
  defaultValue?: [number, number];
  /**
   * 값 포맷 함수 (표시용)
   */
  formatValue?: (value: number) => string;
  /**
   * 입력 필드 접미사
   */
  suffix?: string;
  /**
   * 범위 변경 콜백
   */
  onChange?: (value: [number, number]) => void;
}

/**
 * DataRangeSliderInput 컴포넌트 Props (데이터 범위 슬라이더 + 입력 필드)
 */
export interface DataRangeSliderInputProps extends SliderBaseProps, SliderPrimitiveProps {
  /**
   * 현재 범위 값 [min, max]
   */
  value?: [number, number];
  /**
   * 기본 범위 값
   */
  defaultValue?: [number, number];
  /**
   * 값 포맷 함수 (표시용)
   */
  formatValue?: (value: number) => string;
  /**
   * 입력 필드 접미사
   * @default '%'
   */
  suffix?: string;
  /**
   * 차트 데이터 (각 바의 높이를 0-1 사이 값으로 표현)
   */
  chartData?: number[];
  /**
   * 범위 변경 콜백
   */
  onChange?: (value: [number, number]) => void;
}
