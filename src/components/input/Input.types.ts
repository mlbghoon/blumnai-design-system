import type { InputHTMLAttributes, ReactNode } from 'react';

import type { IconTypeWithFill } from '../icons/Icon/Icon.types';
import type { PasswordStrength } from './variants/PasswordInput';
import type { DropdownOption } from './variants/DropdownInput';

/**
 * 입력 필드 스타일 변형
 */
export type InputStyle = 'default' | 'shadow' | 'soft';

/**
 * 입력 필드 크기 변형
 */
export type InputSize = 'xs' | 'sm' | 'lg';

/**
 * 입력 필드 변형 타입
 */
export type InputVariant =
  | 'default'
  | 'shortcut'
  | 'tags'
  | 'inline-tags'
  | 'tail-dropdown'
  | 'lead-dropdown'
  | 'quantity'
  | 'quantity-2'
  | 'tail-button'
  | 'lead-button'
  | 'addon'
  | 'inline-addon'
  | 'password';

/**
 * 모든 입력 필드 변형에서 공유되는 기본 Props
 */
export interface InputBaseProps {
  /**
   * 입력 필드 스타일 변형
   * @default 'default'
   */
  inputStyle?: InputStyle;
  /**
   * 입력 필드 크기
   * @default 'sm'
   */
  size?: InputSize;
  /**
   * 입력 필드 위에 표시되는 라벨 텍스트
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
   * 입력 필드 아래에 표시되는 설명 텍스트
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
   * 입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 글자 수 카운터 표시 여부 (maxLength와 함께 사용)
   * @default false
   */
  showCount?: boolean;
  /**
   * 외부 컨테이너에 적용할 추가 className
   */
  className?: string;
}

/**
 * 기본 변형 Props - 표준 텍스트 입력
 */
export interface DefaultVariantProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default';
  /**
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 입력 필드 뒤에 표시되는 아이콘
   */
  tailIcon?: IconTypeWithFill;
  /**
   * 끝에 표시되는 단축키 뱃지 텍스트
   */
  shortcut?: string;
  /**
   * 지우기 버튼 클릭 시 호출되는 콜백 (제공 시 지우기 버튼 표시)
   */
  onClear?: () => void;
}

/**
 * 비밀번호 변형 Props
 */
export interface PasswordVariantProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  variant: 'password';
  /**
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 비밀번호 표시/숨김 토글 버튼 표시 여부
   * @default true
   */
  showToggle?: boolean;
  /**
   * 비밀번호 강도 표시 여부
   * @default false
   */
  showStrength?: boolean;
  /**
   * 제어되는 비밀번호 강도 값
   */
  strength?: PasswordStrength;
  /**
   * 비밀번호 강도 변경 시 호출되는 콜백 (autoCalculateStrength가 true일 때)
   */
  onStrengthChange?: (strength: PasswordStrength) => void;
  /**
   * 입력 값에 따라 비밀번호 강도를 자동 계산할지 여부
   * @default false
   */
  autoCalculateStrength?: boolean;
}

/**
 * 수량 기본 Props (quantity와 quantity-2 공유)
 */
interface QuantityBaseProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'type'> {
  /**
   * 현재 숫자 값
   * @default 0
   */
  value?: number;
  /**
   * 값 변경 시 호출되는 콜백
   */
  onChange?: (value: number) => void;
  /**
   * 최소 허용 값
   * @default 0
   */
  min?: number;
  /**
   * 최대 허용 값
   */
  max?: number;
  /**
   * 증감 단위
   * @default 1
   */
  step?: number;
}

/**
 * 수량 변형 Props (양쪽 버튼)
 */
export interface QuantityVariantProps extends QuantityBaseProps {
  variant: 'quantity';
}

/**
 * 수량 2 변형 Props (컴팩트 - 쌓인 버튼)
 */
export interface Quantity2VariantProps extends QuantityBaseProps {
  variant: 'quantity-2';
}

/**
 * 태그 기본 Props (tags와 inline-tags 공유)
 */
interface TagsBaseProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
  /**
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 현재 태그 배열
   * @default []
   */
  tags?: string[];
  /**
   * 태그 배열 변경 시 호출되는 콜백
   */
  onTagsChange?: (tags: string[]) => void;
  /**
   * 태그 추가 시 호출되는 콜백
   */
  onTagAdd?: (tag: string) => void;
  /**
   * 태그 삭제 시 호출되는 콜백
   */
  onTagRemove?: (tag: string) => void;
  /**
   * 허용되는 최대 태그 개수
   */
  maxTags?: number;
  /**
   * 제어되는 입력 값
   */
  value?: string;
  /**
   * 제어되는 입력 변경 콜백
   */
  onInputChange?: (value: string) => void;
  /**
   * 태그 생성을 트리거하는 구분자 문자
   * @default [',', 'Enter']
   */
  delimiters?: string[];
  /**
   * 중복 태그 허용 여부
   * @default false
   */
  allowDuplicates?: boolean;
  /**
   * 태그 삭제 가능 여부 (닫기 버튼 표시)
   * @default true
   */
  removable?: boolean;
}

/**
 * 태그 변형 Props (입력 필드 내부에 태그)
 */
export interface TagsVariantProps extends TagsBaseProps {
  variant: 'tags';
}

/**
 * 인라인 태그 변형 Props (입력 필드 하단에 태그)
 */
export interface InlineTagsVariantProps extends TagsBaseProps {
  variant: 'inline-tags';
}

/**
 * 애드온 기본 Props (addon과 inline-addon 공유)
 */
