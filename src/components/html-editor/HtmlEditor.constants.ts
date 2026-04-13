import type { HtmlEditorFeature, BlockTypeOption } from './HtmlEditor.types';

/**
 * 기본 활성화 기능 목록
 */
export const DEFAULT_FEATURES: HtmlEditorFeature[] = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'heading',
  'blockquote',
  'codeBlock',
  'bulletList',
  'orderedList',
  'textAlign',
  'colorPicker',
  'link',
  'image',
  'removeFormat',
  'history',
  'codeView',
];

/**
 * 기본 컬러 팔레트 (consumer 기존 28색)
 */
export const DEFAULT_COLORS: string[] = [
  'rgb(97,189,109)',
  'rgb(26,188,156)',
  'rgb(84,172,210)',
  'rgb(44,130,201)',
  'rgb(147,101,184)',
  'rgb(71,85,119)',
  'rgb(204,204,204)',
  'rgb(65,168,95)',
  'rgb(0,168,133)',
  'rgb(61,142,185)',
  'rgb(41,105,176)',
  'rgb(85,57,130)',
  'rgb(40,50,78)',
  'rgb(0,0,0)',
  'rgb(247,218,100)',
  'rgb(251,160,38)',
  'rgb(235,107,86)',
  'rgb(226,80,65)',
  'rgb(163,143,132)',
  'rgb(239,239,239)',
  'rgb(255,255,255)',
  'rgb(250,197,28)',
  'rgb(243,121,52)',
  'rgb(209,72,65)',
  'rgb(184,49,47)',
  'rgb(124,112,107)',
  'rgb(209,213,216)',
] as const;

/**
 * 블록 타입 드롭다운 옵션
 */
export const BLOCK_TYPE_OPTIONS: BlockTypeOption[] = [
  { value: 'paragraph', label: '표준' },
  { value: 'heading-1', label: '제목1' },
  { value: 'heading-2', label: '제목2' },
  { value: 'heading-3', label: '제목3' },
  { value: 'heading-4', label: '제목4' },
  { value: 'heading-5', label: '제목5' },
  { value: 'heading-6', label: '제목6' },
  { value: 'blockquote', label: '인용' },
  { value: 'codeBlock', label: 'Code' },
];

/**
 * 에디터 래퍼 기본 스타일
 */
export const EDITOR_WRAPPER = 'flex flex-col border-darker rounded-lg overflow-hidden bg-input' as const;

/**
 * 에디터 래퍼 포커스 스타일
 */
export const EDITOR_WRAPPER_FOCUS = 'focus-within:border-strong focus-within:shadow-component-input-focus' as const;

/**
 * 툴바 컨테이너
 */
export const TOOLBAR_CONTAINER = 'flex items-center ds-gap-4 padding-x-8 padding-y-4' as const;

/**
 * 툴바 버튼 그룹
 */
export const TOOLBAR_GROUP = 'flex items-center ds-gap-2 shrink-0' as const;

/**
 * 상태 설정
 */
export const STATE_CONFIG = {
  default: {
    border: 'border-darker',
  },
  disabled: {
    border: 'border-default',
    bg: 'bg-input-disabled',
    cursor: 'cursor-not-allowed',
  },
  error: {
    border: 'border-destructive',
  },
  success: {
    border: 'border-success',
  },
} as const;

/**
 * 에디터 콘텐츠 영역 기본 스타일
 */
export const EDITOR_CONTENT_BASE = 'font-body size-sm line-height-leading-5 text-default padding-12' as const;

/**
 * 바이트 카운터 스타일
 */
export const COUNT_STYLE = 'flex justify-end font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted padding-x-12 padding-y-4' as const;

/**
 * 에디터 기본 최소 높이
 */
export const DEFAULT_MIN_HEIGHT = 200;
