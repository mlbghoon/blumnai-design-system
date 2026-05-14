import { CellIcon } from '@blumnai-studio/blumnai-design-system';
import type { IconTypeWithFill } from '@blumnai-studio/blumnai-design-system/icons/icon-legacy';

// 동적 아이콘 소스 — codemod 가 변환하지 않음 (Ri* import 추가 X, JSX 유지)
// codemod 실행 후 소비자가 수동으로 component-ref 형태로 변환 필요
const iconMap: Record<string, IconTypeWithFill> = {
  ok: ['system', 'check'],
  warn: ['system', 'error-warning', true],
};

export function MyCell({ status }: { status: 'ok' | 'warn' }) {
  return <CellIcon iconType={iconMap[status]} color="default" />;
}
