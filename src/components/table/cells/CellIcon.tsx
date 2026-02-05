import { cn } from '@/lib/utils';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill, IconColor } from '../../icons/Icon/Icon.types';

interface CellIconProps {
  iconType: IconTypeWithFill;
  size?: number;
  color?: IconColor;
  label?: string;
  className?: string;
}

export function CellIcon({
  iconType,
  size = 16,
  color = 'default',
  label,
  className,
}: CellIconProps) {
  const { iconType: parsedIconType, isFill } = parseIconTypeWithFill(iconType);

  return (
    <div className={cn('flex items-center gap-6', className)}>
      <Icon iconType={parsedIconType} size={size} color={color} isFill={isFill} />
      {label && (
        <span className="font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-default">{label}</span>
      )}
    </div>
  );
}
