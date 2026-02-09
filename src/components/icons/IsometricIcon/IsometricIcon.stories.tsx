import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { IsometricIcon } from './IsometricIcon';
import type { IsometricIconType, IsometricFillColor, IsometricStrokeColor } from './IsometricIcon.types';

const iconTypeOptions: IsometricIconType[] = [
  '123', 'abc', 'actionkey', 'acute', 'addbox', 'addcircle', 'addreaction', 'addtask',
  'allmatch', 'arrowandedge', 'arrowcircledown', 'arrowcircleleft', 'arrowcircleright', 'arrowcircleup',
  'backspace', 'block', 'bolt', 'boy', 'bringyourownip',
  'cached', 'cancel', 'cancelcircle', 'captiveportal', 'changecircle', 'check', 'checkbox', 'checkcircle', 'checksmall',
  'chipextraction', 'chips', 'chronic', 'clearall', 'clockleader', 'clockloader', 'couples', 'createnewfolder', 'css', 'cycle',
  'dataalert', 'datacheckdouble', 'datainfoalert', 'dataset', 'datasetlinked',
  'delete', 'deletesweep', 'deployedcode', 'deployedcodeaccount', 'deployedcodealert', 'deployedcodehistory',
  'desktoplandscape', 'desktoplandscapeadd', 'desktopportrait', 'dialog', 'diamond', 'directorysync', 'diversity',
  'doneall', 'donotdisturboff', 'donotdisturbon', 'download', 'downloaddone',
  'emojievent', 'emojiobjects', 'emojipeople', 'extensionoff',
  'favorite', 'favoriteminus', 'favoriteplus', 'filter', 'fitscreen', 'fronthand', 'fullscreen', 'fullscreenexit',
  'gardencart', 'groupwork',
  'happy', 'heartbroken', 'heartcheck', 'highlightkeyboardfocus', 'highlightmousecursor', 'highlighttextcursor',
  'hive', 'hls', 'house', 'html',
  'inputcircle', 'installdesktop', 'installmobile', 'iosshare',
  'javascript',
  'key', 'keyboardcommandkey', 'keyvertical',
  'leftclick', 'linkedservices', 'loginblank', 'logout',
  'man', 'managesearch', 'mood', 'moodbad', 'moveitem', 'multimodalhandeye',
  'neutral', 'newwindow',
  'openinnew', 'outputcircle',
  'personadd', 'psychologyalt',
  'rocketlaunch', 'rotateauto', 'rulesettings',
  'searchcheck', 'searchoff', 'selectcheckbox', 'sendtimeextension', 'settings', 'settingsaccessibility', 'settingsheart',
  'shelfautohide', 'shield', 'shoppingcart', 'signlanguage', 'skull', 'sort', 'sortbyalpha', 'stacks',
  'star', 'starhalf', 'start', 'statdouble', 'stepover', 'swaphorizontalcircle', 'swapvertical',
  'swipedown', 'swipeleft', 'swipeup', 'switchaccess', 'switchaccessshortcutadd', 'sync',
  'toggleoff', 'toggleon', 'token', 'transcribe',
  'unable', 'undo', 'unhappy', 'upload',
  'veryhappy', 'veryunhappy', 'viewcomfyalt', 'viewcozy', 'viewkanbab', 'viewtimeline',
  'weight', 'workspacepremium',
];

