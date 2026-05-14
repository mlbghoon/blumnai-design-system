import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';
import type { RemixiconLikeComponent, IconColor } from '../../icons/Icon/Icon.types';
import { useTableFontSize, getTableFontClasses } from '../components/TableFontSizeContext';

interface CellIconProps {
  /**
   * 아이콘 컴포넌트 직접 전달.
   *
   * @example
   * ```tsx
   * import { CellIcon, RiCheckLine } from '@blumnai-studio/blumnai-design-system';
   * <CellIcon icon={RiCheckLine} />
   * ```
   *
   * @note v2.0 — `iconType` (tuple form)이 제거되고 `icon` prop으로 교체됐습니다.
   * Tuple form이 필요하면 `@blumnai-studio/blumnai-design-system/icons/icon-legacy` 의
   * `Icon` (= `LegacyIcon`)을 직접 렌더하세요.
   */
  icon: RemixiconLikeComponent;
  size?: number;
  color?: IconColor;
  label?: string;
  className?: string;
}

export function CellIcon({
  icon,
  size = 16,
  color = 'default',
  label,
  className,
}: CellIconProps) {
  const fontSize = useTableFontSize();

  return (
    <div className={cn('flex items-center ds-gap-6', className)}>
      <Icon icon={icon} size={size} color={color} />
      {label && (
        <span className={cn('font-body letter-spacing-tracking-tight text-default', getTableFontClasses(fontSize))}>{label}</span>
      )}
    </div>
  );
}
