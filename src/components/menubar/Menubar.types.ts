import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import type * as MenubarPrimitive from '@radix-ui/react-menubar';
import type { IconColor, IconType } from '../icons/Icon/Icon.types';

export type MenubarProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>;

export type MenubarMenuProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>;

export type MenubarTriggerProps = ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>;

export interface MenubarContentProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> {
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
  extends Omit<ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>, 'onClick'> {
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
  size?: MenubarItemSize;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

export type MenubarCheckboxItemProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.CheckboxItem
>;

export type MenubarRadioItemProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.RadioItem
>;

export interface MenubarLabelProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
  /**
   * 라벨 우측에 표시되는 캡션 텍스트
   */
  caption?: string;
}

export type MenubarSeparatorProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Separator
>;

export type MenubarShortcutProps = HTMLAttributes<HTMLSpanElement>;

export interface MenubarSubTriggerProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
  /**
   * 왼쪽 인덴트 적용 (체크박스/라디오 아이템과 정렬용)
   */
  inset?: boolean;
}

export type MenubarSubContentProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubContent
>;

export type MenubarSubProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Sub
>;

export type MenubarRadioGroupProps = ComponentPropsWithoutRef<
  typeof MenubarPrimitive.RadioGroup
>;

/**
 * MenubarCaption 컴포넌트 Props
 */
export interface MenubarCaptionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
