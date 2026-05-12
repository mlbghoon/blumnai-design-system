import type { ReactNode, HTMLAttributes } from 'react';
import type {
  SelectTriggerProps as RadixSelectTriggerProps,
  SelectContentProps as RadixSelectContentProps,
  SelectItemProps as RadixSelectItemProps,
} from '@radix-ui/react-select';

import type { IconProp } from '../icons/Icon';
import type { IconColor } from '../icons/Icon/Icon.types';

/**
 * Select 스타일 변형
 */
export type SelectStyle = 'default' | 'shadow' | 'soft';

/**
 * Select 크기 변형
 */
export type SelectSize = 'xs' | 'sm' | 'lg';

/**
 * Select 변형 타입
 */
export type SelectVariant = 'default' | 'avatar' | 'multi-select' | 'tags';

/**
 * Select 메뉴 아이템 선택 타입
 */
export type SelectType = 'default' | 'checkbox' | 'radio';

/**
 * Select 옵션 툴팁 배치
 */
export type SelectOptionTooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

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
  leadIcon?: IconProp;
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
  /**
   * 옵션 호버 시 표시되는 툴팁 내용. string/ReactNode 모두 자동으로 Tooltip으로 감싸짐.
   * `disabled: true` 옵션에서도 동작하므로, 비활성화 사유를 안내할 때 유용함.
   */
  tooltip?: ReactNode;
  /**
   * 툴팁 배치 (기본 'right' — 드롭다운 옆으로 표시되어 다른 옵션을 가리지 않음)
   * @default 'right'
   */
  tooltipPlacement?: SelectOptionTooltipPlacement;
}

/**
 * Select 옵션 그룹
 */
export interface SelectOptionGroup {
  /**
   * 그룹 라벨
   */
  label: string;
  /**
   * 그룹에 포함되는 옵션 ID 목록
   */
  optionIds: string[];
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
   * Select 위에 표시되는 라벨 (문자열 또는 ReactNode)
   */
  label?: ReactNode;
  /**
   * 라벨 위치 (top: 상단, left: 좌측 인라인)
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';
  /**
   * 라벨 너비 (labelPosition='left'일 때 사용, 여러 필드 정렬용)
   * 숫자는 px, 문자열은 그대로 사용
   */
  labelWidth?: string | number;
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
   * Select 컨테이너의 최소 너비 (숫자는 px, 문자열은 그대로 사용)
   */
  minWidth?: string | number;
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
  leadIcon?: IconProp;
  /**
   * 라벨 뒤, 화살표 앞에 표시되는 아이콘
   */
  tailIcon?: IconProp;
  /**
   * 선택 가능한 옵션 목록
   */
  options: SelectOption[];
  /**
   * 검색 가능 여부. `true`이면 드롭다운 내부에 검색 입력이 표시되는 하이브리드 UX가 활성화됩니다.
   *
   * @deprecated 타이핑이 주 상호작용이라면 `Combobox` 컴포넌트를 사용하세요.
   * `Combobox`는 editable 입력 + 자동완성 패턴(WAI-ARIA Editable Combobox)을 제공하며,
   * `creatable`, `highlightSearch`, `filterFunction` 등 검색 관련 기능이 더 완비되어 있습니다.
   * 이 prop은 하위 호환을 위해 유지되지만 새 코드에서는 권장되지 않습니다.
   *
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
   * 외부 컨테이너에 적용할 추가 className
   */
  className?: string;
  /**
   * 선택 초기화 버튼 표시 여부.
   * `true`이면 선택된 값이 있을 때 X 버튼이 표시됩니다.
   * @default false
   */
  clearable?: boolean;
  /**
   * 로딩 상태.
   * `true`이면 드롭다운 내에 스피너가 표시됩니다.
   * @default false
   */
  loading?: boolean;
  /**
   * 옵션 그룹 정의.
   * 각 그룹에 라벨과 옵션 ID 목록을 지정합니다.
   * `options`와 함께 사용하여 그룹별로 옵션을 구분합니다.
   */
  optionGroups?: SelectOptionGroup[];
  /**
   * 옵션 아이템의 커스텀 렌더링 함수
   */
  renderOption?: (option: SelectOption, isSelected: boolean) => ReactNode;
  /**
   * 트리거에 선택된 값을 커스텀 렌더링하는 함수
   * 미지정 시 선택된 옵션의 label 텍스트 표시
   */
  renderValue?: (option: SelectOption) => ReactNode;
}

/**
 * 기본 Select Props - 단일 선택
 */
export interface DefaultSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant?: 'default';
  /**
   * 현재 선택된 값
   */
  value?: string;
  /**
   * 비제어 모드에서의 초기 선택 값
   */
  defaultValue?: string;
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
export interface AvatarSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant: 'avatar';
  /**
   * 현재 선택된 값
   */
  value?: string;
  /**
   * 비제어 모드에서의 초기 선택 값
   */
  defaultValue?: string;
  /**
   * 선택 변경 시 호출되는 콜백
   */
  onChange?: (value: string) => void;
}

