import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUploadArea } from './FileUploadArea';
import { FileUploadCard } from './FileUploadCard';
import type { FileUploadAreaProps, FileUploadCardProps, FileInfo } from './FileUpload.types';

type FileUploadStoryProps = FileUploadAreaProps & FileUploadCardProps;

const meta: Meta<FileUploadStoryProps> = {
  title: 'DataEntry/FileUpload',
  component: FileUploadArea,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'object',
      description: '[FileUploadArea] 업로드 영역에 표시되는 커스텀 아이콘입니다. 기본 아이콘을 변경할 때 사용합니다',
      table: {
        type: {
          summary: 'IconTypeWithFill',
          detail: `IconType | [...IconType, boolean]`,
        },
        category: 'FileUploadArea',
      },
    },
    title: {
      control: 'text',
      description: '[FileUploadArea] 업로드 영역 상단에 표시되는 제목 텍스트입니다',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    clickText: {
      control: 'text',
      description: '[FileUploadArea] 제목 옆에 강조 색상으로 표시되는 클릭 유도 텍스트입니다',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    description: {
      control: 'text',
      description: '[FileUploadArea] 업로드 영역 하단에 표시되는 파일 제한 등의 안내 텍스트입니다',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    accept: {
      control: 'text',
      description: '[FileUploadArea] 업로드를 허용할 파일 타입입니다. "image/*"(이미지만), ".pdf"(PDF만) 등의 형식으로 지정합니다',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    maxFiles: {
      control: 'number',
      description: '[FileUploadArea] 한 번에 업로드할 수 있는 최대 파일 개수입니다',
      table: {
        type: { summary: 'number' },
        category: 'FileUploadArea',
      },
    },
    maxSize: {
      control: 'number',
      description: '[FileUploadArea] 업로드할 수 있는 파일의 최대 총 크기입니다. 바이트 단위로 지정합니다',
      table: {
        type: { summary: 'number' },
        category: 'FileUploadArea',
      },
    },
    multiple: {
      control: 'boolean',
      description: '[FileUploadArea] true로 설정하면 여러 파일을 동시에 선택할 수 있습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'FileUploadArea',
      },
    },
    disabled: {
      control: 'boolean',
      description: '[FileUploadArea] true로 설정하면 파일 업로드가 비활성화됩니다',
      table: {
        type: { summary: 'boolean' },
        category: 'FileUploadArea',
      },
    },
    error: {
      control: 'text',
      description: '[FileUploadArea] 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시',
      table: {
        type: { summary: 'boolean | string' },
        category: 'FileUploadArea',
      },
    },
    caption: {
      control: 'text',
      description: '[FileUploadArea] 업로드 영역 아래에 표시되는 도움말 텍스트입니다',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    width: {
      control: 'text',
      description: '[FileUploadArea] 업로드 영역의 너비를 설정합니다. 숫자는 px, 문자열은 그대로 적용됩니다',
      table: {
        type: { summary: 'string | number' },
        category: 'FileUploadArea',
      },
    },
    status: {
      control: 'select',
      options: ['uploading', 'uploaded', 'error'],
      description: '[FileUploadCard] 파일의 업로드 상태입니다. uploading(업로드 중), uploaded(완료), error(실패) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'FileUploadStatus' },
        category: 'FileUploadCard',
      },
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '[FileUploadCard] 업로드 진행률을 0~100 사이의 숫자로 표시합니다. status가 uploading일 때 사용됩니다',
      table: {
        type: { summary: 'number' },
        category: 'FileUploadCard',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '[FileUploadCard] 파일 카드의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'FileUploadCardSize' },
        category: 'FileUploadCard',
      },
    },
    errorMessage: {
      control: 'text',
      description: '[FileUploadCard] 업로드 실패 시 표시되는 에러 메시지입니다',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadCard',
      },
    },
    onFilesSelected: {
      action: 'filesSelected',
      description: '[FileUploadArea] 사용자가 파일을 선택하거나 드래그 앤 드롭했을 때 호출되는 함수입니다',
      table: {
        type: { summary: '(files: File[]) => void' },
        category: 'FileUploadArea',
      },
    },
    onRemove: {
      action: 'remove',
      description: '[FileUploadCard] 파일 삭제 버튼을 클릭했을 때 호출되는 함수입니다',
      table: {
        type: { summary: '() => void' },
        category: 'FileUploadCard',
      },
    },
    onRetry: {
      action: 'retry',
      description: '[FileUploadCard] 업로드 실패 후 재시도 버튼을 클릭했을 때 호출되는 함수입니다',
      table: {
        type: { summary: '() => void' },
        category: 'FileUploadCard',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadStoryProps>;

const mockFile: FileInfo = {
  name: 'example-document.pdf',
  size: 1572864,
  type: 'application/pdf',
};

const mockImageFile: FileInfo = {
  name: 'photo.jpg',
  size: 2457600,
  type: 'image/jpeg',
};

/**
 * FileUploadArea 기본 상태
 *
 * FileUploadArea 컴포넌트는 드래그 앤 드롭 또는 클릭으로 파일을 선택할 수 있습니다.
 */
export const Default: Story = {
  args: {
    title: '파일을 여기에 끌어놓거나',
    clickText: '클릭하여 선택',
    description: '최대 10개 파일, 총 100MB 제한',
    multiple: true,
    disabled: false,
    width: 320,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (args) => (
    <FileUploadArea
      title={args.title}
      clickText={args.clickText}
      description={args.description}
      accept={args.accept}
      maxFiles={args.maxFiles}
      maxSize={args.maxSize}
      multiple={args.multiple}
      disabled={args.disabled}
      error={args.error}
      caption={args.caption}
      width={args.width}
      onFilesSelected={args.onFilesSelected}
    />
  ),
};

/**
 * FileUploadArea 비활성화 상태
 */
export const AreaDisabled: Story = {
  render: () => <FileUploadArea disabled width={320} />,
};

/**
 * FileUploadArea 에러 상태
 */
export const AreaError: Story = {
  render: () => (
    <FileUploadArea
      error="지원하지 않는 파일 형식입니다. 이미지 또는 PDF만 업로드해주세요."
      width={320}
    />
  ),
};

/**
 * FileUploadArea 캡션 있는 상태
 */
export const AreaWithCaption: Story = {
  render: () => (
    <FileUploadArea
      caption="지원 형식: JPG, PNG, PDF. 최대 파일 크기: 10MB"
      width={320}
    />
  ),
};

/**
 * FileUploadArea 드래그 중 상태
 *
 * 실제 드래그 앤 드롭은 인터랙티브하게 테스트할 수 있습니다.
 */
export const AreaDragging: Story = {
  render: function Render() {
    const [isDragging, setIsDragging] = useState(false);

    return (
      <div className="flex flex-col ds-gap-16">
        <div className="font-body size-sm text-muted">
          {isDragging ? '파일을 놓으세요' : '파일을 드래그해서 확인하세요'}
        </div>
        <FileUploadArea
          width={320}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onFilesSelected={() => setIsDragging(false)}
        />
      </div>
    );
  },
};

/**
 * FileUploadCard - 업로드 완료 상태
 */
export const CardUploaded: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12 max-width-320">
      <FileUploadCard file={mockFile} status="uploaded" onRemove={() => {}} />
      <FileUploadCard file={mockImageFile} status="uploaded" onRemove={() => {}} />
    </div>
  ),
};

/**
 * FileUploadCard - 업로드 중 상태
 */
export const CardUploading: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12 max-width-320">
      <FileUploadCard file={mockFile} status="uploading" progress={45} onRemove={() => {}} />
      <FileUploadCard file={mockImageFile} status="uploading" progress={78} onRemove={() => {}} />
    </div>
  ),
};

/**
 * FileUploadCard - 에러 상태
 */
export const CardError: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12 max-width-320">
      <FileUploadCard file={mockFile} status="error" errorMessage="업로드에 실패했습니다" onRemove={() => {}} onRetry={() => {}} />
    </div>
  ),
};

