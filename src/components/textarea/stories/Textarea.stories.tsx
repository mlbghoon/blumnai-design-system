import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Textarea } from '../Textarea';
import type { TextareaProps, TextareaToolbarAction } from '../Textarea.types';

const meta: Meta<typeof Textarea> = {
  title: 'DataEntry/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    textareaStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '텍스트 영역 스타일 변형',
      table: {
        type: {
          summary: 'TextareaStyle',
          detail: `'default' | 'shadow' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '텍스트 영역 크기',
      table: {
        type: {
          summary: 'TextareaSize',
          detail: `'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '텍스트 영역 위에 표시되는 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부 (별표 표시)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    supportText: {
      control: 'text',
      description: '라벨 옆에 표시되는 보조 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '텍스트 영역 아래에 표시되는 설명 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: {
        type: { summary: 'string' },
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
    minRows: {
      control: 'number',
      description: '최소 행 수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    maxRows: {
      control: 'number',
      description: '최대 행 수',
      table: {
        type: { summary: 'number' },
      },
    },
    showCount: {
      control: 'boolean',
      description: '글자 수 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: '최대 글자 수',
      table: {
        type: { summary: 'number' },
      },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: '리사이즈 가능 여부',
      table: {
        type: {
          summary: 'TextareaResize',
          detail: `'none' | 'vertical' | 'horizontal' | 'both'`,
        },
        defaultValue: { summary: 'vertical' },
      },
    },
    showToolbar: {
      control: 'boolean',
      description: '툴바 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    toolbarActions: {
      control: false,
      description: '툴바 왼쪽에 표시할 액션 버튼/칩 목록',
      table: {
        type: {
          summary: 'TextareaToolbarAction[]',
          detail: `{
  key: string;                // 고유 키
  icon?: IconTypeWithFill;    // 아이콘
                              // - ['media', 'image']
                              // - ['media', 'image', true] (filled)
  label?: string;             // 라벨 (없으면 아이콘만 표시)
  onClick?: () => void;       // 클릭 핸들러
  disabled?: boolean;         // 비활성화 여부
}[]`,
        },
      },
    },
    onAttach: {
      action: 'attach',
      description: '첨부 버튼 클릭 핸들러 (제공 시 + 버튼 표시)',
      table: {
        type: { summary: '() => void' },
      },
    },
    onSubmit: {
      action: 'submit',
      description: '제출 버튼 클릭 핸들러 (제공 시 ↑ 버튼 표시)',
      table: {
        type: { summary: '() => void' },
      },
    },
    submitDisabled: {
      control: 'boolean',
      description: '제출 버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onVoiceInput: {
      action: 'voiceInput',
      description: '음성 입력 버튼 클릭 핸들러 (제공 시 마이크 버튼 표시)',
      table: {
        type: { summary: '() => void' },
      },
    },
    width: {
      control: 'text',
      description: '커스텀 너비 (숫자는 px, 문자열은 그대로 사용)',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * 기본 Textarea
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    textareaStyle: 'default',
    size: 'sm',
    required: false,
    disabled: false,
    showCount: false,
    resize: 'vertical',
    minRows: 3,
    maxRows: undefined,
    maxLength: undefined,
    supportText: '',
    caption: '',
    error: '',
    success: '',
    showToolbar: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;

    return (
      <Textarea
        textareaStyle={args.textareaStyle}
        size={args.size}
        label={args.label}
        required={args.required}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        placeholder={args.placeholder}
        disabled={args.disabled}
        minRows={args.minRows}
        maxRows={args.maxRows}
        showCount={args.showCount}
        maxLength={args.maxLength}
        resize={args.resize}
        width={args.width}
        showToolbar={args.showToolbar}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * 툴바가 있는 Textarea
 *
 * AI 프롬프트 입력 등에 사용되는 툴바가 있는 텍스트 영역입니다.
 */
export const WithToolbar: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    const toolbarActions: TextareaToolbarAction[] = [
      {
        key: 'image',
        icon: ['media', 'image'],
        label: 'Create image',
        onClick: () => console.log('Create image clicked'),
      },
      {
        key: 'research',
        icon: ['system', 'search'],
        label: 'Deep research',
        onClick: () => console.log('Deep research clicked'),
      },
    ];

    return (
      <Textarea
        label="Ask AI"
        placeholder="Ask AI anything..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onAttach={() => console.log('Attach clicked')}
        onVoiceInput={() => console.log('Voice input clicked')}
        onSubmit={() => console.log('Submit:', value)}
        submitDisabled={value.length === 0}
        toolbarActions={toolbarActions}
        minRows={2}
      />
    );
  },
};

/**
 * 간단한 툴바
 *
 * 첨부와 제출 버튼만 있는 간단한 툴바입니다.
 */
export const SimpleToolbar: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <Textarea
        placeholder="Add prompt..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onAttach={() => console.log('Attach clicked')}
        onSubmit={() => console.log('Submit:', value)}
        submitDisabled={value.length === 0}
        minRows={1}
      />
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <Textarea
      label="Disabled"
      placeholder="Cannot edit..."
      disabled
    />
  ),
};

/**
 * 에러 상태
 */
export const Error: Story = {
  render: () => (
    <Textarea
      label="Message"
      placeholder="Enter message..."
      error="This field is required"
    />
  ),
};

/**
 * 성공 상태
 */
export const Success: Story = {
  render: () => (
    <Textarea
      label="Bio"
      placeholder="Tell us about yourself..."
      success="Looks great!"
      defaultValue="I'm a software developer with 5 years of experience."
    />
  ),
};

/**
 * 글자 수 표시
 */
export const WithCount: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <Textarea
        label="Review"
        placeholder="Write your review..."
        showCount
        maxLength={500}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * 리사이즈 비활성화
 */
export const NoResize: Story = {
  render: () => (
    <Textarea
      label="Comment"
      placeholder="Fixed size textarea..."
      resize="none"
      minRows={4}
    />
  ),
};

/**
 * 행 수 제한
 */
export const LimitedRows: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <Textarea
        label="Notes"
        placeholder="Limited rows..."
        minRows={2}
        maxRows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        caption="Minimum 2 rows, maximum 5 rows"
      />
    );
  },
};

