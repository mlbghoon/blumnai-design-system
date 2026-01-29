import type { HTMLAttributes } from 'react';

import type { IconType } from '../icons/Icon/Icon.types';

/**
 * Select 스타일 변형
 */
export type SelectStyle = 'default' | 'shadow' | 'soft';

/**
 * Select 크기 변형
 */
export type SelectSize = 'sm' | 'lg';

/**
 * Select 변형 타입
 */
export type SelectVariant = 'default' | 'avatar' | 'multi-select' | 'tags';

/**
 * Select 메뉴 아이템 선택 타입
 */
export type SelectType = 'default' | 'checkbox' | 'radio';

/**
 * Select 메뉴 아이템 변형
 */
export type SelectMenuItemVariant = 'default' | 'avatar' | 'country-flag';

/**
 * Select 옵션 아이템 데이터
 */
export interface SelectOption {
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
  leadIcon?: IconType;
  /**
   * 뱃지 텍스트
   */
  badge?: string;
  /**
   * 아바타 이미지 URL (avatar 변형용)
   */
  avatarSrc?: string;
  /**
   * 국가 플래그 코드 (country-flag 변형용)
   */
  flagCode?: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

/**
 * 모든 Select 변형에서 공유되는 기본 Props
 */
export interface SelectBaseProps {
  /**
   * Select 스타일 변형
   * @default 'default'
   */
  selectStyle?: SelectStyle;
  /**
   * Select 크기
   * @default 'sm'
   */
  size?: SelectSize;
  /**
   * Select 위에 표시되는 라벨 텍스트
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
   * Select 아래에 표시되는 설명 텍스트
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
   * Select 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
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
   * 앞에 표시되는 아이콘
   */
  leadIcon?: IconType;
  /**
   * 선택 가능한 옵션 목록
   */
  options: SelectOption[];
  /**
   * 검색 가능 여부
   * @default false
   */
  searchable?: boolean;
  /**
   * 검색 플레이스홀더
   * @default 'Search...'
   */
  searchPlaceholder?: string;
  /**
   * 결과 없음 텍스트
   * @default 'No results found'
   */
  noResultsText?: string;
  /**
   * 메뉴 열림/닫힘 상태 (제어 모드)
   */
  open?: boolean;
  /**
   * 메뉴 열림/닫힘 상태 변경 콜백
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 포탈 사용 여부
   * @default true
   */
  portal?: boolean;
  /**
   * 메뉴 최대 높이 (숫자는 px, 문자열은 그대로 사용)
   * @default 300
   */
  maxHeight?: number | string;
  /**
   * 외부 컨테이너에 적용할 추가 className
   */
  className?: string;
}

/**
 * 기본 Select Props - 단일 선택
 */
export interface DefaultSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
   * 메뉴 아이템 선택 타입 (기본값은 체크 아이콘)
   * @default 'default'
   */
  selectType?: SelectType;
}

/**
 * Avatar Select Props - 아바타가 있는 단일 선택
 */
export interface AvatarSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant: 'avatar';
  /**
   * 현재 선택된 값
   */
  value?: string;
  /**
   * 선택 변경 시 호출되는 콜백
   */
  onChange?: (value: string) => void;
}

/**
 * Multi-select Props - 다중 선택
 */
export interface MultiSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant: 'multi-select';
  /**
   * 현재 선택된 값들
   */
  value?: string[];
  /**
   * 선택 변경 시 호출되는 콜백
   */
  onChange?: (value: string[]) => void;
  /**
   * 최대 선택 개수
   */
  maxSelections?: number;
  /**
   * 다중 선택 시 표시되는 텍스트
   * 문자열 또는 (count: number) => string 함수
   * @default '{count} selected'
   */
  selectedText?: string | ((count: number) => string);
}

/**
 * Tags Select Props - 태그로 표시되는 다중 선택
 */
export interface TagsSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
   * 최대 선택 개수
   */
  maxSelections?: number;
}

/**
 * 모든 Select 변형 Props의 유니온 타입
 */
export type SelectProps =
  | DefaultSelectProps
  | AvatarSelectProps
  | MultiSelectProps
  | TagsSelectProps;

/**
 * SelectMenuItem Props
 */
export interface SelectMenuItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * 메뉴 아이템 라벨
   */
  label: string;
  /**
   * 메뉴 아이템 변형
   * @default 'default'
   */
  variant?: SelectMenuItemVariant;
  /**
   * 선택 타입
   * @default 'default'
   */
  selectType?: SelectType;
  /**
   * 앞에 표시되는 아이콘
   */
  leadIcon?: IconType;
  /**
   * 설명 텍스트
   */
  description?: string;
  /**
   * 뱃지 텍스트
   */
  badge?: string;
  /**
   * 아바타 이미지 URL
   */
  avatarSrc?: string;
  /**
   * 아바타 대체 텍스트
   */
  avatarAlt?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 선택된 상태
   * @default false
   */
  selected?: boolean;
  /**
   * 포커스된 상태 (키보드 네비게이션)
   * @default false
   */
  focused?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}