interface AddOnBaseProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * 입력 필드 앞에 표시되는 아이콘 (인라인이거나 접두사가 없을 때)
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 입력 필드 뒤에 표시되는 아이콘 (인라인이거나 접미사가 없을 때)
   */
  tailIcon?: IconTypeWithFill;
  /**
   * 접두사 애드온 컨텐츠 (문자열 또는 ReactNode)
   */
  prefix?: string | ReactNode;
  /**
   * 접미사 애드온 컨텐츠 (문자열 또는 ReactNode)
   */
  suffix?: string | ReactNode;
  /**
   * 지우기 버튼 클릭 시 호출되는 콜백 (제공 시 지우기 버튼 표시)
   */
  onClear?: () => void;
}

/**
 * 애드온 변형 Props (분리된 애드온 블록)
 */
export interface AddOnVariantProps extends AddOnBaseProps {
  variant: 'addon';
}

/**
 * 인라인 애드온 변형 Props (입력 필드 내부 애드온)
 */
export interface InlineAddOnVariantProps extends AddOnBaseProps {
  variant: 'inline-addon';
}

/**
 * 앞쪽 버튼 변형 Props
 */
export interface LeadButtonVariantProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant: 'lead-button';
  /**
   * 입력 필드 뒤에 표시되는 아이콘
   */
  tailIcon?: IconTypeWithFill;
  /**
   * 지우기 버튼 클릭 시 호출되는 콜백 (제공 시 지우기 버튼 표시)
   */
  onClear?: () => void;
  /**
   * 버튼 라벨 텍스트
   */
  buttonLabel?: string;
  /**
   * 버튼 앞에 표시되는 아이콘
   */
  buttonLeadIcon?: IconTypeWithFill;
  /**
   * 버튼 뒤에 표시되는 아이콘
   */
  buttonTailIcon?: IconTypeWithFill;
  /**
   * 버튼 클릭 시 호출되는 콜백
   */
  onButtonClick?: () => void;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  buttonDisabled?: boolean;
}

/**
 * 뒤쪽 버튼 변형 Props
 */
export interface TailButtonVariantProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant: 'tail-button';
  /**
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 지우기 버튼 클릭 시 호출되는 콜백 (제공 시 지우기 버튼 표시)
   */
  onClear?: () => void;
  /**
   * 버튼 라벨 텍스트
   */
  buttonLabel?: string;
  /**
   * 버튼 앞에 표시되는 아이콘
   */
  buttonLeadIcon?: IconTypeWithFill;
  /**
   * 버튼 뒤에 표시되는 아이콘
   */
  buttonTailIcon?: IconTypeWithFill;
  /**
   * 버튼 클릭 시 호출되는 콜백
   */
  onButtonClick?: () => void;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  buttonDisabled?: boolean;
}

/**
 * 앞쪽 드롭다운 변형 Props
 */
export interface LeadDropdownVariantProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant: 'lead-dropdown';
  /**
   * 입력 필드 뒤에 표시되는 아이콘
   */
  tailIcon?: IconTypeWithFill;
  /**
   * 지우기 버튼 클릭 시 호출되는 콜백 (제공 시 지우기 버튼 표시)
   */
  onClear?: () => void;
  /**
   * 사용 가능한 드롭다운 옵션 목록
   */
  dropdownOptions: DropdownOption[];
  /**
   * 현재 선택된 드롭다운 값
   */
  dropdownValue?: string;
  /**
   * 드롭다운 값 변경 시 호출되는 콜백
   */
  onDropdownChange?: (value: string) => void;
  /**
   * 드롭다운 값이 선택되지 않았을 때 표시되는 플레이스홀더 텍스트
   * @default 'Select'
   */
  dropdownPlaceholder?: string;
  /**
   * 드롭다운 트리거의 고정 너비 (px)
   */
  dropdownWidth?: number;
}

/**
 * 뒤쪽 드롭다운 변형 Props
 */
export interface TailDropdownVariantProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant: 'tail-dropdown';
  /**
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 지우기 버튼 클릭 시 호출되는 콜백 (제공 시 지우기 버튼 표시)
   */
  onClear?: () => void;
  /**
   * 사용 가능한 드롭다운 옵션 목록
   */
  dropdownOptions: DropdownOption[];
  /**
   * 현재 선택된 드롭다운 값
   */
  dropdownValue?: string;
  /**
   * 드롭다운 값 변경 시 호출되는 콜백
   */
  onDropdownChange?: (value: string) => void;
  /**
   * 드롭다운 값이 선택되지 않았을 때 표시되는 플레이스홀더 텍스트
   * @default 'Select'
   */
  dropdownPlaceholder?: string;
  /**
   * 드롭다운 트리거의 고정 너비 (px)
   */
  dropdownWidth?: number;
}

/**
 * 단축키 변형 Props
 */
export interface ShortcutVariantProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant: 'shortcut';
  /**
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 끝에 표시되는 단축키 뱃지 텍스트 (이 변형에서 필수)
   */
  shortcut: string;
}

/**
 * 모든 입력 필드 변형 Props의 유니온 타입
 */
export type InputProps =
  | DefaultVariantProps
  | ShortcutVariantProps
  | TagsVariantProps
  | InlineTagsVariantProps
  | TailDropdownVariantProps
  | LeadDropdownVariantProps
  | QuantityVariantProps
  | Quantity2VariantProps
  | TailButtonVariantProps
  | LeadButtonVariantProps
  | AddOnVariantProps
  | InlineAddOnVariantProps
  | PasswordVariantProps;

// 편의를 위해 타입 재내보내기
export type { PasswordStrength } from './variants/PasswordInput';
export type { DropdownOption } from './variants/DropdownInput';
export type { IconTypeWithFill } from '../icons/Icon/Icon.types';
