import { forwardRef } from 'react';

import { Avatar } from '../../avatar/Avatar';
import { Badge } from '../../badge/Badge';
import { cn } from '../../../utils/cn';

import { USERBAR_CONFIG } from './DropdownMenu.constants';
import type { DropdownMenuUserbarProps } from './DropdownMenu.types';

/**
 * DropdownMenuUserbar 컴포넌트
 *
 * 드롭다운 메뉴 내에 사용자 정보를 표시합니다.
 * 아바타, 이름, 설명, 뱃지를 포함합니다.
 */
export const DropdownMenuUserbar = forwardRef<HTMLDivElement, DropdownMenuUserbarProps>(({
  name,
  description,
  avatarSrc,
  avatarAlt,
  badge,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role="presentation"
      className={cn(USERBAR_CONFIG.container, className)}
      {...props}
    >
      {/* 아바타 */}
      <Avatar
        variant={avatarSrc ? 'userpic' : 'initials'}
        size="md"
        shape="rounded"
        src={avatarSrc}
        alt={avatarAlt || name}
        initials={avatarAlt || name}
      />

      {/* 이름 & 설명 */}
      <div className={USERBAR_CONFIG.labelContainer}>
        <span className={USERBAR_CONFIG.name}>{name}</span>
        {description && (
          <span className={USERBAR_CONFIG.description}>{description}</span>
        )}
      </div>

      {/* 뱃지 */}
      {badge && (
        <Badge
          size="sm"
          color="neutral"
          border
          label={badge}
        />
      )}
    </div>
  );
});

DropdownMenuUserbar.displayName = 'DropdownMenuUserbar';
