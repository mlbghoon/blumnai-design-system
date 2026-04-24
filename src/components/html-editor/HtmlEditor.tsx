import { forwardRef, useId, useImperativeHandle, useMemo } from 'react';
import { EditorContent } from '@tiptap/react';

import { cn } from '@/lib/utils';
import { InputWrapper } from '../input/shared/InputWrapper';
import { ScrollArea } from '../scroll-area';
import { Toolbar } from './Toolbar';
import { CodeViewDialog } from './CodeViewDialog';
import { useHtmlEditor } from './useHtmlEditor';
import {
  EDITOR_WRAPPER,
  EDITOR_WRAPPER_FOCUS,
  EDITOR_CONTENT_BASE,
  STATE_CONFIG,
  COUNT_STYLE,
  DEFAULT_MIN_HEIGHT,
} from './HtmlEditor.constants';
import type { HtmlEditorProps, HtmlEditorRef } from './HtmlEditor.types';

import './HtmlEditor.css';

export const HtmlEditor = forwardRef<HtmlEditorRef, HtmlEditorProps>(
  (
    {
      defaultValue,
      value,
      onChange,
      placeholder,
      features,
      imageUpload,
      colors,
      onContentSizeChange,
      maxContentSize,
      showContentSize = false,
      disabled = false,
      readOnly = false,
      error,
      success,
      label,
      labelPosition,
      required,
      supportText,
      caption,
      compactToolbar = false,
      minHeight = DEFAULT_MIN_HEIGHT,
      maxHeight,
      className,
    },
    ref,
  ) => {
    const editorId = useId();

    const {
      editor,
      enabledFeatures,
      contentSize,
      isCodeViewOpen,
      codeViewHtml,
      setCodeViewHtml,
      openCodeView,
      confirmCodeView,
      cancelCodeView,
      handleImageFileUpload,
      handleImageUrlInsert,
      handleLinkInsert,
      handleLinkRemove,
      getCurrentLink,
    } = useHtmlEditor({
      defaultValue,
      value,
      onChange,
      placeholder,
      features,
      imageUpload,
      onContentSizeChange,
      maxContentSize,
      showContentSize,
      disabled,
      readOnly,
    });

    useImperativeHandle(ref, () => ({
      editor,
      focus: () => editor?.commands.focus(),
      getHTML: () => editor?.getHTML() || '',
    }));

    // maxContentSize 초과는 `error` prop 과 동일한 시각 상태 (빨간 테두리 + 빨간
     // 인디케이터) 로 표시. 캡션 메시지는 건드리지 않음 (consumer 의 error prop
     // 은 그대로 동작).
    const isOverSize =
      typeof maxContentSize === 'number' && contentSize >= maxContentSize;
    const hasError =
      error === true ||
      (typeof error === 'string' && error.length > 0) ||
      isOverSize;
    const hasSuccess =
      success === true || (typeof success === 'string' && success.length > 0);

    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : hasSuccess
          ? 'success'
          : 'default';

    const stateConfig = STATE_CONFIG[state];
    const disabledConfig = STATE_CONFIG.disabled;

    const wrapperClasses = cn(
      EDITOR_WRAPPER,
      stateConfig.border,
      state === 'default' && EDITOR_WRAPPER_FOCUS,
      state === 'disabled' && disabledConfig.bg,
      state === 'disabled' && disabledConfig.cursor,
    );

    const sizeDisplay = useMemo(() => {
      if (!showContentSize) return null;

      const formatBytes = (bytes: number): string => {
        const kb = bytes / 1024;
        const mb = kb / 1024;
        const gb = mb / 1024;
        if (gb >= 1) return `${gb.toFixed(1)} GB`;
        if (mb >= 1) return `${mb.toFixed(1)} MB`;
        if (kb >= 1) return `${kb.toFixed(1)} KB`;
        return `${bytes} Bytes`;
      };

      return maxContentSize
        ? `${formatBytes(contentSize)} / ${formatBytes(maxContentSize)}`
        : formatBytes(contentSize);
    }, [showContentSize, contentSize, maxContentSize]);

    return (
      <InputWrapper
        label={label}
        labelPosition={labelPosition}
        inputId={editorId}
        required={required}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        className={className}
      >
        <div
          className={cn(
            'blumnai-html-editor',
            wrapperClasses,
            disabled && 'blumnai-html-editor--disabled',
            readOnly && 'blumnai-html-editor--readonly',
          )}
        >
          {editor && (
            <Toolbar
              editor={editor}
              enabledFeatures={enabledFeatures}
              disabled={disabled || readOnly}
              compact={compactToolbar}
              colors={colors}
              imageUpload={imageUpload}
              onImageFileUpload={handleImageFileUpload}
              onImageUrlInsert={handleImageUrlInsert}
              onLinkInsert={handleLinkInsert}
              onLinkRemove={handleLinkRemove}
              getCurrentLink={getCurrentLink}
              onCodeView={openCodeView}
            />
          )}

          <ScrollArea
            orientation="vertical"
            maxHeight={maxHeight}
            className={EDITOR_CONTENT_BASE}
            onClick={() => editor?.commands.focus()}
          >
            <div style={{ minHeight }}>
              <EditorContent editor={editor} />
            </div>
          </ScrollArea>

          {sizeDisplay && (
            <div className={cn(COUNT_STYLE, isOverSize && 'text-destructive')}>
              {sizeDisplay}
            </div>
          )}
        </div>

        <CodeViewDialog
          open={isCodeViewOpen}
          html={codeViewHtml}
          onHtmlChange={setCodeViewHtml}
          onConfirm={confirmCodeView}
          onCancel={cancelCodeView}
          maxContentSize={maxContentSize}
        />
      </InputWrapper>
    );
  },
);

HtmlEditor.displayName = 'HtmlEditor';
