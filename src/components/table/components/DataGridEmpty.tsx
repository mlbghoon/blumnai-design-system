import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Icon, RiSearchLine } from '../../icons/Icon';

interface DataGridEmptyProps {
  text?: string;
  content?: ReactNode;
  /**
   * 명시적 고정 높이 (px). 지정 시 `min-height-200` 대신 정확히 이 높이를 차지하고
   * 내용은 수직 중앙 정렬. `fitLimitRowHeight=true` 일 때 body 와 동일한 높이를 유지하기 위해
   * 사용됨. 미지정 시 기본 `min-height-200` 동작.
   */
  fixedHeight?: number;
}

export function DataGridEmpty({
  text = '검색된 내용이 없습니다.',
  content,
  fixedHeight,
}: DataGridEmptyProps) {
  const heightStyle = fixedHeight != null ? { height: `${fixedHeight}px` } : undefined;

  if (content) {
    return (
      <div
        role="status"
        className={cn('padding-24', fixedHeight != null && 'flex items-center justify-center')}
        style={heightStyle}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center padding-24 ds-gap-12',
        fixedHeight == null && 'min-height-200'
      )}
      style={heightStyle}
    >
      <Icon
        icon={RiSearchLine}
        size={32}
        color="default-muted"
      />
      <span className="font-body size-sm text-subtle">{text}</span>
    </div>
  );
}
