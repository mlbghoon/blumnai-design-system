import { useId } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { REQUIRED_STYLE } from 'constants/input/Input/Input.constants';
import { InputCaption } from './InputCaption';
import { resolveCaption } from './resolveCaption';

export interface InlineFieldWrapperProps {
  /**
   * 컨트롤 요소 (체크박스, 스위치, 라디오 등)
   */
  children: ReactNode;
  /**
   * 라벨 텍스트
   */
  label?: ReactNode;
  /**
   * 라벨 아래 설명 텍스트
   */
  description?: ReactNode;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
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
   * 비활성화 상태 (텍스트 색상에 영향)
   */
  disabled?: boolean;
  /**
   * 컨트롤 위치 (라벨 기준)
   * @default 'left'
   */
  controlPosition?: 'left' | 'right';
  /**
   * 컨트롤 높이에 맞춘 라벨 라인 높이 클래스 (예: 'height-20')
   */
  labelLineHeight: string;
  /**
   * 라벨 텍스트 타이포그래피 클래스 (예: 'size-sm line-height-leading-5')
   */
  labelTextClassName: string;
  /**
   * 설명 텍스트 타이포그래피 클래스
   */
  descTextClassName: string;
  /**
   * 라벨과 설명 사이의 정렬
   * @default 'start'
   */
  align?: 'start' | 'center';
  /**
   * 라벨 font-weight 클래스
   * @default 'font-medium'
   */
  labelWeight?: string;
  /**
   * 캡션 요소의 id (aria-describedby 연결용).
   * 외부에서 제공하지 않으면 내부에서 생성합니다.
   */
  captionId?: string;
  /**
   * 외부 컨테이너에 적용할 추가 className
   */
  className?: string;
}

/**
 * 인라인 폼 필드 래퍼
 *
 * Checkbox, Switch, Radio 등 인라인 폼 컨트롤의 라벨, 설명, 캡션, 에러/성공 상태를
 * 일관된 레이아웃으로 렌더링합니다.
 */
export const InlineFieldWrapper = ({
  children,
  label,
  description,
  required = false,
  error,
  success,
  caption,
  disabled = false,
  controlPosition = 'left',
  labelLineHeight,
  labelTextClassName,
  descTextClassName,
  align = 'start',
  labelWeight = 'font-medium',
  captionId: captionIdProp,
  className,
}: InlineFieldWrapperProps) => {
  const internalId = useId();
  const { hasError, hasSuccess, captionText, showCaption } = resolveCaption(error, success, caption);
  const captionElId = showCaption ? (captionIdProp || `${internalId}-caption`) : undefined;

  if (!label && !description) {
    return <>{children}</>;
  }

  const labelBlock = (
    <label
      className={cn(
        'inline-flex ds-gap-10',
        align === 'center' ? 'items-center' : description ? 'items-start' : 'items-center',
        controlPosition === 'right' && 'flex-row-reverse',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <div className={cn(labelLineHeight, 'flex items-center shrink-0')}>
        {children}
      </div>
      <div className="flex flex-col ds-gap-4">
        {label && (
          <span
            className={cn(
              'font-body letter-spacing-tracking-normal select-none',
              labelTextClassName,
              labelWeight,
              disabled ? 'text-hint' : 'text-default',
            )}
          >
            {label}
            {required && <span className={cn(REQUIRED_STYLE, 'margin-l-2')}>*</span>}
          </span>
        )}
        {description && (
          <span
            className={cn(
              'font-body letter-spacing-tracking-normal select-none',
              descTextClassName,
              disabled ? 'text-hint' : 'text-subtle',
            )}
          >
            {description}
          </span>
        )}
      </div>
    </label>
  );

  if (!showCaption) {
    return labelBlock;
  }

  return (
    <div className="inline-flex flex-col">
      {labelBlock}
      <InputCaption
        id={captionElId}
        error={hasError}
        success={hasSuccess}
      >
        {captionText}
      </InputCaption>
    </div>
  );
};

InlineFieldWrapper.displayName = 'InlineFieldWrapper';
