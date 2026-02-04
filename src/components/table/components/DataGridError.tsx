import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';
import { Button } from '../../button/Button';

interface DataGridErrorProps {
  error: string | ReactNode;
  onRetry?: () => void;
}

export function DataGridError({ error, onRetry }: DataGridErrorProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center padding-24 gap-12',
        'min-height-200'
      )}
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