/**
 * 필수 입력
 */
export const Required: Story = {
  render: () => (
    <Textarea
      label="Feedback"
      placeholder="Your feedback is important..."
      required
      supportText="Optional"
    />
  ),
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: function Render() {
    const styles: Array<TextareaProps['textareaStyle']> = ['default', 'shadow', 'soft'];

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        {styles.map((style) => (
          <Textarea
            key={style}
            textareaStyle={style}
            label={`Style: ${style}`}
            placeholder={`${style} style textarea...`}
          />
        ))}
      </div>
    );
  },
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: function Render() {
    const sizes: Array<TextareaProps['size']> = ['sm', 'lg'];

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        {sizes.map((size) => (
          <Textarea
            key={size}
            size={size}
            label={`Size: ${size}`}
            placeholder={`${size} size textarea...`}
          />
        ))}
      </div>
    );
  },
};

/**
 * 모든 상태
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24 max-w-md">
      <Textarea
        label="Default"
        placeholder="Default state..."
      />
      <Textarea
        label="Filled"
        defaultValue="This textarea has content"
      />
      <Textarea
        label="Disabled"
        placeholder="Disabled state..."
        disabled
      />
      <Textarea
        label="Error"
        placeholder="Error state..."
        error="Something went wrong"
      />
      <Textarea
        label="Success"
        placeholder="Success state..."
        success="Validated successfully"
      />
    </div>
  ),
};

/**
 * 툴바 스타일 변형
 */
export const ToolbarStyles: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const styles: Array<TextareaProps['textareaStyle']> = ['default', 'shadow', 'soft'];

    const toolbarActions: TextareaToolbarAction[] = [
      {
        key: 'image',
        icon: ['media', 'image'],
        label: 'Create image',
        onClick: () => console.log('Create image'),
      },
    ];

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        {styles.map((style) => (
          <Textarea
            key={style}
            textareaStyle={style}
            label={`Toolbar - ${style}`}
            placeholder="Ask AI anything..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onAttach={() => console.log('Attach')}
            onSubmit={() => console.log('Submit')}
            submitDisabled={value.length === 0}
            toolbarActions={toolbarActions}
            minRows={2}
          />
        ))}
      </div>
    );
  },
};
