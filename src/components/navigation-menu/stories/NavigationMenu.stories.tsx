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
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid ds-gap-8 padding-16 w-[280px]">
                <NavigationMenuListItem
                  href="/docs"
                  title="Introduction"
                  description="Re-usable components built using Radix UI and Tailwind CSS."
                />
                <NavigationMenuListItem
                  href="/docs/installation"
                  title="Installation"
                  description="How to install dependencies and structure your app."
                />
                <NavigationMenuListItem
                  href="/docs/primitives"
                  title="Typography"
                  description="Styles for headings, paragraphs, lists, etc."
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/docs/components/button"
                  title="Button"
                  description="Interactive button component with multiple variants."
                />
                <NavigationMenuListItem
                  href="/docs/components/input"
                  title="Input"
                  description="Text input field with label and validation support."
                />
                <NavigationMenuListItem
                  href="/docs/components/dialog"
                  title="Dialog"
                  description="Modal dialog for important content and actions."
                />
                <NavigationMenuListItem
                  href="/docs/components/popover"
                  title="Popover"
                  description="Floating content panel anchored to a trigger."
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/docs">
              Documentation
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
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/products/analytics"
                  title="Analytics"
                  description="Track and analyze your website performance."
                  icon={['business', 'line-chart']}
                />
                <NavigationMenuListItem
                  href="/products/automation"
                  title="Automation"
                  description="Automate your workflows and save time."
                  icon={['system', 'settings']}
                />
                <NavigationMenuListItem
                  href="/products/security"
                  title="Security"
                  description="Keep your data safe and secure."
                  icon={['system', 'shield-check']}
                />
                <NavigationMenuListItem
                  href="/products/integrations"
                  title="Integrations"
                  description="Connect with your favorite tools."
                  icon={['editor', 'link']}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/solutions/startup"
                  title="For Startups"
                  description="Scale your business with our startup solutions."
                  icon={['map', 'rocket']}
                  iconFill
                />
                <NavigationMenuListItem
                  href="/solutions/enterprise"
                  title="For Enterprise"
                  description="Enterprise-grade solutions for large teams."
                  icon={['buildings', 'building']}
                  iconFill
                />
                <NavigationMenuListItem
                  href="/solutions/developers"
                  title="For Developers"
                  description="Tools and APIs for developers."
                  icon={['development', 'code-sslash']}
                />
                <NavigationMenuListItem
                  href="/solutions/designers"
                  title="For Designers"
                  description="Design tools and resources."
                  icon={['design', 'palette']}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/pricing">
              Pricing
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
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/services">
              Services
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
              Contact
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
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/about"
              active
            >
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/services">
              Services
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
              Contact
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
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/features/speed"
                  title="Fast Performance"
                  description="Optimized for speed and efficiency."
                />
                <NavigationMenuListItem
                  href="/features/reliable"
                  title="Reliable"
                  description="99.9% uptime guaranteed."
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] ds-gap-8 padding-16">
                <NavigationMenuListItem
                  href="/resources/docs"
                  title="Documentation"
                  description="Comprehensive guides and API references."
                />
                <NavigationMenuListItem
                  href="/resources/blog"
                  title="Blog"
                  description="Latest updates and tutorials."
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
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid ds-gap-12 padding-16 md:w-[400px]">
                <div className="flex items-center ds-gap-12 padding-12 rounded-md bg-muted/30">
                  <div className="width-40 height-40 rounded-full bg-accent flex items-center justify-center">
                    <span className="size-lg font-body font-bold text-default">B</span>
                  </div>
                  <div>
                    <div className="size-sm font-body font-medium line-height-leading-5">
                      Blumnai Inc.
                    </div>
                    <div className="size-xs font-body text-muted line-height-leading-4">
                      Building the future of design systems
                    </div>
                  </div>
                </div>
                <ul className="grid ds-gap-8">
                  <NavigationMenuListItem
                    href="/about"
                    title="About Us"
                    description="Learn about our mission and team."
                  />
                  <NavigationMenuListItem
                    href="/careers"
                    title="Careers"
                    description="Join our growing team."
                  />
                  <NavigationMenuListItem
                    href="/press"
                    title="Press"
                    description="News and media resources."
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
