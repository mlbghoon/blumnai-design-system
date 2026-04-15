import { cn } from '@/lib/utils';

export interface SpinnerProps {
  /**
   * 스피너의 너비/높이 (px).
   * @default 16
   */
  size?: number;
  /**
   * 스피너 선 색상. CSS 색상 값 또는 CSS 변수.
   * @default 'currentColor'
   */
  color?: string;
  /**
   * 추가 className
   */
  className?: string;
}

/**
 * DS 내부 전용 로딩 스피너 primitive.
 *
 * Tailwind의 `animate-spin`을 사용하는 2-circle SVG. Button, Input, Textarea
 * 등 로딩 상태가 필요한 컴포넌트에서 공통으로 사용합니다.
 *
 * `src/index.ts`에서 공개 export되지 않습니다 — 내부 전용입니다.
 * 외부 consumer가 필요해지면 별도 PR에서 export 여부를 결정하세요.
 */
export function Spinner({
  size = 16,
  color = 'currentColor',
  className,
}: SpinnerProps) {
  return (
    <svg
      className={cn('animate-spin shrink-0', className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="32"
        strokeDashoffset="32"
        opacity="0.3"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="32"
        strokeDashoffset="24"
      />
    </svg>
  );
}
