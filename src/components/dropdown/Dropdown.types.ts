import type { HTMLAttributes, ReactNode } from 'react';
import type {
  DropdownMenuProps as RadixDropdownMenuProps,
  DropdownMenuTriggerProps as RadixDropdownMenuTriggerProps,
  DropdownMenuContentProps as RadixDropdownMenuContentProps,
  DropdownMenuItemProps as RadixDropdownMenuItemProps,
  DropdownMenuLabelProps as RadixDropdownMenuLabelProps,
  DropdownMenuSeparatorProps as RadixDropdownMenuSeparatorProps,
  DropdownMenuSubTriggerProps as RadixDropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps as RadixDropdownMenuSubContentProps,
  DropdownMenuGroupProps as RadixDropdownMenuGroupProps,
  DropdownMenuPortalProps as RadixDropdownMenuPortalProps,
  DropdownMenuSubProps as RadixDropdownMenuSubProps,
  DropdownMenuCheckboxItemProps as RadixDropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps as RadixDropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps as RadixDropdownMenuRadioItemProps,
} from '@radix-ui/react-dropdown-menu';
import type { BadgeColor } from '../badge/Badge/Badge.types';
import type { ButtonStyle } from '../button/Button.types';
import type { IconProp } from '../icons/Icon';
import type { IconColor } from '../icons/Icon/Icon.types';

export type DropdownMenuProps = RadixDropdownMenuProps;

export type DropdownMenuTriggerProps = RadixDropdownMenuTriggerProps;

export interface DropdownMenuContentProps
  extends RadixDropdownMenuContentProps {
  /**
   * 드롭다운 메뉴의 커스텀 너비
   * @example width={200} - 200px
   * @example width="300px" - 300px
   * @example width="100%" - 100%
   */
  width?: string | number;
  /**
   * 드롭다운 메뉴의 최대 높이 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 Radix의 available-height를 사용
   */
  maxHeight?: string | number;
  /**
   * 비동기 데이터 로딩 중 표시 여부
   * @default false
   */
  loading?: boolean;
  /**
   * Portal이 렌더링될 컨테이너 요소
   */
  container?: HTMLElement | null;
  /**
   * 드롭다운 내부 검색 UI 표시 여부
   * @default false
   */
  isSearch?: boolean;
  /**
   * 검색 값 변경 시 호출되는 콜백
   */
  onSearch?: (value: string) => void;
  /**
   * 현재 검색 값 (controlled)
   */
  searchValue?: string;
  /**
   * 검색 입력 플레이스홀더
   * @default '검색...'
   */
  searchPlaceholder?: string;
}

/**
 * 메뉴 아이템 사이즈 타입
 */
export type DropdownMenuItemSize = 'default' | 'large';

