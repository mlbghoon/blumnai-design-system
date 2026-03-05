import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../Stepper';
import type { IconType } from '../../icons/Icon/Icon.types';

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '레이아웃 방향',
      table: {
        type: {
          summary: 'StepperOrientation',
          detail: `'horizontal' | 'vertical'`,
        },
      },
    },
    indicatorType: {
      control: 'select',
      options: ['number', 'icon', 'dot'],
      description: '인디케이터 타입',
      table: {
        type: {
          summary: 'StepperIndicatorType',
          detail: `'number' | 'icon' | 'dot'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '인디케이터 크기',
      table: {
        type: {
          summary: 'StepperSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
      },
    },
    activeStep: {
      control: 'number',
      description: '현재 활성 스텝 (0-based)',
      table: {
        type: { summary: 'number' },
      },
    },
    color: {
      control: 'select',
      options: [
        'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
        'purple', 'fuchsia', 'pink', 'rose',
      ],
      description: '인디케이터 색상',
      table: {
        type: {
          summary: 'StepperColor',
          detail: `'gray' | 'red' | 'orange' | ... | 'rose'`,
        },
      },
    },
    horizontalAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '수평 모드 텍스트 정렬',
      table: {
        type: {
          summary: 'StepperHorizontalAlign',
          detail: `'left' | 'center' | 'right'`,
        },
      },
    },
    verticalAlign: {
      control: 'select',
      options: ['left', 'right'],
      description: '수직 모드 인디케이터 위치',
      table: {
        type: {
          summary: 'StepperVerticalAlign',
          detail: `'left' | 'right'`,
        },
      },
    },
    indicatorPosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: '수평 모드 인디케이터 위치 (위/아래)',
      table: {
        type: {
          summary: 'StepperIndicatorPosition',
          detail: `'top' | 'bottom'`,
        },
      },
    },
    clickable: {
      control: 'boolean',
      description: '스텝 클릭 가능 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showCheckOnCompleted: {
      control: 'boolean',
      description: '완료된 스텝에 체크 아이콘 표시',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onStepClick: {
      action: 'stepClicked',
      description: '스텝 클릭 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(index: number) => void' },
      },
    },
    steps: {
      description: '스텝 항목 배열. indicatorType="icon"일 때 각 항목의 icon 속성이 인디케이터에 표시됩니다. (예: icon: ["system", "check"])',
      table: {
        type: {
          summary: 'StepItem[]',
          detail: `{
  label: string;          // 스텝 제목 (필수)
  caption?: string;       // 보조 설명
  supportText?: string;   // 추가 텍스트 (라벨 옆)
  icon?: IconType;        // 인디케이터 아이콘 (indicatorType="icon"일 때 사용)
  error?: boolean;        // 에러 상태 표시
  children?: ReactNode;   // 커스텀 콘텐츠 (vertical + active일 때 표시)
}`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultSteps: { label: string; caption: string; icon: IconType }[] = [
  { label: 'Account', caption: 'Create your account', icon: ['user', 'user-add'] },
  { label: 'Profile', caption: 'Set up your profile', icon: ['system', 'settings'] },
  { label: 'Review', caption: 'Review your details', icon: ['system', 'search'] },
  { label: 'Complete', caption: 'All done!', icon: ['system', 'check'] },
];

/**
 * 기본 Stepper
 *
 * 모든 props를 테스트할 수 있는 인터랙티브 스토리입니다.
 *
 * `indicatorType`을 `'icon'`으로 변경하면 각 스텝의 `icon` 속성에 지정된 아이콘이 표시됩니다.
 * 아이콘은 `steps` 배열의 각 항목에 `icon: ['category', 'name']` 형태로 설정합니다.
 */
export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    orientation: 'horizontal',
    indicatorType: 'number',
    size: 'md',
    color: 'blue',
    horizontalAlign: 'center',
    verticalAlign: 'left',
    indicatorPosition: 'top',
    clickable: false,
    showCheckOnCompleted: true,
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 수평 Stepper
 *
 * 기본적인 수평 레이아웃의 4단계 스텝입니다.
 */
export const Horizontal: Story = {
  render: () => (
    <Stepper
      orientation="horizontal"
      activeStep={2}
      showCheckOnCompleted
      steps={[
        { label: 'Cart', caption: 'Review items' },
        { label: 'Shipping', caption: 'Add address' },
        { label: 'Payment', caption: 'Enter details' },
        { label: 'Confirm', caption: 'Place order' },
      ]}
    />
  ),
};

/**
 * 수직 Stepper
 *
 * 수직 레이아웃의 스텝입니다. 각 스텝에 설명 텍스트가 포함됩니다.
 */
export const Vertical: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Stepper
        orientation="vertical"
        activeStep={1}
        showCheckOnCompleted
        steps={[
          {
            label: 'Create Account',
            caption: 'Enter your email and password',
            supportText: 'Step 1',
          },
          {
            label: 'Personal Info',
            caption: 'Fill in your personal details',
            supportText: 'Step 2',
          },
          {
            label: 'Verification',
            caption: 'Verify your email address',
            supportText: 'Step 3',
          },
          {
            label: 'Complete',
            caption: 'Setup is complete',
            supportText: 'Step 4',
          },
        ]}
      />
    </div>
  ),
};

/**
 * 아이콘 인디케이터
 *
 * 숫자 대신 아이콘을 사용하는 스텝입니다.
 */
export const WithIcons: Story = {
  render: () => {
    const iconSteps: { label: string; caption: string; icon: IconType }[] = [
      { label: 'Upload', caption: 'Select files', icon: ['system', 'upload'] },
      { label: 'Configure', caption: 'Set options', icon: ['system', 'settings'] },
      { label: 'Process', caption: 'Processing...', icon: ['media', 'play'] },
      { label: 'Done', caption: 'Download result', icon: ['system', 'check'] },
    ];

    return (
      <Stepper
        orientation="horizontal"
        indicatorType="icon"
        activeStep={2}
        showCheckOnCompleted
        steps={iconSteps}
      />
    );
  },
};

/**
 * 도트 인디케이터
 *
 * 간단한 도트 형태의 인디케이터입니다.
 */
export const WithDots: Story = {
  render: () => (
    <Stepper
      orientation="horizontal"
      indicatorType="dot"
      activeStep={1}
      steps={[
        { label: 'Step 1', caption: 'First step' },
        { label: 'Step 2', caption: 'Second step' },
        { label: 'Step 3', caption: 'Third step' },
      ]}
    />
  ),
};

/**
 * 크기 비교
 *
 * sm, md, lg 인디케이터 크기를 비교합니다.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-32">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p className="font-body size-sm font-medium text-muted margin-y-4">
            {size.toUpperCase()}
          </p>
          <Stepper
            size={size}
            activeStep={1}
            showCheckOnCompleted
            steps={[
              { label: 'Step 1' },
              { label: 'Step 2' },
              { label: 'Step 3' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * 색상 변형
 *
 * 다양한 색상의 인디케이터입니다.
 */
export const WithColors: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      {(['blue', 'green', 'purple', 'orange', 'red', 'teal'] as const).map(
        (color) => (
          <div key={color}>
            <p className="font-body size-sm font-medium text-muted margin-y-4">
              {color}
            </p>
            <Stepper
              color={color}
              activeStep={2}
              showCheckOnCompleted
              steps={[
                { label: 'Step 1' },
                { label: 'Step 2' },
                { label: 'Step 3' },
                { label: 'Step 4' },
              ]}
            />
          </div>
        ),
      )}
    </div>
  ),
};

/**
 * 에러 상태
 *
 * 특정 스텝에 에러가 있는 경우입니다.
 */
export const WithError: Story = {
  render: () => (
    <Stepper
      activeStep={2}
      showCheckOnCompleted
      steps={[
        { label: 'Account', caption: 'Completed' },
        { label: 'Profile', caption: 'Completed' },
        { label: 'Verification', caption: 'Failed to verify', error: true },
        { label: 'Complete', caption: 'Pending' },
      ]}
    />
  ),
};

/**
 * 클릭 가능한 Stepper
 *
 * 각 스텝을 클릭하여 이동할 수 있습니다.
 */
export const Clickable: Story = {
  render: function Render() {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <div className="flex flex-col ds-gap-16">
        <Stepper
          activeStep={activeStep}
          clickable
          showCheckOnCompleted
          onStepClick={setActiveStep}
          steps={[
            { label: 'Step 1', caption: 'Click to navigate' },
            { label: 'Step 2', caption: 'Click to navigate' },
            { label: 'Step 3', caption: 'Click to navigate' },
            { label: 'Step 4', caption: 'Click to navigate' },
          ]}
        />
        <p className="font-body size-sm text-muted text-center">
          Active step: {activeStep + 1}
        </p>
      </div>
    );
  },
};

/**
 * 수평 텍스트 정렬
 *
 * left, center, right 정렬을 비교합니다.
 */
export const HorizontalAlignments: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-32">
      {(['left', 'center', 'right'] as const).map((align) => (
        <div key={align}>
          <p className="font-body size-sm font-medium text-muted margin-y-4">
            {align}
          </p>
          <Stepper
            horizontalAlign={align}
            activeStep={1}
            showCheckOnCompleted
            steps={[
              { label: 'Step 1', caption: 'Description' },
              { label: 'Step 2', caption: 'Description' },
              { label: 'Step 3', caption: 'Description' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * 인디케이터 위치
 *
 * 수평 모드에서 인디케이터를 위/아래에 배치합니다.
 */
export const IndicatorPositions: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-32">
      {(['top', 'bottom'] as const).map((pos) => (
        <div key={pos}>
          <p className="font-body size-sm font-medium text-muted margin-y-4">
            Indicator: {pos}
          </p>
          <Stepper
            indicatorPosition={pos}
            activeStep={1}
            showCheckOnCompleted
            steps={[
              { label: 'Step 1', caption: 'First' },
              { label: 'Step 2', caption: 'Second' },
              { label: 'Step 3', caption: 'Third' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};
