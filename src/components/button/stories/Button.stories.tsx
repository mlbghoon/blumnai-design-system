import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    buttonStyle: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost', 'ghostMuted', 'soft', 'dashed'],
      description: '버튼의 스타일 변형',
      table: {
        type: {
          summary: 'ButtonStyle',
          detail: `'primary' | 'secondary' | 'destructive' | 'ghost' | 'ghostMuted' | 'soft' | 'dashed'`,
        },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'iconOnly'],
      description: '버튼의 변형 타입',
      table: {
        type: {
          summary: 'ButtonVariant',
          detail: `'default' | 'iconOnly'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
      description: '버튼의 크기',
      table: {
        type: {
          summary: 'ButtonSize',
          detail: `'2xs' | 'xs' | 'sm' | 'md' | 'lg'`,
        },
      },
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: '버튼의 모양',
      table: {
        type: {
          summary: 'ButtonShape',
          detail: `'rounded' | 'pill'`,
        },
      },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 표시 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼이 컨테이너 전체 너비를 차지하는지 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    width: {
      control: 'text',
      description: '버튼의 커스텀 너비 (예: "200px", "100%", "auto")',
      table: {
        type: { summary: 'string | number' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '라벨 앞에 표시되는 아이콘 (iconOnly 변형에서는 버튼 아이콘)',
      table: {
        type: {
          summary: 'ButtonIconType | ReactNode',
          detail: `[category, name] 또는 [category, name, isFill] 튜플 형식
예시: ['system', 'add']
예시: ['system', 'star', true] (채워진 아이콘)
카테고리: system, arrows, media, editor, health, business 등`,
        },
      },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤에 표시되는 아이콘',
      table: {
        type: {
          summary: 'ButtonIconType | ReactNode',
          detail: `[category, name] 또는 [category, name, isFill] 튜플 형식
예시: ['arrows', 'chevron-down']
예시: ['system', 'check', true] (채워진 아이콘)`,
        },
      },
    },
    shortcut: {
      control: 'text',
      description: '키보드 단축키 뱃지 표시 및 전역 keydown 바인딩 (예: "/", "⌘K", "Ctrl+S")',
      table: {
        type: { summary: 'string' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'true일 경우 자식 요소를 버튼으로 렌더링 (Radix Slot 패턴)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 라벨 텍스트. iconOnly 변형에서는 선택 사항',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * 기본 버튼
 *
 * Button 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 * - `asChild`: Radix Slot 패턴으로 자식 요소를 버튼으로 렌더링
 */
export const Default: Story = {
  args: {
    children: 'Button',
    buttonStyle: 'primary',
    variant: 'default',
    size: 'md',
    shape: 'rounded',
    leadIcon: ['system', 'add'],
    tailIcon: undefined,
    shortcut: undefined,
    loading: false,
    disabled: false,
    fullWidth: false,
    width: undefined,
    asChild: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const isValidIcon = (icon: unknown): icon is [string, string] | [string, string, boolean] =>
      Array.isArray(icon) && icon.length >= 2 && typeof icon[0] === 'string' && icon[0] !== '' && typeof icon[1] === 'string' && icon[1] !== '';
    const leadIcon = isValidIcon(args.leadIcon) ? args.leadIcon : undefined;
    const tailIcon = isValidIcon(args.tailIcon) ? args.tailIcon : undefined;

    return (
      <Button
        buttonStyle={args.buttonStyle}
        variant={args.variant}
        size={args.size}
        shape={args.shape}
        leadIcon={leadIcon}
        tailIcon={tailIcon}
        shortcut={args.shortcut || undefined}
        loading={args.loading}
        disabled={args.disabled}
        fullWidth={args.fullWidth}
        width={args.width || undefined}
        asChild={args.asChild}
        onClick={args.onClick}
      >
        {args.children}
      </Button>
    );
  },
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <Button buttonStyle="primary">Primary</Button>
      <Button buttonStyle="secondary">Secondary</Button>
      <Button buttonStyle="destructive">Destructive</Button>
      <Button buttonStyle="ghost">Ghost</Button>
      <Button buttonStyle="ghostMuted">Ghost Muted</Button>
      <Button buttonStyle="soft">Soft</Button>
      <Button buttonStyle="dashed">Dashed</Button>
    </div>
  ),
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <Button size="2xs">2XS</Button>
      <Button size="xs">XS</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * 모든 모양
 */
export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap gap-12 items-center">
        <Button shape="rounded">Rounded</Button>
        <Button shape="pill">Pill</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button shape="rounded" buttonStyle="secondary">Rounded</Button>
        <Button shape="pill" buttonStyle="secondary">Pill</Button>
      </div>
    </div>
  ),
};

/**
 * 아이콘 포함
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center">
        <Button leadIcon={['system', 'delete-bin']}>Delete</Button>
        <Button tailIcon={['system', 'external-link']}>Preview</Button>
        <Button leadIcon={['system', 'add']}>Add New</Button>
        <Button leadIcon={['media', 'volume-mute']}>Mute</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button leadIcon={['system', 'check']} tailIcon={['arrows', 'arrow-down']}>Confirm</Button>
      </div>
    </div>
  ),
};

/**
 * 채워진 아이콘
 * isFill=true로 채워진 아이콘 사용
 */
export const WithFilledIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <p className="m-0 size-sm text-subtle">Regular icons vs Filled icons (isFill=true)</p>
      <div className="flex flex-wrap gap-12 items-center">
        <Button leadIcon={['system', 'star']}>Regular</Button>
        <Button leadIcon={['system', 'star', true]}>Filled</Button>
        <Button leadIcon={['health', 'heart']}>Regular</Button>
        <Button leadIcon={['health', 'heart', true]}>Filled</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button buttonStyle="secondary" leadIcon={['system', 'settings']}>Regular</Button>
        <Button buttonStyle="secondary" leadIcon={['system', 'settings', true]}>Filled</Button>
        <Button buttonStyle="secondary" leadIcon={['business', 'bookmark']}>Regular</Button>
        <Button buttonStyle="secondary" leadIcon={['business', 'bookmark', true]}>Filled</Button>
      </div>
    </div>
  ),
};

/**
 * 아이콘 전용 변형
 */
export const IconOnlyVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="2xs" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="xs" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="sm" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="md" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="lg" />
    </div>
  ),
};

/**
 * 단축키 표시
 */
export const WithShortcut: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center">
        <Button size="2xs" shortcut="/">2XS</Button>
        <Button size="xs" shortcut="/">XS</Button>
        <Button size="sm" shortcut="/">Small</Button>
        <Button size="md" shortcut="/">Medium</Button>
        <Button size="lg" shortcut="/">Large</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button buttonStyle="secondary" size="2xs" shortcut="/">2XS</Button>
        <Button buttonStyle="secondary" size="xs" shortcut="/">XS</Button>
        <Button buttonStyle="secondary" size="sm" shortcut="/">Small</Button>
        <Button buttonStyle="secondary" size="md" shortcut="/">Medium</Button>
        <Button buttonStyle="secondary" size="lg" shortcut="/">Large</Button>
      </div>
    </div>
  ),
};

/**
 * 키보드 단축키 바인딩
 *
 * `shortcut` prop은 뱃지를 렌더링할 뿐만 아니라 실제 키보드 이벤트도 바인딩합니다.
 * 아래 버튼의 단축키를 눌러 `onClick`이 실행되는 것을 확인하세요.
 */
export const KeyboardShortcutBinding: Story = {
  render: function Render() {
    const [log, setLog] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLog((prev) => [`${new Date().toLocaleTimeString()} — ${message}`, ...prev.slice(0, 4)]);
    };

    return (
      <div className="flex flex-col gap-16">
        <p className="m-0 size-sm text-subtle">
          shortcut prop은 뱃지 표시 + 전역 keydown 리스너를 자동 바인딩합니다.
        </p>
        <div className="flex flex-wrap gap-12 items-center">
          <Button
            buttonStyle="secondary"
            leadIcon={['system', 'search']}
            shortcut="/"
            onClick={() => addLog('Search clicked (shortcut: /)')}
          >
            Search
          </Button>
          <Button
            buttonStyle="secondary"
            leadIcon={['system', 'add']}
            shortcut="⌘K"
            onClick={() => addLog('Command palette clicked (shortcut: ⌘K)')}
          >
            Command
          </Button>
          <Button
            buttonStyle="primary"
            shortcut="⌘J"
            onClick={() => addLog('Join clicked (shortcut: ⌘J)')}
          >
            Join
          </Button>
          <Button
            buttonStyle="secondary"
            shortcut="⌘⇧K"
            onClick={() => addLog('New panel clicked (shortcut: ⌘⇧K)')}
          >
            New Panel
          </Button>
        </div>
        <div className="flex flex-wrap gap-12 items-center">
          <Button
            buttonStyle="secondary"
            shortcut="Escape"
            onClick={() => addLog('Cancel clicked (shortcut: Escape)')}
          >
            Cancel
          </Button>
          <Button
            buttonStyle="secondary"
            shortcut="⌘K"
            disabled
            onClick={() => addLog('This should not fire')}
          >
            Disabled (⌘K)
          </Button>
          <Button
            buttonStyle="secondary"
            shortcut="⌘K"
            loading
            onClick={() => addLog('This should not fire')}
          >
            Loading (⌘K)
          </Button>
        </div>
        {log.length > 0 && (
          <div className="padding-12 bg-subtle rounded-md">
            <p className="m-0 size-xs text-muted font-medium">Event Log</p>
            {log.map((entry, i) => (
              <p key={i} className="m-0 size-xs text-subtle">{entry}</p>
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * 상태
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button buttonStyle="secondary">Default</Button>
        <Button buttonStyle="secondary" disabled>Disabled</Button>
        <Button buttonStyle="secondary" loading>Loading</Button>
      </div>
    </div>
  ),
};

/**
 * 로딩 상태
 *
 * 다양한 아이콘 조합에서 로딩 시 버튼 너비가 유지되는지 확인
 */
export const LoadingState: Story = {
  render: function Render() {
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const handleClick = (key: string) => {
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    };

    return (
      <div className="flex flex-col gap-16">
        <p className="m-0 size-sm text-subtle">Click each button to test loading state</p>
        <div className="flex flex-wrap gap-12 items-center">
          <Button
            loading={loadingStates['textOnly']}
            onClick={() => handleClick('textOnly')}
          >
            Text OnlyText OnlyText Only
          </Button>
          <Button
            leadIcon={['system', 'add']}
            loading={loadingStates['leadIcon']}
            onClick={() => handleClick('leadIcon')}
          >
            Lead Icon
          </Button>
          <Button
            tailIcon={['arrows', 'arrow-down']}
            loading={loadingStates['tailIcon']}
            onClick={() => handleClick('tailIcon')}
          >
            Tail Icon
          </Button>
          <Button
            leadIcon={['system', 'check']}
            tailIcon={['arrows', 'arrow-right']}
            loading={loadingStates['bothIcons']}
            onClick={() => handleClick('bothIcons')}
          >
            Both Icons
          </Button>
        </div>
        <div className="flex flex-wrap gap-12 items-center">
          <Button
            buttonStyle="secondary"
            shortcut="/"
            loading={loadingStates['shortcut']}
            onClick={() => handleClick('shortcut')}
          >
            With Shortcut
          </Button>
          <Button
            buttonStyle="secondary"
            leadIcon={['system', 'search']}
            shortcut="⌘K"
            loading={loadingStates['iconShortcut']}
            onClick={() => handleClick('iconShortcut')}
          >
            Icon + Shortcut
          </Button>
        </div>
        <div className="flex flex-wrap gap-12 items-center">
          <Button
            variant="iconOnly"
            leadIcon={['system', 'settings']}
            loading={loadingStates['iconOnly']}
            onClick={() => handleClick('iconOnly')}
          />
          <Button
            variant="iconOnly"
            buttonStyle="secondary"
            leadIcon={['system', 'close']}
            loading={loadingStates['iconOnlySecondary']}
            onClick={() => handleClick('iconOnlySecondary')}
          />
        </div>
      </div>
    );
  },
};

/**
 * 커스텀 너비
 */
export const CustomWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <Button width={200}>Fixed 200px</Button>
      <Button width="100%">Full Width (100%)</Button>
      <Button fullWidth>Full Width (prop)</Button>
    </div>
  ),
};

/**
 * asChild로 링크 렌더링
 *
 * `asChild` prop을 사용하면 Button 스타일을 유지하면서 다른 요소로 렌더링할 수 있습니다.
 */
export const AsChild: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <p className="m-0 size-sm text-subtle">asChild prop으로 a 태그로 렌더링</p>
      <div className="flex flex-wrap gap-12 items-center">
        <Button asChild buttonStyle="primary">
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            Link as Primary
          </a>
        </Button>
        <Button asChild buttonStyle="secondary">
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            Link as Secondary
          </a>
        </Button>
      </div>
    </div>
  ),
};

