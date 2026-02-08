import { forwardRef } from 'react';

import { cn } from '../../utils/cn';
import { CAPTION_STYLE } from '../../constants/input/Input/Input.constants';
import { useFormField } from './useFormField';
import type { FormDescriptionProps } from './Form.types';

/**
 * FormDescription 컴포넌트
 *
 * 필드에 대한 도움말 텍스트를 표시합니다.
 */
export const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn(CAPTION_STYLE, className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

FormDescription.displayName = 'FormDescription';
