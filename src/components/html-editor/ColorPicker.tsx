import { RiFontColor } from '@blumnai-studio/blumnai-design-system';
import { useState, useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import { cn } from '@/lib/utils';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../popover';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';
import { ToolbarButton } from './ToolbarButton';
import { DEFAULT_COLORS } from './HtmlEditor.constants';

interface ColorPickerProps {
  editor: Editor;
  colors?: string[];
  disabled?: boolean;
}

export function ColorPicker({
  editor,
  colors = DEFAULT_COLORS,
  disabled = false,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  const handleColorSelect = useCallback(
    (color: string) => {
      if (activeTab === 'text') {
        editor.chain().focus().setColor(color).run();
      } else {
        editor.chain().focus().toggleHighlight({ color }).run();
      }
      setOpen(false);
    },
    [editor, activeTab],
  );

  const handleClear = useCallback(() => {
    if (activeTab === 'text') {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().unsetHighlight().run();
    }
    setOpen(false);
  }, [editor, activeTab]);

  const currentColor =
    activeTab === 'text'
      ? (editor.getAttributes('textStyle').color as string | undefined)
      : (editor.getAttributes('highlight').color as string | undefined);

  const colorGrid = (
    <>
      <div className="grid grid-cols-7 ds-gap-4 margin-t-8">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleColorSelect(color)}
            title={color}
            className={cn(
              'width-24 height-24 rounded-xs border-none cursor-pointer',
              'transition-transform duration-150 hover:scale-110',
              'outline-none',
              currentColor === color &&
                'ring-2 ring-offset-1 ring-current',
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleClear}
        className={cn(
          'w-full margin-t-8 padding-y-4',
          'font-body size-xs line-height-leading-4 text-muted',
          'bg-transparent border-none cursor-pointer',
          'hover:text-default transition-colors duration-150',
          'outline-none',
        )}
      >
        색상 제거
      </button>
    </>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <ToolbarButton
            icon={RiFontColor}
            tooltip="글꼴/배경 색상"
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
        width={220}
        className="padding-8"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="underline" size="sm" type="fixed">
            <TabsTrigger value="text">글꼴색</TabsTrigger>
            <TabsTrigger value="background">배경색</TabsTrigger>
          </TabsList>
          <TabsContent value="text">{colorGrid}</TabsContent>
          <TabsContent value="background">{colorGrid}</TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
