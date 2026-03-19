import type { HTMLAttributes } from 'react';
import type { IconColor, IconTypeWithFill } from '../../icons/Icon/Icon.types';

/**
 * Combobox 스타일 변형
 */
export type ComboboxStyle = 'default' | 'shadow' | 'soft';

/**
 * Combobox 크기 변형
 */
export type ComboboxSize = 'sm' | 'lg';

/**
 * Combobox 변형 타입
 */
export type ComboboxVariant = 'default' | 'avatar' | 'tags';

/**
 * Combobox 옵션 아이템 데이터
 */
export interface ComboboxOption {
  /**
   * 옵션의 고유 ID
   */
  id: string;
  /**
   * 옵션 라벨
   */
  label: string;
  /**
   * 옵션 설명 (라벨 아래에 표시)
   */
  description?: string;
  /**
   * 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 아이콘 색상
   */
  iconColor?: IconColor;
  /**
   * 뱃지 텍스트
   */
  badge?: string;
  /**
   * 아바타 이미지 URL (avatar 변형용)
   */
  avatarSrc?: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

/**
 * 모든 Combobox 변형에서 공유되는 기본 Props
 */
export interface ComboboxBaseProps {
  /**
   * Combobox 스타일 변형
   * @default 'default'
   */
  selectStyle?: ComboboxStyle;
  /**
   * Combobox 크기
   * @default 'sm'
   */
  size?: ComboboxSize;
  /**
   * Combobox 위에 표시되는 라벨 텍스트
   */
  label?: string;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
  /**
   * 라벨 옆에 표시되는 보조 텍스트
   */
  supportText?: string;
  /**
   * Combobox 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * Combobox 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 선택 가능한 옵션 목록
   */
  options: ComboboxOption[];
  /**
   * 결과 없음 텍스트 (deprecated - use emptyStateTitle instead)
   * @default 'No results found'
   * @deprecated Use emptyStateTitle instead
   */
  noResultsText?: string;
  /**
   * 빈 상태 제목
   * @default 'No search results'
   */
  emptyStateTitle?: string;
  /**
   * 빈 상태 설명
   * @default 'Your search did not match any results.'
   */
  emptyStateDescription?: string;
  /**
   * 새 항목 생성 가능 여부
   * @default false
   */
  creatable?: boolean;
  /**
   * 새 항목 생성 버튼 텍스트
   * 문자열 또는 (inputValue: string) => string 함수
   * @default 'Add "{value}"'
   */
  createText?: string | ((value: string) => string);
  /**
   * 메뉴 열림/닫힘 상태 (제어 모드)
   */
  open?: boolean;
  /**
   * 메뉴 열림/닫힘 상태 변경 콜백
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 메뉴 최대 높이 (숫자는 px, 문자열은 그대로 사용)
   * @default 300
   */
  maxHeight?: number | string;
  /**
   * 드롭다운 콘텐츠(옵션 목록)의 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 트리거 너비에 맞춰짐
   */
  contentWidth?: string | number;
  /**
   * 검색어와 일치하는 텍스트를 강조 표시
   * @default true
   */
  highlightSearch?: boolean;
  /**
   * 커스텀 필터 함수 — 옵션별로 검색어 일치 여부를 판단
   * 미지정 시 label + description 기본 검색 사용
   */
  filterFunction?: (option: ComboboxOption, query: string) => boolean;
  /**
   * 라벨 뒤, 화살표 앞에 표시되는 아이콘
   */
  tailIcon?: IconTypeWithFill;
  /**
   * 외부 컨테이너에 적용할 추가 className
   */
  className?: string;
}

/**
 * 기본 Combobox Props - 단일 선택
 */
export interface DefaultComboboxProps extends ComboboxBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant?: 'default';
  /**
   * 현재 선택된 값
   */
  value?: string;
  /**
   * 선택 변경 시 호출되는 콜백
   */
  onChange?: (value: string) => void;
  /**
   * 새 항목 생성 시 호출되는 콜백
   */
  onCreate?: (value: string) => void;
}

/**
 * Avatar Combobox Props - 아바타가 있는 단일 선택
 */
export interface AvatarComboboxProps extends ComboboxBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant: 'avatar';
  /**
   * 현재 선택된 값
   */
  value?: string;
  /**
   * 선택 변경 시 호출되는 콜백
   */
  onChange?: (value: string) => void;
  /**
   * 새 항목 생성 시 호출되는 콜백
   */
  onCreate?: (value: string) => void;
}

/**
 * Tags Combobox Props - 태그로 표시되는 다중 선택
 */
export interface TagsComboboxProps extends ComboboxBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant: 'tags';
  /**
   * 현재 선택된 값들
   */
  value?: string[];
  /**
   * 선택 변경 시 호출되는 콜백
   */
  onChange?: (value: string[]) => void;
  /**
   * 새 항목 생성 시 호출되는 콜백
   */
  onCreate?: (value: string) => void;
  /**
   * 최대 선택 개수
   */
  maxSelections?: number;
  /**
   * 최대 표시 태그 수 - 이 수를 초과하면 "+N more" 형태로 표시
   * undefined면 모든 태그 표시
   */
  maxVisibleTags?: number;
  /**
   * 오버플로우 텍스트 - 숨겨진 태그 수를 표시하는 텍스트
   * 문자열 또는 (hiddenCount: number, totalCount: number) => string 함수
   * @default '+{hiddenCount} more'
   */
  overflowText?: string | ((hiddenCount: number, totalCount: number) => string);
}

/**
 * 모든 Combobox 변형 Props의 유니온 타입
 */
export type ComboboxProps =
  | DefaultComboboxProps
  | AvatarComboboxProps
  | TagsComboboxProps;