/**
 * FileUploadCard - 크기 비교
 */
export const CardSizes: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16 max-width-320">
      <div className="flex flex-col ds-gap-4">
        <span className="font-body size-xs text-muted">Large (lg):</span>
        <FileUploadCard file={mockFile} status="uploaded" size="lg" onRemove={() => {}} />
      </div>
      <div className="flex flex-col ds-gap-4">
        <span className="font-body size-xs text-muted">Small (sm):</span>
        <FileUploadCard file={mockFile} status="uploaded" size="sm" onRemove={() => {}} />
      </div>
    </div>
  ),
};

/**
 * FileUploadCard - 이미지 썸네일
 */
export const CardWithThumbnail: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12 max-width-320">
      <FileUploadCard
        file={mockImageFile}
        thumbnail="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&h=100&fit=crop"
        status="uploaded"
        onRemove={() => {}}
      />
    </div>
  ),
};

/**
 * 전체 통합 예제
 *
 * FileUploadArea와 FileUploadCard를 함께 사용하는 예제입니다.
 */
export const FullIntegration: Story = {
  render: function Render() {
    const [files, setFiles] = useState<Array<{ file: FileInfo; status: 'uploading' | 'uploaded' | 'error'; progress: number }>>([
      { file: mockFile, status: 'uploaded', progress: 100 },
      { file: mockImageFile, status: 'uploading', progress: 65 },
    ]);

    const handleFilesSelected = useCallback((newFiles: File[]) => {
      const newFileEntries = newFiles.map((file) => ({
        file: { name: file.name, size: file.size, type: file.type },
        status: 'uploading' as const,
        progress: 0,
      }));
      setFiles((prev) => [...prev, ...newFileEntries]);
    }, []);

    const handleRemove = useCallback((index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    return (
      <div className="flex flex-col ds-gap-16 max-width-320">
        <FileUploadArea
          onFilesSelected={handleFilesSelected}
          accept="image/*,.pdf"
          maxFiles={10}
          maxSize={104857600}
        />
        {files.length > 0 && (
          <div className="flex flex-col ds-gap-8">
            {files.map((item, index) => (
              <FileUploadCard
                key={`${item.file.name}-${index}`}
                file={item.file}
                status={item.status}
                progress={item.progress}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * 모든 상태 비교
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24 max-width-320">
      <div className="flex flex-col ds-gap-8">
        <span className="font-body size-sm font-medium text-default">FileUploadArea States</span>
        <div className="flex flex-col ds-gap-12">
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">Default:</span>
            <FileUploadArea width={320} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">Disabled:</span>
            <FileUploadArea disabled width={320} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">Error:</span>
            <FileUploadArea error="지원하지 않는 파일 형식입니다" width={320} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">With Caption:</span>
            <FileUploadArea caption="지원 형식: JPG, PNG, PDF" width={320} />
          </div>
        </div>
      </div>
      <div className="flex flex-col ds-gap-8">
        <span className="font-body size-sm font-medium text-default">FileUploadCard States</span>
        <div className="flex flex-col ds-gap-12">
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">Uploading:</span>
            <FileUploadCard file={mockFile} status="uploading" progress={45} onRemove={() => {}} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">Uploaded:</span>
            <FileUploadCard file={mockFile} status="uploaded" onRemove={() => {}} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">Error:</span>
            <FileUploadCard file={mockFile} status="error" errorMessage="업로드에 실패했습니다" onRemove={() => {}} onRetry={() => {}} />
          </div>
        </div>
      </div>
    </div>
  ),
};
