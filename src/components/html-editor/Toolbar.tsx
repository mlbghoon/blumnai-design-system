import { useCallback } from 'react';
import type { Editor } from '@tiptap/react';

import { cn } from '@/lib/utils';
import { Divider } from '../divider/Divider/Divider';
import { ScrollArea } from '../scroll-area';
import { ToolbarButton } from './ToolbarButton';
import { BlockTypeDropdown } from './BlockTypeDropdown';
import { AlignDropdown } from './AlignDropdown';
import { ColorPicker } from './ColorPicker';
import { LinkDialog } from './LinkDialog';
import { ImageDialog } from './ImageDialog';
import { TOOLBAR_CONTAINER, TOOLBAR_GROUP } from './HtmlEditor.constants';
import type { HtmlEditorFeature, HtmlEditorImageUpload } from './HtmlEditor.types';

interface ToolbarProps {
  editor: Editor;
  enabledFeatures: Set<HtmlEditorFeature>;
  disabled?: boolean;
  compact?: boolean;
  colors?: string[];
  imageUpload?: HtmlEditorImageUpload;
  onImageFileUpload: (file: File) => Promise<void>;
  onImageUrlInsert: (url: string) => void;
  onLinkInsert: (title: string, url: string) => void;
  onLinkRemove: () => void;
  getCurrentLink: () => { title: string; url: string } | null;
  onCodeView: () => void;
}

