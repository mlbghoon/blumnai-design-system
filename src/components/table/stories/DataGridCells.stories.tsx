import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';

import { useState } from 'react';

import { DataGrid } from '../DataGrid';
import { Input } from '../../input';
import { Switch } from '../../switch/Switch';
import { CellText } from '../cells/CellText';
import { CellBadge } from '../cells/CellBadge';
import { CellAvatar } from '../cells/CellAvatar';
import { CellProgress } from '../cells/CellProgress';
import { CellLink } from '../cells/CellLink';
import { CellIcon } from '../cells/CellIcon';
import { CellDate } from '../cells/CellDate';
import { CellDateRange } from '../cells/CellDateRange';
import type { IconTypeWithFill, IconColor } from '../../icons/Icon/Icon.types';

/**
 * DataGrid 셀 헬퍼 컴포넌트들입니다.
 *
 * 각 컴포넌트는 DataGrid의 `cell` 함수 내에서 사용할 수 있습니다.
 *
 * ```tsx
 * const columns: ColumnDef<User>[] = [
 *   {
 *     accessorKey: 'name',
 *     header: '이름',
 *     cell: ({ row }) => <CellAvatar name={row.original.name} />,
 *   },
 * ];
 * ```
 */
const meta: Meta = {
  title: 'DataDisplay/Table/DataGrid/Cells',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;

// ============================================
// Default
// ============================================

interface DefaultCellData {
  id: string;
  name: string;
  email: string;
  status: string;
}

const defaultCellData: DefaultCellData[] = [
  { id: '1', name: '홍길동', email: 'hong@example.com', status: 'active' },
  { id: '2', name: '김철수', email: 'kim@example.com', status: 'inactive' },
  { id: '3', name: '이영희', email: 'lee@example.com', status: 'active' },
];

/**
 * 기본 셀 예제
 *
 * 이 스토리에서 DataGrid 셀 컴포넌트의 기본 사용법을 확인할 수 있습니다.
 */
export const Default: StoryObj = {
  parameters: {
    controls: { disable: false },
  },
  render: function Render() {
    const columns: ColumnDef<DefaultCellData>[] = [
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => <CellText value={row.original.name} />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: ({ row }) => <CellText value={row.original.email} copyable />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.status === 'active' ? '활성' : '비활성'}
            color={row.original.status === 'active' ? 'green' : 'neutral'}
          />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={defaultCellData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellText
// ============================================

interface TextData {
  id: string;
  type: string;
  value: string | null;
}

const textData: TextData[] = [
  { id: '1', type: '기본', value: '홍길동' },
  { id: '2', type: '툴팁', value: '매우 긴 텍스트가 있는 경우 툴팁으로 전체 내용을 확인할 수 있습니다. 매우 긴 텍스트가 있는 경우 툴팁으로 전체 내용을 확인할 수 있습니다. 매우 긴 텍스트가 있는 경우 툴팁으로 전체 내용을 확인할 수 있습니다. 매우 긴 텍스트가 있는 경우 툴팁으로 전체 내용을 확인할 수 있습니다. 매우 긴 텍스트가 있는 경우 툴팁으로 전체 내용을 확인할 수 있습니다.' },
  { id: '3', type: '복사 가능', value: 'hong@example.com' },
  { id: '4', type: 'null 값', value: null },
];

/**
 * ## CellText
 *
 * 텍스트 셀 컴포넌트입니다. 툴팁과 복사 기능을 지원합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | value | `string \| number \| null` | - | 표시할 값 |
 * | tooltip | `boolean` | `false` | 툴팁 표시 여부 |
 * | copyable | `boolean` | `false` | 복사 기능 활성화 |
 * | className | `string` | - | 추가 CSS 클래스 |
 */
export const TextCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<TextData>[] = [
      {
        accessorKey: 'type',
        header: '유형',
        cell: ({ row }) => (
          <span className="font-body size-sm text-subtle">{row.original.type}</span>
        ),
        meta: { width: '100px' },
      },
      {
        accessorKey: 'value',
        header: '값',
        cell: ({ row }) => {
          const { type, value } = row.original;
          if (type === '툴팁') return <CellText value={value} tooltip />;
          if (type === '복사 가능') return <CellText value={value} copyable />;
          return <CellText value={value} />;
        },
        meta: { width: '1fr' },
      },
    ];

    return (
      <DataGrid
        data={textData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellBadge
// ============================================

interface BadgeData {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
}

const badgeData: BadgeData[] = [
  { id: '1', name: '홍길동', role: 'admin', status: 'active' },
  { id: '2', name: '김철수', role: 'editor', status: 'pending' },
  { id: '3', name: '이영희', role: 'viewer', status: 'inactive' },
];

const roleColorMap = {
  admin: 'blue',
  editor: 'violet',
  viewer: 'neutral',
} as const;

const statusColorMap = {
  active: 'green',
  pending: 'orange',
  inactive: 'neutral',
} as const;

/**
 * ## CellBadge
 *
 * 배지 셀 컴포넌트입니다. 상태나 카테고리를 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | label | `string` | - | 배지 텍스트 |
 * | color | `BadgeColor` | `'neutral'` | 배지 색상 |
 */
export const BadgeCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<BadgeData>[] = [
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => <CellText value={row.original.name} />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'role',
        header: '역할',
        cell: ({ row }) => (
          <CellBadge label={row.original.role} color={roleColorMap[row.original.role]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge label={row.original.status} color={statusColorMap[row.original.status]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={badgeData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellAvatar
// ============================================

interface AvatarData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

const avatarData: AvatarData[] = [
  { id: '1', name: '홍길동', email: 'hong@example.com', status: 'active' },
  { id: '2', name: '김철수', email: 'kim@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', status: 'active' },
  { id: '3', name: '이영희', email: 'lee@example.com', status: 'inactive' },
];

/**
 * ## CellAvatar
 *
 * 아바타 셀 컴포넌트입니다. 사용자 정보를 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | src | `string` | - | 이미지 URL |
 * | name | `string` | - | 사용자 이름 |
 * | initials | `string` | - | 이니셜 (미설정 시 이름에서 자동 생성) |
 * | size | `'xs' \| 'sm' \| 'md'` | `'sm'` | 아바타 크기 |
 * | showName | `boolean` | `true` | 이름 표시 여부 |
 */
export const AvatarCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<AvatarData>[] = [
      {
        accessorKey: 'name',
        header: '사용자',
        cell: ({ row }) => (
          <CellAvatar name={row.original.name} src={row.original.avatar} />
        ),
        meta: { width: '180px' },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: ({ row }) => <CellText value={row.original.email} />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.status}
            color={row.original.status === 'active' ? 'green' : 'neutral'}
          />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={avatarData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellProgress
// ============================================

interface ProgressData {
  id: string;
  task: string;
  progress: number;
  status: 'complete' | 'in-progress' | 'delayed';
}

const progressData: ProgressData[] = [
  { id: '1', task: '데이터 마이그레이션', progress: 100, status: 'complete' },
  { id: '2', task: 'API 연동', progress: 75, status: 'in-progress' },
  { id: '3', task: '테스트 코드 작성', progress: 45, status: 'in-progress' },
  { id: '4', task: '문서화', progress: 20, status: 'delayed' },
];

const progressStatusMap = {
  complete: { label: '완료', color: 'green' },
  'in-progress': { label: '진행중', color: 'blue' },
  delayed: { label: '지연', color: 'red' },
} as const;

/**
 * ## CellProgress
 *
 * 진행률 셀 컴포넌트입니다. 백분율 진행 상황을 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | value | `number` | - | 현재 값 |
 * | max | `number` | `100` | 최대 값 |
 * | showLabel | `boolean` | `true` | 퍼센트 라벨 표시 여부 |
 * | color | `'default' \| 'success' \| 'warning' \| 'destructive'` | `'default'` | 진행바 색상 |
 */
export const ProgressCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<ProgressData>[] = [
      {
        accessorKey: 'task',
        header: '작업',
        cell: ({ row }) => <CellText value={row.original.task} />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'progress',
        header: '진행률',
        cell: ({ row }) => {
          const { progress, status } = row.original;
          const color = status === 'complete' ? 'success' : status === 'delayed' ? 'destructive' : 'default';
          return <CellProgress value={progress} color={color} />;
        },
        meta: { width: '150px' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => {
          const statusInfo = progressStatusMap[row.original.status];
          return <CellBadge label={statusInfo.label} color={statusInfo.color} />;
        },
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={progressData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellLink
// ============================================

interface LinkData {
  id: string;
  project: string;
  url: string;
  label: string;
  external: boolean;
}

const linkData: LinkData[] = [
  { id: '1', project: '디자인 시스템', url: 'https://github.com', label: 'GitHub', external: true },
  { id: '2', project: '문서', url: '/docs', label: '문서 보기', external: false },
  { id: '3', project: 'API 레퍼런스', url: 'https://api.example.com/docs', label: 'API 문서', external: true },
];

/**
 * ## CellLink
 *
 * 링크 셀 컴포넌트입니다. 클릭 가능한 링크를 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | href | `string` | - | 링크 URL |
 * | label | `string` | - | 표시 텍스트 (미설정 시 href 표시) |
 * | external | `boolean` | `false` | 외부 링크 여부 (새 탭에서 열기) |
 * | className | `string` | - | 추가 CSS 클래스 |
 */
export const LinkCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<LinkData>[] = [
      {
        accessorKey: 'project',
        header: '프로젝트',
        cell: ({ row }) => <CellText value={row.original.project} />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'url',
        header: '저장소',
        cell: ({ row }) => (
          <CellLink
            href={row.original.url}
            label={row.original.label}
            external={row.original.external}
          />
        ),
        meta: { width: '180px' },
      },
      {
        accessorKey: 'external',
        header: '유형',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.external ? '외부' : '내부'}
            color={row.original.external ? 'blue' : 'neutral'}
          />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={linkData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellIcon
// ============================================

interface IconData {
  id: string;
  filename: string;
  fileType: 'pdf' | 'excel' | 'image' | 'word';
  status: 'complete' | 'pending' | 'failed' | 'processing';
}

const iconData: IconData[] = [
  { id: '1', filename: '보고서.pdf', fileType: 'pdf', status: 'complete' },
  { id: '2', filename: '데이터.xlsx', fileType: 'excel', status: 'pending' },
  { id: '3', filename: '이미지.png', fileType: 'image', status: 'failed' },
  { id: '4', filename: '메모.docx', fileType: 'word', status: 'processing' },
];

const fileTypeIconMap: Record<string, { icon: IconTypeWithFill; color: IconColor }> = {
  pdf: { icon: ['document', 'file-pdf'], color: 'destructive' },
  excel: { icon: ['document', 'file-excel'], color: 'success' },
  image: { icon: ['media', 'image'], color: 'informative' },
  word: { icon: ['document', 'file-word'], color: 'informative' },
};

const statusIconMap: Record<string, { icon: IconTypeWithFill; color: IconColor; label: string }> = {
  complete: { icon: ['system', 'check'], color: 'success', label: '완료' },
  pending: { icon: ['system', 'time'], color: 'warning', label: '대기중' },
  failed: { icon: ['system', 'close'], color: 'destructive', label: '실패' },
  processing: { icon: ['system', 'loader-2'], color: 'default-subtle', label: '처리중' },
};

/**
 * ## CellIcon
 *
 * 아이콘 셀 컴포넌트입니다. 상태나 유형을 아이콘으로 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | iconType | `IconType` | - | 아이콘 타입 (예: `['system', 'check']`) |
 * | size | `number` | `16` | 아이콘 크기 |
 * | color | `IconColor` | `'default'` | 아이콘 색상 |
 * | label | `string` | - | 아이콘 옆에 표시할 텍스트 |
 * | className | `string` | - | 추가 CSS 클래스 |
 */
export const IconCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<IconData>[] = [
      {
        accessorKey: 'filename',
        header: '파일명',
        cell: ({ row }) => <CellText value={row.original.filename} />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'fileType',
        header: '유형',
        cell: ({ row }) => {
          const { icon, color } = fileTypeIconMap[row.original.fileType];
          return <CellIcon iconType={icon} color={color} />;
        },
        meta: { width: '120px', align: 'center' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => {
          const { icon, color, label } = statusIconMap[row.original.status];
          return <CellIcon iconType={icon} color={color} label={label} />;
        },
        meta: { width: '120px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={iconData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellDate
// ============================================

interface DateData {
  id: string;
  format: string;
  date: Date | null;
}

const sampleDate = new Date('2024-03-15T14:30:00');

const dateData: DateData[] = [
  { id: '1', format: '날짜만', date: sampleDate },
  { id: '2', format: '날짜+시간', date: sampleDate },
  { id: '3', format: '시간만', date: sampleDate },
  { id: '4', format: 'null 값', date: null },
];

/**
 * ## CellDate
 *
 * 날짜 셀 컴포넌트입니다. Date 객체를 받아 지역화된 날짜 문자열로 표시합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | value | `Date \| string \| number \| null` | - | 날짜 값 |
 * | format | `'date' \| 'datetime' \| 'time'` | `'date'` | 날짜 형식 |
 * | locale | `'ko' \| 'en' \| 'ja' \| 'zh'` | `'ko'` | 지역화 설정 |
 * | className | `string` | - | 추가 CSS 클래스 |
 */
export const DateCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<DateData>[] = [
      {
        accessorKey: 'format',
        header: '형식',
        cell: ({ row }) => (
          <span className="font-body size-sm text-subtle">{row.original.format}</span>
        ),
        meta: { width: '100px' },
      },
      {
        accessorKey: 'date',
        header: '값',
        cell: ({ row }) => {
          const { format, date } = row.original;
          if (format === '날짜+시간') return <CellDate value={date} format="datetime" />;
          if (format === '시간만') return <CellDate value={date} format="time" />;
          return <CellDate value={date} format="date" />;
        },
        meta: { width: '1fr' },
      },
    ];

    return (
      <DataGrid
        data={dateData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// CellDateRange
// ============================================

interface DateRangeData {
  id: string;
  format: string;
  startDate: Date | null;
  endDate: Date | null;
}

const dateRangeData: DateRangeData[] = [
  { id: '1', format: '날짜 범위', startDate: new Date('2024-03-15'), endDate: new Date('2024-03-22') },
  { id: '2', format: '날짜+시간', startDate: new Date('2024-03-15T09:00:00'), endDate: new Date('2024-03-15T18:00:00') },
  { id: '3', format: '시작만', startDate: new Date('2024-03-15'), endDate: null },
  { id: '4', format: '종료만', startDate: null, endDate: new Date('2024-03-22') },
];

/**
 * ## CellDateRange
 *
 * 날짜 범위 셀 컴포넌트입니다. 시작일과 종료일을 받아 표시합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | startDate | `Date \| string \| number \| null` | - | 시작 날짜 |
 * | endDate | `Date \| string \| number \| null` | - | 종료 날짜 |
 * | format | `'date' \| 'datetime' \| 'time'` | `'date'` | 날짜 형식 |
 * | locale | `'ko' \| 'en' \| 'ja' \| 'zh'` | `'ko'` | 지역화 설정 |
 * | separator | `string` | `'~'` | 구분자 |
 * | className | `string` | - | 추가 CSS 클래스 |
 */
export const DateRangeCell: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<DateRangeData>[] = [
      {
        accessorKey: 'format',
        header: '형식',
        cell: ({ row }) => (
          <span className="font-body size-sm text-subtle">{row.original.format}</span>
        ),
        meta: { width: '100px' },
      },
      {
        accessorKey: 'startDate',
        header: '값',
        cell: ({ row }) => {
          const { format, startDate, endDate } = row.original;
          const dateFormat = format === '날짜+시간' ? 'datetime' : 'date';
          return <CellDateRange startDate={startDate} endDate={endDate} format={dateFormat} />;
        },
        meta: { width: '1fr' },
      },
    ];

    return (
      <DataGrid
        data={dateRangeData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// All Cells Combined
// ============================================

interface CombinedData {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  fileType: 'pdf' | 'excel' | 'image';
  progress: number;
  createdAt: Date;
}

const combinedData: CombinedData[] = [
  { id: '1', name: '홍길동', email: 'hong@example.com', role: 'admin', fileType: 'pdf', progress: 100, createdAt: new Date('2024-01-15') },
  { id: '2', name: '김철수', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kim', email: 'kim@example.com', role: 'editor', fileType: 'excel', progress: 75, createdAt: new Date('2024-02-20') },
  { id: '3', name: '이영희', email: 'lee@example.com', role: 'viewer', fileType: 'image', progress: 45, createdAt: new Date('2024-03-10') },
];

/**
 * ## 모든 셀 타입
 *
 * DataGrid에서 사용할 수 있는 모든 셀 헬퍼 컴포넌트를 한눈에 볼 수 있습니다.
 */
export const AllCells: StoryObj = {
  render: function Render() {
    const columns: ColumnDef<CombinedData>[] = [
      {
        accessorKey: 'name',
        header: '사용자',
        cell: ({ row }) => (
          <CellAvatar name={row.original.name} src={row.original.avatar} />
        ),
        meta: { width: '180px' },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: ({ row }) => <CellText value={row.original.email} copyable />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'role',
        header: '역할',
        cell: ({ row }) => (
          <CellBadge label={row.original.role} color={roleColorMap[row.original.role]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'fileType',
        header: '유형',
        cell: ({ row }) => {
          const { icon, color } = fileTypeIconMap[row.original.fileType];
          return <CellIcon iconType={icon} color={color} />;
        },
        meta: { width: '80px', align: 'center' },
      },
      {
        accessorKey: 'progress',
        header: '진행률',
        cell: ({ row }) => {
          const progress = row.original.progress;
          const color = progress >= 80 ? 'success' : progress >= 50 ? 'default' : 'warning';
          return <CellProgress value={progress} color={color} />;
        },
        meta: { width: '150px' },
      },
      {
        accessorKey: 'createdAt',
        header: '등록일',
        cell: ({ row }) => <CellDate value={row.original.createdAt} />,
        meta: { width: '120px' },
      },
      {
        id: 'action',
        header: '상세',
        cell: () => <CellLink href="#" label="보기" />,
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={combinedData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};

// ============================================
// Interactive Cells (Input, Switch)
// ============================================

interface InteractiveCellData {
  id: string;
  name: string;
  quantity: number;
  enabled: boolean;
}

/**
 * 인터랙티브 셀 (Input, Switch)
 *
 * DataGrid 셀 내에 Input, Switch 등 포커스 링이 있는 인터랙티브 컴포넌트를 배치한 예제입니다.
 * 포커스 링이 셀에 의해 잘리지 않는지 확인할 수 있습니다.
 */
export const InteractiveCells: StoryObj = {
  render: function Render() {
    const [data, setData] = useState<InteractiveCellData[]>([
      { id: '1', name: '상품 A', quantity: 10, enabled: true },
      { id: '2', name: '상품 B', quantity: 25, enabled: false },
      { id: '3', name: '상품 C', quantity: 0, enabled: true },
    ]);

    const columns: ColumnDef<InteractiveCellData>[] = [
      {
        accessorKey: 'name',
        header: '상품명',
        cell: ({ row }) => <CellText value={row.original.name} />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'quantity',
        header: '수량',
        cell: ({ row }) => (
          <Input
            size="xs"
            type="number"
            value={String(row.original.quantity)}
            onChange={(e) => {
              setData(prev =>
                prev.map(item =>
                  item.id === row.original.id
                    ? { ...item, quantity: Number(e.target.value) || 0 }
                    : item
                )
              );
            }}
          />
        ),
        meta: { width: '150px' },
      },
      {
        accessorKey: 'enabled',
        header: '활성화',
        cell: ({ row }) => (
          <Switch
            size="sm"
            checked={row.original.enabled}
            onCheckedChange={(checked) => {
              setData(prev =>
                prev.map(item =>
                  item.id === row.original.id
                    ? { ...item, enabled: !!checked }
                    : item
                )
              );
            }}
          />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
      />
    );
  },
};
