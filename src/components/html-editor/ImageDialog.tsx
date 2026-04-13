import { useState, useCallback, useRef } from 'react';

import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';
import { Button } from '../button';
import { ToolbarButton } from './ToolbarButton';
import type { HtmlEditorImageUpload } from './HtmlEditor.types';

interface ImageDialogProps {
  imageUpload?: HtmlEditorImageUpload;
  onFileUpload: (file: File) => Promise<void>;
  onUrlInsert: (url: string) => void;
  disabled?: boolean;
}

function formatMaxSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(0)}MB`;
  return `${(bytes / 1024).toFixed(0)}KB`;
}

export function ImageDialog({
  imageUpload,
  onFileUpload,
  onUrlInsert,
  disabled = false,
}: ImageDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    imageUpload ? 'upload' : 'url',
  );
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (file: File) => {
      setError('');
      try {
        await onFileUpload(file);
        setOpen(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    },
    [onFileUpload],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [handleFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleUrlSubmit = useCallback(() => {
    if (!url.trim()) return;
    onUrlInsert(url);
    setOpen(false);
    setUrl('');
  }, [url, onUrlInsert]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setUrl('');
    setError('');
  }, []);

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setError('');
      setUrl('');
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <span>
          <ToolbarButton
            icon={['media', 'image']}
            tooltip="이미지"
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
        width={280}
        className="padding-12"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="underline" size="sm" type="fixed">
            {imageUpload && (
              <TabsTrigger value="upload">파일 업로드</TabsTrigger>
            )}
            <TabsTrigger value="url">주소</TabsTrigger>
          </TabsList>

          {imageUpload && (
            <TabsContent value="upload">
              <div className="flex flex-col ds-gap-8 margin-t-8">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="이미지 파일 업로드"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      fileInputRef.current?.click();
                    }
                  }}
                  className={cn(
                    'flex flex-col items-center justify-center padding-16 ds-gap-4',
                    'border-dashed border-darker rounded-md',
                    'cursor-pointer transition-colors duration-150',
                    'font-body size-sm line-height-leading-5 text-muted text-center',
                    isDragging && 'bg-state-soft border-strong',
                  )}
                >
                  <span>
                    클릭하거나 파일을 드롭하여
                    <br />
                    업로드하세요
                  </span>
                  {imageUpload.maxSize && (
                    <span className="size-xs text-hint">
                      최대 {formatMaxSize(imageUpload.maxSize)}
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
                {error && (
                  <p className="font-body size-xs line-height-leading-4 text-destructive">
                    {error}
                  </p>
                )}
                <div className="flex justify-end ds-gap-4">
                  <Button size="xs" buttonStyle="secondary" onClick={handleCancel}>
                    취소
                  </Button>
                </div>
              </div>
            </TabsContent>
          )}

          <TabsContent value="url">
            <div className="flex flex-col ds-gap-8 margin-t-8">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleUrlSubmit();
                  }
                }}
                placeholder="https://"
                className={cn(
                  'w-full padding-x-8 padding-y-6 rounded-sm',
                  'font-body size-sm line-height-leading-5 text-default',
                  'border-darker bg-input outline-none',
                  'focus:border-strong focus:shadow-component-input-focus',
                  'placeholder:text-hint',
                )}
              />
              <div className="flex justify-end ds-gap-4">
                <Button size="xs" buttonStyle="secondary" onClick={handleCancel}>
                  취소
                </Button>
                <Button
                  size="xs"
                  buttonStyle="primary"
                  onClick={handleUrlSubmit}
                  disabled={!url.trim()}
                >
                  입력
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
