import type { ReactNode } from 'react';

import { renderIconProp, type IconPropOrNode } from '../icons/Icon';

/**
 * 아이콘 prop (tuple / Remixicon component / ReactNode) 을 렌더링하는 공통 유틸리티.
 */
export const renderButtonIcon = (icon: IconPropOrNode, size: number, color: string): ReactNode =>
  renderIconProp(icon, { size, color });
