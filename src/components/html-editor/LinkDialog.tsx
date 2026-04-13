import { useState, useCallback } from 'react';
import type { Editor } from '@tiptap/react';

import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../popover';
import { Button } from '../button';
import { ToolbarButton } from './ToolbarButton';

interface LinkDialogProps {
  editor: Editor;
  disabled?: boolean;
  getCurrentLink: () => { title: string; url: string } | null;
  onInsert: (title: string, url: string) => void;
}

export function LinkDialog({
  editor,
  disabled = false,
  getCurrentLink,
  onInsert,
}: LinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleOpen = useCallback(() => {
    const linkData = getCurrentLink();
    if (linkData) {
      setTitle(linkData.title);
      setUrl(linkData.url);
    } else {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, '');
      setTitle(selectedText);
      setUrl('');
    }
    setOpen(true);
  }, [getCurrentLink, editor]);

  const handleSubmit = useCallback(() => {
    if (!url.trim()) return;
    onInsert(title, url);
    setOpen(false);
    setTitle('');
    setUrl('');
  }, [title, url, onInsert]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setTitle('');
    setUrl('');
    editor.commands.focus();
  }, [editor]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <ToolbarButton
            icon={['editor', 'link']}
            tooltip="링크"
            isActive={open}
            onClick={() => open ? setOpen(false) : handleOpen()}
            disabled={disabled}
          />
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        width={260}
        className="padding-12"
      >
        <div className="flex flex-col ds-gap-8">
          <div className="flex flex-col ds-gap-4">
            <label htmlFor="html-editor-link-title" className="font-body size-sm line-height-leading-5 font-medium text-default">
              링크 제목
            </label>
            <input
              id="html-editor-link-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                'w-full padding-x-8 padding-y-6 rounded-sm',
                'font-body size-sm line-height-leading-5 text-default',
                'border-darker bg-input outline-none',
                'focus:border-strong focus:shadow-component-input-focus',
              )}
            />
          </div>

          <div className="flex flex-col ds-gap-4">
            <label htmlFor="html-editor-link-url" className="font-body size-sm line-height-leading-5 font-medium text-default">
              링크 타겟
            </label>
            <input
              id="html-editor-link-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://"
              className={cn(
                'w-full padding-x-8 padding-y-6 rounded-sm',
                'font-body size-sm line-height-leading-5 text-default',
                'border-darker bg-input outline-none',
                'focus:border-strong focus:shadow-component-input-focus',
                'placeholder:text-hint',
              )}
            />
          </div>

          <div className="flex justify-end ds-gap-4">
            <Button size="xs" buttonStyle="secondary" onClick={handleCancel}>
              취소
            </Button>
            <Button
              size="xs"
              buttonStyle="primary"
              onClick={handleSubmit}
              disabled={!url.trim()}
            >
              입력
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
