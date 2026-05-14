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
      description: '[FileUploadArea] 커스텀 아이콘 (Remixicon `Ri*` component reference)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  icon={RiUploadCloud2Line}
  icon={RiFileAddLine}
  icon={RiFolderUploadFill}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
        },
        category: 'FileUploadArea',
      },
    },
    title: {
      control: 'text',
      description: '[FileUploadArea] 타이틀 텍스트',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    clickText: {
      control: 'text',
      description: '[FileUploadArea] 클릭 텍스트 (강조 색상)',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    description: {
      control: 'text',
      description: '[FileUploadArea] 설명 텍스트',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    accept: {
      control: 'text',
      description: '[FileUploadArea] 허용할 파일 타입 (e.g., "image/*,.pdf")',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    maxFiles: {
      control: 'number',
      description: '[FileUploadArea] 최대 파일 개수',
      table: {
        type: { summary: 'number' },
        category: 'FileUploadArea',
      },
    },
    maxSize: {
      control: 'number',
      description: '[FileUploadArea] 최대 총 크기 (바이트)',
      table: {
        type: { summary: 'number' },
        category: 'FileUploadArea',
      },
    },
    maxFileSize: {
      control: 'number',
      description: '[FileUploadArea] 개별 파일 최대 크기 (바이트). 이 크기를 초과하는 파일은 거부됩니다',
      table: {
        type: { summary: 'number' },
        category: 'FileUploadArea',
      },
    },
    multiple: {
      control: 'boolean',
      description: '[FileUploadArea] 다중 파일 선택 허용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'FileUploadArea',
      },
    },
    disabled: {
      control: 'boolean',
      description: '[FileUploadArea] 비활성화 여부',
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
      description: '[FileUploadArea] 입력 필드 아래에 표시되는 설명 텍스트',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadArea',
      },
    },
    compact: {
      control: 'boolean',
      description: '[FileUploadArea] 컴팩트 모드 — 패딩과 아이콘 크기를 줄여 높이를 축소',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'FileUploadArea',
      },
    },
    width: {
      control: 'text',
      description: '[FileUploadArea] 너비',
      table: {
        type: { summary: 'string | number' },
        category: 'FileUploadArea',
      },
    },
    status: {
      control: 'select',
      options: ['uploading', 'uploaded', 'error'],
      description: '[FileUploadCard] 상태',
      table: {
        type: { summary: 'FileUploadStatus' },
        category: 'FileUploadCard',
      },
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '[FileUploadCard] 업로드 진행률 (0-100)',
      table: {
        type: { summary: 'number' },
        category: 'FileUploadCard',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '[FileUploadCard] 크기',
      table: {
        type: { summary: 'FileUploadCardSize' },
        category: 'FileUploadCard',
      },
    },
    errorMessage: {
      control: 'text',
      description: '[FileUploadCard] 에러 메시지',
      table: {
        type: { summary: 'string' },
        category: 'FileUploadCard',
      },
    },
    onFilesSelected: {
      action: 'filesSelected',
      description: '[FileUploadArea] 파일 선택 시 호출되는 콜백',
      table: {
        type: { summary: '(files: File[]) => void' },
        category: 'FileUploadArea',
      },
    },
    onRemove: {
      action: 'remove',
      description: '[FileUploadCard] 삭제 시 호출되는 콜백',
      table: {
        type: { summary: '() => void' },
        category: 'FileUploadCard',
      },
    },
    onRetry: {
      action: 'retry',
      description: '[FileUploadCard] 재시도 시 호출되는 콜백',
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
    title: '파일을 여기에 놓거나',
    clickText: '클릭하여 찾아보기',
    description: '최대 10개 파일, 총 100MB 제한',
    multiple: true,
    disabled: false,
    compact: false,
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
      compact={args.compact}
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
 * FileUploadArea 컴팩트 모드
 *
 * `compact` prop으로 패딩과 아이콘 크기를 줄여 높이를 축소합니다.
 */
export const AreaCompact: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div className="flex flex-col ds-gap-4">
        <span className="font-body size-xs text-subtle">기본</span>
        <FileUploadArea width={320} />
      </div>
      <div className="flex flex-col ds-gap-4">
        <span className="font-body size-xs text-subtle">컴팩트</span>
        <FileUploadArea compact width={320} />
      </div>
    </div>
  ),
};

/**
 * FileUploadArea 에러 상태
 */
export const AreaError: Story = {
  render: () => (
    <FileUploadArea
      error="지원하지 않는 파일 형식입니다. 이미지 또는 PDF만 업로드하세요."
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
 * FileUploadCard — `hideSize` / optional `FileInfo.size`
 *
 * 메타 행에서 파일 크기를 숨기는 두 가지 방법을 보여줍니다.
 *
 * - **`hideSize`**: 크기 값이 있어도 명시적으로 숨김 (상품 결정으로 특정 화면에서는 크기를 감추고 싶을 때)
 * - **`file.size` 미지정`**: 서버에서 불러온 파일처럼 크기를 모를 때 자동으로 숨김 — `FileInfo.size` 는 v1.9.2 부터 optional
 * - **`hideFilename`**: 파일명 행 전체를 숨김. 썸네일·상태·액션만 남는 슬림 카드.
 *
 * 두 경우 모두 구분자(`|`)도 함께 사라지고 status 라벨(Uploaded 등)만 남습니다.
 */
export const CardHideSize: Story = {
  render: () => {
    const loadedFromServer: FileInfo = {
      name: 'photo-from-server.jpg',
      type: 'image/jpeg',
      // size intentionally omitted — auto-hides
    };
    return (
      <div className="flex flex-col ds-gap-12 max-width-320">
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">기본 (크기 표시):</span>
          <FileUploadCard file={mockImageFile} status="uploaded" onRemove={() => {}} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">hideSize (크기 있지만 숨김):</span>
          <FileUploadCard file={mockImageFile} status="uploaded" hideSize onRemove={() => {}} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">file.size 미지정 (자동 숨김):</span>
          <FileUploadCard file={loadedFromServer} status="uploaded" onRemove={() => {}} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">hideFilename (파일명 숨김):</span>
          <FileUploadCard file={mockImageFile} status="uploaded" hideFilename onRemove={() => {}} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">hideFilename + hideSize (상태만):</span>
          <FileUploadCard file={mockImageFile} status="uploaded" hideFilename hideSize onRemove={() => {}} />
        </div>
      </div>
    );
  },
};

/**
 * FileUploadCard — 썸네일 폭 가변 (이미지 원본 비율 기반)
 *
 * `thumbnail` 이 제공되면 썸네일 높이는 고정, 폭은 원본 이미지 비율에 따라
 * **1:1 (최소) ~ 1:3 (최대)** 범위에서 자동 조정됩니다. 3:1 보다 더 가로로 긴
 * 원본은 1:3 에서 `object-fit: cover` 로 가운데가 크롭되어 표시됩니다.
 */
export const CardThumbnailResponsive: Story = {
  render: () => {
    // 원본 비율이 다른 샘플 이미지 (picsum).
    const square = 'https://picsum.photos/seed/ds-square/200/200';
    const wide2to1 = 'https://picsum.photos/seed/ds-wide/400/200';
    const wide5to1 = 'https://picsum.photos/seed/ds-pano/1000/200';
    const portrait = 'https://picsum.photos/seed/ds-portrait/200/400';
    return (
      <div className="flex flex-col ds-gap-12 max-width-480">
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">1:1 원본 → 1:1 표시</span>
          <FileUploadCard file={mockImageFile} thumbnail={square} status="uploaded" onRemove={() => {}} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">2:1 원본 → 2:1 표시 (자연 비율)</span>
          <FileUploadCard file={mockImageFile} thumbnail={wide2to1} status="uploaded" onRemove={() => {}} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">5:1 원본 → 1:3 표시 (상한에서 크롭)</span>
          <FileUploadCard file={mockImageFile} thumbnail={wide5to1} status="uploaded" onRemove={() => {}} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="font-body size-xs text-muted">1:2 세로 원본 → 1:1 표시 (하한에서 크롭)</span>
          <FileUploadCard file={mockImageFile} thumbnail={portrait} status="uploaded" onRemove={() => {}} />
        </div>
      </div>
    );
  },
};

/**
 * FileUploadCard - 에러 상태
 */
export const CardError: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12 max-width-320">
      <FileUploadCard file={mockFile} status="error" errorMessage="업로드 실패" onRemove={() => {}} onRetry={() => {}} />
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
 * 개별 파일 크기 제한
 *
 * maxFileSize prop으로 개별 파일의 최대 크기를 제한합니다.
 * 초과 시 onValidationError 콜백이 호출됩니다.
 */
export const WithMaxFileSize: Story = {
  render: function Render() {
    const [errorMsg, setErrorMsg] = useState('');

    return (
      <div className="flex flex-col ds-gap-12">
        <FileUploadArea
          maxFileSize={5242880}
          description="개별 파일 최대 5MB"
          width={320}
          onFilesSelected={(files) => {
            setErrorMsg('');
            console.log('선택된 파일:', files);
          }}
          onValidationError={(errors) => {
            setErrorMsg(errors.map((e) => e.message).join(', '));
          }}
          error={errorMsg || undefined}
        />
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
        <span className="font-body size-sm font-medium text-default">파일 업로드 영역 상태</span>
        <div className="flex flex-col ds-gap-12">
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">기본:</span>
            <FileUploadArea width={320} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">비활성:</span>
            <FileUploadArea disabled width={320} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">오류:</span>
            <FileUploadArea error="지원하지 않는 파일 형식" width={320} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">캡션 있음:</span>
            <FileUploadArea caption="지원 형식: JPG, PNG, PDF" width={320} />
          </div>
        </div>
      </div>
      <div className="flex flex-col ds-gap-8">
        <span className="font-body size-sm font-medium text-default">파일 업로드 카드 상태</span>
        <div className="flex flex-col ds-gap-12">
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">업로드 중:</span>
            <FileUploadCard file={mockFile} status="uploading" progress={45} onRemove={() => {}} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">업로드 완료:</span>
            <FileUploadCard file={mockFile} status="uploaded" onRemove={() => {}} />
          </div>
          <div className="flex flex-col ds-gap-4">
            <span className="font-body size-xs text-muted">오류:</span>
            <FileUploadCard file={mockFile} status="error" errorMessage="업로드 실패" onRemove={() => {}} onRetry={() => {}} />
          </div>
        </div>
      </div>
    </div>
  ),
};
