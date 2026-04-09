import { forwardRef, useId } from 'react';

import { cn } from '@/lib/utils';
import { FormItemContext } from './FormContext';
import type { FormItemProps } from './Form.types';

/**
 * FormItem 컴포넌트
 *
 * 폼 필드를 감싸는 컨테이너로, 고유 ID를 생성하여 접근성 연결에 사용됩니다.
 */
export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, children, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('flex flex-col ds-gap-6', className)} {...props}>
          {children}
        </div>
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = 'FormItem';
