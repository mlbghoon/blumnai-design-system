import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';
import type { IconType } from '../icons/Icon/Icon.types';

export type TabsVariant = 'pill' | 'segmented' | 'underline';
export type TabsShape = 'pill' | 'rounded';
export type TabsSize = 'sm' | 'lg';
export type TabsType = 'default' | 'fixed';

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** 탭 스타일 변형 */
  variant?: TabsVariant;
  /** 탭 아이템 모서리 스타일 (pill/segmented 변형에만 적용) */
  shape?: TabsShape;
  /** 탭 크기 (underline 변형에만 적용) */
  size?: TabsSize;
  /** 탭 너비 타입 (default: 콘텐츠 크기, fixed: 균등 너비) */
  type?: TabsType;
}

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** 앞에 표시되는 아이콘 */
  leadIcon?: IconType | ReactNode;
  /** 뒤에 표시되는 아이콘 */
  tailIcon?: IconType | ReactNode;
  /** 배지 텍스트/숫자 */
  badge?: string | number;
}

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;
