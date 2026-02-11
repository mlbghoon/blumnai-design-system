import { forwardRef } from 'react';

import {
  CursorArrowIcon,
  CursorHandClosedIcon,
  CursorHandOpenIcon,
  CursorNotAllowedIcon,
  CursorPointerIcon,
  CursorTextIcon,
} from './icons/all';

import type { CursorIconProps } from './CursorIcon.types';

/** 커서/포인터 아이콘 컴포넌트. TypeScript 자동완성 지원 */
export const CursorIcon = forwardRef<SVGSVGElement, CursorIconProps>(({
  cursorType,
  size = 24,
  className,
  ...props
}, ref) => {
  const iconProps = { ref, size, className, ...props };

  switch (cursorType) {
    case 'arrow':
      return <CursorArrowIcon {...iconProps} />;
    case 'hand-closed':
      return <CursorHandOpenIcon {...iconProps} />;
    case 'hand-open':
      return <CursorHandClosedIcon {...iconProps} />;
    case 'not-allowed':
      return <CursorNotAllowedIcon {...iconProps} />;
    case 'pointer':
      return <CursorPointerIcon {...iconProps} />;
    case 'text':
      return <CursorTextIcon {...iconProps} />;
    default:
      return null;
  }
});

CursorIcon.displayName = 'CursorIcon';
