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
      description: '입력 필드의 변형을 설정합니다. tags(태그가 입력 필드 내부에 표시), inline-tags(태그가 입력 필드 하단에 표시) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'tags' },
      },
    },
    inputStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '입력 필드의 외관 스타일을 설정합니다. default(기본 테두리), shadow(그림자 효과), soft(부드러운 배경) 중 선택할 수 있습니다',
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
      description: '입력 필드의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
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
      description: '입력 필드 위에 표시되는 제목 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: '입력 필드가 비어있을 때 표시되는 안내 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '입력 필드에 표시되는 현재 값입니다. 외부에서 값을 제어할 때 사용합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    onInputChange: {
      action: 'inputChanged',
      description: '사용자가 입력 값을 변경할 때마다 호출되는 함수입니다',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래에 표시되는 도움말 텍스트입니다. 사용자에게 입력 방법이나 형식을 안내합니다',
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
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: '에러 메시지를 입력하면 빨간색 테두리와 함께 아래에 에러 메시지가 표시됩니다. true로 설정하면 에러 스타일만 적용됩니다',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 메시지를 입력하면 초록색 테두리와 함께 아래에 성공 메시지가 표시됩니다. true로 설정하면 성공 스타일만 적용됩니다',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '입력 필드 왼쪽에 표시되는 아이콘입니다. [카테고리, 아이콘명] 형식으로 지정합니다',
      table: {
        type: { summary: 'IconType' },
      },
    },
    tags: {
      control: 'object',
      description: '현재 입력된 태그들의 배열입니다. 문자열 배열 형식으로 전달합니다',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onTagsChange: {
      action: 'tagsChanged',
      description: '태그가 추가되거나 삭제될 때 호출되는 함수입니다. 변경된 태그 배열을 인자로 받습니다',
      table: {
        type: { summary: '(tags: string[]) => void' },
      },
    },
    maxTags: {
      control: 'number',
      description: '입력할 수 있는 최대 태그 개수입니다. 이 개수에 도달하면 더 이상 태그를 추가할 수 없습니다',
      table: {
        type: { summary: 'number' },
      },
    },
    allowDuplicates: {
      control: 'boolean',
      description: 'true로 설정하면 같은 이름의 태그를 여러 개 추가할 수 있습니다. 기본값은 false(중복 불가)입니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    delimiters: {
      control: 'object',
      description: '태그를 구분하는 키 목록입니다. 기본값은 Enter와 쉼표(,)이며, 해당 키를 누르면 새 태그가 추가됩니다',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: "['Enter', ',']" },
      },
    },
    removable: {
      control: 'boolean',
      description: 'true로 설정하면 각 태그에 X 버튼이 표시되어 삭제할 수 있습니다. false로 설정하면 태그를 삭제할 수 없습니다',
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
    placeholder: '태그를 추가하세요...',
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
        placeholder="태그를 추가하세요..."
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
    const [tags, setTags] = useState(['디자인', '개발', '테스팅']);
    return (
      <Input
        variant="inline-tags"
        label="인라인 태그 (입력 필드 하단)"
        placeholder="기술을 추가하세요..."
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
        label="프로그래밍 언어"
        placeholder="언어를 추가하세요..."
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
    const [tags, setTags] = useState(['하나', '둘', '셋']);
    return (
      <Input
        variant="inline-tags"
        label="태그 제한 (최대 5개)"
        placeholder="태그를 추가하세요..."
        maxTags={5}
        caption="최대 5개까지 태그를 추가할 수 있습니다"
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
    const [tags, setTags] = useState(['Tag']);
    return (
      <Input
        variant="inline-tags"
        label="중복 허용"
        placeholder='"태그"를 다시 추가해보세요...'
        allowDuplicates
        caption="중복 태그를 허용합니다"
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
        placeholder="이메일을 입력하고 Enter 또는 Space를 누르세요..."
        delimiters={['Enter', ' ']}
        caption="Enter 또는 Space로 추가"
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
    const [tags, setTags] = useState(['작은', '태그']);
    return (
      <Input
        variant="inline-tags"
        label="Small"
        placeholder="태그를 추가하세요..."
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
    const [tags, setTags] = useState(['큰', '태그']);
    return (
      <Input
        variant="inline-tags"
        label="Large"
        placeholder="태그를 추가하세요..."
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
        label="Default"
        placeholder="태그를 추가하세요..."
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
    const [tags, setTags] = useState(['비활성화']);
    return (
      <Input
        variant="inline-tags"
        label="Disabled"
        placeholder="태그를 추가하세요..."
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
    const [tags, setTags] = useState(['에러']);
    return (
      <Input
        variant="inline-tags"
        label="Error"
        placeholder="태그를 추가하세요..."
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
        label="Success"
        placeholder="태그를 추가하세요..."
        success="태그가 검증되었습니다"
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
        caption="쉼표 또는 Enter로 태그를 구분합니다"
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
        placeholder="태그를 추가하세요..."
        removable={false}
        tags={tags}
        onTagsChange={() => {}}
      />
    );
  },
};
