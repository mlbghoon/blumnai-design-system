import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';
import type { IconTypeWithFill } from '../icons/Icon/Icon.types';

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
  /**
   * 탭이 넘칠 때 스크롤 화살표 버튼 표시
   * @default false
   */
  scrollable?: boolean;
}

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /**
   * 앞에 표시되는 아이콘
   *
   * IconTypeWithFill 또는 ReactNode를 사용할 수 있습니다.
   * IconTypeWithFill은 [카테고리, 이름] 또는 [카테고리, 이름, isFill] 형식입니다.
   *
   * @example leadIcon={['system', 'settings']}
   * @example leadIcon={['system', 'star', true]} - filled icon
   * @example leadIcon={<CustomIcon />} - ReactNode
   */
  leadIcon?: IconTypeWithFill | ReactNode;
  /**
   * 뒤에 표시되는 아이콘
   *
   * IconTypeWithFill 또는 ReactNode를 사용할 수 있습니다.
   * IconTypeWithFill은 [카테고리, 이름] 또는 [카테고리, 이름, isFill] 형식입니다.
   *
   * @example tailIcon={['arrows', 'arrow-right']}
   * @example tailIcon={['health', 'heart', true]} - filled icon
   * @example tailIcon={<CustomIcon />} - ReactNode
   */
  tailIcon?: IconTypeWithFill | ReactNode;
  /** 배지 텍스트/숫자 */
  badge?: string | number;
  /**
   * 탭 닫기 가능 여부
   * @default false
   */
  closable?: boolean;
  /**
   * 탭 닫기 시 호출되는 콜백
   */
  onClose?: (value: string) => void;
}

export interface TabsContentProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /**
   * 패널 전환 애니메이션 활성화
   * @default false
   */
  animated?: boolean;
}
