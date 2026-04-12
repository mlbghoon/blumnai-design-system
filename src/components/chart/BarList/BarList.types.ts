export interface BarListItem {
  name: string;
  value: number;
  color?: string;
}

export interface BarListProps {
  /**
   * 바 리스트 데이터
   */
  data: BarListItem[];
  /**
   * 값 포맷터
   */
  valueFormatter?: (value: number) => string;
  /**
   * 값 뒤에 붙는 단위 텍스트
   */
  valueSuffix?: string;
  /**
   * 접기 전 표시할 항목 수
   * @default 5
   */
  showCount?: number;
  /**
   * 기본 바 색상 (item.color가 없을 때 사용)
   * @default 'var(--chart-1)'
   */
  color?: string;
  /**
   * 바 채우기 색상 (미지정 시 color 기반 alpha 사용)
   */
  fillColor?: string;
  /**
   * 스크롤 컨테이너 최대 높이 (px)
   */
  maxHeight?: number;
  /**
   * 애니메이션 활성화 여부
   * @default true
   */
  animated?: boolean;
  /**
   * 추가 className
   */
  className?: string;
  /**
   * 항목 클릭 콜백
   */
  onItemClick?: (item: BarListItem, index: number) => void;
}
