import { isValidElement, type ReactNode } from 'react';

import { Icon } from '../icons/Icon';
import type { IconType } from '../icons/Icon/Icon.types';

/**
 * 아이콘 튜플 또는 ReactNode를 렌더링하는 공통 유틸리티
 */
export const renderButtonIcon = (
  icon: IconType | [string, string, boolean | string] | ReactNode,
  size: number,
  color: string,
): ReactNode => {
  if (!icon) return null;
  if (typeof icon === 'object' && !Array.isArray(icon) && Object.keys(icon as object).length === 0) return null;

  if (Array.isArray(icon) && (icon.length === 2 || icon.length === 3) && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
    const fillValue = icon[2] as boolean | string | undefined;
    const isFill = icon.length === 3 && (fillValue === true || fillValue === 'true');
    return <Icon iconType={[icon[0], icon[1]] as IconType} isFill={isFill} size={size} color={color} />;
  }

  if (!isValidElement(icon)) return null;
  return <span className="inline-flex items-center">{icon}</span>;
};
