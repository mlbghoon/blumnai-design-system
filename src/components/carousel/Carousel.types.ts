import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';
import type useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';

export type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];
export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Embla Carousel 옵션
   */
  opts?: EmblaOptionsType;
  /**
   * Embla Carousel 플러그인
   */
  plugins?: EmblaPluginType[];
  /**
   * 캐러셀 방향
   * @default 'horizontal'
   */
  orientation?: CarouselOrientation;
  /**
   * 슬라이드 간 간격 (px)
   * @default 16
   */
  gap?: number;
  /**
   * 캐러셀 API 콜백
   */
  setApi?: (api: CarouselApi) => void;
}

export type CarouselContentProps = HTMLAttributes<HTMLDivElement>;

export type CarouselItemProps = HTMLAttributes<HTMLDivElement>;

export type CarouselNavProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type CarouselIndicatorVariant = 'dot' | 'line' | 'number';

export interface CarouselIndicatorsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 인디케이터 스타일
   * @default 'dot'
   */
  variant?: CarouselIndicatorVariant;
}

export interface CarouselContextProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  opts?: EmblaOptionsType;
  orientation: CarouselOrientation;
  gap: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}
