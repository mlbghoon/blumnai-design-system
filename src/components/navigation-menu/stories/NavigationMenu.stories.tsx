import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuListItem,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from '../NavigationMenu';
import type { NavigationMenuProps } from '../NavigationMenu.types';

const meta: Meta<NavigationMenuProps> = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  decorators: [
    (Story) => (
      <div className="padding-16 min-h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<NavigationMenuProps>;

/**
 * 기본 Navigation Menu
 *
 * 웹사이트 헤더 네비게이션에 사용되는 hover 트리거 메뉴입니다.
 * Menubar와 달리 hover로 드롭다운이 열리며, 링크 기반 네비게이션에 적합합니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  render: function Render() {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>시작하기</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid ds-gap-8 padding-16 w-[280px]">
                <NavigationMenuListItem
                  href="/docs"
                  title="소개"
                  description="Radix UI와 Tailwind CSS로 만들어진 재사용 가능한 컴포넌트입니다."
                />
                <NavigationMenuListItem
                  href="/docs/installation"
                  title="설치"
                  description="의존성 설치 및 앱 구조 설정 방법입니다."
                />
                <NavigationMenuListItem
                  href="/docs/primitives"
                  title="타이포그래피"
                  description="제목, 단락, 목록 등의 스타일입니다."
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>컴포넌트</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/docs/components/button"
                  title="버튼"
                  description="다양한 변형이 있는 인터랙티브 버튼 컴포넌트입니다."
                />
                <NavigationMenuListItem
                  href="/docs/components/input"
                  title="입력"
                  description="라벨 및 유효성 검사를 지원하는 텍스트 입력 필드입니다."
                />
                <NavigationMenuListItem
                  href="/docs/components/dialog"
                  title="다이얼로그"
                  description="중요한 콘텐츠와 액션을 위한 모달 다이얼로그입니다."
                />
                <NavigationMenuListItem
                  href="/docs/components/popover"
                  title="팝오버"
                  description="트리거에 고정된 플로팅 콘텐츠 패널입니다."
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/docs">
              문서
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

/**
 * 아이콘이 있는 Mega Menu
 *
 * 아이콘과 설명이 포함된 mega-menu 스타일 네비게이션입니다.
 */
export const MegaMenuWithIcons: Story = {
  render: function Render() {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>제품</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/products/analytics"
                  title="분석"
                  description="웹사이트 성능을 추적하고 분석합니다."
                  icon={['business', 'line-chart']}
                />
                <NavigationMenuListItem
                  href="/products/automation"
                  title="자동화"
                  description="워크플로우를 자동화하고 시간을 절약합니다."
                  icon={['system', 'settings']}
                />
                <NavigationMenuListItem
                  href="/products/security"
                  title="보안"
                  description="데이터를 안전하게 보호합니다."
                  icon={['system', 'shield-check']}
                />
                <NavigationMenuListItem
                  href="/products/integrations"
                  title="통합"
                  description="즐겨 사용하는 도구와 연결합니다."
                  icon={['editor', 'link']}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>솔루션</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/solutions/startup"
                  title="스타트업"
                  description="스타트업 솔루션으로 비즈니스를 확장하세요."
                  icon={['map', 'rocket']}
                  iconFill
                />
                <NavigationMenuListItem
                  href="/solutions/enterprise"
                  title="기업"
                  description="대규모 팀을 위한 엔터프라이즈급 솔루션입니다."
                  icon={['buildings', 'building']}
                  iconFill
                />
                <NavigationMenuListItem
                  href="/solutions/developers"
                  title="개발자"
                  description="개발자를 위한 도구 및 API입니다."
                  icon={['development', 'code-sslash']}
                />
                <NavigationMenuListItem
                  href="/solutions/designers"
                  title="디자이너"
                  description="디자인 도구 및 리소스입니다."
                  icon={['design', 'palette']}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/pricing">
              가격
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

/**
 * 간단한 네비게이션
 *
 * 드롭다운 없이 링크만 있는 간단한 네비게이션입니다.
 */
export const SimpleNavigation: Story = {
  render: function Render() {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
              홈
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
              소개
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/services">
              서비스
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
              연락처
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

/**
 * 활성 링크 표시
 *
 * active 속성으로 현재 페이지를 표시할 수 있습니다.
 */
export const WithActiveLink: Story = {
  render: function Render() {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
              홈
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/about"
              active
            >
              소개
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/services">
              서비스
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
              연락처
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

/**
 * Indicator 사용
 *
 * NavigationMenuIndicator를 사용하여 현재 활성 메뉴를 시각적으로 표시합니다.
 */
export const WithIndicator: Story = {
  render: function Render() {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>기능</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/features/speed"
                  title="빠른 성능"
                  description="속도와 효율성을 위해 최적화되었습니다."
                />
                <NavigationMenuListItem
                  href="/features/reliable"
                  title="안정적"
                  description="99.9% 가동 시간을 보장합니다."
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>리소스</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/resources/docs"
                  title="문서"
                  description="포괄적인 가이드 및 API 레퍼런스입니다."
                />
                <NavigationMenuListItem
                  href="/resources/blog"
                  title="블로그"
                  description="최신 업데이트 및 튜토리얼입니다."
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};

/**
 * 커스텀 콘텐츠
 *
 * NavigationMenuListItem의 children을 사용하여 커스텀 콘텐츠를 렌더링합니다.
 */
export const CustomContent: Story = {
  render: function Render() {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>회사</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid ds-gap-12 padding-16 md:w-[400px]">
                <div className="flex items-center ds-gap-12 padding-12 rounded-md bg-muted/30">
                  <div className="width-40 height-40 rounded-full bg-accent flex items-center justify-center">
                    <span className="size-lg font-body font-semibold text-default">B</span>
                  </div>
                  <div>
                    <div className="size-sm font-body font-medium line-height-leading-5">
                      Blumnai Inc.
                    </div>
                    <div className="size-xs font-body text-muted line-height-leading-4">
                      디자인 시스템의 미래를 만들어갑니다
                    </div>
                  </div>
                </div>
                <ul className="grid ds-gap-8">
                  <NavigationMenuListItem
                    href="/about"
                    title="회사 소개"
                    description="우리의 미션과 팀에 대해 알아보세요."
                  />
                  <NavigationMenuListItem
                    href="/careers"
                    title="채용"
                    description="성장하는 팀에 합류하세요."
                  />
                  <NavigationMenuListItem
                    href="/press"
                    title="언론"
                    description="뉴스 및 미디어 리소스입니다."
                  />
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};
