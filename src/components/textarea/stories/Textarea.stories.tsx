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
      description: '텍스트 영역의 외관 스타일을 설정합니다. default(기본 테두리), shadow(그림자 효과), soft(부드러운 배경) 중 선택할 수 있습니다',
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
      description: '텍스트 영역의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
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
      description: '텍스트 영역 위에 표시되는 제목 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'true로 설정하면 필수 입력 항목으로 표시되며, 라벨 옆에 필수 표시(*)가 나타납니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    supportText: {
      control: 'text',
      description: '라벨 옆에 표시되는 부가 설명 텍스트입니다. 선택 입력 등의 안내 문구에 사용합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '텍스트 영역 아래에 표시되는 도움말 텍스트입니다. 사용자에게 입력 방법이나 형식을 안내합니다',
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
      description: '텍스트 영역이 비어있을 때 표시되는 안내 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    minRows: {
      control: 'number',
      description: '텍스트 영역의 최소 높이를 행 수로 지정합니다. 기본값은 3행입니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    maxRows: {
      control: 'number',
      description: '텍스트 영역의 최대 높이를 행 수로 지정합니다. 이 값을 초과하면 스크롤이 생깁니다',
      table: {
        type: { summary: 'number' },
      },
    },
    showCount: {
      control: 'boolean',
      description: 'true로 설정하면 텍스트 영역 우측 하단에 현재 글자 수와 입력할 수 있는 최대 글자 수입니다. showCount와 함께 사용하면 카운터가 표시됩니다가 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: '입력할 수 있는 최대 글자 수입니다. showCount와 함께 사용하면 카운터가 표시됩니다',
      table: {
        type: { summary: 'number' },
      },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: '텍스트 영역의 크기 조절 방향을 설정합니다. none(불가), vertical(세로만), horizontal(가로만), both(양방향) 중 선택할 수 있습니다',
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
      description: 'true로 설정하면 텍스트 영역 하단에 액션 버튼이 있는 툴바가 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    toolbarActions: {
      control: false,
      description: '툴바 왼쪽에 표시되는 커스텀 액션 버튼 목록입니다. 아이콘, 라벨, 클릭 핸들러를 포함하는 객체 배열로 전달합니다',
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
  disabled?: boolean;         // true로 설정하면 컴포넌트가 비활성화되어 클릭이나 입력을 할 수 없습니다
}[]`,
        },
      },
    },
    onAttach: {
      action: 'attach',
      description: '이 함수를 전달하면 툴바에 + 버튼이 표시됩니다. 파일 첨부 등의 용도로 사용합니다',
      table: {
        type: { summary: '() => void' },
      },
    },
    onSubmit: {
      action: 'submit',
      description: '이 함수를 전달하면 툴바에 전송 버튼(↑)이 표시됩니다. 메시지 전송 등의 용도로 사용합니다',
      table: {
        type: { summary: '() => void' },
      },
    },
    submitDisabled: {
      control: 'boolean',
      description: 'true로 설정하면 전송 버튼이 비활성화됩니다. 입력 내용이 비어있을 때 비활성화하는 용도로 사용합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onVoiceInput: {
      action: 'voiceInput',
      description: '이 함수를 전달하면 툴바에 마이크 버튼이 표시됩니다. 음성 입력 기능에 사용합니다',
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
    label: '설명',
    placeholder: '설명을 입력하세요...',
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
        label: '이미지 생성',
        onClick: () => console.log('Create image clicked'),
      },
      {
        key: 'research',
        icon: ['system', 'search'],
        label: '심층 연구',
        onClick: () => console.log('Deep research clicked'),
      },
    ];

    return (
      <Textarea
        label="AI에게 질문"
        placeholder="AI에게 무엇이든 물어보세요..."
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
        placeholder="프롬프트를 입력하세요..."
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
      placeholder="편집할 수 없습니다..."
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
      label="메시지"
      placeholder="메시지를 입력하세요..."
      error="필수 입력 항목입니다"
    />
  ),
};

/**
 * 성공 상태
 */
export const Success: Story = {
  render: () => (
    <Textarea
      label="자기소개"
      placeholder="자기소개를 입력하세요..."
      success="좋아 보입니다!"
      defaultValue="5년 경력의 소프트웨어 개발자입니다."
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
        label="리뷰"
        placeholder="리뷰를 작성하세요..."
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
      label="댓글"
      placeholder="고정 크기 텍스트 영역..."
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
        label="메모"
        placeholder="행 수 제한..."
        minRows={2}
        maxRows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        caption="최소 2행, 최대 5행"
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
      label="피드백"
      placeholder="피드백을 입력해주세요..."
      required
      supportText="선택 사항"
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
        label="입력됨"
        defaultValue="이 텍스트 영역에는 내용이 있습니다"
      />
      <Textarea
        label="Disabled"
        placeholder="Disabled state..."
        disabled
      />
      <Textarea
        label="Error"
        placeholder="Error state..."
        error="오류가 발생했습니다"
      />
      <Textarea
        label="Success"
        placeholder="Success state..."
        success="성공적으로 검증되었습니다"
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
        label: '이미지 생성',
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
            placeholder="AI에게 무엇이든 물어보세요..."
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