export function Toolbar({
  editor,
  enabledFeatures,
  disabled = false,
  compact = false,
  colors,
  imageUpload,
  onImageFileUpload,
  onImageUrlInsert,
  onLinkInsert,
  onLinkRemove,
  getCurrentLink,
  onCodeView,
}: ToolbarProps) {
  const has = useCallback(
    (feature: HtmlEditorFeature) => enabledFeatures.has(feature),
    [enabledFeatures],
  );

  const hasInline = has('bold') || has('italic') || has('underline') || has('strikethrough');
  const hasBlock = has('heading') || has('blockquote') || has('codeBlock');
  const hasList = has('bulletList') || has('orderedList');
  const hasAlign = has('textAlign');
  const hasInsert = has('colorPicker') || has('link') || has('image');
  const hasFormat = has('removeFormat');
  const hasHistory = has('history');
  const hasCodeView = has('codeView');

  const divider = <Divider orientation="vertical" className="height-16 shrink-0" />;

  let groupIndex = 0;
  const needsDivider = () => {
    groupIndex++;
    return groupIndex > 1;
  };

  groupIndex = 0;

  const scrollableContent = (
    <div className="flex items-center ds-gap-4">
      {/* 인라인 포맷: B, I, U, S */}
      {hasInline && (
        <>
          {needsDivider() && divider}
          <div className={TOOLBAR_GROUP}>
            {has('bold') && (
              <ToolbarButton
                icon={['editor', 'bold']}
                tooltip="굵게 (Ctrl+B)"
                isActive={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={disabled}
              />
            )}
            {has('italic') && (
              <ToolbarButton
                icon={['editor', 'italic']}
                tooltip="기울임 (Ctrl+I)"
                isActive={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={disabled}
              />
            )}
            {has('underline') && (
              <ToolbarButton
                icon={['editor', 'underline']}
                tooltip="밑줄 (Ctrl+U)"
                isActive={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={disabled}
              />
            )}
            {has('strikethrough') && (
              <ToolbarButton
                icon={['editor', 'strikethrough']}
                tooltip="취소선"
                isActive={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={disabled}
              />
            )}
          </div>
        </>
      )}

      {/* 블록 타입 */}
      {hasBlock && (
        <>
          {needsDivider() && divider}
          <div className={TOOLBAR_GROUP}>
            <BlockTypeDropdown editor={editor} disabled={disabled} enabledFeatures={enabledFeatures} />
          </div>
        </>
      )}

      {/* 리스트 */}
      {hasList && (
        <>
          {needsDivider() && divider}
          <div className={TOOLBAR_GROUP}>
            {has('bulletList') && (
              <ToolbarButton
                icon={['editor', 'list-unordered']}
                tooltip="순서 없는 목록"
                isActive={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={disabled}
              />
            )}
            {has('orderedList') && (
              <ToolbarButton
                icon={['editor', 'list-ordered']}
                tooltip="순서 있는 목록"
                isActive={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={disabled}
              />
            )}
          </div>
        </>
      )}

      {/* 텍스트 정렬 */}
      {hasAlign && (
        <>
          {needsDivider() && divider}
          {compact ? (
            <AlignDropdown editor={editor} disabled={disabled} />
          ) : (
            <div className={TOOLBAR_GROUP}>
              <ToolbarButton
                icon={['editor', 'align-left']}
                tooltip="왼쪽 정렬"
                isActive={editor.isActive({ textAlign: 'left' })}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                disabled={disabled}
              />
              <ToolbarButton
                icon={['editor', 'align-center']}
                tooltip="가운데 정렬"
                isActive={editor.isActive({ textAlign: 'center' })}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                disabled={disabled}
              />
              <ToolbarButton
                icon={['editor', 'align-right']}
                tooltip="오른쪽 정렬"
                isActive={editor.isActive({ textAlign: 'right' })}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                disabled={disabled}
              />
              <ToolbarButton
                icon={['editor', 'align-justify']}
                tooltip="양쪽 정렬"
                isActive={editor.isActive({ textAlign: 'justify' })}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                disabled={disabled}
              />
            </div>
          )}
        </>
      )}

      {/* 삽입: 색상, 링크, 이미지 */}
      {hasInsert && (
        <>
          {needsDivider() && divider}
          <div className={TOOLBAR_GROUP}>
            {has('colorPicker') && (
              <ColorPicker editor={editor} colors={colors} disabled={disabled} />
            )}
            {has('link') && (
              <>
                <LinkDialog
                  editor={editor}
                  disabled={disabled}
                  getCurrentLink={getCurrentLink}
                  onInsert={onLinkInsert}
                />
                <ToolbarButton
                  icon={['editor', 'link-unlink']}
                  tooltip="링크 제거"
                  onClick={onLinkRemove}
                  disabled={disabled || !editor.isActive('link')}
                />
              </>
            )}
            {has('image') && (
              <ImageDialog
                imageUpload={imageUpload}
                onFileUpload={onImageFileUpload}
                onUrlInsert={onImageUrlInsert}
                disabled={disabled}
              />
            )}
          </div>
        </>
      )}

      {/* 서식 제거 */}
      {hasFormat && (
        <>
          {needsDivider() && divider}
          <div className={TOOLBAR_GROUP}>
            <ToolbarButton
              icon={['editor', 'format-clear']}
              tooltip="서식 제거"
              onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
              disabled={disabled}
              inactiveStyle="ghost"
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={cn(TOOLBAR_CONTAINER, 'border-b-default')}>
      {/* 스크롤 가능한 메인 툴바 — offsetScrollbars 로 horizontal scrollbar가
          아이콘 위로 떠서 겹치는 문제 방지 */}
      <ScrollArea orientation="horizontal" offsetScrollbars className="flex-1 min-w-0">
        {scrollableContent}
      </ScrollArea>

      {/* 고정 영역: 실행 취소/다시 실행 + 코드 뷰 */}
      {(hasHistory || hasCodeView) && (
        <div className="flex items-center ds-gap-4 shrink-0">
          {divider}
          {hasHistory && (
            <div className={TOOLBAR_GROUP}>
              <ToolbarButton
                icon={['arrows', 'arrow-go-back']}
                tooltip="실행 취소 (Ctrl+Z)"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={disabled || !editor.can().chain().undo().run()}
                inactiveStyle="ghost"
              />
              <ToolbarButton
                icon={['arrows', 'arrow-go-forward']}
                tooltip="다시 실행 (Ctrl+Y)"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={disabled || !editor.can().chain().redo().run()}
                inactiveStyle="ghost"
              />
            </div>
          )}
          {hasCodeView && (
            <>
              {hasHistory && divider}
              <div className={TOOLBAR_GROUP}>
                <ToolbarButton
                  icon={['editor', 'code-view']}
                  tooltip="HTML 소스 코드"
                  onClick={onCodeView}
                  disabled={disabled}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
