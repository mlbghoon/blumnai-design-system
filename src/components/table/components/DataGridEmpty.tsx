import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';

interface DataGridEmptyProps {
  text?: string;
  content?: ReactNode;
}

export function DataGridEmpty({
  text = '검색된 내용이 없습니다.',
  content,
}: DataGridEmptyProps) {
  if (content) {
    return <div className="padding-24">{content}</div>;
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center padding-24 ds-gap-12',
        'min-height-200'
      )}
    >
      <Icon
        iconType={['system', 'search']}
        size={32}
        color="default-muted"
      />
      <span className="font-body size-sm text-subtle">{text}</span>
    </div>
  );
}
