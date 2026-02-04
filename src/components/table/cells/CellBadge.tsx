import { Badge } from '../../badge/Badge';
import type { BadgeColor } from '../../badge/Badge/Badge.types';

interface CellBadgeProps {
  label: string;
  color?: BadgeColor;
}

export function CellBadge({ label, color = 'neutral' }: CellBadgeProps) {
  return <Badge label={label} color={color} size="sm" />;
}
