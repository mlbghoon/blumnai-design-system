import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';
import { Button } from '../../button/Button';

interface DataGridErrorProps {
  error: string | ReactNode;
  onRetry?: () => void;
  /**
   * 명시적 고정 높이 (px). 지정 시 `min-height-200` 대신 정확히 이 높이를 차지하고
   * 내용은 수직 중앙 정렬. `fitLimitRowHeight=true` 일 때 body 와 동일한 높이를 유지하기 위해 사용됨.
   */
  fixedHeight?: number;
}

export function DataGridError({ error, onRetry, fixedHeight }: DataGridErrorProps) {
  const heightStyle = fixedHeight != null ? { height: `${fixedHeight}px` } : undefined;

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center padding-24 ds-gap-12',
        fixedHeight == null && 'min-height-200'
      )}
      style={heightStyle}
    >
      <Icon
        iconType={['system', 'error-warning']}
        size={32}
        color="destructive"
      />
      <div className="font-body size-sm text-subtle text-center">
        {typeof error === 'string' ? error : error}
      </div>
      {onRetry && (
        <Button
          buttonStyle="secondary"
          size="sm"
          onClick={onRetry}
        >
          다시 시도
        </Button>
      )}
    </div>
  );
}