/**
 * Multi-select Props - 다중 선택
 */
export interface MultiSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
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
  /**
   * 전체 선택 옵션 표시 여부 (maxSelections 설정 시 무시됨)
   * @default false
   */
  showSelectAll?: boolean;
  /**
   * 전체 선택 라벨
   * @default '전체 선택'
   */
  selectAllLabel?: string;
  /** 적용 버튼 모드 — true면 선택을 즉시 반영하지 않고 적용/취소 버튼으로 일괄 반영 */
  showActions?: boolean;
  /** 적용 버튼 라벨 @default '적용' */
  applyLabel?: string;
  /** 취소 버튼 라벨 @default '취소' */
  cancelLabel?: string;
  /**
   * 적용 버튼 활성화 조건 (showActions 모드에서만 동작).
   * 반환값이 false면 적용 버튼이 비활성화됩니다.
   * 미지정 시 기본값은 "변경 사항이 있을 때만 활성화" (pending !== committed).
   * 예: `canApply={(pending) => pending.length > 0}` — 빈 선택 commit 방지
   */
  canApply?: (pending: string[], committed: string[]) => boolean;
}

/**
 * Tags Select Props - 태그로 표시되는 다중 선택
 */
export interface TagsSelectProps extends SelectBaseProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
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
 * 모든 Select 변형 Props의 유니온 타입
 */
export type SelectProps =
  | DefaultSelectProps
  | AvatarSelectProps
  | MultiSelectProps
  | TagsSelectProps;

/**
 * RadixMultiSelect 변형 타입
 */
export type RadixMultiSelectVariant = 'default' | 'avatar' | 'tags';

/**
 * RadixMultiSelect Props - Radix 기반 다중 선택 컴포넌트
 */
export interface RadixMultiSelectProps extends SelectBaseProps {
  variant?: RadixMultiSelectVariant;
  value?: string[];
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  maxSelections?: number;
  selectedText?: string | ((count: number) => string);
  maxVisibleTags?: number;
  overflowText?: string | ((hiddenCount: number, totalCount: number) => string);
  /** 전체 선택 옵션 표시 여부 (maxSelections 설정 시 무시됨) @default false */
  showSelectAll?: boolean;
  /** 전체 선택 라벨 @default '전체 선택' */
  selectAllLabel?: string;
  /** 적용 버튼 모드 — true면 선택을 즉시 반영하지 않고 적용/취소 버튼으로 일괄 반영 */
  showActions?: boolean;
  /** 적용 버튼 라벨 @default '적용' */
  applyLabel?: string;
  /** 취소 버튼 라벨 @default '취소' */
  cancelLabel?: string;
  /**
   * 적용 버튼 활성화 조건 (showActions 모드에서만 동작).
   * 반환값이 false면 적용 버튼이 비활성화됩니다.
   * 미지정 시 기본값은 "변경 사항이 있을 때만 활성화" (pending !== committed).
   */
  canApply?: (pending: string[], committed: string[]) => boolean;
}

// ============================================================================
// Radix Select Component Types
// ============================================================================

/**
 * SelectTrigger Props
 */
export interface SelectTriggerProps
  extends RadixSelectTriggerProps {
  size?: SelectSize;
  selectStyle?: SelectStyle;
  state?: 'default' | 'disabled' | 'error' | 'success';
  leadIcon?: IconProp;
  tailIcon?: IconProp;
}

/**
 * SelectContent Props
 */
export interface SelectContentProps
  extends RadixSelectContentProps {
  maxHeight?: number | string;
  header?: ReactNode;
  contentWidth?: string | number;
}

/**
 * ExtendedSelectItem Props
 */
export interface ExtendedSelectItemProps
  extends RadixSelectItemProps {
  selectType?: SelectType;
  leadIcon?: IconProp;
  /**
   * 아이콘 색상
   */
  iconColor?: IconColor;
  description?: string;
  badge?: string;
  avatarSrc?: string;
  /**
   * 선택된 상태 여부 (checkbox/radio 타입에서 사용)
   */
  isSelected?: boolean;
  /**
   * 라벨 오버플로우 자동 툴팁 비활성화 (외부에서 다른 툴팁을 제공할 때 충돌 방지)
   */
  disableLabelTooltip?: boolean;
}

/**
 * ExtendedSelect Props
 */
export interface ExtendedSelectProps extends SelectBaseProps {
  variant?: 'default' | 'avatar';
  selectType?: SelectType;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

/**
 * MultiSelectItem Props (internal)
 */
export interface MultiSelectItemProps {
  option: SelectOption;
  selected: boolean;
  focused: boolean;
  disabled?: boolean;
  variant: RadixMultiSelectVariant;
  onToggle: () => void;
  /**
   * 라벨 오버플로우 자동 툴팁 비활성화 (외부에서 다른 툴팁을 제공할 때 충돌 방지)
   */
  disableLabelTooltip?: boolean;
}
