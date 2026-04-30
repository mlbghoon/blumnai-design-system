/**
 * FileUpload component constants
 *
 * Based on Figma design specifications
 */

// FileUploadArea base styles
export const FILE_UPLOAD_AREA_BASE = 'flex flex-col items-center justify-center ds-gap-12 rounded-lg cursor-pointer transition-colors duration-150';

// FileUploadArea state styles
export const FILE_UPLOAD_AREA_STATE = {
  default: 'bg-input border border-dashed border-darker hover:bg-subtle',
  dragging: 'bg-state-soft border border-dashed border-accent',
  disabled: 'bg-input-disabled border border-dashed border-default cursor-not-allowed opacity-50',
  error: 'bg-input border border-dashed border-destructive',
} as const;

// FileUploadArea padding (using padding-24 as closest match to Figma specs)
export const FILE_UPLOAD_AREA_PADDING = 'padding-24';

// FileUploadArea text styles
export const FILE_UPLOAD_AREA_TITLE = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal font-medium text-default text-center';
export const FILE_UPLOAD_AREA_TITLE_DISABLED = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal font-medium text-hint text-center';
export const FILE_UPLOAD_AREA_CLICK_TEXT = 'text-informative';
export const FILE_UPLOAD_AREA_CLICK_TEXT_DISABLED = 'text-hint';
export const FILE_UPLOAD_AREA_DESC = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-normal text-muted text-center';
export const FILE_UPLOAD_AREA_DESC_DISABLED = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-normal text-hint text-center';

// FileUploadArea caption styles
export const FILE_UPLOAD_AREA_CAPTION = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted';
export const FILE_UPLOAD_AREA_ERROR_CAPTION = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-destructive';

// FileUploadCard base styles
export const FILE_UPLOAD_CARD_BASE = 'flex items-center ds-gap-8 rounded-lg bg-card shadow-components-default';

// FileUploadCard size configurations
export const FILE_UPLOAD_CARD_SIZE = {
  lg: {
    container: 'padding-y-8 padding-l-8 padding-r-12',
    thumbnail: 'width-40 height-40',
  },
  sm: {
    container: 'padding-y-6 padding-l-6 padding-r-12',
    thumbnail: 'width-32 height-32',
  },
} as const;

// FileUploadCard thumbnail pixel heights — 이미지 썸네일의 유연한 폭 계산에 사용.
// 이미지인 경우 height 는 고정, width 는 [height, height × 3] 사이로 원본 비율에 따라 신축.
export const FILE_UPLOAD_CARD_THUMBNAIL_HEIGHT_PX = {
  lg: 40,
  sm: 32,
} as const;
// 썸네일 폭의 상한 배수 (1:3 까지 가로로 늘어남)
export const FILE_UPLOAD_CARD_THUMBNAIL_MAX_ASPECT = 3;

// FileUploadCard thumbnail styles
export const FILE_UPLOAD_THUMBNAIL = 'rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center bg-subtle';

// FileUploadCard content styles
export const FILE_UPLOAD_CONTENT = 'flex-1 min-w-0 flex flex-col ds-gap-2';
export const FILE_UPLOAD_FILENAME = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal font-medium text-default truncate';
export const FILE_UPLOAD_META = 'flex items-center ds-gap-4 font-body size-xs line-height-leading-4 letter-spacing-tracking-normal text-muted';
export const FILE_UPLOAD_META_DIVIDER = 'text-hint';

// FileUploadCard status text styles
export const FILE_UPLOAD_STATUS_TEXT = {
  uploaded: 'text-success',
  uploading: 'text-muted',
  error: 'text-destructive',
} as const;

// FileUploadCard status labels
export const FILE_UPLOAD_STATUS_LABEL = {
  uploaded: '업로드 완료',
  uploading: '업로드 중',
  error: '업로드 실패',
} as const;

// FileUploadCard progress bar styles
export const FILE_UPLOAD_PROGRESS_TRACK = 'w-full height-4 bg-muted rounded-full overflow-hidden';
export const FILE_UPLOAD_PROGRESS_FILL = 'h-full bg-state-primary transition-all duration-200';

// FileUploadCard actions styles
export const FILE_UPLOAD_ACTIONS = 'flex items-center ds-gap-4 flex-shrink-0';

// Icon sizes
export const FILE_UPLOAD_AREA_ICON_SIZE = 40;
export const FILE_UPLOAD_CARD_ICON_SIZE = {
  lg: 20,
  sm: 16,
} as const;
