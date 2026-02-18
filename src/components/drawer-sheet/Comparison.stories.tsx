import type { Meta, StoryObj } from '@storybook/react-vite';

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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';
import { Button } from '../button';

const meta: Meta = {
  title: 'Overlay/DrawerSheet/Comparison',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
    docs: {
      description: {
        component: `
## Drawer vs Sheet 비교 가이드

Drawer와 Sheet는 모두 화면에 추가 콘텐츠를 표시하는 오버레이 컴포넌트입니다.
사용 목적과 플랫폼에 따라 적절한 컴포넌트를 선택하세요.

### 핵심 차이점

| 특성 | Drawer (vaul) | Sheet (Radix) |
|------|---------------|---------------|
| **방향** | 상/하/좌/우 모두 지원 | 상/하/좌/우 모두 지원 |
| **제스처** | 스와이프/드래그로 닫기 | 제스처 없음 |
| **핸들** | 드래그 핸들 표시 | 핸들 없음 |
| **배경 효과** | iOS 스타일 축소 | 없음 |
| **최적 플랫폼** | 모바일 (터치) | 데스크톱 (마우스) |

### Drawer 권장 사용 사례
- 모바일 앱의 액션 시트
- 지도 앱의 장소 상세 정보
- 음악 플레이어 확장
- 빠른 설정 패널
- 공유/옵션 메뉴

### Sheet 권장 사용 사례
- 데스크톱 사이드 패널
- 프로필 편집 폼
- 네비게이션 메뉴
- 알림/설정 패널
- 필터 사이드바
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Drawer vs Sheet 직접 비교
 *
 * 같은 콘텐츠를 Drawer와 Sheet로 열어서 차이점을 직접 확인해보세요.
 * - Drawer: 하단에서 올라오며 스와이프로 닫을 수 있음
 * - Sheet: 오른쪽에서 슬라이드 인, 외부 클릭으로 닫음
 */
export const SideBySide: Story = {
  render: function Render() {
    const content = {
      title: '설정',
      description: '앱 설정을 관리합니다.',
      items: ['알림 설정', '계정 관리', '개인정보 보호', '앱 정보'],
    };

    return (
      <div className="flex ds-gap-16 items-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button buttonStyle="secondary">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{content.title}</DrawerTitle>
              <DrawerDescription>{content.description}</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col ds-gap-8 padding-x-16 padding-y-8">
              {content.items.map((item) => (
                <DrawerClose asChild key={item}>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft transition-colors cursor-pointer">
                    {item}
                  </button>
                </DrawerClose>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button fullWidth>닫기</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Sheet>
          <SheetTrigger asChild>
            <Button buttonStyle="secondary">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{content.title}</SheetTitle>
              <SheetDescription>{content.description}</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col ds-gap-8 padding-y-16">
              {content.items.map((item) => (
                <SheetClose asChild key={item}>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft transition-colors cursor-pointer">
                    {item}
                  </button>
                </SheetClose>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button fullWidth>닫기</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
};

/**
 * 모바일 vs 데스크톱 패턴
 *
 * 반응형 디자인에서 모바일은 Drawer, 데스크톱은 Sheet를 사용하는 것이 일반적입니다.
 */
export const ResponsivePattern: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm font-medium text-default">
            📱 모바일 패턴 (Drawer 권장)
          </span>
          <span className="font-body size-xs text-muted">
            터치 제스처에 최적화, 하단에서 올라오는 자연스러운 UX
          </span>
          <Drawer>
            <DrawerTrigger asChild>
              <Button buttonStyle="secondary" size="sm">모바일 메뉴</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>메뉴</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col ds-gap-8 padding-x-16 padding-y-8">
                <DrawerClose asChild>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft cursor-pointer">
                    홈
                  </button>
                </DrawerClose>
                <DrawerClose asChild>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft cursor-pointer">
                    검색
                  </button>
                </DrawerClose>
                <DrawerClose asChild>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft cursor-pointer">
                    설정
                  </button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm font-medium text-default">
            🖥️ 데스크톱 패턴 (Sheet 권장)
          </span>
          <span className="font-body size-xs text-muted">
            마우스 인터랙션에 최적화, 사이드 패널 형태
          </span>
          <Sheet>
            <SheetTrigger asChild>
              <Button buttonStyle="secondary" size="sm">데스크톱 패널</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>설정 패널</SheetTitle>
                <SheetDescription>
                  데스크톱에서는 사이드 패널이 더 자연스럽습니다.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col ds-gap-8 padding-y-16">
                <SheetClose asChild>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft cursor-pointer">
                    일반 설정
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft cursor-pointer">
                    알림 설정
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button className="text-left font-body size-sm text-default padding-12 rounded-md hover:bg-state-soft cursor-pointer">
                    보안 설정
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  },
};

/**
 * 액션 시트 비교
 *
 * 같은 액션 시트를 Drawer와 Sheet의 하단 방향으로 구현했을 때의 차이입니다.
 * Drawer는 드래그 핸들과 스와이프 제스처가 있어 더 모바일 친화적입니다.
 */
export const ActionSheetComparison: Story = {
  render: function Render() {
    const actions = [
      { label: '공유하기', description: '다른 앱으로 공유' },
      { label: '복사하기', description: '클립보드에 복사' },
      { label: '삭제하기', description: '영구 삭제' },
    ];

    return (
      <div className="flex ds-gap-16">
        <div className="flex flex-col ds-gap-8 items-center">
          <span className="font-body size-xs text-muted">Drawer (스와이프 가능)</span>
          <Drawer>
            <DrawerTrigger asChild>
              <Button buttonStyle="secondary" size="sm">Drawer 액션</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>작업 선택</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col padding-x-16 padding-y-8">
                {actions.map((action) => (
                  <DrawerClose asChild key={action.label}>
                    <button className="flex flex-col ds-gap-2 padding-12 rounded-md hover:bg-state-soft text-left cursor-pointer">
                      <span className="font-body size-sm font-medium text-default">
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
        </div>

        <div className="flex flex-col ds-gap-8 items-center">
          <span className="font-body size-xs text-muted">Sheet Bottom (클릭 닫기)</span>
          <Sheet>
            <SheetTrigger asChild>
              <Button buttonStyle="secondary" size="sm">Sheet 액션</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-xl">
              <SheetHeader>
                <SheetTitle>작업 선택</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col padding-y-8">
                {actions.map((action) => (
                  <SheetClose asChild key={action.label}>
                    <button className="flex flex-col ds-gap-2 padding-12 rounded-md hover:bg-state-soft text-left cursor-pointer">
                      <span className="font-body size-sm font-medium text-default">
                        {action.label}
                      </span>
                      <span className="font-body size-xs text-muted">
                        {action.description}
                      </span>
                    </button>
                  </SheetClose>
                ))}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button buttonStyle="ghost" fullWidth>취소</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  },
};

/**
 * 언제 무엇을 선택할까?
 *
 * 사용 사례별 권장 컴포넌트를 보여줍니다.
 */
export const WhenToUse: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-20 max-w-lg">
      <div className="flex flex-col ds-gap-12">
        <h3 className="font-body size-md font-semibold text-default">
          ✅ Drawer 사용
        </h3>
        <ul className="flex flex-col ds-gap-8">
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>모바일 우선 앱의 액션 시트</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>지도 앱의 장소 상세 (Google Maps 스타일)</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>음악/미디어 플레이어 확장</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>iOS/Android 네이티브 같은 UX 필요 시</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>스와이프 제스처가 중요한 경우</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col ds-gap-12">
        <h3 className="font-body size-md font-semibold text-default">
          ✅ Sheet 사용
        </h3>
        <ul className="flex flex-col ds-gap-8">
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>데스크톱 설정/필터 사이드바</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>네비게이션 메뉴 (좌측 슬라이드)</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>폼 입력이 많은 편집 패널</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>상/하/좌/우 다양한 방향 필요 시</span>
          </li>
          <li className="font-body size-sm text-default flex ds-gap-8">
            <span>•</span>
            <span>키보드 접근성이 중요한 경우</span>
          </li>
        </ul>
      </div>
    </div>
  ),
};
