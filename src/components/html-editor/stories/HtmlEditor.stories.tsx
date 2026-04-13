import { useState, useRef, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { HtmlEditor } from '../HtmlEditor';
import type { HtmlEditorProps, HtmlEditorRef, HtmlEditorFeature } from '../HtmlEditor.types';
import { Button } from '../../button';

type HtmlEditorStoryProps = HtmlEditorProps & {
  imageMaxSizeMB?: number;
};

const meta: Meta<HtmlEditorStoryProps> = {
  title: 'DataEntry/HtmlEditor',
  component: HtmlEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: '초기 HTML 값 (비제어 모드)',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'HTML 값 (제어 모드)',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: 'HTML 변경 콜백',
      table: {
        type: { summary: '(html: string) => void' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    features: {
      control: false,
      description: '표시할 툴바 기능 목록',
      table: {
        type: {
          summary: 'HtmlEditorFeature[]',
          detail: `'bold' | 'italic' | 'underline' | 'strikethrough' | 'heading' | 'blockquote' | 'codeBlock' | 'bulletList' | 'orderedList' | 'textAlign' | 'colorPicker' | 'link' | 'image' | 'removeFormat' | 'history' | 'codeView'`,
        },
      },
    },
    imageUpload: {
      control: false,
      description: '이미지 업로드 설정',
      table: {
        type: {
          summary: 'HtmlEditorImageUpload',
          detail: '{ maxSize?: number; handler: (file: File) => Promise<{ url: string }>; onError?: (error: Error) => void }',
        },
      },
    },
    imageMaxSizeMB: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description: '이미지 최대 크기 (MB) — Storybook 테스트용',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
        category: 'Storybook',
      },
    },
    colors: {
      control: false,
      description: '컬러 피커 색상 목록',
      table: {
        type: { summary: 'string[]' },
      },
    },
    onContentSizeChange: {
      control: false,
      description: '콘텐츠 크기 변경 콜백 (debounced ~300ms)',
      table: {
        type: { summary: '(bytes: number) => void' },
      },
    },
    maxContentSize: {
      control: 'number',
      description: '최대 콘텐츠 크기 (bytes)',
      table: {
        type: { summary: 'number' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 (true 또는 에러 메시지)',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태 (true 또는 성공 메시지)',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    label: {
      control: 'text',
      description: '라벨',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: '라벨 위치',
      table: {
        type: { summary: 'LabelPosition', detail: `'top' | 'left'` },
        defaultValue: { summary: 'top' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    supportText: {
      control: 'text',
      description: '라벨 옆 보조 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래 설명',
      table: {
        type: { summary: 'string' },
      },
    },
    compactToolbar: {
      control: 'boolean',
      description: '컴팩트 툴바 (정렬 등을 드롭다운으로 축소)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    minHeight: {
      control: 'number',
      description: '에디터 최소 높이 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    maxHeight: {
      control: 'number',
      description: '에디터 최대 높이 (px)',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<HtmlEditorStoryProps>;

/** 모든 기능이 활성화된 기본 에디터 */
export const Default: Story = {
  args: {
    placeholder: '게시글을 작성해주세요',
    label: '내용',
    required: false,
    disabled: false,
    readOnly: false,
    minHeight: 300,
    maxHeight: 500,
    maxContentSize: 5 * 1024 * 1024,
    imageMaxSizeMB: 3,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const handleUpload = async (file: File) => {
      return new Promise<{ url: string }>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ url: reader.result as string });
        reader.readAsDataURL(file);
      });
    };

    return (
      <div className="max-w-4xl">
        <HtmlEditor
          placeholder={args.placeholder}
          label={args.label || undefined}
          labelPosition={args.labelPosition}
          required={args.required}
          supportText={args.supportText || undefined}
          caption={args.caption || undefined}
          error={args.error || undefined}
          success={args.success || undefined}
          disabled={args.disabled}
          readOnly={args.readOnly}
          compactToolbar={args.compactToolbar}
          minHeight={args.minHeight}
          maxHeight={args.maxHeight}
          onContentSizeChange={() => {}}
          maxContentSize={args.maxContentSize}
          imageUpload={{
            maxSize: (args.imageMaxSizeMB || 3) * 1024 * 1024,
            handler: handleUpload,
          }}
        />
      </div>
    );
  },
};

/** InputWrapper 연동: 라벨, 캡션, 필수, 보조 텍스트 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24 max-w-4xl">
      <HtmlEditor
        label="공지사항"
        required
        supportText="HTML 형식 지원"
        caption="최대 5MB까지 등록 가능합니다."
        placeholder="내용을 입력하세요"
        minHeight={200}
      />
      <HtmlEditor
        label="설명"
        labelPosition="left"
        placeholder="왼쪽 라벨 위치"
        minHeight={150}
      />
    </div>
  ),
};

/** 제어 모드: value + onChange로 외부 상태와 동기화 */
export const Controlled: Story = {
  render: function Render() {
    const [html, setHtml] = useState('<p>초기 HTML 콘텐츠입니다.</p>');

    return (
      <div className="flex flex-col ds-gap-16 max-w-4xl">
        <HtmlEditor
          value={html}
          onChange={setHtml}
          label="제어 모드 에디터"
          minHeight={200}
        />
        <div className="flex flex-col ds-gap-4">
          <p className="font-body size-sm font-medium text-default">HTML 출력:</p>
          <pre className="font-code size-xs padding-12 bg-muted rounded-md overflow-auto max-h-[200px]">
            {html || '(비어있음)'}
          </pre>
        </div>
      </div>
    );
  },
};

/** 비제어 모드: defaultValue + ref.getHTML() */
export const Uncontrolled: Story = {
  render: function Render() {
    const editorRef = useRef<HtmlEditorRef>(null);
    const [output, setOutput] = useState('');

    const handleGetHtml = useCallback(() => {
      const html = editorRef.current?.getHTML() || '';
      setOutput(html);
    }, []);

    return (
      <div className="flex flex-col ds-gap-16 max-w-4xl">
        <HtmlEditor
          ref={editorRef}
          defaultValue="<p>기본값으로 설정된 텍스트입니다.</p>"
          label="비제어 모드 에디터"
          minHeight={200}
        />
        <div className="flex ds-gap-8">
          <Button onClick={handleGetHtml} size="sm">
            HTML 가져오기
          </Button>
          <Button
            onClick={() => editorRef.current?.focus()}
            size="sm"
            buttonStyle="secondary"
          >
            포커스
          </Button>
        </div>
        {output && (
          <pre className="font-code size-xs padding-12 bg-muted rounded-md overflow-auto max-h-[200px]">
            {output}
          </pre>
        )}
      </div>
    );
  },
};

/** 일부 기능만 활성화 */
export const CustomFeatures: Story = {
  render: () => {
    const features: HtmlEditorFeature[] = ['bold', 'italic', 'underline', 'link', 'history'];

    return (
      <div className="max-w-4xl">
        <HtmlEditor
          features={features}
          label="간단 에디터 (텍스트 + 링크만)"
          placeholder="간단한 서식만 사용 가능합니다"
          minHeight={150}
        />
      </div>
    );
  },
};

/** 이미지 업로드 (파일 + URL) */
export const ImageUpload: Story = {
  render: function Render() {
    const handleUpload = useCallback(async (file: File) => {
      return new Promise<{ url: string }>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ url: reader.result as string });
        };
        reader.readAsDataURL(file);
      });
    }, []);

    return (
      <div className="max-w-4xl">
        <HtmlEditor
          label="이미지 업로드 에디터"
          placeholder="이미지를 업로드하거나 URL을 입력하세요"
          imageUpload={{
            maxSize: 3 * 1024 * 1024,
            handler: handleUpload,
            onError: (err) => alert(err.message),
          }}
          minHeight={300}
        />
      </div>
    );
  },
};

