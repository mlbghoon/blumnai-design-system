import { cn } from '@/lib/utils';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill, IconColor } from '../../icons/Icon/Icon.types';
import { useTableFontSize, getTableFontClasses } from '../components/TableFontSizeContext';

declare const process: { env: { NODE_ENV?: string } } | undefined;

interface CellIconProps {
  /**
   * [category, name] / [category, name, isFill] tuple.
   *
   * @deprecated will be removed in v2.0.0 — a new `icon: RemixiconLikeComponent` prop will replace it.
   * Run `npx blumnai-icon-codemod ./src` to auto-migrate, or import from
   * `@blumnai-studio/blumnai-design-system/icons/icon-legacy` as an escape hatch.
   * See MIGRATION.md.
   */
  iconType: IconTypeWithFill;
  size?: number;
  color?: IconColor;
  label?: string;
  className?: string;
}

const seenLegacyCellIconTuples = new Set<string>();

function warnLegacyCellIconType(icon: IconTypeWithFill): void {
  const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
  if (!isDev) return;

  const key = icon.join('|');
  if (seenLegacyCellIconTuples.has(key)) return;
  seenLegacyCellIconTuples.add(key);

  const [cat, name, isFill] = icon;
  const tupleParts: string[] = [`'${cat}'`, `'${name}'`];
  if (isFill === true) tupleParts.push('true');
  const tupleStr = `[${tupleParts.join(', ')}]`;

  console.warn(
    `[blumnai-design-system] <CellIcon iconType=${tupleStr}> is deprecated and will be removed in v2.0.0. ` +
    `A new \`icon\` prop accepting a Remixicon component reference will replace it. ` +
    `Run \`npx blumnai-icon-codemod ./src\` to auto-migrate, ` +
    `or import from '@blumnai-studio/blumnai-design-system/icons/icon-legacy' as an escape hatch. ` +
    `See MIGRATION.md.`
  );
}

export function CellIcon({
  iconType,
  size = 16,
  color = 'default',
  label,
  className,
}: CellIconProps) {
  warnLegacyCellIconType(iconType);
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
