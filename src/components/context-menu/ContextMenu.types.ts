import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import type * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import type { IconColor, IconType } from '../icons/Icon/Icon.types';

export type ContextMenuProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>;

export type ContextMenuTriggerProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>;

export interface ContextMenuContentProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> {
  /**
   * 컨텍스트 메뉴의 커스텀 너비
   * @example width={200} - 200px
   * @example width="300px" - 300px
   * @example width="100%" - 100%
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
export type ContextMenuItemSize = 'default' | 'large';

export interface ContextMenuItemProps
  extends Omit<ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>, 'onClick'> {
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
  leadIcon?: IconType;
  /**
   * 리드 아이콘 filled 스타일 사용 여부
   * @default false
   */
  leadIconFill?: boolean;
  /**
   * 라벨 뒤에 표시되는 아이콘
   */
  tailIcon?: IconType;
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
  size?: ContextMenuItemSize;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

export interface ContextMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> {
  /**
   * 왼쪽 인덴트 적용
   */
  inset?: boolean;
}

export interface ContextMenuRadioItemProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> {
  /**
   * 왼쪽 인덴트 적용
   */
  inset?: boolean;
}

export interface ContextMenuLabelProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
  /**
   * 라벨 우측에 표시되는 캡션 텍스트
   */
  caption?: string;
}

export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>;

export type ContextMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

export interface ContextMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
}

export type ContextMenuSubContentProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubContent
>;

export type ContextMenuGroupProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Group
>;

export type ContextMenuPortalProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Portal
>;

export type ContextMenuSubProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Sub
>;

export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioGroup
>;

/**
 * ContextMenuCaption 컴포넌트 Props
 */
export interface ContextMenuCaptionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
