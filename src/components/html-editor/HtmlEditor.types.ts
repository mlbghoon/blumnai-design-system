import type { ReactNode } from 'react';
import type { Editor } from '@tiptap/react';

/**
 * HtmlEditor 툴바 기능 타입
 */
export type HtmlEditorFeature =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'heading'
  | 'blockquote'
  | 'codeBlock'
  | 'bulletList'
  | 'orderedList'
  | 'textAlign'
  | 'colorPicker'
  | 'link'
  | 'image'
  | 'removeFormat'
  | 'history'
  | 'codeView';

/**
 * 이미지 업로드 설정
 */
export interface HtmlEditorImageUpload {
  /** 최대 파일 크기 (bytes) */
  maxSize?: number;
  /** 파일 업로드 핸들러 — URL을 반환 */
  handler: (file: File) => Promise<{ url: string }>;
  /** 업로드 에러 콜백 */
  onError?: (error: Error) => void;
}

/**
 * HtmlEditor 컴포넌트 Props
 */
export interface HtmlEditorProps {
  /** 초기 HTML 값 (비제어 모드 — 마운트 시 한 번만 설정) */
  defaultValue?: string;
  /** HTML 값 (제어 모드 — 외부 상태와 동기화) */
  value?: string;
  /** HTML 변경 콜백 */
  onChange?: (html: string) => void;

  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 표시할 툴바 기능 목록 */
  features?: HtmlEditorFeature[];

  /** 이미지 업로드 설정 */
  imageUpload?: HtmlEditorImageUpload;

  /** 컬러 피커 색상 목록 */
  colors?: string[];

  /** 콘텐츠 크기 변경 콜백 (debounced ~300ms) */
  onContentSizeChange?: (bytes: number) => void;
  /** 최대 콘텐츠 크기 (bytes) */
  maxContentSize?: number;

  /** 비활성화 */
  disabled?: boolean;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 에러 상태 */
  error?: boolean | string;
  /** 성공 상태 */
  success?: boolean | string;

  /** 라벨 */
  label?: ReactNode;
  /** 라벨 위치 */
  labelPosition?: 'top' | 'left';
  /** 필수 여부 */
  required?: boolean;
  /** 라벨 옆 보조 텍스트 */
  supportText?: string;
  /** 입력 필드 아래 설명 */
  caption?: string;

  /** 컴팩트 툴바 (정렬 등을 드롭다운으로 축소) */
  compactToolbar?: boolean;

  /** 에디터 최소 높이 (px) */
  minHeight?: number;
  /** 에디터 최대 높이 (px) */
  maxHeight?: number;

  /** 추가 className */
  className?: string;
}

/**
 * HtmlEditor ref 인터페이스
 */
export interface HtmlEditorRef {
  /** Tiptap Editor 인스턴스 */
  editor: Editor | null;
  /** 에디터에 포커스 */
  focus: () => void;
  /** 현재 HTML 반환 */
  getHTML: () => string;
}

/**
 * 블록 타입 옵션
 */
export interface BlockTypeOption {
  value: string;
  label: string;
}
