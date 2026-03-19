import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../Collapsible';
import { Icon } from '../../icons/Icon';

const meta: Meta<typeof Collapsible> = {
  title: 'Layout/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '초기 열림 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

/**
 * 기본 Collapsible
 *
 * 콘텐츠를 접고 펼 수 있는 컴포넌트입니다.
 */
export const Default: Story = {
  args: {
    defaultOpen: false,
    disabled: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen);

    React.useEffect(() => {
      setIsOpen(args.defaultOpen);
    }, [args.defaultOpen]);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        disabled={args.disabled}
        className={`w-[300px] ${args.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center justify-between padding-12 rounded-md border-default">
          <span className="size-sm font-body font-medium">내용 접기/펼치기</span>
          <CollapsibleTrigger asChild>
            <button
              className={`padding-4 rounded-md hover:bg-muted/50 transition-colors ${args.disabled ? 'pointer-events-none' : ''}`}
              disabled={args.disabled}
            >
              <Icon
                iconType={['arrows', 'arrow-down-s']}
                size={16}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="padding-12 margin-t-16 rounded-md border-default bg-muted/30">
            <p className="size-sm font-body text-muted line-height-leading-5">
              이 콘텐츠는 접고 펼 수 있습니다. 가시성을 전환할 때 부드럽게 애니메이션됩니다.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

/**
 * 여러 항목
 *
 * 여러 콘텐츠 항목을 접고 펼 수 있습니다.
 */
export const MultipleItems: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[300px]"
      >
        <div className="flex items-center justify-between padding-12 rounded-md border-default">
          <span className="size-sm font-body font-medium">
            @peduarte가 3개의 저장소에 별을 달았습니다
          </span>
          <CollapsibleTrigger asChild>
            <button className="padding-4 rounded-md hover:bg-muted/50 transition-colors">
              <Icon
                iconType={['arrows', 'arrow-down-s']}
                size={16}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </CollapsibleTrigger>
        </div>
        <div className="padding-x-12 padding-y-8 margin-t-16 rounded-md border-default">
          <span className="size-sm font-body font-mono">@radix-ui/primitives</span>
        </div>
        <CollapsibleContent className="flex flex-col ds-gap-8">
          <div className="padding-x-12 padding-y-8 margin-t-16 rounded-md border-default">
            <span className="size-sm font-body font-mono">@radix-ui/colors</span>
          </div>
          <div className="padding-x-12 padding-y-8 margin-t-16 rounded-md border-default">
            <span className="size-sm font-body font-mono">@stitches/react</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

/**
 * 기본 열림 상태
 *
 * defaultOpen prop으로 초기 상태를 열림으로 설정할 수 있습니다.
 */
export const DefaultOpen: Story = {
  render: function Render() {
    return (
      <Collapsible defaultOpen className="w-[300px]">
        <div className="flex items-center justify-between padding-12 rounded-md border-default">
          <span className="size-sm font-body font-medium">설정</span>
          <CollapsibleTrigger asChild>
            <button className="padding-4 rounded-md hover:bg-muted/50 transition-colors">
              <Icon iconType={['system', 'settings']} size={16} />
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col ds-gap-8 padding-12 margin-t-16 rounded-md border-default">
            <label className="flex items-center ds-gap-8">
              <input type="checkbox" defaultChecked />
              <span className="size-sm font-body">알림 활성화</span>
            </label>
            <label className="flex items-center ds-gap-8">
              <input type="checkbox" />
              <span className="size-sm font-body">다크 모드</span>
            </label>
            <label className="flex items-center ds-gap-8">
              <input type="checkbox" defaultChecked />
              <span className="size-sm font-body">자동 저장</span>
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

/**
 * 콘텐츠 패널
 *
 * 리치 콘텐츠를 포함하는 접을 수 있는 패널 예시입니다.
 */
export const ContentPanel: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] rounded-lg border-default overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full padding-12 bg-subtle hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="flex items-center ds-gap-8">
              <Icon iconType={['system', 'information']} size={16} />
              <span className="size-sm font-body font-medium">프로젝트 정보</span>
            </div>
            <Icon
              iconType={['arrows', 'arrow-down-s']}
              size={16}
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="padding-16 flex flex-col ds-gap-12">
            <div className="flex justify-between">
              <span className="size-sm font-body text-muted">이름</span>
              <span className="size-sm font-body font-medium">Design System</span>
            </div>
            <div className="flex justify-between">
              <span className="size-sm font-body text-muted">버전</span>
              <span className="size-sm font-body font-mono">1.0.43</span>
            </div>
            <div className="flex justify-between">
              <span className="size-sm font-body text-muted">상태</span>
              <span className="size-xs font-body padding-x-8 padding-y-2 rounded-full bg-green-100 text-green-700">활성</span>
            </div>
            <div className="flex justify-between">
              <span className="size-sm font-body text-muted">최종 수정</span>
              <span className="size-sm font-body">2026-03-19</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

/**
 * 필터 패널
 *
 * 필터 옵션을 접고 펼 수 있는 패널입니다.
 */
export const FilterPanel: Story = {
  render: function Render() {
    const [sectionOpen, setSectionOpen] = React.useState({ category: true, status: false, date: false });

    const Section = ({ title, name, children }: { title: string; name: keyof typeof sectionOpen; children: React.ReactNode }) => (
      <Collapsible
        open={sectionOpen[name]}
        onOpenChange={(open) => setSectionOpen(prev => ({ ...prev, [name]: open }))}
      >
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full padding-y-8 cursor-pointer">
            <span className="size-sm font-body font-medium">{title}</span>
            <Icon
              iconType={['arrows', 'arrow-down-s']}
              size={14}
              className={`transition-transform text-muted ${sectionOpen[name] ? 'rotate-180' : ''}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col ds-gap-6 padding-y-8">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );

    return (
      <div className="w-[260px] padding-16 rounded-lg border-default">
        <p className="size-sm font-body font-medium margin-b-8">필터</p>
        <div className="flex flex-col" style={{ gap: 0 }}>
          <Section title="카테고리" name="category">
            {['디자인', '개발', '마케팅', '기획'].map((item) => (
              <label key={item} className="flex items-center ds-gap-8">
                <input type="checkbox" />
                <span className="size-sm font-body">{item}</span>
              </label>
            ))}
          </Section>
          <Section title="상태" name="status">
            {['진행 중', '완료', '보류', '취소'].map((item) => (
              <label key={item} className="flex items-center ds-gap-8">
                <input type="checkbox" />
                <span className="size-sm font-body">{item}</span>
              </label>
            ))}
          </Section>
          <Section title="기간" name="date">
            {['오늘', '이번 주', '이번 달', '전체'].map((item) => (
              <label key={item} className="flex items-center ds-gap-8">
                <input type="radio" name="date" />
                <span className="size-sm font-body">{item}</span>
              </label>
            ))}
          </Section>
        </div>
      </div>
    );
  },
};
