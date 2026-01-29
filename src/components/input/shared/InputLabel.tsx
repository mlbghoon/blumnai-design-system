import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../utils/cn';
import { LABEL_STYLE, SUPPORT_TEXT_STYLE, REQUIRED_STYLE } from 'constants/input/Input/Input.constants';

export interface InputLabelProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * 라벨 텍스트 컨텐츠
   */
  children: ReactNode;
  /**
   * 이 라벨이 연결되는 입력 필드의 id
   */
  htmlFor?: string;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
  /**
   * 라벨 옆에 표시되는 보조 텍스트
   */
  supportText?: string;
}

/**
 * InputLabel 컴포넌트
 *
 * 필수 표시와 보조 텍스트를 지원하는 입력 필드용 라벨 컴포넌트입니다.
 */
export const InputLabel = ({
  children,
  htmlFor,
  required = false,
  supportText,
  className,
  ...props
}: InputLabelProps) => {
  return (
    <div className="flex items-center gap-4 mb-1">
      <label
        htmlFor={htmlFor}
        className={cn(LABEL_STYLE, 'select-none', className)}
        {...props}
      >
        {children}
        {required && <span className={cn(REQUIRED_STYLE, 'ml-0.5')}>*</span>}
      </label>
      {supportText && (
        <span className={SUPPORT_TEXT_STYLE}>{supportText}</span>
      )}
    </div>
  );
};

InputLabel.displayName = 'InputLabel';
