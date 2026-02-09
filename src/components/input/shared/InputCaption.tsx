import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../utils/cn';
import { CAPTION_STYLE, ERROR_CAPTION_STYLE, SUCCESS_CAPTION_STYLE } from 'constants/input/Input/Input.constants';

export interface InputCaptionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 캡션 텍스트 컨텐츠
   */
  children: ReactNode;
  /**
   * 에러 스타일 표시 여부
   * @default false
   */
  error?: boolean;
  /**
   * 성공 스타일 표시 여부
   * @default false
   */
  success?: boolean;
}

/**
 * InputCaption 컴포넌트
 *
 * 입력 필드용 캡션/설명 텍스트 컴포넌트입니다.
 * 기본, 에러, 성공 스타일을 지원합니다.
 */
export const InputCaption = ({
  children,
  error = false,
  success = false,
  className,
  ...props
}: InputCaptionProps) => {
  return (
    <div
      className={cn(
        'margin-t-4',
        error ? ERROR_CAPTION_STYLE : success ? SUCCESS_CAPTION_STYLE : CAPTION_STYLE,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

InputCaption.displayName = 'InputCaption';