export interface DropdownMenuItemProps
  extends Omit<RadixDropdownMenuItemProps, 'onClick'> {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
  /**
   * 삭제/위험 동작에 사용되는 스타일
   */
  destructive?: boolean;
  /**
   * 라벨 앞에 표시되는 아이콘
   */
  leadIcon?: IconProp;
  /**
   * @deprecated v2.0.0 부터 no-op. tuple-form 아이콘이 제거되면서 더 이상 의미가 없습니다.
   * Fill 변형은 import 이름으로 선택하세요 (예: `leadIcon={RiCheckFill}` vs `leadIcon={RiCheckLine}`).
   * 향후 메이저 버전에서 prop 자체가 제거될 수 있습니다.
   * @default false
   */
  leadIconFill?: boolean;
  /**
   * 라벨 뒤에 표시되는 아이콘
   */
  tailIcon?: IconProp;
  /**
   * @deprecated v2.0.0 부터 no-op. `tailIconFill` 대신 fill 변형 컴포넌트
   * (예: `tailIcon={RiArrowDownSFill}`)를 직접 import하세요.
   * 향후 메이저 버전에서 prop 자체가 제거될 수 있습니다.
   * @default false
   */
  tailIconFill?: boolean;
  /**
   * 아이콘 색상
   */
  iconColor?: IconColor;
  /**
   * 캡션 텍스트 (라벨 옆에 표시)
   */
  caption?: string;
  /**
   * 설명 텍스트 (라벨 아래에 표시, large 사이즈에서만)
   */
  description?: string;
  /**
   * 단축키 표시
   */
  shortcut?: string;
  /**
   * 아이템 사이즈
   * @default 'default'
   */
  size?: DropdownMenuItemSize;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

export interface DropdownMenuLabelProps
  extends RadixDropdownMenuLabelProps {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
  /**
   * 라벨 우측에 표시되는 캡션 텍스트
   */
  caption?: string;
}

export type DropdownMenuSeparatorProps = RadixDropdownMenuSeparatorProps;

export type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

export interface DropdownMenuSubTriggerProps
  extends RadixDropdownMenuSubTriggerProps {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
}

export type DropdownMenuSubContentProps = RadixDropdownMenuSubContentProps;

export type DropdownMenuGroupProps = RadixDropdownMenuGroupProps;

export type DropdownMenuPortalProps = RadixDropdownMenuPortalProps;

export type DropdownMenuSubProps = RadixDropdownMenuSubProps;

/**
 * DropdownMenuCaption 컴포넌트 Props
 */
export interface DropdownMenuCaptionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * DropdownMenuAvatar 컴포넌트 Props
 */
export interface DropdownMenuAvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * 아이템 라벨
   */
  label: string;
  /**
   * 아바타 이미지 URL
   */
  avatarSrc?: string;
  /**
   * 아바타 대체 텍스트 (이미지가 없을 때 이니셜로 표시)
   */
  avatarAlt?: string;
  /**
   * 라벨 뒤에 표시되는 아이콘
   */
  tailIcon?: IconProp;
  /**
   * 캡션 텍스트
   */
  caption?: string;
  /**
   * 단축키 표시
   */
  shortcut?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 아이콘 색상
   */
  iconColor?: IconColor;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * DropdownMenuUserbar 컴포넌트 Props
 */
export interface DropdownMenuUserbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 사용자 이름
   */
  name: string;
  /**
   * 사용자 설명 (이메일, 역할 등)
   */
  description?: string;
  /**
   * 아바타 이미지 URL
   */
  avatarSrc?: string;
  /**
   * 아바타 대체 텍스트
   */
  avatarAlt?: string;
  /**
   * 우측에 표시되는 뱃지 텍스트
   */
  badge?: string;
  /**
   * 뱃지 색상
   * @default 'neutral'
   */
  badgeColor?: BadgeColor;
}

/**
 * DropdownMenuButton 컴포넌트 Props
 */
export interface DropdownMenuButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * 버튼 라벨
   */
  label: string;
  /**
   * 버튼 스타일
   * @default 'secondary'
   */
  buttonStyle?: ButtonStyle;
  /**
   * 버튼 앞에 표시되는 아이콘
   */
  leadIcon?: IconProp;
  /**
   * 버튼 뒤에 표시되는 아이콘
   */
  tailIcon?: IconProp;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * DropdownMenuButtonGroup 컴포넌트 Props
 */
export interface DropdownMenuButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * MenuButton 컴포넌트 Props (버튼 그룹 내에서 사용)
 */
export interface MenuButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * 버튼 라벨
   */
  label: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * DropdownMenuCheckboxItem 컴포넌트 Props
 *
 * 체크박스 상태를 가지는 메뉴 아이템 (role="menuitemcheckbox")
 */
export interface DropdownMenuCheckboxItemProps
  extends RadixDropdownMenuCheckboxItemProps {
  /**
   * 왼쪽 인덴트 적용
   */
  inset?: boolean;
  /**
   * 라벨 앞에 표시되는 아이콘
   */
  leadIcon?: IconProp;
  /**
   * 아이콘 색상
   */
  iconColor?: IconColor;
}

/**
 * DropdownMenuRadioGroup 컴포넌트 Props
 */
export type DropdownMenuRadioGroupProps = RadixDropdownMenuRadioGroupProps;

/**
 * DropdownMenuRadioItem 컴포넌트 Props
 *
 * 라디오 선택 상태를 가지는 메뉴 아이템 (role="menuitemradio")
 */
export interface DropdownMenuRadioItemProps
  extends RadixDropdownMenuRadioItemProps {
  /**
   * 왼쪽 인덴트 적용
   */
  inset?: boolean;
  /**
   * 라벨 앞에 표시되는 아이콘
   */
  leadIcon?: IconProp;
  /**
   * 아이콘 색상
   */
  iconColor?: IconColor;
}

/**
 * DropdownMenuSearch 컴포넌트 Props
 */
export interface DropdownMenuSearchProps {
  /**
   * 현재 검색 값
   */
  value?: string;
  /**
   * 검색 값이 변경될 때 호출되는 콜백
   */
  onChange?: (value: string) => void;
  /**
   * 플레이스홀더 텍스트
   * @default 'Search...'
   */
  placeholder?: string;
  /**
   * 마운트 시 자동 포커스 여부
   * @default true
   */
  autoFocus?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}
