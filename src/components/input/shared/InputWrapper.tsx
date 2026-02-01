import type { ReactNode } from 'react';

import { cn } from '../../../utils/cn';
import { INPUT_CONTAINER_BASE } from 'constants/input/Input/Input.constants';
import { InputLabel } from './InputLabel';
import { InputCaption } from './InputCaption';

export interface InputWrapperProps {
  /**
   * 래퍼 내부에 렌더링할 입력 컨텐츠
   */
  children: ReactNode;
  /**
   * 입력 필드 위에 표시되는 라벨 텍스트
   */
  label?: string;
  /**
   * 입력 필드의 id (라벨 연결용)
   */
  inputId?: string;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
  /**
   * 라벨 옆에 표시되는 보조 텍스트
   */
  supportText?: string;
  /**
   * 입력 필드 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * 입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 래퍼에 적용할 추가 className
   */
  className?: string;
}

/**
 * InputWrapper 컴포넌트
 *
 * 라벨, 캡션, 에러/성공 상태를 처리하는 컨테이너 컴포넌트입니다.
 * 모든 입력 필드 변형에서 일관된 레이아웃과 스타일링을 위해 사용됩니다.
 */
export const InputWrapper = ({
  children,
  label,
  inputId,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  className,
}: InputWrapperProps) => {
  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const errorText = typeof error === 'string' && error.length > 0 ? error : undefined;
  const successText = typeof success === 'string' && success.length > 0 ? success : undefined;
  const captionText = errorText || successText || caption;
  const showCaption = captionText !== undefined && captionText.length > 0;

  return (
    <div
      className={cn(INPUT_CONTAINER_BASE, width === undefined && 'w-full', className)}
      style={width !== undefined ? { width: typeof width === 'number' ? `${width}px` : /^\d+$/.test(width) ? `${width}px` : width } : undefined}
    >
      {(label || supportText) && (
        <InputLabel
          htmlFor={inputId}
          required={required}
          supportText={supportText}
        >
          {label}
        </InputLabel>
      )}

      {children}

      {showCaption && (
        <InputCaption
          id={inputId ? `${inputId}-caption` : undefined}
          error={hasError}
          success={hasSuccess}
        >
          {captionText}
        </InputCaption>
      )}
    </div>
  );
};

InputWrapper.displayName = 'InputWrapper';
