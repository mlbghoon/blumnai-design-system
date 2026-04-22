import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    buttonStyle: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost', 'ghostMuted', 'soft', 'dashed'],
      description: '버튼의 시각적 스타일을 설정합니다. primary(강조), secondary(보조), destructive(삭제/위험), ghost(투명), ghostMuted(흐린 투명), soft(부드러운), dashed(점선) 중 선택할 수 있습니다',
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
      description: '버튼의 변형 타입을 설정합니다. default는 텍스트가 포함된 일반 버튼, iconOnly는 아이콘만 표시되는 버튼입니다',
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
      description: '버튼의 크기를 설정합니다. 2xs(가장 작게)부터 lg(크게)까지 선택할 수 있습니다',
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
      description: '버튼의 외곽선 모양을 설정합니다. rounded는 둥근 모서리, pill은 완전히 둥근 알약 형태입니다',
      table: {
        type: {
          summary: 'ButtonShape',
          detail: `'rounded' | 'pill'`,
        },
      },
    },
    color: {
      control: 'select',
      options: [undefined, 'gray', 'black', 'white', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      description: '버튼 색상 오버라이드. 스타일 패턴은 유지하면서 색상만 변경',
      table: {
        type: {
          summary: 'ButtonColor',
          detail: `'gray' | 'black' | 'white' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'`,
        },
      },
    },
    loading: {
      control: 'boolean',
      description: 'true로 설정하면 버튼에 로딩 스피너가 표시되며, 클릭이 비활성화됩니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 버튼이 비활성화되어 클릭할 수 없고, 시각적으로 흐리게 표시됩니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'true로 설정하면 버튼이 부모 컨테이너의 전체 너비를 차지합니다',
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
    tooltip: {
      control: 'text',
      description: '호버 시 표시되는 툴팁 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '툴팁 위치',
      table: {
        type: {
          summary: 'TooltipPlacement',
          detail: `'top' | 'bottom' | 'left' | 'right'`,
        },
        defaultValue: { summary: 'top' },
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
    children: "Button",
    buttonStyle: 'primary',
    variant: 'default',
    size: 'md',
    shape: 'rounded',
    color: undefined,
    leadIcon: ['system', 'add'],
    tailIcon: undefined,
    shortcut: undefined,
    tooltip: undefined,
    tooltipPlacement: undefined,
    loading: false,
    disabled: false,
    fullWidth: false,
    width: undefined,
    asChild: false,
    onClick: undefined,
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
        color={args.color}
        leadIcon={leadIcon}
        tailIcon={tailIcon}
        shortcut={args.shortcut || undefined}
        tooltip={args.tooltip || undefined}
        tooltipPlacement={args.tooltipPlacement}
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
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
    <div className="flex flex-col ds-gap-12">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button shape="rounded">Rounded</Button>
        <Button shape="pill">Pill</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button leadIcon={['system', 'delete-bin']}>삭제</Button>
        <Button tailIcon={['system', 'external-link']}>미리보기</Button>
        <Button leadIcon={['system', 'add']}>새로 추가</Button>
        <Button leadIcon={['media', 'volume-mute']}>음소거</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button leadIcon={['system', 'check']} tailIcon={['arrows', 'arrow-down']}>확인</Button>
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
    <div className="flex flex-col ds-gap-16">
      <p className="margin-0 size-sm text-subtle">일반 아이콘 vs 채워진 아이콘 (isFill=true)</p>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button leadIcon={['system', 'star']}>일반</Button>
        <Button leadIcon={['system', 'star', true]}>채움</Button>
        <Button leadIcon={['health', 'heart']}>일반</Button>
        <Button leadIcon={['health', 'heart', true]}>채움</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button buttonStyle="secondary" leadIcon={['system', 'settings']}>일반</Button>
        <Button buttonStyle="secondary" leadIcon={['system', 'settings', true]}>채움</Button>
        <Button buttonStyle="secondary" leadIcon={['business', 'bookmark']}>일반</Button>
        <Button buttonStyle="secondary" leadIcon={['business', 'bookmark', true]}>채움</Button>
      </div>
    </div>
  ),
};

/**
 * 아이콘 전용 변형
 */
export const IconOnlyVariant: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button size="2xs" shortcut="/">2XS</Button>
        <Button size="xs" shortcut="/">XS</Button>
        <Button size="sm" shortcut="/">Small</Button>
        <Button size="md" shortcut="/">Medium</Button>
        <Button size="lg" shortcut="/">Large</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
      <div className="flex flex-col ds-gap-16">
        <p className="margin-0 size-sm text-subtle">
          shortcut prop은 뱃지 표시 + 전역 keydown 리스너를 자동 바인딩합니다.
        </p>
        <div className="flex flex-wrap ds-gap-12 items-center justify-center">
          <Button
            buttonStyle="secondary"
            leadIcon={['system', 'search']}
            shortcut="/"
            onClick={() => addLog('검색 클릭됨 (단축키: /)')}
          >
            검색
          </Button>
          <Button
            buttonStyle="secondary"
            leadIcon={['system', 'add']}
            shortcut="⌘K"
            onClick={() => addLog('명령 팔레트 클릭됨 (단축키: ⌘K)')}
          >
            명령
          </Button>
          <Button
            buttonStyle="primary"
            shortcut="⌘J"
            onClick={() => addLog('참여 클릭됨 (단축키: ⌘J)')}
          >
            참여
          </Button>
          <Button
            buttonStyle="secondary"
            shortcut="⌘⇧K"
            onClick={() => addLog('새 패널 클릭됨 (단축키: ⌘⇧K)')}
          >
            새 패널
          </Button>
        </div>
        <div className="flex flex-wrap ds-gap-12 items-center justify-center">
          <Button
            buttonStyle="secondary"
            shortcut="Escape"
            onClick={() => addLog('취소 클릭됨 (단축키: Escape)')}
          >
            취소
          </Button>
          <Button
            buttonStyle="secondary"
            shortcut="⌘K"
            disabled
            onClick={() => addLog('실행되지 않아야 함')}
          >
            비활성화 (⌘K)
          </Button>
          <Button
            buttonStyle="secondary"
            shortcut="⌘K"
            loading
            onClick={() => addLog('실행되지 않아야 함')}
          >
            로딩 중 (⌘K)
          </Button>
        </div>
        {log.length > 0 && (
          <div className="padding-12 bg-subtle rounded-md">
            <p className="margin-0 size-xs text-muted font-medium">이벤트 로그</p>
            {log.map((entry, i) => (
              <p key={i} className="margin-0 size-xs text-subtle">{entry}</p>
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
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
      <div className="flex flex-col ds-gap-16">
        <p className="margin-0 size-sm text-subtle">각 버튼을 클릭하여 로딩 상태를 테스트하세요</p>
        <div className="flex flex-wrap ds-gap-12 items-center justify-center">
          <Button
            loading={loadingStates['textOnly']}
            onClick={() => handleClick('textOnly')}
          >
            텍스트만텍스트만텍스트만
          </Button>
          <Button
            leadIcon={['system', 'add']}
            loading={loadingStates['leadIcon']}
            onClick={() => handleClick('leadIcon')}
          >
            앞 아이콘
          </Button>
          <Button
            tailIcon={['arrows', 'arrow-down']}
            loading={loadingStates['tailIcon']}
            onClick={() => handleClick('tailIcon')}
          >
            뒤 아이콘
          </Button>
          <Button
            leadIcon={['system', 'check']}
            tailIcon={['arrows', 'arrow-right']}
            loading={loadingStates['bothIcons']}
            onClick={() => handleClick('bothIcons')}
          >
            양쪽 아이콘
          </Button>
        </div>
        <div className="flex flex-wrap ds-gap-12 items-center justify-center">
          <Button
            buttonStyle="secondary"
            shortcut="/"
            loading={loadingStates['shortcut']}
            onClick={() => handleClick('shortcut')}
          >
            단축키 포함
          </Button>
          <Button
            buttonStyle="secondary"
            leadIcon={['system', 'search']}
            shortcut="⌘K"
            loading={loadingStates['iconShortcut']}
            onClick={() => handleClick('iconShortcut')}
          >
            아이콘 + 단축키
          </Button>
        </div>
        <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
    <div className="flex flex-col ds-gap-12">
      <Button width={200}>고정 200px</Button>
      <Button width="100%">전체 너비 (100%)</Button>
      <Button fullWidth>전체 너비 (prop)</Button>
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
    <div className="flex flex-col ds-gap-12">
      <p className="margin-0 size-sm text-subtle">asChild prop으로 a 태그로 렌더링</p>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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

/**
 * 툴팁 표시
 *
 * `tooltip` prop으로 호버 시 툴팁을 표시합니다. 래퍼 span 없이 버튼에 직접 적용됩니다.
 */
export const WithTooltip: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button tooltip="저장합니다" leadIcon={['system', 'check']}>저장</Button>
        <Button tooltip="삭제합니다" tooltipPlacement="bottom" buttonStyle="destructive" leadIcon={['system', 'delete-bin']}>삭제</Button>
        <Button tooltip="설정 열기" tooltipPlacement="right" buttonStyle="secondary" leadIcon={['system', 'settings']}>설정</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button variant="iconOnly" tooltip="검색" leadIcon={['system', 'search']} buttonStyle="ghost" />
        <Button variant="iconOnly" tooltip="알림" tooltipPlacement="bottom" leadIcon={['system', 'notification']} buttonStyle="ghost" />
        <Button variant="iconOnly" tooltip="더보기" tooltipPlacement="left" leadIcon={['system', 'more-vertical']} buttonStyle="ghost" />
      </div>
    </div>
  ),
};

/**
 * Black 컬러
 *
 * `color="black"`으로 소셜 로그인 등에 사용할 수 있는 블랙 버튼을 렌더링합니다.
 * 모든 buttonStyle에서 동작합니다.
 */
export const BlackColor: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button color="black" buttonStyle="primary">Primary</Button>
        <Button color="black" buttonStyle="primary" disabled>Disabled</Button>
        <Button color="black" buttonStyle="primary" loading width={120}>Loading</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button color="black" buttonStyle="secondary">Secondary</Button>
        <Button color="black" buttonStyle="ghost">Ghost</Button>
        <Button color="black" buttonStyle="soft">Soft</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <Button color="black" buttonStyle="primary" leadIcon={['system', 'add']}>소셜 버튼</Button>
        <Button color="black" buttonStyle="primary" variant="iconOnly" leadIcon={['system', 'add']} aria-label="추가" />
      </div>
    </div>
  ),
};

/**
 * White 컬러
 *
 * `color="white"`로 흰색 배경 버튼을 렌더링합니다.
 * 어두운 배경 위에서 사용하기 적합합니다.
 */
export const WhiteColor: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center padding-16 bg-inverted rounded-lg">
        <Button color="white" buttonStyle="primary">Default</Button>
        <Button color="white" buttonStyle="primary" disabled>Disabled</Button>
        <Button color="white" buttonStyle="primary" loading width={120}>Loading</Button>
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center padding-16 bg-inverted rounded-lg">
        <Button color="white" buttonStyle="primary" leadIcon={['system', 'add']}>소셜 버튼</Button>
        <Button color="white" buttonStyle="primary" variant="iconOnly" leadIcon={['system', 'add']} aria-label="추가" />
      </div>
    </div>
  ),
};

