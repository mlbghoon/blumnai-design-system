import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';
import type { IconProp } from '../icons/Icon';
import type { BadgeColor } from '../badge/Badge/Badge.types';

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
  /** 탭 크기 (모든 variant에 적용) */
  size?: TabsSize;
  /** 탭 너비 타입 (default: 콘텐츠 크기, fixed: 균등 너비) */
  type?: TabsType;
  /**
   * 탭이 넘칠 때 스크롤 화살표 버튼 표시
   * @default false
   */
  scrollable?: boolean;
  /**
   * 탭 아이템 사이 간격 (px, underline 변형 전용)
   *
   * 설정하지 않으면 size에 따른 기본값 사용 (sm: 12px, lg: 16px)
   * @example gap={40}
   */
  gap?: number;
  /**
   * 활성 탭의 텍스트 및 언더라인 색상 (underline 변형 전용)
   *
   * 텍스트와 언더라인 모두 동일한 색상으로 설정합니다.
   * 개별 제어가 필요하면 activeTextColor, activeUnderlineColor를 사용하세요.
   * @example activeColor="#5988fe"
   */
  activeColor?: string;
  /**
   * 활성 탭의 텍스트 색상 (underline 변형 전용)
   *
   * activeColor보다 우선 적용됩니다.
   * @example activeTextColor="#333"
   */
  activeTextColor?: string;
  /**
   * 활성 탭의 언더라인 색상 (underline 변형 전용)
   *
   * activeColor보다 우선 적용됩니다.
   * @example activeUnderlineColor="#5988fe"
   */
  activeUnderlineColor?: string;
  /**
   * 활성 탭 인디케이터 슬라이딩 애니메이션 활성화
   *
   * 탭 전환 시 인디케이터가 부드럽게 이동합니다.
   * @default false
   */
  animatedIndicator?: boolean;
}

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /**
   * 앞에 표시되는 아이콘.
   *
   * 받는 형식:
   * - tuple `[category, name]` / `[category, name, isFill]` (dynamic-string back-compat; dev warning)
   * - Remixicon component (`RiSettingsLine` 등; tree-shaking 권장)
   * - ReactNode (이미 렌더된 노드)
   *
   * @example leadIcon={RiSettingsLine}
   * @example leadIcon={['system', 'settings']}
   * @example leadIcon={<CustomIcon />}
   */
  leadIcon?: IconProp | ReactNode;
  /**
   * 뒤에 표시되는 아이콘. 받는 형식은 `leadIcon` 과 동일.
   *
   * @example tailIcon={RiArrowRightLine}
   * @example tailIcon={['arrows', 'arrow-right']}
   */
  tailIcon?: IconProp | ReactNode;
  /** 배지 텍스트/숫자 */
  badge?: string | number;
  /**
   * 배지 색상 (Badge 컴포넌트와 동일한 색상 토큰)
   *
   * 미지정 시 기본 muted 스타일 (`bg-muted text-muted`) 적용.
   * @example badgeColor="red"
   */
  badgeColor?: BadgeColor;
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
