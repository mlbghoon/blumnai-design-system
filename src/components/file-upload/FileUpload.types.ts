import type { IconTypeWithFill } from '../icons/Icon/Icon.types';

/**
 * 파일 선택 소스
 */
export type FileSelectSource = 'click' | 'drop';

/**
 * 파일 유효성 검사 에러 타입
 */
export type FileErrorCode = 'file-too-large' | 'total-size-exceeded' | 'too-many-files' | 'invalid-type';

/**
 * 파일 유효성 검사 에러
 */
export interface FileError {
  /** 에러가 발생한 파일 (파일별 에러 시) */
  file?: File;
  /** 에러 코드 */
  code: FileErrorCode;
  /** 사람이 읽을 수 있는 에러 메시지 */
  message: string;
}

/**
 * FileUploadArea props
 */
export interface FileUploadAreaProps {
  /** 파일 선택 시 호출되는 콜백 */
  onFilesSelected?: (files: File[], source: FileSelectSource) => void;
  /** 유효성 검사 에러 발생 시 호출되는 콜백 */
  onValidationError?: (errors: FileError[]) => void;
  /** 드래그 진입 시 호출되는 콜백 */
  onDragEnter?: () => void;
  /** 드래그 이탈 시 호출되는 콜백 */
  onDragLeave?: () => void;

  /** 허용할 파일 타입 (e.g., "image/*,.pdf") */
  accept?: string;
  /** 최대 파일 개수 */
  maxFiles?: number;
  /** 최대 총 크기 (바이트) */
  maxSize?: number;
  /**
   * 개별 파일 최대 크기 (바이트).
   * 이 크기를 초과하는 파일은 거부되고 onValidationError가 호출됩니다.
   */
  maxFileSize?: number;
  /** 다중 파일 선택 허용 여부 */
  multiple?: boolean;

  /** 타이틀 텍스트 (e.g., "Drop your files here, or") */
  title?: string;
  /** 클릭 텍스트 (강조 색상으로 표시, e.g., "click to browse") */
  clickText?: string;
  /** 설명 텍스트 */
  description?: string;
  /** 커스텀 아이콘 */
  icon?: IconTypeWithFill;

  /**
   * 컴팩트 모드 — 패딩과 아이콘 크기를 줄여 높이를 축소합니다
   * @default false
   */
  compact?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시 */
  error?: boolean | string;
  /** 입력 필드 아래에 표시되는 설명 텍스트 */
  caption?: string;

  /** 추가 CSS 클래스명 */
  className?: string;
  /** 너비 (숫자는 px, 문자열은 그대로 사용) */
  width?: string | number;
}

/**
 * FileUploadCard 상태
 */
export type FileUploadStatus = 'uploading' | 'uploaded' | 'error';

/**
 * FileUploadCard 크기
 */
export type FileUploadCardSize = 'sm' | 'lg';

/**
 * 파일 정보 타입
 */
export interface FileInfo {
  name: string;
  /**
   * 파일 바이트 크기. 서버에서 불러온 항목처럼 크기를 모르는 경우 생략 가능.
   * 미지정 시 FileUploadCard 의 메타 행에서 size span 이 자동으로 숨겨집니다.
   */
  size?: number;
  type: string;
}

/**
 * FileUploadCard props
 */
export interface FileUploadCardProps {
  /** 파일 또는 파일 정보 */
  file: File | FileInfo;
  /** 이미지 미리보기 URL */
  thumbnail?: string;

  /** 상태 */
  status: FileUploadStatus;
  /** 업로드 진행률 (0-100) */
  progress?: number;
  /** 에러 메시지 */
  errorMessage?: string;

  /** 크기 */
  size?: FileUploadCardSize;

  /**
   * 메타 행에서 파일 크기를 숨김. `true` 이면 size 값이 있어도 표시하지 않고,
   * 구분선(`|`)도 같이 제거됩니다. status 라벨(Uploaded/Error 등)만 남습니다.
   *
   * `file.size` 가 `undefined` 이면 자동으로 숨겨지므로 (서버에서 불러온 파일처럼
   * 크기를 모르는 경우) 이 prop 은 "크기를 알고 있지만 일부러 숨기고 싶을 때" 사용합니다.
   *
   * @default false
   */
  hideSize?: boolean;

  /** 삭제 시 호출되는 콜백 */
  onRemove?: () => void;
  /** 재시도 시 호출되는 콜백 */
  onRetry?: () => void;

  /** 추가 CSS 클래스명 */
  className?: string;
}
