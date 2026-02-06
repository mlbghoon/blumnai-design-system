/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

import { Icon } from '../icons/Icon';
import { Avatar } from '../avatar/Avatar/Avatar';
import { cn } from '../../lib/utils';
import { useSidebar } from '../ui/sidebar';

import type { SidebarUserbarProps } from './Sidebar.types';

const AVATAR_SIZE_MAP = {
  variant1: 'sm' as const,
  variant2: 'md' as const,
  variant3: 'sm' as const,
};

const COLLAPSED_AVATAR_SIZE_MAP = {
  variant1: 'sm' as const,
  variant2: 'md' as const,
  variant3: 'md' as const,
};

const userbarVariants = cva(
  'flex w-full items-center font-body text-default transition-colors rounded-sm cursor-pointer',
  {
    variants: {
      variant: {
        variant1: 'height-32 padding-6 gap-6',
        variant2: 'height-64 padding-12 gap-12',
        variant3: 'height-48 padding-12 gap-12',
      },
      state: {
        default: 'hover:bg-state-ghost-hover',
        hover: 'bg-state-ghost-hover',
        opened: 'bg-state-soft',
      },
    },
    defaultVariants: {
      variant: 'variant3',
      state: 'default',
    },
  }
);

const collapsedUserbarVariants = cva(
  'flex items-center justify-center font-body text-default transition-colors rounded-sm cursor-pointer',
  {
    variants: {
      variant: {
        variant1: 'width-32 height-32',
        variant2: 'width-48 height-48',
        variant3: 'width-48 height-48',
      },
      state: {
        default: 'hover:bg-state-ghost-hover',
        hover: 'bg-state-ghost-hover',
        opened: 'bg-state-soft',
      },
    },
    defaultVariants: {
      variant: 'variant3',
      state: 'default',
    },
  }
);

export const SidebarUserbar = forwardRef<HTMLButtonElement, SidebarUserbarProps>(
  (
    {
      variant = 'variant3',
      collapsed,
      avatarSrc,
      avatarAlt,
      avatarInitials,
      name,
      email,
      isOpen = false,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar();
    const isCollapsed = collapsed ?? state === 'collapsed';
    const currentState = isOpen ? 'opened' : 'default';

    const avatarSize = isCollapsed
      ? COLLAPSED_AVATAR_SIZE_MAP[variant]
      : AVATAR_SIZE_MAP[variant];

    const renderAvatar = () => (
      <Avatar
        size={avatarSize}
        shape="circular"
        variant={avatarSrc ? 'userpic' : avatarInitials ? 'initials' : 'empty'}
        src={avatarSrc}
        alt={avatarAlt}
        initials={avatarInitials}
      />
    );

    const renderDropdownIcon = () => (
      <Icon
        iconType={['arrows', 'arrow-drop-down']}
        size={16}
        color="var(--icon-default-muted)"
        className={cn(
          'transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    );

    if (isCollapsed) {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className={cn(
            collapsedUserbarVariants({ variant, state: currentState }),
            className
          )}
          {...props}
        >
          {renderAvatar()}
        </button>
      );
    }

    if (variant === 'variant1') {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className={cn(
            userbarVariants({ variant, state: currentState }),
            className
          )}
          {...props}
        >
          {renderAvatar()}
          {name && (
            <span className="flex-1 truncate size-sm font-medium">{name}</span>
          )}
          {renderDropdownIcon()}
        </button>
      );
    }

    if (variant === 'variant2') {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className={cn(
            userbarVariants({ variant, state: currentState }),
            className
          )}
          {...props}
        >
          {renderAvatar()}
          <div className="flex flex-1 flex-col min-w-0 gap-1">
            {name && (
              <span className="truncate size-sm font-medium line-height-leading-5">{name}</span>
            )}
            {email && (
              <span className="truncate size-xs text-muted line-height-leading-4">{email}</span>
            )}
          </div>
          {renderDropdownIcon()}
        </button>
      );
    }

    // variant3 (default)
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          userbarVariants({ variant, state: currentState }),
          className
        )}
        {...props}
      >
        {renderAvatar()}
        {name && (
          <span className="flex-1 truncate size-sm font-medium">{name}</span>
        )}
        {renderDropdownIcon()}
      </button>
    );
  }
);

SidebarUserbar.displayName = 'SidebarUserbar';

export { userbarVariants, collapsedUserbarVariants };
