import { cn } from '@/lib/utils';
import { Avatar } from '../../avatar/Avatar';

interface CellAvatarProps {
  src?: string;
  name?: string;
  initials?: string;
  size?: '2xs' | 'xs' | 'sm' | 'md';
  showName?: boolean;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function CellAvatar({
  src,
  name,
  initials,
  size = '2xs',
  showName = true,
}: CellAvatarProps) {
  const avatarInitials = initials ?? (name ? getInitials(name) : undefined);
  const variant = src ? 'userpic' : avatarInitials ? 'initials' : 'empty';

  return (
    <div className="flex items-center ds-gap-8">
      <Avatar
        variant={variant}
        src={src}
        initials={avatarInitials}
        size={size}
      />
      {showName && name && (
        <span className={cn('truncate font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-default')}>
          {name}
        </span>
      )}
    </div>
  );
}
