import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditor, type AnyExtension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';

import { DEFAULT_FEATURES } from './HtmlEditor.constants';
import { normalizeHtmlContent, calculateContentSize, validateImageFile } from './utils';
import type { HtmlEditorProps, HtmlEditorFeature } from './HtmlEditor.types';

type UseHtmlEditorOptions = Pick<
  HtmlEditorProps,
  | 'defaultValue'
  | 'value'
  | 'onChange'
  | 'placeholder'
  | 'features'
  | 'imageUpload'
  | 'onContentSizeChange'
  | 'maxContentSize'
  | 'disabled'
  | 'readOnly'
>;

export function useHtmlEditor({
  defaultValue,
  value,
  onChange,
  placeholder,
  features,
  imageUpload,
  onContentSizeChange,
  disabled = false,
  readOnly = false,
}: UseHtmlEditorOptions) {
  const enabledFeatures = useMemo<Set<HtmlEditorFeature>>(
    () => new Set(features || DEFAULT_FEATURES),
    [features],
  );

  const isControlled = value !== undefined;
  const skipNextUpdate = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // 코드 뷰 다이얼로그
  const [isCodeViewOpen, setIsCodeViewOpen] = useState(false);
  const [codeViewHtml, setCodeViewHtml] = useState('');

  // 콘텐츠 크기
  const [contentSize, setContentSize] = useState(0);

  // 트랜잭션마다 리렌더 강제 (툴바 active 상태 업데이트용)
  const [, setRenderKey] = useState(0);

  const extensions = useMemo((): AnyExtension[] => {
    const exts: AnyExtension[] = [
      StarterKit.configure({
        heading: enabledFeatures.has('heading')
          ? { levels: [1, 2, 3, 4, 5, 6] }
          : false,
        blockquote: enabledFeatures.has('blockquote') ? {} : false,
        codeBlock: enabledFeatures.has('codeBlock') ? {} : false,
        bold: enabledFeatures.has('bold') ? {} : false,
        italic: enabledFeatures.has('italic') ? {} : false,
        strike: enabledFeatures.has('strikethrough') ? {} : false,
        bulletList: enabledFeatures.has('bulletList') ? {} : false,
        orderedList: enabledFeatures.has('orderedList') ? {} : false,
        undoRedo: enabledFeatures.has('history') ? {} : false,
      }),
    ];

    if (enabledFeatures.has('underline')) {
      exts.push(Underline);
    }

    if (enabledFeatures.has('textAlign')) {
      exts.push(
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      );
    }

    if (enabledFeatures.has('colorPicker')) {
      exts.push(TextStyle);
      exts.push(Color);
      exts.push(
        Highlight.configure({
          multicolor: true,
        }),
      );
    }

    if (enabledFeatures.has('link')) {
      exts.push(
        Link.configure({
          openOnClick: false,
          autolink: true,
        }),
      );
    }

    if (enabledFeatures.has('image')) {
      exts.push(
        Image.configure({
          inline: false,
          allowBase64: true,
        }),
      );
    }

    if (placeholder) {
      exts.push(
        Placeholder.configure({
          placeholder,
        }),
      );
    }

    return exts;
  }, [enabledFeatures, placeholder]);

  const editor = useEditor({
    extensions,
    content: defaultValue || value || '',
    editable: !disabled && !readOnly,
    immediatelyRender: false,
    onTransaction: () => {
      setRenderKey((k) => k + 1);
    },
    onUpdate: ({ editor: ed }) => {
      if (skipNextUpdate.current) {
        skipNextUpdate.current = false;
        return;
      }

      const html = normalizeHtmlContent(ed.getHTML(), ed.isEmpty);

      onChange?.(html);

      // 콘텐츠 크기 (debounced)
      if (onContentSizeChange) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          const size = calculateContentSize(html);
          setContentSize(size);
          onContentSizeChange(size);
        }, 300);
      }
    },
  });

  // 제어 모드: value 변경 시 에디터 동기화
  useEffect(() => {
    if (!isControlled || !editor || value === undefined) return;

    const currentHtml = normalizeHtmlContent(editor.getHTML(), editor.isEmpty);
    if (currentHtml === value) return;

    skipNextUpdate.current = true;
    editor.commands.setContent(value || '');
  }, [editor, isControlled, value]);

  // disabled/readOnly 상태 동기화
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled && !readOnly);
  }, [editor, disabled, readOnly]);

  // 클린업
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, []);

  // 코드 뷰 다이얼로그
  const openCodeView = useCallback(() => {
    if (!editor) return;
    setCodeViewHtml(editor.getHTML());
    setIsCodeViewOpen(true);
  }, [editor]);

  const confirmCodeView = useCallback(
    (html: string) => {
      if (!editor) return;
      skipNextUpdate.current = true;
      editor.commands.setContent(html);
      setIsCodeViewOpen(false);

      const normalized = normalizeHtmlContent(
        editor.getHTML(),
        editor.isEmpty,
      );
      onChange?.(normalized);

      if (onContentSizeChange) {
        const size = calculateContentSize(normalized);
        setContentSize(size);
        onContentSizeChange(size);
      }
    },
    [editor, onChange, onContentSizeChange],
  );

  const cancelCodeView = useCallback(() => {
    setIsCodeViewOpen(false);
  }, []);

  // 이미지
  const handleImageFileUpload = useCallback(
    async (file: File) => {
      if (!editor || !imageUpload) return;

      const validationError = validateImageFile(file, imageUpload.maxSize);
      if (validationError) {
        imageUpload.onError?.(validationError);
        throw validationError;
      }

      try {
        const { url } = await imageUpload.handler(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('이미지 업로드 실패');
        imageUpload.onError?.(error);
        throw error;
      }
    },
    [editor, imageUpload],
  );

  const handleImageUrlInsert = useCallback(
    (url: string) => {
      if (!editor || !url) return;
      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor],
  );

  // 링크
  const handleLinkInsert = useCallback(
    (title: string, url: string) => {
      if (!editor) return;

      const { from, to } = editor.state.selection;
      const hasSelection = from !== to;

      if (hasSelection) {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
      } else if (title) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${url}">${title}</a>`)
          .run();
      } else {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${url}">${url}</a>`)
          .run();
      }
    },
    [editor],
  );

  const handleLinkRemove = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  const getCurrentLink = useCallback((): {
    title: string;
    url: string;
  } | null => {
    if (!editor) return null;

    const attrs = editor.getAttributes('link');
    if (!attrs.href) return null;

    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, '');

    return { title: text, url: attrs.href };
  }, [editor]);

  return {
    editor,
    enabledFeatures,
    contentSize,
    // 코드 뷰
    isCodeViewOpen,
    codeViewHtml,
    setCodeViewHtml,
    openCodeView,
    confirmCodeView,
    cancelCodeView,
    // 이미지
    handleImageFileUpload,
    handleImageUrlInsert,
    // 링크
    handleLinkInsert,
    handleLinkRemove,
    getCurrentLink,
  };
}