/** 콘텐츠 크기 추적 */
export const ContentSize: Story = {
  render: function Render() {
    const [size, setSize] = useState(0);

    return (
      <div className="flex flex-col ds-gap-16 max-w-4xl">
        <HtmlEditor
          label="크기 추적 에디터"
          placeholder="내용을 입력하면 크기가 표시됩니다"
          onContentSizeChange={setSize}
          maxContentSize={5 * 1024 * 1024}
          minHeight={200}
        />
        <p className="font-body size-sm text-muted">
          현재 크기: {size} bytes ({(size / 1024).toFixed(1)} KB)
        </p>
      </div>
    );
  },
};

/** Disabled, ReadOnly, Error, Success 상태 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24 max-w-4xl">
      <HtmlEditor
        defaultValue="<p>비활성화된 에디터입니다.</p>"
        label="Disabled"
        disabled
        minHeight={120}
      />
      <HtmlEditor
        defaultValue="<p>읽기 전용 에디터입니다.</p>"
        label="ReadOnly"
        readOnly
        minHeight={120}
      />
      <HtmlEditor
        defaultValue="<p>에러 상태 에디터입니다.</p>"
        label="Error"
        error="내용을 입력하세요."
        minHeight={120}
      />
      <HtmlEditor
        defaultValue="<p>성공 상태 에디터입니다.</p>"
        label="Success"
        success="저장되었습니다."
        minHeight={120}
      />
    </div>
  ),
};

/** 다양한 서식이 적용된 콘텐츠 */
export const PreloadedContent: Story = {
  render: () => {
    const sampleHtml = `
      <h1>제목 1</h1>
      <h2>제목 2</h2>
      <h3>제목 3</h3>
      <p>일반 텍스트입니다. <strong>굵은 텍스트</strong>, <em>기울임 텍스트</em>, <u>밑줄 텍스트</u>를 포함합니다.</p>
      <blockquote>인용 텍스트입니다. 다른 사람의 말을 인용할 때 사용합니다.</blockquote>
      <pre><code>const hello = "코드 블록";\nconsole.log(hello);</code></pre>
      <p>링크: <a href="https://example.com">예시 링크</a></p>
      <p style="text-align: center;">가운데 정렬된 텍스트</p>
      <p style="text-align: right;">오른쪽 정렬된 텍스트</p>
    `.trim();

    return (
      <div className="max-w-4xl">
        <HtmlEditor
          defaultValue={sampleHtml}
          label="프리로드 콘텐츠"
          minHeight={400}
        />
      </div>
    );
  },
};
