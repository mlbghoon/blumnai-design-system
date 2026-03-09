import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { IconType } from '../../icons/Icon/Icon.types';
import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/TagsInput',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['tags', 'inline-tags'],
      description: '입력 필드의 변형 (tags: 내부, inline-tags: 하단)',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'tags' },
      },
    },
    inputStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '입력 필드의 스타일 변형',
      table: {
        type: {
          summary: 'InputStyle',
          detail: `'default' | 'shadow' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '입력 필드의 크기',
      table: {
        type: {
          summary: 'InputSize',
          detail: `'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '입력 필드의 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '입력 필드 값 (제어 컴포넌트)',
      table: {
        type: { summary: 'string' },
      },
    },
    onInputChange: {
      action: 'inputChanged',
      description: '입력 값 변경 시 콜백',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래 설명 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
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
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '입력 필드 앞에 표시되는 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    tags: {
      control: 'object',
      description: '현재 태그 목록',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onTagsChange: {
      action: 'tagsChanged',
      description: '태그 목록 변경 시 콜백',
      table: {
        type: { summary: '(tags: string[]) => void' },
      },
    },
    maxTags: {
      control: 'number',
      description: '최대 태그 개수',
      table: {
        type: { summary: 'number' },
      },
    },
    allowDuplicates: {
      control: 'boolean',
      description: '중복 태그 허용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    delimiters: {
      control: 'object',
      description: '태그 구분자 키 목록',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: "['Enter', ',']" },
      },
    },
    removable: {
      control: 'boolean',
      description: '태그 삭제 가능 여부 (닫기 버튼 표시)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    autoComplete: {
      control: 'text',
      description: '브라우저 자동완성 설정 (기본값: "off"로 자동완성 비활성화)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'off' },
      },
    },
    width: {
      control: 'text',
      description: '입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    className: {
      control: 'text',
      description: '컴포넌트에 전달할 추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ============================================================================
// BASIC VARIANTS
// ============================================================================

/**
 * 기본 태그 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * variant를 변경하여 태그 위치를 확인할 수 있습니다.
 * Input 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Node.js']);
    const leadIcon = 'leadIcon' in args ? (args.leadIcon as IconType | undefined) : undefined;
    const maxTags = 'maxTags' in args ? args.maxTags : undefined;
    const allowDuplicates = 'allowDuplicates' in args ? args.allowDuplicates : undefined;
    const delimiters = 'delimiters' in args ? args.delimiters : undefined;
    const removable = 'removable' in args ? args.removable : undefined;
    return (
      <Input
        variant="tags"
        inputStyle={args.inputStyle}
        size={args.size}
        label={args.label}
        placeholder={args.placeholder}
        required={args.required}
        supportText={args.supportText}
        caption={args.caption}
        error={args.error}
        success={args.success}
        disabled={args.disabled}
        leadIcon={leadIcon}
        maxTags={maxTags}
        allowDuplicates={allowDuplicates}
        delimiters={delimiters}
        removable={removable}
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
  args: {
    variant: 'tags',
    label: '기술 스택',
    placeholder: '태그 추가...',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 태그 (입력 필드 내부)
 *
 * `variant="tags"`로 태그가 입력 필드 내부에 표시됩니다.
 */
export const Tags: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Node.js']);
    return (
      <Input
        variant="tags"
        label="태그 (입력 필드 내부)"
        placeholder="태그 추가..."
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 인라인 태그 (입력 필드 하단)
 *
 * `variant="inline-tags"`로 태그가 입력 필드 하단에 표시됩니다.
 */
export const InlineTags: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['디자인', '개발', '테스트']);
    return (
      <Input
        variant="inline-tags"
        label="인라인 태그 (입력 필드 하단)"
        placeholder="스킬 추가..."
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 아이콘이 있는 태그 입력 필드
 *
 * `leadIcon` prop으로 입력 필드 앞에 아이콘을 추가할 수 있습니다.
 */
export const WithLeadIcon: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['JavaScript', 'Python']);
    return (
      <Input
        variant="inline-tags"
        label="언어"
        placeholder="언어 추가..."
        leadIcon={['development', 'code']}
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

// ============================================================================
// OPTIONS
// ============================================================================

/**
 * 최대 태그 개수 제한
 *
 * `maxTags` prop으로 입력할 수 있는 태그 개수를 제한할 수 있습니다.
 */
export const MaxTags: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['첫째', '둘째', '셋째']);
    return (
      <Input
        variant="inline-tags"
        label="제한된 태그 (최대 5개)"
        placeholder="태그 추가..."
        maxTags={5}
        caption="최대 5개의 태그를 추가할 수 있습니다"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 중복 태그 허용
 *
 * `allowDuplicates` prop으로 중복 태그를 허용할 수 있습니다.
 */
export const AllowDuplicates: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['태그']);
    return (
      <Input
        variant="inline-tags"
        label="중복 허용"
        placeholder='"태그"를 다시 추가해보세요...'
        allowDuplicates
        caption="중복 태그가 허용됩니다"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 커스텀 구분자
 *
 * `delimiters` prop으로 태그 구분자를 설정할 수 있습니다.
 */
export const CustomDelimiters: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['email@example.com']);
    return (
      <Input
        variant="inline-tags"
        label="이메일 주소"
        placeholder="이메일 입력 후 Enter 또는 Space를 누르세요..."
        delimiters={['Enter', ' ']}
        caption="Enter 또는 Space를 눌러 추가하세요"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * Small 크기
 */
export const SizeSmall: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['작게', '태그']);
    return (
      <Input
        variant="inline-tags"
        label="작게"
        placeholder="태그 추가..."
        size="sm"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['크게', '태그']);
    return (
      <Input
        variant="inline-tags"
        label="크게"
        placeholder="태그 추가..."
        size="lg"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 기본 상태
 */
export const StateDefault: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['기본']);
    return (
      <Input
        variant="inline-tags"
        label="기본"
        placeholder="태그 추가..."
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['비활성']);
    return (
      <Input
        variant="inline-tags"
        label="비활성"
        placeholder="태그 추가..."
        disabled
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['오류']);
    return (
      <Input
        variant="inline-tags"
        label="오류"
        placeholder="태그 추가..."
        error="최소 3개의 태그가 필요합니다"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['성공']);
    return (
      <Input
        variant="inline-tags"
        label="성공"
        placeholder="태그 추가..."
        success="태그가 유효합니다"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 빈 상태
 *
 * 태그가 없는 초기 상태입니다.
 */
export const Empty: Story = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <Input
        variant="inline-tags"
        label="태그"
        placeholder="입력 후 Enter를 눌러 태그를 추가하세요..."
        caption="쉼표 또는 Enter로 태그를 구분하세요"
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
};

/**
 * 삭제 불가능한 태그
 *
 * `removable={false}`로 태그 삭제 버튼을 숨깁니다.
 */
export const NonRemovable: Story = {
  render: function Render() {
    const [tags] = useState(['읽기 전용', '고정', '영구']);
    return (
      <Input
        variant="tags"
        label="삭제 불가 태그"
        placeholder="태그 추가..."
        removable={false}
        tags={tags}
        onTagsChange={() => {}}
      />
    );
  },
};
