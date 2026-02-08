import { forwardRef } from 'react';

import { cn } from '../../utils/cn';
import { ERROR_CAPTION_STYLE } from '../../constants/input/Input/Input.constants';
import { useFormField } from './useFormField';
import type { FormErrorProps } from './Form.types';

/**
 * FormError 컴포넌트
 *
 * 필드 에러 메시지를 표시합니다.
 * Checkbox, Radio, Switch 등 자체 error prop이 없는 컴포넌트와 함께 사용합니다.
 */
export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? '') : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(ERROR_CAPTION_STYLE, className)}
        {...props}
      >
        {body}
      </p>
    );
  }
);

FormError.displayName = 'FormError';
