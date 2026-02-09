import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SidebarProvider, SidebarUserbar } from '../Sidebar';
import type { SidebarUserbarProps } from '../Sidebar.types';

const meta: Meta<typeof SidebarUserbar> = {
  title: 'Navigation/Sidebar/Userbar',
  component: SidebarUserbar,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['variant1', 'variant2', 'variant3'],
      description: '유저바 스타일 변형',
      table: {
        type: { summary: '"variant1" | "variant2" | "variant3"' },
        defaultValue: { summary: 'variant3' },
      },
    },
    name: {
      control: 'text',
      description: '사용자 이름',
      table: { type: { summary: 'string' } },
    },
    email: {
      control: 'text',
      description: '사용자 이메일 (variant2 전용)',
      table: { type: { summary: 'string' } },
    },
    avatarInitials: {
      control: 'text',
      description: '아바타 이니셜',
      table: { type: { summary: 'string' } },
    },
    avatarSrc: {
      control: 'text',
      description: '아바타 이미지 URL',
      table: { type: { summary: 'string' } },
    },
    collapsed: {
      control: 'boolean',
      description: '축소 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: '드롭다운 열림 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarUserbarProps>;

/**
 * 기본 유저바
 *
 * variant3 스타일의 기본 유저바입니다.
 */
export const Default: Story = {
  args: {
    variant: 'variant3',
    name: 'John Doe',
    avatarInitials: 'JD',
    collapsed: false,
    isOpen: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    return (
      <SidebarProvider defaultOpen={!args.collapsed}>
        <div className="w-[280px] border-default rounded-md padding-8">
          <SidebarUserbar
            variant={args.variant}
            name={args.name}
            email={args.email}
            avatarInitials={args.avatarInitials}
            avatarSrc={args.avatarSrc}
            collapsed={args.collapsed}
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * 모든 변형
 *
 * SidebarUserbar의 3가지 변형을 보여줍니다.
 */
export const AllVariants: Story = {
  render: function Render() {
    const [openVariant, setOpenVariant] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-24">
        <div>
          <p className="font-body size-sm font-medium margin-b-8">Variant 1 (Compact)</p>
          <div className="w-[280px] border-default rounded-md padding-8">
            <SidebarProvider defaultOpen={true}>
              <SidebarUserbar
                variant="variant1"
                name="John"
                avatarInitials="JD"
                isOpen={openVariant === 'v1'}
                onClick={() => setOpenVariant(openVariant === 'v1' ? null : 'v1')}
              />
            </SidebarProvider>
          </div>
        </div>

        <div>
          <p className="font-body size-sm font-medium margin-b-8">Variant 2 (Full with Email)</p>
          <div className="w-[280px] border-default rounded-md padding-8">
            <SidebarProvider defaultOpen={true}>
              <SidebarUserbar
                variant="variant2"
                name="John Doe"
                email="john@example.com"
                avatarInitials="JD"
                isOpen={openVariant === 'v2'}
                onClick={() => setOpenVariant(openVariant === 'v2' ? null : 'v2')}
              />
            </SidebarProvider>
          </div>
        </div>

        <div>
          <p className="font-body size-sm font-medium margin-b-8">Variant 3 (Default)</p>
          <div className="w-[280px] border-default rounded-md padding-8">
            <SidebarProvider defaultOpen={true}>
              <SidebarUserbar
                variant="variant3"
                name="John Doe"
                avatarInitials="JD"
                isOpen={openVariant === 'v3'}
                onClick={() => setOpenVariant(openVariant === 'v3' ? null : 'v3')}
              />
            </SidebarProvider>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 축소 상태
 *
 * 사이드바가 축소되었을 때 유저바의 모습입니다.
 */
export const Collapsed: Story = {
  render: function Render() {
    return (
      <div className="flex gap-16">
        <div className="flex flex-col items-center gap-4">
          <p className="font-body size-xs text-muted">V1</p>
          <div className="border-default rounded-md padding-8">
            <SidebarProvider defaultOpen={false}>
              <SidebarUserbar
                variant="variant1"
                collapsed={true}
                avatarInitials="V1"
              />
            </SidebarProvider>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="font-body size-xs text-muted">V2</p>
          <div className="border-default rounded-md padding-8">
            <SidebarProvider defaultOpen={false}>
              <SidebarUserbar
                variant="variant2"
                collapsed={true}
                avatarInitials="V2"
              />
            </SidebarProvider>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="font-body size-xs text-muted">V3</p>
          <div className="border-default rounded-md padding-8">
            <SidebarProvider defaultOpen={false}>
              <SidebarUserbar
                variant="variant3"
                collapsed={true}
                avatarInitials="V3"
              />
            </SidebarProvider>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 열림 상태
 *
 * 드롭다운이 열려있는 상태의 유저바입니다.
 */
export const OpenState: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-16">
        <div className="w-[280px] border-default rounded-md padding-8">
          <SidebarProvider defaultOpen={true}>
            <SidebarUserbar
              variant="variant3"
              name="John Doe"
              avatarInitials="JD"
              isOpen={true}
            />
          </SidebarProvider>
        </div>
        <p className="font-body size-xs text-muted">
          Arrow icon rotates when isOpen is true.
        </p>
      </div>
    );
  },
};
