export interface ProportionBarItem {
  name: string;
  value: number;
  color: string;
}

export interface ProportionBarProps {
  /**
   * 비율 바 데이터
   */
  data: ProportionBarItem[];
  /**
   * 상단 총계 라벨
   */
  totalLabel?: string;
  /**
   * 상단 총계 값
   */
  totalValue?: string;
  /**
   * 값 뒤에 붙는 단위 텍스트
   */
  valueSuffix?: string;
  /**
   * 범례 값 포맷터
   */
  valueFormatter?: (value: number, name: string) => string;
  /**
   * 범례 표시 여부
   * @default true
   */
  showLegend?: boolean;
  /**
   * 범례 위치
   * @default 'right'
   */
  legendPosition?: 'bottom' | 'right';
  /**
   * 범례 인터랙티브 (클릭 토글)
   * @default false
   */
  legendInteractive?: boolean;
  /**
   * 애니메이션 활성화
   * @default true
   */
  animated?: boolean;
  /**
   * 컨테이너 스타일 변형
   * @default 'default'
   */
  variant?: 'default' | 'unstyled';
  /**
   * 바 높이 (px)
   * @default 40
   */
  height?: number;
  /**
   * 추가 className
   */
  className?: string;
}
