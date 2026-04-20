import { cn } from '@/lib/utils';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill, IconColor } from '../../icons/Icon/Icon.types';
import { useTableFontSize, getTableFontClasses } from '../components/TableFontSizeContext';

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
  const fontSize = useTableFontSize();

  return (
    <div className={cn('flex items-center ds-gap-6', className)}>
      <Icon iconType={parsedIconType} size={size} color={color} isFill={isFill} />
      {label && (
        <span className={cn('font-body letter-spacing-tracking-tight text-default', getTableFontClasses(fontSize))}>{label}</span>
      )}
    </div>
  );
}
