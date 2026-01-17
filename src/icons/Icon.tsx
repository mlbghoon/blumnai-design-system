import { cloneElement, forwardRef, isValidElement, memo } from 'react';
import type { ReactElement, SVGProps } from 'react';

import type { Props } from './Icon.types';

interface IconElementProps extends Props {
  /** 아이콘의 SVG 요소 */
  children: ReactElement<SVGProps<SVGSVGElement>>;
}

const IconComponent = forwardRef<SVGSVGElement, IconElementProps>(({ 
  size = 24, 
  title, 
  color,
  cursor,
  focusable = false,
  className,
  style,
  children, 
  ...svgProps 
}, ref) => {
  const ariaProps = title ? ({ role: 'img', 'aria-label': title } as const) : ({ 'aria-hidden': true } as const);

  // 고정 색상 아이콘인지 확인 (파일 아이콘, 플래그, 브랜드)
  // 이 아이콘들은 자식 경로에 고유한 색상을 가지며 fill을 덮어쓰면 안 됨
  // SVG에 fill="none"이 명시적으로 있는지 확인하여 감지 (고정 색상 아이콘의 일반적인 패턴)
  const isFixedColorIcon = isValidElement(children) && 
    children.type === 'svg' &&
    children.props.fill === 'none';

  const iconStyle: React.CSSProperties = {
    ...style,
    ...(isFixedColorIcon
      ? {}
      : color 
        ? { color, fill: color }
        : { fill: 'currentColor' }
    ),
    ...(cursor && { cursor }),
  };

  const mergedClassName = className ? className : undefined;

  const clonedProps: Partial<SVGProps<SVGSVGElement>> = {
    ...svgProps,
    ref,
    focusable,
    ...ariaProps,
    width: size,
    height: size,
    className: mergedClassName,
    style: iconStyle,
    ...(isFixedColorIcon ? {} : { fill: color || 'currentColor' }),
  };

  return cloneElement(children, clonedProps);
});

IconComponent.displayName = 'Icon';

export const Icon = memo(IconComponent);

