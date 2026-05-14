import { CellIcon } from '@blumnai-studio/blumnai-design-system';
import type { IconTypeWithFill } from '@blumnai-studio/blumnai-design-system/icons/icon-legacy';

// Dynamic icon source — codemod must NOT rewrite (no Ri* import added, JSX left as-is).
// Consumer needs to manually convert these to component refs after running codemod.
const iconMap: Record<string, IconTypeWithFill> = {
  ok: ['system', 'check'],
  warn: ['system', 'error-warning', true],
};

export function MyCell({ status }: { status: 'ok' | 'warn' }) {
  return <CellIcon iconType={iconMap[status]} color="default" />;
}
