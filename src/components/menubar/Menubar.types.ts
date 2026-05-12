import type { HTMLAttributes, ReactNode } from 'react';
import type {
  MenubarProps as RadixMenubarProps,
  MenubarMenuProps as RadixMenubarMenuProps,
  MenubarGroupProps as RadixMenubarGroupProps,
  MenubarTriggerProps as RadixMenubarTriggerProps,
  MenubarContentProps as RadixMenubarContentProps,
  MenubarItemProps as RadixMenubarItemProps,
  MenubarCheckboxItemProps as RadixMenubarCheckboxItemProps,
  MenubarRadioItemProps as RadixMenubarRadioItemProps,
  MenubarLabelProps as RadixMenubarLabelProps,
  MenubarSeparatorProps as RadixMenubarSeparatorProps,
  MenubarSubTriggerProps as RadixMenubarSubTriggerProps,
  MenubarSubContentProps as RadixMenubarSubContentProps,
  MenubarSubProps as RadixMenubarSubProps,
  MenubarRadioGroupProps as RadixMenubarRadioGroupProps,
} from '@radix-ui/react-menubar';
import type { IconProp } from '../icons/Icon';
import type { IconColor } from '../icons/Icon/Icon.types';

export type MenubarProps = RadixMenubarProps;

export type MenubarMenuProps = RadixMenubarMenuProps;

export type MenubarGroupProps = RadixMenubarGroupProps;

export type MenubarTriggerProps = RadixMenubarTriggerProps;

export interface MenubarContentProps
  extends RadixMenubarContentProps {
  /**
   * 메뉴바 콘텐츠의 커스텀 너비
   * @example width={200} - 200px
   * @example width="300px" - 300px
   */
  width?: string | number;
  /**
   * Portal이 렌더링될 컨테이너 요소
   */
  container?: HTMLElement | null;
}

/**
 * 메뉴 아이템 사이즈 타입
 */
export type MenubarItemSize = 'default' | 'large';

export interface MenubarItemProps
  extends Omit<RadixMenubarItemProps, 'onClick'> {
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
   * 리드 아이콘 filled 스타일 사용 여부
   * @default false
   */
  leadIconFill?: boolean;
  /**
   * 라벨 뒤에 표시되는 아이콘
   */
  tailIcon?: IconProp;
  /**
   * 테일 아이콘 filled 스타일 사용 여부
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
  size?: MenubarItemSize;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

export interface MenubarCheckboxItemProps
  extends RadixMenubarCheckboxItemProps {
  /** 왼쪽 인덴트 적용 */
  inset?: boolean;
}

export interface MenubarRadioItemProps
  extends RadixMenubarRadioItemProps {
  /** 왼쪽 인덴트 적용 */
  inset?: boolean;
}

export interface MenubarLabelProps
  extends RadixMenubarLabelProps {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
  /**
   * 라벨 우측에 표시되는 캡션 텍스트
   */
  caption?: string;
}

export type MenubarSeparatorProps = RadixMenubarSeparatorProps;

export type MenubarShortcutProps = HTMLAttributes<HTMLSpanElement>;

export interface MenubarSubTriggerProps
  extends RadixMenubarSubTriggerProps {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
}

export type MenubarSubContentProps = RadixMenubarSubContentProps;

export type MenubarSubProps = RadixMenubarSubProps;

export type MenubarRadioGroupProps = RadixMenubarRadioGroupProps;

/**
 * MenubarCaption 컴포넌트 Props
 */
export interface MenubarCaptionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
