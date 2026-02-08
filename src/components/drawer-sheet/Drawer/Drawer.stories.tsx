import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';
import { Button } from '../../button';
import { Switch } from '../../switch';

type DrawerDirection = 'top' | 'bottom' | 'left' | 'right';

interface DrawerStoryProps {
  direction?: DrawerDirection;
  shouldScaleBackground?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const meta: Meta<DrawerStoryProps> = {
  title: 'Components/Overlay/Drawer & Sheet/Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
    docs: {
      description: {
        component: `
## Drawer vs Sheet - 언제 무엇을 사용해야 하나요?

### Drawer (vaul) 사용
- **모바일 우선 UI**: 네이티브 앱 같은 시트 경험
- **스와이프 제스처**: 드래그로 닫기 가능 (모든 방향)
- **빠른 액션**: 공유 메뉴, 액션 시트, 빠른 설정
- **터치 친화적**: 드래그 핸들 시각적 표시
- **다방향 지원**: top, bottom, left, right

### Sheet (Radix) 사용
- **데스크톱 패널**: 설정, 필터, 상세 뷰
- **다방향 지원**: 왼쪽/오른쪽/상단/하단 패널
- **제스처 불필요**: 외부 클릭 또는 ESC로 닫기
- **복잡한 콘텐츠**: 폼, 네비게이션 메뉴
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '[Drawer] 열리는 방향',
      table: {
        type: {
          summary: 'DrawerDirection',
          detail: `'top' | 'bottom' | 'left' | 'right'`,
        },
        defaultValue: { summary: 'bottom' },
        category: 'Drawer',
      },
    },
    shouldScaleBackground: {
      control: 'boolean',
      description: '[Drawer] iOS 스타일 배경 축소 효과',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Drawer',
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: '[Drawer] 초기 열림 상태 (비제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'Drawer',
      },
    },
    open: {
      control: 'boolean',
      description: '[Drawer] 열림 상태 (제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'Drawer',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[Drawer] 열림 상태 변경 콜백',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'Drawer',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DrawerStoryProps>;

/**
 * 기본 Drawer
 *
 * 화면 하단에서 올라오는 모바일 친화적인 패널입니다.
 * 스와이프 제스처로 닫을 수 있으며, 드래그 핸들이 표시됩니다.
 */
export const Default: Story = {
  args: {
    direction: 'bottom',
    shouldScaleBackground: true,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <Drawer direction={args.direction} shouldScaleBackground={args.shouldScaleBackground}>
        <DrawerTrigger asChild>
          <Button buttonStyle="secondary">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>
              Drawer description text goes here. You can swipe down to close.
            </DrawerDescription>
          </DrawerHeader>
          <div className="font-body size-sm text-default padding-x-16 padding-y-16">
            This is the drawer content area. Drag the handle above to close.
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button buttonStyle="secondary">Cancel</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button>Confirm</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

/**
 * 모든 방향
 *
 * Drawer가 열릴 수 있는 4가지 방향을 보여줍니다.
 * direction prop으로 top, bottom, left, right를 지정할 수 있습니다.
 */
export const AllDirections: Story = {
  render: () => (
    <div className="flex gap-12 flex-wrap">
      {(['bottom', 'top', 'left', 'right'] as const).map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button buttonStyle="secondary">{direction}</Button>
          </DrawerTrigger>
          <DrawerContent className={direction === 'left' || direction === 'right' ? 'w-[300px]' : ''}>
            <DrawerHeader>
              <DrawerTitle>{direction.charAt(0).toUpperCase() + direction.slice(1)} Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer slides in from the {direction}.
              </DrawerDescription>
            </DrawerHeader>
            <div className="font-body size-sm text-default padding-x-16 padding-y-16">
              Content for the {direction} drawer.
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

/**
 * 액션 시트
 *
 * iOS의 Share Sheet나 Android의 Bottom Sheet처럼 빠른 액션을 선택하는 패턴입니다.
 * 사용 예: 공유 메뉴, 파일 작업, 콘텐츠 옵션
 *
 * @example iOS Share Sheet, Instagram 게시물 옵션
 */
export const ActionSheet: Story = {
  render: function Render() {
    const actions = [
      { label: '공유하기', description: '다른 앱으로 공유' },
      { label: '링크 복사', description: '클립보드에 복사' },
      { label: '수정하기', description: '콘텐츠 편집' },
      { label: '삭제하기', description: '영구 삭제', destructive: true },
    ];

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button buttonStyle="secondary">Open Actions</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>작업 선택</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col padding-x-16 padding-y-8">
            {actions.map((action) => (
              <DrawerClose asChild key={action.label}>
                <button
                  className={`flex flex-col gap-2 padding-12 rounded-md hover:bg-state-soft transition-colors text-left cursor-pointer ${
                    action.destructive ? 'text-state-destructive' : 'text-default'
                  }`}
                >
                  <span className="font-body size-sm font-medium">
                    {action.label}
                  </span>
                  <span className="font-body size-xs text-muted">
                    {action.description}
                  </span>
                </button>
              </DrawerClose>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button buttonStyle="ghost" fullWidth>취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

/**
 * 빠른 설정
 *
 * 알림, 다크모드 등 토글 설정을 빠르게 변경하는 패턴입니다.
 * 사용 예: 앱 설정 빠른 접근, 알림 설정, 프라이버시 옵션
 *
 * @example iOS 제어 센터, Android 빠른 설정
 */
export const QuickSettings: Story = {
  render: function Render() {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const settingsList = [
      { key: 'notifications' as const, label: '푸시 알림', description: '새 메시지 및 업데이트 알림' },
      { key: 'darkMode' as const, label: '다크 모드', description: '어두운 테마 사용' },
      { key: 'autoSave' as const, label: '자동 저장', description: '변경사항 자동 저장' },
      { key: 'analytics' as const, label: '분석 데이터', description: '사용 데이터 수집 허용' },
    ];

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button buttonStyle="secondary">Quick Settings</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>빠른 설정</DrawerTitle>
            <DrawerDescription>
              자주 사용하는 설정을 빠르게 변경하세요.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-12 padding-x-16 padding-y-8">
            {settingsList.map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between padding-y-8"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-body size-sm font-medium text-default">
                    {setting.label}
                  </span>
                  <span className="font-body size-xs text-muted">
                    {setting.description}
                  </span>
                </div>
                <Switch
                  checked={settings[setting.key]}
                  onCheckedChange={() => toggleSetting(setting.key)}
                />
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button fullWidth>완료</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

/**
 * 장바구니 미리보기
 *
 * 쇼핑몰에서 장바구니 내용을 빠르게 확인하는 패턴입니다.
 * 사용 예: 이커머스 장바구니, 음식 주문 앱
 *
 * @example 쿠팡 장바구니, 배달의민족 주문 요약
 */
export const CartPreview: Story = {
  render: function Render() {
    const cartItems = [
      { id: 1, name: '무선 이어폰 Pro', price: 129000, quantity: 1 },
      { id: 2, name: 'USB-C 케이블 (2m)', price: 15000, quantity: 2 },
      { id: 3, name: '폰 케이스 - 클리어', price: 25000, quantity: 1 },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button buttonStyle="secondary">View Cart (3)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>장바구니</DrawerTitle>
            <DrawerDescription>
              {cartItems.length}개 상품
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-12 padding-x-16 padding-y-8 max-h-[300px] overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center padding-y-8 border-b border-default"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-body size-sm font-medium text-default">
                    {item.name}
                  </span>
                  <span className="font-body size-xs text-muted">
                    수량: {item.quantity}
                  </span>
                </div>
                <span className="font-body size-sm font-medium text-default">
                  ₩{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center padding-x-16 padding-y-12 border-t border-default">
            <span className="font-body size-sm text-muted">총 금액</span>
            <span className="font-body size-lg font-bold text-default">
              ₩{total.toLocaleString()}
            </span>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button buttonStyle="secondary">계속 쇼핑</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button>결제하기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

/**
 * 필터 Drawer
 *
 * 모바일에서 검색 결과나 상품 목록을 필터링하는 패턴입니다.
 * 사용 예: 쇼핑몰 상품 필터, 검색 결과 정렬
 *
 * @example 무신사 필터, 에어비앤비 필터
 */
export const FilterDrawer: Story = {
  render: function Render() {
    const [priceRange, setPriceRange] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('popular');

    const priceOptions = [
      { value: 'all', label: '전체' },
      { value: 'under50k', label: '5만원 이하' },
      { value: '50k-100k', label: '5만원 ~ 10만원' },
      { value: 'over100k', label: '10만원 이상' },
    ];

    const sortOptions = [
      { value: 'popular', label: '인기순' },
      { value: 'newest', label: '최신순' },
      { value: 'priceAsc', label: '가격 낮은순' },
      { value: 'priceDesc', label: '가격 높은순' },
    ];

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button buttonStyle="secondary">Filter</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>필터</DrawerTitle>
            <DrawerDescription>
              원하는 조건으로 상품을 필터링하세요.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-20 padding-x-16 padding-y-8">
            <div className="flex flex-col gap-8">
              <span className="font-body size-sm font-medium text-default">
                가격대
              </span>
              <div className="flex flex-wrap gap-8">
                {priceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriceRange(option.value)}
                    className={`padding-x-12 padding-y-6 rounded-full font-body size-sm transition-colors ${
                      priceRange === option.value
                        ? 'bg-state-primary text-white'
                        : 'bg-subtle text-default hover:bg-muted'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <span className="font-body size-sm font-medium text-default">
                정렬
              </span>
              <div className="flex flex-wrap gap-8">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`padding-x-12 padding-y-6 rounded-full font-body size-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-state-primary text-white'
                        : 'bg-subtle text-default hover:bg-muted'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              buttonStyle="ghost"
              onClick={() => {
                setPriceRange('all');
                setSortBy('popular');
              }}
            >
              초기화
            </Button>
            <DrawerClose asChild>
              <Button>적용하기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

/**
 * 지도 위치 상세
 *
 * Google Maps나 카카오맵처럼 지도에서 위치를 선택했을 때 상세 정보를 보여주는 패턴입니다.
 * 사용 예: 지도 앱, 배달 앱 주소 선택
 *
 * @example Google Maps 장소 상세, 카카오맵 장소 정보
 */
export const MapLocationDetail: Story = {
  render: function Render() {
    const location = {
      name: '스타벅스 강남대로점',
      category: '카페',
      address: '서울특별시 강남구 강남대로 396',
      distance: '350m',
      rating: 4.2,
      reviewCount: 1247,
      hours: '07:00 - 22:00',
      phone: '02-1234-5678',
    };

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button buttonStyle="secondary">View Location</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <div className="flex items-start justify-between">
              <div>
                <DrawerTitle>{location.name}</DrawerTitle>
                <DrawerDescription>
                  {location.category} · {location.distance}
                </DrawerDescription>
              </div>
              <div className="flex items-center gap-4 padding-y-4">
                <span className="font-body size-sm font-medium text-default">
                  ⭐ {location.rating}
                </span>
                <span className="font-body size-xs text-muted">
                  ({location.reviewCount})
                </span>
              </div>
            </div>
          </DrawerHeader>
          <div className="flex flex-col gap-12 padding-x-16 padding-y-8">
            <div className="flex flex-col gap-4">
              <span className="font-body size-xs text-muted">주소</span>
              <span className="font-body size-sm text-default">{location.address}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-body size-xs text-muted">영업시간</span>
              <span className="font-body size-sm text-default">{location.hours}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-body size-xs text-muted">전화번호</span>
              <span className="font-body size-sm text-default">{location.phone}</span>
            </div>
          </div>
          <DrawerFooter>
            <Button buttonStyle="secondary" fullWidth>길찾기</Button>
            <Button fullWidth>전화하기</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

/**
 * 음악 플레이어
 *
 * 스포티파이나 애플뮤직처럼 하단에서 현재 재생 중인 음악 정보를 보여주는 패턴입니다.
 * 미니 플레이어를 탭하면 전체 화면으로 확장됩니다.
 *
 * @example Spotify Now Playing, Apple Music 미니 플레이어
 */
export const MusicPlayer: Story = {
  render: function Render() {
    const [isPlaying, setIsPlaying] = useState(false);

    const track = {
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      currentTime: '1:45',
    };

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex items-center gap-12 padding-12 bg-subtle rounded-lg cursor-pointer hover:bg-muted transition-colors">
            <div className="width-40 height-40 bg-muted rounded-md flex items-center justify-center">
              <span className="size-lg">🎵</span>
            </div>
            <div className="flex-1">
              <div className="font-body size-sm font-medium text-default">{track.title}</div>
              <div className="font-body size-xs text-muted">{track.artist}</div>
            </div>
            <Button
              size="sm"
              buttonStyle="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="items-center">
            <div className="width-200 height-200 bg-muted rounded-lg flex items-center justify-center mx-auto">
              <span className="text-6xl">🎵</span>
            </div>
            <DrawerTitle className="text-center mt-4">{track.title}</DrawerTitle>
            <DrawerDescription className="text-center">
              {track.artist} · {track.album}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-16 padding-x-16 padding-y-8">
            <div className="flex flex-col gap-8">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-state-primary rounded-full" />
              </div>
              <div className="flex justify-between">
                <span className="font-body size-xs text-muted">{track.currentTime}</span>
                <span className="font-body size-xs text-muted">{track.duration}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-24">
              <Button buttonStyle="ghost" size="lg">⏮</Button>
              <Button
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="width-56 height-56 rounded-full"
              >
                {isPlaying ? '⏸' : '▶'}
              </Button>
              <Button buttonStyle="ghost" size="lg">⏭</Button>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button buttonStyle="ghost" fullWidth>미니 플레이어로 축소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

/**
 * 프로그래매틱 제어
 *
 * Drawer는 `open`과 `onOpenChange` props로 외부에서 제어할 수 있습니다.
 * 트리거 버튼 없이 프로그래밍 방식으로 열고 닫을 수 있습니다.
 */
export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col gap-16 items-start">
        <p className="font-body size-sm text-muted">
          Drawer는 외부 상태로 제어할 수 있습니다. 트리거 없이 프로그래밍 방식으로 열 수 있습니다.
        </p>
        <div className="flex gap-8">
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
            Open Drawer
          </Button>
          <Button buttonStyle="ghost" onClick={() => alert('다른 작업 수행')}>
            Other Action
          </Button>
        </div>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>프로그래매틱 Drawer</DrawerTitle>
              <DrawerDescription>
                이 Drawer는 트리거 버튼 없이 외부 상태로 제어됩니다.
              </DrawerDescription>
            </DrawerHeader>
            <div className="padding-x-16 padding-y-16">
              <p className="font-body size-sm text-default">
                open 상태: {open ? 'true' : 'false'}
              </p>
            </div>
            <DrawerFooter>
              <Button buttonStyle="secondary" onClick={() => setOpen(false)}>닫기</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
};

/**
 * 스크롤 가능한 콘텐츠
 *
 * 긴 콘텐츠가 있을 때 Drawer 내부에서 스크롤이 가능합니다.
 * 드래그 제스처와 스크롤이 충돌하지 않도록 처리됩니다.
 */
export const ScrollableContent: Story = {
  render: function Render() {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `항목 ${i + 1}`,
      description: `이것은 항목 ${i + 1}의 설명입니다.`,
    }));

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button buttonStyle="secondary">Open Long List</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>긴 목록</DrawerTitle>
            <DrawerDescription>
              스크롤하여 모든 항목을 확인하세요.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-8 padding-x-16 padding-y-8 max-h-[400px] overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-12 padding-12 bg-subtle rounded-md"
              >
                <div className="width-40 height-40 bg-muted rounded-full flex items-center justify-center font-body size-sm font-medium text-default">
                  {item.id}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body size-sm font-medium text-default">
                    {item.title}
                  </span>
                  <span className="font-body size-xs text-muted">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button fullWidth>닫기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};
