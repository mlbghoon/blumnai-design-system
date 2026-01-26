import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import { LABEL_CONFIG } from './DropdownMenu.constants';
import type { DropdownMenuLabelProps } from './DropdownMenu.types';

/**
 * DropdownMenuLabel 컴포넌트
 *
 * 드롭다운 메뉴의 섹션 라벨입니다.
 * 메뉴 아이템들을 그룹으로 구분할 때 사용합니다.
 */
export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(({
  children,
  caption,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role="presentation"
      className={cn(LABEL_CONFIG.container, className)}
      {...props}
    >
      <div className={cn(LABEL_CONFIG.inner, 'justify-between')}>
        <span className={LABEL_CONFIG.text}>{children}</span>
        {caption && (
          <span className="font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
});

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