const fillColorOptions: IsometricFillColor[] = [
  'default', 'subtle', 'muted', 'inverted', 'accent',
  'card-default', 'card-subtle', 'card-inverted',
  'sidebar-default', 'sidebar-subtle',
  'input-default', 'input-soft', 'input-disabled',
  'overlay',
  'state-primary', 'state-primary-hover', 'state-primary-press', 'state-primary-loading',
  'state-secondary', 'state-secondary-hover', 'state-secondary-press',
  'state-soft', 'state-soft-hover', 'state-soft-press',
  'state-ghost', 'state-ghost-hover', 'state-ghost-press',
  'state-ghost-inverted', 'state-ghost-hover-inverted', 'state-ghost-press-inverted',
  'state-destructive', 'state-destructive-hover', 'state-destructive-press', 'state-destructive-loading',
  'state-brand', 'state-brand-hover', 'state-brand-press', 'state-brand-loading',
  'state-gray', 'state-disabled',
  'checkbox-default', 'checkbox-active', 'checkbox-active-hover', 'checkbox-disabled',
  'switch-default', 'switch-default-hover', 'switch-disabled',
  'switch-active', 'switch-active-hover', 'switch-active-disabled',
  'switch-handle', 'switch-handle-disabled',
  // Basic colors
  'basic-gray-subtle', 'basic-gray-accent', 'basic-gray-strong', 'basic-gray-contrast',
  'basic-red-subtle', 'basic-red-accent', 'basic-red-strong', 'basic-red-contrast',
  'basic-orange-subtle', 'basic-orange-accent', 'basic-orange-strong', 'basic-orange-contrast',
  'basic-amber-subtle', 'basic-amber-accent', 'basic-amber-strong', 'basic-amber-contrast',
  'basic-yellow-subtle', 'basic-yellow-accent', 'basic-yellow-strong', 'basic-yellow-contrast',
  'basic-lime-subtle', 'basic-lime-accent', 'basic-lime-strong', 'basic-lime-contrast',
  'basic-green-subtle', 'basic-green-accent', 'basic-green-strong', 'basic-green-contrast',
  'basic-emerald-subtle', 'basic-emerald-accent', 'basic-emerald-strong', 'basic-emerald-contrast',
  'basic-teal-subtle', 'basic-teal-accent', 'basic-teal-strong', 'basic-teal-contrast',
  'basic-cyan-subtle', 'basic-cyan-accent', 'basic-cyan-strong', 'basic-cyan-contrast',
  'basic-sky-subtle', 'basic-sky-accent', 'basic-sky-strong', 'basic-sky-contrast',
  'basic-blue-subtle', 'basic-blue-accent', 'basic-blue-strong', 'basic-blue-contrast',
  'basic-indigo-subtle', 'basic-indigo-accent', 'basic-indigo-strong', 'basic-indigo-contrast',
  'basic-violet-subtle', 'basic-violet-accent', 'basic-violet-strong', 'basic-violet-contrast',
  'basic-purple-subtle', 'basic-purple-accent', 'basic-purple-strong', 'basic-purple-contrast',
  'basic-fuchsia-subtle', 'basic-fuchsia-accent', 'basic-fuchsia-strong', 'basic-fuchsia-contrast',
  'basic-pink-subtle', 'basic-pink-accent', 'basic-pink-strong', 'basic-pink-contrast',
  'basic-rose-subtle', 'basic-rose-accent', 'basic-rose-strong', 'basic-rose-contrast',
  'basic-gray-alpha-2', 'basic-gray-alpha-4', 'basic-gray-alpha-10', 'basic-gray-alpha-15',
];

const strokeColorOptions: IsometricStrokeColor[] = [
  'default', 'darker', 'strong', 'inverted', 'accent', 'accent-inverted',
  'destructive', 'informative', 'success', 'warning',
  'highlight', 'highlight-destructive', 'input-highlight',
];

