import type { ComponentPropsWithoutRef, RefObject } from 'react';
import type { Group, Panel, Separator, PanelImperativeHandle } from 'react-resizable-panels';

export type ResizablePanelGroupProps = ComponentPropsWithoutRef<typeof Group>;

export type ResizablePanelProps = ComponentPropsWithoutRef<typeof Panel>;

export type ResizableHandleVariant = 'line' | 'pill' | 'dots' | 'hidden';

export interface ResizableHandleProps extends ComponentPropsWithoutRef<typeof Separator> {
  /**
   * 핸들 UI 표시 여부
   * @default false
   */
  withHandle?: boolean;
  /**
   * 핸들 스타일 변형
   * - line: 얇은 선 (기본값)
   * - pill: 둥근 알약 모양
   * - dots: 점 그리드
   * - hidden: 호버 시에만 표시
   * @default 'line'
   */
  variant?: ResizableHandleVariant;
  /**
   * 패널 접기 버튼 설정
   * - 'before': 핸들 앞 패널을 접음
   * - 'after': 핸들 뒤 패널을 접음
   */
  collapseButton?: 'before' | 'after';
  /**
   * 패널 접기 버튼 위치
   * - 'start': 시작 위치 (horizontal: 상단, vertical: 좌측)
   * - 'center': 중앙 (기본값)
   * - 'end': 끝 위치 (horizontal: 하단, vertical: 우측)
   * - number: 픽셀 값 (horizontal: 상단에서, vertical: 좌측에서의 거리)
   * @default 'center'
   */
  collapseButtonPosition?: 'start' | 'center' | 'end' | number;
  /**
   * 패널 ref (collapse/expand 제어용)
   * collapseButton 사용 시 필수
   */
  panelRef?: RefObject<PanelImperativeHandle | null>;
  /**
   * 현재 접힘 상태 (제어 모드)
   */
  isCollapsed?: boolean;
  /**
   * 접기/펼치기 콜백
   */
  onCollapseChange?: (collapsed: boolean) => void;
}
