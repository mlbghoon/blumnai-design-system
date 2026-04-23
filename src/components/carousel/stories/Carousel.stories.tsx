import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import WheelGestures from 'embla-carousel-wheel-gestures';

import {
  Carousel,
  CarouselContent,
  CarouselViewport,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
} from '../Carousel';

import type { CarouselApi, CarouselIndicatorVariant } from '../Carousel.types';

const meta: Meta<typeof Carousel> = {
  title: 'DataDisplay/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '캐러셀의 슬라이드 방향을 설정합니다. horizontal은 가로, vertical은 세로 방향입니다',
      table: {
        type: {
          summary: 'CarouselOrientation',
          detail: `'horizontal' | 'vertical'`,
        },
        defaultValue: { summary: 'horizontal' },
      },
    },
    gap: {
      control: 'number',
      description: '슬라이드 사이의 간격을 px 단위로 설정합니다. 기본값은 16px입니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
    opts: {
      description: 'Embla Carousel의 세부 옵션입니다. 슬라이드 정렬 위치, 무한 루프, 자유 드래그 등의 동작을 제어할 수 있습니다',
      table: {
        type: {
          summary: 'EmblaOptionsType',
          detail: `{
  align?: 'start' | 'center' | 'end'  // 슬라이드 정렬 위치
  loop?: boolean                       // 무한 루프 활성화
  dragFree?: boolean                   // 자유 드래그 모드
  containScroll?: false | 'trimSnaps' | 'keepSnaps'  // 스크롤 제한
  slidesToScroll?: 'auto' | number     // 한 번에 스크롤할 슬라이드 수
  startIndex?: number                  // 시작 슬라이드 인덱스
  duration?: number                    // 애니메이션 지속 시간 (ms)
  skipSnaps?: boolean                  // 중간 스냅 건너뛰기
  inViewThreshold?: number             // 뷰포트 감지 임계값 (0-1)
}`,
        },
      },
    },
    plugins: {
      description: 'Embla Carousel 플러그인 배열. 자동재생, 페이드 효과 등 추가 기능을 제공합니다.',
      table: {
        type: {
          summary: 'EmblaPluginType[]',
          detail: `사용 가능한 플러그인 (별도 설치 필요):
• embla-carousel-autoplay - 자동 슬라이드 전환
• embla-carousel-fade - 페이드 전환 효과
• embla-carousel-auto-height - 슬라이드 높이 자동 조절
• embla-carousel-auto-scroll - 연속 자동 스크롤
• embla-carousel-class-names - CSS 클래스 자동 관리
• embla-carousel-wheel-gestures - 마우스 휠 지원`,
        },
      },
    },
    setApi: {
      description: '캐러셀 API 인스턴스를 받는 콜백 함수. 외부에서 캐러셀을 프로그래밍 방식으로 제어할 때 사용합니다.',
      table: {
        type: {
          summary: '(api: CarouselApi) => void',
          detail: `사용 가능한 API 메서드:
• scrollTo(index) - 특정 슬라이드로 이동
• scrollPrev() / scrollNext() - 이전/다음 슬라이드로 이동
• selectedScrollSnap() - 현재 슬라이드 인덱스 반환
• scrollSnapList() - 모든 슬라이드 위치 배열 반환
• canScrollPrev() / canScrollNext() - 스크롤 가능 여부 확인
• on(event, callback) - 이벤트 리스너 등록 (select, scroll 등)
• off(event, callback) - 이벤트 리스너 제거

사용 예시:
const [api, setApi] = useState<CarouselApi>();
// 첫 번째 슬라이드로 이동
api?.scrollTo(0);
// 현재 슬라이드 감지
api?.on('select', () => console.log(api.selectedScrollSnap()));`,
        },
      },
    },
    className: {
      control: 'text',
      description: '캐러셀 루트 요소에 추가할 CSS 클래스입니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const SlideItem = ({ children }: { children: React.ReactNode }) => (
  <div className="padding-24 bg-subtle rounded-lg flex items-center justify-center" style={{ height: 200 }}>
    <span className="size-2xl font-headline text-default">{children}</span>
  </div>
);

type DefaultStoryArgs = {
  orientation: 'horizontal' | 'vertical';
  loop: boolean;
  align: 'start' | 'center' | 'end';
  gap: number;
  indicatorVariant: CarouselIndicatorVariant;
  arrowSize: 'sm' | 'md' | 'lg' | 'xl';
};

/**
 * 기본 캐러셀
 *
 * Controls 패널에서 모든 props를 테스트할 수 있습니다.
 */
export const Default: StoryObj<DefaultStoryArgs> = {
  parameters: {
    controls: { disable: false },
  },
  args: {
    orientation: 'horizontal',
    loop: false,
    align: 'center',
    gap: 16,
    indicatorVariant: 'dot',
    arrowSize: 'xl',
  },
  argTypes: {
    loop: {
      control: 'boolean',
      description: '무한 루프 활성화',
      table: { type: { summary: 'boolean' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '슬라이드 정렬',
      table: { type: { summary: "'start' | 'center' | 'end'" } },
    },
    gap: {
      control: 'number',
      description: '슬라이드 간 간격 (px)',
      table: { type: { summary: 'number' } },
    },
    indicatorVariant: {
      control: 'select',
      options: ['dot', 'line', 'number'],
      description: '인디케이터 스타일',
      table: { type: { summary: 'CarouselIndicatorVariant' } },
    },
    arrowSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '[CarouselPrevious/Next] 네비게이션 버튼 크기',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'xl' },
        category: 'Navigation',
      },
    },
  },
  render: function Render(args) {
    return (
      <div style={{ width: 400, paddingLeft: 24, paddingRight: 24 }}>
        <Carousel
          orientation={args.orientation}
          opts={{ loop: args.loop, align: args.align }}
          gap={args.gap}
        >
          <CarouselViewport>
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((i) => (
                <CarouselItem key={i}>
                  <SlideItem>{i}</SlideItem>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious size={args.arrowSize} />
            <CarouselNext size={args.arrowSize} />
          </CarouselViewport>
          <div className="padding-y-16">
            <CarouselIndicators variant={args.indicatorVariant} />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * Dot 인디케이터
 *
 * 슬라이드 하단에 dot 스타일 인디케이터를 표시합니다.
 */
export const WithDotIndicators: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * Line 인디케이터
 *
 * 슬라이드 하단에 line 스타일 인디케이터를 표시합니다.
 */
export const WithLineIndicators: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="line" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * Number 인디케이터
 *
 * 슬라이드 하단에 "1 / 5" 형식의 숫자 인디케이터를 표시합니다.
 */
export const WithNumberIndicators: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="number" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * Loop 모드
 *
 * 마지막 슬라이드에서 첫 슬라이드로 순환합니다.
 */
export const Loop: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 여러 슬라이드 표시
 *
 * 한 번에 여러 슬라이드를 표시합니다.
 */
export const MultipleSlides: Story = {
  render: function Render() {
    return (
      <div style={{ width: 500 }} className="padding-x-40">
        <Carousel opts={{ align: 'start' }}>
          <CarouselContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <CarouselItem key={i} className="basis-1/3">
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 수직 캐러셀
 *
 * 세로 방향으로 슬라이드합니다.
 */
export const Vertical: Story = {
  render: function Render() {
    return (
      <div style={{ width: 300 }} className="padding-y-40">
        <Carousel orientation="vertical" style={{ height: 200 }}>
          <CarouselContent style={{ height: 200 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
};

/**
 * Drag Free 모드
 *
 * 자유롭게 드래그하여 스크롤할 수 있습니다.
 */
export const DragFree: Story = {
  render: function Render() {
    return (
      <div style={{ width: 500 }} className="padding-x-40">
        <Carousel opts={{ dragFree: true, align: 'start' }}>
          <CarouselContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <CarouselItem key={i} className="basis-1/3">
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
};

/**
 * API 사용 예시
 *
 * setApi를 사용하여 캐러셀 API에 접근합니다.
 */
export const WithApi: Story = {
  render: function Render() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const handleApiChange = (newApi: CarouselApi) => {
      setApi(newApi);

      if (!newApi) return;

      setCount(newApi.scrollSnapList().length);
      setCurrent(newApi.selectedScrollSnap() + 1);

      newApi.on('select', () => {
        setCurrent(newApi.selectedScrollSnap() + 1);
      });
    };

    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel setApi={handleApiChange}>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="padding-y-16 text-center">
          <span className="font-body size-sm text-subtle">
            슬라이드 {current} / {count}
          </span>
        </div>
        <div className="flex ds-gap-8 justify-center">
          <button
            type="button"
            onClick={() => api?.scrollTo(0)}
            className="padding-x-12 padding-y-6 bg-subtle rounded-md font-body size-sm text-default hover:bg-muted transition-colors"
          >
            처음
          </button>
          <button
            type="button"
            onClick={() => api?.scrollTo(count - 1)}
            className="padding-x-12 padding-y-6 bg-subtle rounded-md font-body size-sm text-default hover:bg-muted transition-colors"
          >
            마지막
          </button>
        </div>
      </div>
    );
  },
};

/**
 * 이미지 갤러리
 *
 * 이미지 슬라이더로 사용하는 예시입니다.
 */
export const ImageGallery: Story = {
  render: function Render() {
    const images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=400&fit=crop',
    ];

    return (
      <div style={{ width: 500 }} className="padding-x-40">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={src}
                    alt={`산 풍경 ${index + 1}`}
                    className="w-full"
                    style={{ height: 250, objectFit: 'cover' }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 인디케이터만 (네비게이션 버튼 없음)
 *
 * 네비게이션 버튼 없이 인디케이터만 표시합니다.
 */
export const IndicatorsOnly: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }}>
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 모든 인디케이터 변형
 *
 * 세 가지 인디케이터 변형을 비교합니다.
 */
export const AllIndicatorVariants: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-32">
        <div>
          <span className="font-body size-sm text-subtle block padding-y-8">Dot</span>
          <div style={{ width: 400 }} className="padding-x-40">
            <Carousel>
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i}>
                    <SlideItem>{i}</SlideItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <div className="padding-y-16">
                <CarouselIndicators variant="dot" />
              </div>
            </Carousel>
          </div>
        </div>
        <div>
          <span className="font-body size-sm text-subtle block padding-y-8">Line</span>
          <div style={{ width: 400 }} className="padding-x-40">
            <Carousel>
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i}>
                    <SlideItem>{i}</SlideItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <div className="padding-y-16">
                <CarouselIndicators variant="line" />
              </div>
            </Carousel>
          </div>
        </div>
        <div>
          <span className="font-body size-sm text-subtle block padding-y-8">Number</span>
          <div style={{ width: 400 }} className="padding-x-40">
            <Carousel>
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i}>
                    <SlideItem>{i}</SlideItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <div className="padding-y-16">
                <CarouselIndicators variant="number" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 자동 재생
 *
 * embla-carousel-autoplay 플러그인을 사용하여 슬라이드가 자동으로 전환됩니다.
 * 마우스를 올리면 일시정지되고, 떠나면 재생됩니다.
 */
export const AutoPlay: Story = {
  render: function Render() {
    const plugin = Autoplay({ delay: 3000, stopOnInteraction: false });

    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel plugins={[plugin]} opts={{ loop: true }}>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 자동 재생 + 재생/일시정지 버튼
 *
 * 자동 재생을 수동으로 제어할 수 있습니다.
 */
export const AutoPlayWithControls: Story = {
  render: function Render() {
    const [isPlaying, setIsPlaying] = useState(true);
    const autoplayRef = Autoplay({ delay: 3000, stopOnInteraction: false });

    const toggleAutoplay = useCallback(() => {
      const autoplay = autoplayRef;
      const playOrStop = isPlaying ? autoplay.stop : autoplay.play;
      playOrStop();
      setIsPlaying(!isPlaying);
    }, [isPlaying, autoplayRef]);

    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel plugins={[autoplayRef]} opts={{ loop: true }}>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16 flex items-center justify-center ds-gap-16">
            <CarouselIndicators variant="dot" />
            <button
              type="button"
              onClick={toggleAutoplay}
              className="padding-x-12 padding-y-6 bg-subtle rounded-md font-body size-sm text-default hover:bg-muted transition-colors"
            >
              {isPlaying ? '일시정지' : '재생'}
            </button>
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 페이드 전환
 *
 * embla-carousel-fade 플러그인을 사용하여 슬라이드가 페이드 효과로 전환됩니다.
 * 페이드 효과는 loop 모드에서 가장 잘 작동합니다.
 */
export const FadeTransition: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel plugins={[Fade()]} opts={{ loop: true }}>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 마우스 휠 제스처
 *
 * embla-carousel-wheel-gestures 플러그인을 사용하여 마우스 휠로 스크롤할 수 있습니다.
 * 캐러셀 위에서 마우스 휠을 사용해보세요.
 */
export const WithWheelGestures: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel plugins={[WheelGestures()]} opts={{ loop: true }}>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
      </div>
    );
  },
};

/**
 * 모든 플러그인 조합
 *
 * 자동재생, 페이드, 휠 제스처를 모두 사용하는 예시입니다.
 */
export const AllPlugins: Story = {
  render: function Render() {
    const plugins = [
      Autoplay({ delay: 4000, stopOnInteraction: false }),
      Fade(),
      WheelGestures(),
    ];

    const images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=400&fit=crop',
    ];

    return (
      <div style={{ width: 500 }} className="padding-x-40">
        <Carousel plugins={plugins} opts={{ loop: true }}>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={src}
                    alt={`산 풍경 ${index + 1}`}
                    className="w-full"
                    style={{ height: 250, objectFit: 'cover' }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="line" />
          </div>
        </Carousel>
        <p className="font-body size-xs text-muted text-center padding-y-8">
          자동재생 + 페이드 전환 + 마우스 휠 지원
        </p>
      </div>
    );
  },
};

/**
 * 키보드 네비게이션
 *
 * 캐러셀에 포커스한 후 왼쪽/오른쪽 화살표 키로 탐색할 수 있습니다.
 */
export const KeyboardNavigation: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }} className="padding-x-40">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((i) => (
              <CarouselItem key={i}>
                <SlideItem>{i}</SlideItem>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <div className="padding-y-16">
            <CarouselIndicators variant="dot" />
          </div>
        </Carousel>
        <p className="font-body size-xs text-muted text-center padding-y-8">
          캐러셀 영역을 클릭한 후 ← → 키를 사용하세요
        </p>
      </div>
    );
  },
};

/**
 * 슬라이드 간격 커스텀
 *
 * gap prop을 사용하여 슬라이드 간 간격을 조절합니다.
 */
export const CustomGap: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-32">
        <div>
          <span className="font-body size-sm text-subtle block padding-y-8">gap: 0px</span>
          <div style={{ width: 500 }} className="padding-x-40">
            <Carousel gap={0} opts={{ align: 'start' }}>
              <CarouselContent>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CarouselItem key={i} className="basis-1/3">
                    <SlideItem>{i}</SlideItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div>
          <span className="font-body size-sm text-subtle block padding-y-8">gap: 8px</span>
          <div style={{ width: 500 }} className="padding-x-40">
            <Carousel gap={8} opts={{ align: 'start' }}>
              <CarouselContent>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CarouselItem key={i} className="basis-1/3">
                    <SlideItem>{i}</SlideItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div>
          <span className="font-body size-sm text-subtle block padding-y-8">gap: 24px</span>
          <div style={{ width: 500 }} className="padding-x-40">
            <Carousel gap={24} opts={{ align: 'start' }}>
              <CarouselContent>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CarouselItem key={i} className="basis-1/3">
                    <SlideItem>{i}</SlideItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    );
  },
};