const meta: Meta<typeof IsometricIcon> = {
  title: 'Icons/IsometricIcon',
  component: IsometricIcon,
  tags: ['autodocs'],
  argTypes: {
    iconType: {
      control: 'select',
      options: iconTypeOptions,
      description: '표시할 아이소메트릭 아이콘 타입',
      table: {
        type: {
          summary: 'IsometricIconType',
          detail: `150개 이상의 아이소메트릭 아이콘 타입 사용 가능
예시: 'star', 'check', 'settings', 'heart'`,
        },
      },
    },
    view: {
      control: 'select',
      options: ['top', 'left'],
      description: '아이소메트릭 아이콘의 시점',
      table: {
        type: {
          summary: 'IsometricView',
          detail: `'top' | 'left'
기본값: 'top'`,
        },
      },
    },
    size: {
      control: { type: 'number', min: 12, max: 96, step: 4 },
      description: '아이콘 크기 (픽셀)',
      table: {
        type: {
          summary: 'number',
          detail: '기본값: 24',
        },
      },
    },
    fillColor: {
      control: 'select',
      options: fillColorOptions,
      description: '채우기 색상 토큰',
      table: {
        type: {
          summary: 'IsometricFillColor',
          detail: `--bg-{token} CSS 변수에 매핑
포함: default, subtle, muted, inverted, accent, card-*, sidebar-*, input-*, state-*, checkbox-*, switch-*, basic-* 색상`,
        },
      },
    },
    strokeColor: {
      control: 'select',
      options: strokeColorOptions,
      description: '테두리 색상 토큰',
      table: {
        type: {
          summary: 'IsometricStrokeColor',
          detail: `--border-{token} CSS 변수에 매핑
옵션: default, darker, strong, inverted, accent, accent-inverted, destructive, informative, success, warning, highlight-*`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IsometricIcon>;

/**
 * 기본 IsometricIcon
 *
 * IsometricIcon 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: SVG 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    iconType: 'star',
    view: 'top',
    size: 48,
    fillColor: 'default',
    strokeColor: 'accent',
    className: '',
  },
  render: function Render(args) {
    const iconRef = useRef<SVGSVGElement>(null);
    return <IsometricIcon ref={iconRef} {...args} />;
  },
};

export const View: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <IsometricIcon iconType="star" view="top" size={64} strokeColor="accent" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>top</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IsometricIcon iconType="star" view="left" size={64} strokeColor="accent" />
        <div style={{ fontSize: '12px', marginTop: '8px' }}>left</div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Size: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      {[24, 32, 48, 64, 80].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <IsometricIcon iconType="star" view="top" size={size} strokeColor="accent" />
          <div style={{ fontSize: '12px', marginTop: '8px' }}>{size}px</div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const FillColor: Story = {
  render: function Render() {
    const showColors: IsometricFillColor[] = [
      'default', 'subtle', 'muted', 'inverted', 'accent',
      'state-primary', 'state-destructive', 'state-brand', 'state-gray',
      'basic-red-accent', 'basic-orange-accent', 'basic-yellow-accent', 'basic-lime-accent',
      'basic-green-accent', 'basic-teal-accent', 'basic-cyan-accent', 'basic-blue-accent',
      'basic-indigo-accent', 'basic-purple-accent', 'basic-pink-accent',
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '24px' }}>
        {showColors.map((fillColor) => {
          const isDark = fillColor === 'inverted' || fillColor === 'state-gray' || fillColor.includes('contrast') || fillColor.includes('strong');
          return (
            <div key={fillColor} style={{ textAlign: 'center' }}>
              <div style={{
                padding: '12px',
                backgroundColor: isDark ? 'var(--bg-inverted)' : 'var(--bg-subtle)',
                borderRadius: '8px'
              }}>
                <IsometricIcon
                  iconType="star"
                  view="top"
                  size={40}
                  fillColor={fillColor}
                  strokeColor={isDark ? 'accent-inverted' : 'accent'}
                />
              </div>
              <div style={{ fontSize: '9px', marginTop: '6px', color: 'var(--text-muted)', wordBreak: 'break-word' }}>
                {fillColor}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const StrokeColor: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
      {strokeColorOptions.map((strokeColor) => {
        const needsDarkBg = strokeColor === 'inverted' || strokeColor === 'accent-inverted';
        return (
          <div key={strokeColor} style={{ textAlign: 'center' }}>
            <div style={{
              padding: '12px',
              backgroundColor: needsDarkBg ? 'var(--bg-inverted)' : 'var(--bg-subtle)',
              borderRadius: '8px'
            }}>
              <IsometricIcon
                iconType="star"
                view="top"
                size={40}
                fillColor={needsDarkBg ? 'inverted' : 'muted'}
                strokeColor={strokeColor}
              />
            </div>
            <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>{strokeColor}</div>
          </div>
        );
      })}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Example: Story = {
  render: function Render() {
    const exampleIcons: IsometricIconType[] = [
      'star', 'favorite', 'settings', 'check', 'shield',
      'rocketlaunch', 'diamond', 'bolt', 'key', 'house'
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
        {exampleIcons.map((iconType) => (
          <div key={iconType} style={{ textAlign: 'center' }}>
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '8px'
            }}>
              <IsometricIcon
                iconType={iconType}
                view="top"
                size={48}
                fillColor="default"
                strokeColor="accent"
              />
            </div>
            <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>{iconType}</div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
