import { useState, useCallback } from 'react';
import type { Editor } from '@tiptap/react';

import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../popover';
import { Icon } from '../icons/Icon';
import { BLOCK_TYPE_OPTIONS } from './HtmlEditor.constants';
import type { HtmlEditorFeature } from './HtmlEditor.types';

interface BlockTypeDropdownProps {
  editor: Editor;
  disabled?: boolean;
  enabledFeatures: Set<HtmlEditorFeature>;
}

function getCurrentBlockType(editor: Editor): string {
  if (editor.isActive('codeBlock')) return 'codeBlock';
  if (editor.isActive('blockquote')) return 'blockquote';
  for (let level = 1; level <= 6; level++) {
    if (editor.isActive('heading', { level })) return `heading-${level}`;
  }
  return 'paragraph';
}

function getCurrentBlockLabel(editor: Editor): string {
  const type = getCurrentBlockType(editor);
  const option = BLOCK_TYPE_OPTIONS.find((o) => o.value === type);
  return option?.label || '표준';
}

export function BlockTypeDropdown({
  editor,
  disabled = false,
  enabledFeatures,
}: BlockTypeDropdownProps) {
  const [open, setOpen] = useState(false);

  const filteredOptions = BLOCK_TYPE_OPTIONS.filter((option) => {
    if (option.value === 'paragraph') return true;
    if (option.value.startsWith('heading-')) return enabledFeatures.has('heading');
    if (option.value === 'blockquote') return enabledFeatures.has('blockquote');
    if (option.value === 'codeBlock') return enabledFeatures.has('codeBlock');
    return true;
  });

  const handleSelect = useCallback(
    (blockType: string) => {
      switch (blockType) {
        case 'paragraph':
          editor.chain().focus().setParagraph().run();
          break;
        case 'blockquote':
          editor.chain().focus().toggleBlockquote().run();
          break;
        case 'codeBlock':
          editor.chain().focus().toggleCodeBlock().run();
          break;
        default: {
          const match = blockType.match(/^heading-(\d)$/);
          if (match) {
            const level = parseInt(match[1]) as 1 | 2 | 3 | 4 | 5 | 6;
            editor.chain().focus().toggleHeading({ level }).run();
          }
          break;
        }
      }
      setOpen(false);
    },
    [editor],
  );

  const currentType = getCurrentBlockType(editor);
  const currentLabel = getCurrentBlockLabel(editor);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex items-center ds-gap-4 padding-x-8 padding-y-4 height-28 rounded-sm',
            'bg-state-soft hover:bg-state-soft-hover active:bg-state-soft-press',
            'font-body size-sm line-height-leading-5 text-default whitespace-nowrap',
            'cursor-pointer transition-colors duration-150',
            'border-none outline-none shrink-0',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <span className="width-40 text-left">{currentLabel}</span>
          <Icon
            iconType={['arrows', 'arrow-drop-down']}
            size={14}
            color="default-subtle"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        width={140}
        className="padding-4"
      >
        <div className="flex flex-col">
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full text-left padding-x-8 padding-y-6 rounded-sm',
                'font-body size-sm line-height-leading-5',
                'cursor-pointer transition-colors duration-150',
                'border-none outline-none',
                currentType === option.value
                  ? 'bg-state-primary text-white-default'
                  : 'text-default hover:bg-state-soft-hover',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
