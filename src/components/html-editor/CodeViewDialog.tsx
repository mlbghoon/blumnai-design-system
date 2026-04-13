import { useCallback } from 'react';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '../dialog';
import { Button } from '../button';
import { calculateContentSize } from './utils';
import { COUNT_STYLE } from './HtmlEditor.constants';

interface CodeViewDialogProps {
  open: boolean;
  html: string;
  onHtmlChange: (html: string) => void;
  onConfirm: (html: string) => void;
  onCancel: () => void;
  maxContentSize?: number;
}

export function CodeViewDialog({
  open,
  html,
  onHtmlChange,
  onConfirm,
  onCancel,
  maxContentSize,
}: CodeViewDialogProps) {
  const contentSize = calculateContentSize(html);

  const formatSize = useCallback((bytes: number): string => {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    if (kb >= 1) return `${kb.toFixed(1)} KB`;
    return `${bytes} Bytes`;
  }, []);

  const maxDisplay = maxContentSize
    ? formatSize(maxContentSize)
    : '5 MB';

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>HTML 소스 코드</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col ds-gap-4">
          <textarea
            aria-label="HTML 소스 코드"
            value={html}
            onChange={(e) => onHtmlChange(e.target.value)}
            className={cn(
              'w-full min-h-[400px] padding-12 rounded-md',
              'font-code size-sm line-height-leading-5 text-default',
              'border-darker bg-input outline-none resize-y',
              'focus:border-strong focus:shadow-component-input-focus',
            )}
            spellCheck={false}
          />
          <div className={cn('flex justify-end', COUNT_STYLE)}>
            {formatSize(contentSize)} / {maxDisplay}
          </div>
        </div>

        <DialogFooter>
          <Button buttonStyle="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button buttonStyle="primary" onClick={() => onConfirm(html)}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
