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
      description: 'true로 설정하면 컴포넌트가 초기에 펼쳐진 상태로 렌더링됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 접거나 펼 수 없습니다',
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
          <span className="size-sm font-body font-medium">콘텐츠 토글</span>
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
              이 콘텐츠는 접거나 펼 수 있습니다. 토글 시 부드러운 애니메이션이
              적용됩니다.
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
            @peduarte가 3개의 저장소에 스타를 눌렀습니다
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
