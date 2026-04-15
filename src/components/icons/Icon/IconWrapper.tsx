/**
 * 내부 아이콘 래퍼 컴포넌트
 * 자동 생성된 아이콘 파일에서 공통 props(size, color, style) 적용에 사용
 * 사용자는 이 컴포넌트 대신 Icon, BrandIcon, FlagIcon 등을 사용해야 함
 */
import { cloneElement, forwardRef, isValidElement, type ReactNode } from 'react';

import type { Props } from './IconWrapper.types';

export const Icon = forwardRef<SVGSVGElement, Props & { children: ReactNode }>(
  (
    {
      children,
      size = 24,
      color,
      cursor,
      title,
      focusable = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    if (!isValidElement(children)) {
      return null;
    }

    const svgProps: Record<string, unknown> = {
      ref,
      width: size,
      height: size,
      'aria-hidden': title ? undefined : true,
      'aria-label': title,
      role: title ? 'img' : undefined,
      focusable: focusable ? 'true' : 'false',
      tabIndex: focusable ? 0 : undefined,
      className,
      style: {
        ...style,
        color: color || undefined,
        fill: color || 'currentColor',
        ...(cursor ? { cursor } : undefined),
      },
      ...props,
    };

    return cloneElement(children, svgProps);
  }
);

Icon.displayName = 'IconWrapper';
