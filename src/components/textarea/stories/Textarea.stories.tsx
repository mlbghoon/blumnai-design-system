import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiCheckLine, RiDeleteBinLine, RiErrorWarningLine, RiImageLine, RiSearchLine, RiStarLine } from '../../icons/Icon';
import { useState } from 'react';

import { Textarea } from '../Textarea';
import type { TextareaProps, TextareaToolbarAction } from '../Textarea.types';
import type { ButtonColor } from '../../button/Button.types';

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
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: '라벨 위치 (top: 상단, left: 좌측 인라인)',
      table: {
        type: {
          summary: 'LabelPosition',
          detail: `'top' | 'left'`,
        },
        defaultValue: { summary: 'top' },
      },
    },
    labelWidth: {
      control: 'text',
      description: '라벨 너비 (labelPosition="left"일 때 사용, 여러 필드 정렬용)',
      table: {
        type: { summary: 'string | number', detail: '예: 100, "120px", "8rem"' },
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
      description: '툴바 왼쪽에 표시할 액션 버튼/칩 목록. 내부적으로 Button 컴포넌트를 사용합니다',
      table: {
        type: {
          summary: 'TextareaToolbarAction[]',
          detail: `{
  key: string;                // 고유 키
  icon?: RemixiconLikeComponent; // 아이콘 (Button의 leadIcon, v2.0+ direct-import only)
                              //   Remixicon component reference: icon: RiImageLine
  label?: string;             // 라벨 (없으면 아이콘만 표시)
  onClick?: () => void;       // 클릭 핸들러
  disabled?: boolean;         // 비활성화 여부
  buttonStyle?: ButtonStyle;  // 버튼 스타일 (기본: 'soft')
  colorOverride?: ButtonColor; // 버튼 색상 오버라이드
  tooltip?: string;           // 호버 툴팁
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
    fieldSizing: {
      control: 'select',
      options: ['fixed', 'content'],
      description: 'CSS field-sizing 속성. "content"로 설정하면 입력 내용에 따라 높이가 자동 조정됩니다 (Chrome 123+)',
      table: {
        type: {
          summary: 'FieldSizing',
          detail: `'content' | 'fixed'`,
        },
        defaultValue: { summary: 'fixed' },
      },
    },
    autoResize: {
      control: 'boolean',
      description: '입력 내용에 따라 높이가 자동 조절되는 JS 기반 자동 리사이즈. maxRows 설정 없이 제한 없이 늘어납니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    labelPosition: 'top',
    labelWidth: undefined,
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
    width: undefined,
    submitDisabled: false,
    fieldSizing: 'fixed',
    autoResize: false,
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
        labelPosition={args.labelPosition}
        labelWidth={args.labelWidth}
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
        showToolbar={args.showToolbar}
        width={args.width}
        submitDisabled={args.submitDisabled}
        fieldSizing={args.fieldSizing}
        autoResize={args.autoResize}
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
        icon: RiImageLine,
        label: '이미지 생성',
        tooltip: '이미지를 생성합니다',
        onClick: () => console.log('Create image clicked'),
      },
      {
        key: 'research',
        icon: RiSearchLine,
        label: '심층 검색',
        tooltip: '심층 검색을 시작합니다',
        onClick: () => console.log('Deep research clicked'),
      },
    ];

    return (
      <Textarea
        label="AI에게 물어보기"
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
 * 툴바 + 글자 수 표시
 *
 * showToolbar와 showCount를 함께 사용하면 글자 수가 툴바 우측에 표시됩니다.
 */
export const ToolbarWithCount: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <Textarea
        label="메시지"
        placeholder="메시지를 입력하세요..."
        showCount
        maxLength={200}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onAttach={() => console.log('Attach clicked')}
        onSubmit={() => console.log('Submit:', value)}
        submitDisabled={value.length === 0}
        minRows={3}
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
      label="비활성화"
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
      error="이 필드는 필수 항목입니다"
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
      placeholder="본인에 대해 알려주세요..."
      success="훌륭합니다!"
      defaultValue="저는 5년 경력의 소프트웨어 개발자입니다."
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
      placeholder="여러분의 피드백이 중요합니다..."
      required
      supportText="선택사항"
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
            label={`스타일: ${style}`}
            placeholder={`${style} 스타일 텍스트 영역...`}
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
            label={`크기: ${size}`}
            placeholder={`${size} 크기 텍스트 영역...`}
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
        label="기본"
        placeholder="기본 상태..."
      />
      <Textarea
        label="입력됨"
        defaultValue="텍스트가 입력된 상태입니다"
      />
      <Textarea
        label="비활성화"
        placeholder="비활성화 상태..."
        disabled
      />
      <Textarea
        label="에러"
        placeholder="에러 상태..."
        error="오류가 발생했습니다"
      />
      <Textarea
        label="성공"
        placeholder="성공 상태..."
        success="검증이 완료되었습니다"
      />
    </div>
  ),
};

/**
 * CSS field-sizing 자동 높이
 *
 * CSS `field-sizing: content` 속성을 사용하여 입력 내용에 따라 높이가 자동 조정됩니다.
 * Chrome 123+ 에서 지원됩니다.
 */
export const AutoHeight: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <Textarea
        label="자동 높이 (CSS)"
        placeholder="내용을 입력하면 높이가 자동 조절됩니다..."
        fieldSizing="content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        caption="CSS field-sizing: content (Chrome 123+)"
      />
    );
  },
};

/**
 * JS 기반 자동 리사이즈
 *
 * autoResize prop으로 JavaScript 기반 자동 높이 조절을 활성화합니다.
 * 모든 브라우저에서 동작합니다.
 */
export const AutoResize: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <Textarea
        label="자동 리사이즈 (JS)"
        placeholder="내용을 입력하면 높이가 자동 조절됩니다..."
        autoResize
        value={value}
        onChange={(e) => setValue(e.target.value)}
        caption="JavaScript 기반 자동 리사이즈 (모든 브라우저 지원)"
      />
    );
  },
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
        icon: RiImageLine,
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
            label={`툴바 - ${style}`}
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

/**
 * 툴바 액션 스타일 변형
 *
 * `buttonStyle`과 `colorOverride`로 Button 컴포넌트의 스타일을 직접 제어합니다.
 */
export const ToolbarActionStyles: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    const toolbarActions: TextareaToolbarAction[] = [
      {
        key: 'generate',
        icon: RiImageLine,
        label: '이미지 생성',
        buttonStyle: 'soft',
        colorOverride: 'blue',
        tooltip: 'AI로 이미지를 생성합니다',
        onClick: () => console.log('Generate image'),
      },
      {
        key: 'delete',
        icon: RiDeleteBinLine,
        buttonStyle: 'soft',
        colorOverride: 'red',
        tooltip: '대화 삭제',
        onClick: () => console.log('Delete'),
      },
      {
        key: 'check',
        icon: RiCheckLine,
        buttonStyle: 'soft',
        colorOverride: 'green',
        tooltip: '완료',
        onClick: () => console.log('Check'),
      },
      {
        key: 'warn',
        icon: RiErrorWarningLine,
        buttonStyle: 'ghost',
        colorOverride: 'orange',
        tooltip: '주의 필요',
        onClick: () => console.log('Warning'),
      },
    ];

    const colors: ButtonColor[] = ['blue', 'red', 'green', 'orange', 'purple', 'teal'];

    return (
      <div className="flex flex-col ds-gap-24 max-w-lg">
        <Textarea
          label="스타일 + 툴팁"
          placeholder="다양한 스타일의 툴바 액션..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          toolbarActions={toolbarActions}
          onSubmit={() => console.log('Submit')}
          submitDisabled={value.length === 0}
          minRows={2}
        />
        <Textarea
          label="칩 스타일 색상"
          placeholder="colorOverride로 색상 변경..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          toolbarActions={colors.map((color) => ({
            key: color,
            icon: RiStarLine as TextareaToolbarAction['icon'],
            label: color,
            buttonStyle: 'soft' as const,
            colorOverride: color,
            tooltip: `${color} 색상 액션`,
            onClick: () => console.log(color),
          }))}
          minRows={2}
        />
      </div>
    );
  },
};
