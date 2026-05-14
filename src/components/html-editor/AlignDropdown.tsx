import { useState, useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import { RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify } from '@remixicon/react';

import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../popover';
import { ToolbarButton } from './ToolbarButton';
import { TOOLBAR_GROUP } from './HtmlEditor.constants';
import type { RemixiconLikeComponent } from '../icons/Icon/Icon.types';

interface AlignDropdownProps {
  editor: Editor;
  disabled?: boolean;
}

const ALIGN_OPTIONS: { value: string; icon: RemixiconLikeComponent; label: string }[] = [
  { value: 'left', icon: RiAlignLeft, label: '왼쪽 정렬' },
  { value: 'center', icon: RiAlignCenter, label: '가운데 정렬' },
  { value: 'right', icon: RiAlignRight, label: '오른쪽 정렬' },
  { value: 'justify', icon: RiAlignJustify, label: '양쪽 정렬' },
];

function getCurrentAlign(editor: Editor): string {
  for (const opt of ALIGN_OPTIONS) {
    if (editor.isActive({ textAlign: opt.value })) return opt.value;
  }
  return 'left';
}

export function AlignDropdown({
  editor,
  disabled = false,
}: AlignDropdownProps) {
  const [open, setOpen] = useState(false);

  const currentAlign = getCurrentAlign(editor);
  const currentIcon = ALIGN_OPTIONS.find((o) => o.value === currentAlign)?.icon || ALIGN_OPTIONS[0].icon;

  const handleSelect = useCallback(
    (align: string) => {
      editor.chain().focus().setTextAlign(align).run();
      setOpen(false);
    },
    [editor],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <ToolbarButton
            icon={currentIcon}
            tooltip="텍스트 정렬"
            isActive={open}
            onClick={() => setOpen(!open)}
            disabled={disabled}
          />
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        width="auto"
        className="padding-4"
      >
        <div className={cn(TOOLBAR_GROUP)}>
          {ALIGN_OPTIONS.map((opt) => (
            <ToolbarButton
              key={opt.value}
              icon={opt.icon}
              tooltip={opt.label}
              isActive={currentAlign === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
