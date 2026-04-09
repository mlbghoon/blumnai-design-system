import { useEffect, type ReactNode } from 'react';
import {
  Tabs as TabsBase,
  TabsList as TabsListBase,
  TabsTrigger as TabsTriggerBase,
  Switch as SwitchBase,
  Button as ButtonBase,
  ButtonGroup as ButtonGroupBase,
  Input as InputBase,
  Select as SelectBase,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type SwitchProps,
  type ButtonProps,
  type ButtonGroupProps,
  type InputProps,
  type SelectProps,
} from '@blumnai-studio/blumnai-design-system';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// AI가 complex UI를 코딩할 때 조합 패턴을 참고하는 샘플 갤러리다.
type Theme = 'light' | 'dark';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TabsView = TabsBase as unknown as (props: TabsProps) => ReactNode;
const TabsListView = TabsListBase as unknown as (props: TabsListProps) => ReactNode;
const TabsTriggerView = TabsTriggerBase as unknown as (props: TabsTriggerProps) => ReactNode;
const SwitchView = SwitchBase as unknown as (props: SwitchProps) => ReactNode;
const ButtonView = ButtonBase as unknown as (props: ButtonProps) => ReactNode;
const ButtonGroupView = ButtonGroupBase as unknown as (props: ButtonGroupProps) => ReactNode;
const InputView = InputBase as unknown as (props: InputProps) => ReactNode;
const SelectView = SelectBase as unknown as (props: SelectProps) => ReactNode;

type MetricItem = {
  id: string;
  label: string;
  tone: 'default' | 'informative';
  fragments: Array<{
    text: string;
    emphasis?: boolean;
  }>;
};

type LegendItem = {
  id: string;
  label: string;
  value: string;
  colorClassName: string;
};

type TextVariant =
  | 'sectionTitle'
  | 'sectionDesc'
  | 'cardTitle'
  | 'period'
  | 'metricLabel'
  | 'metricValue'
  | 'metricValueInformative'
  | 'chartTitle'
  | 'legend';

const theme: Theme = 'light';

const metrics: MetricItem[] = [
  {
    id: 'closed',
    label: '총 종료 수',
    tone: 'informative',
    fragments: [
      { text: '1', emphasis: true },
      { text: '건' },
    ],
  },
  {
    id: 'charged',
    label: '총 과금 수',
    tone: 'default',
    fragments: [
      { text: '4554', emphasis: true },
      { text: '건' },
    ],
  },
  {
    id: 'average',
    label: '평균 상담 시간',
    tone: 'default',
    fragments: [
      { text: '60일 ', emphasis: true },
      { text: '00:00:26', emphasis: true },
    ],
  },
];

const channelLegend: LegendItem[] = [
  { id: 'happytalk', label: '해피톡', value: '1 (100%)', colorClassName: 'bg-state-primary' },
  { id: 'naver', label: '네이버톡톡', value: '0 (0%)', colorClassName: 'bg-basic-green-accent' },
  { id: 'kakao', label: '카카오톡', value: '0 (0%)', colorClassName: 'bg-yellow-300' },
];

const categoryLegend: LegendItem[] = [
  { id: 'product', label: '상품문의(샘플)', value: '1 (100%)', colorClassName: 'bg-state-primary' },
];

const textVariantClassName: Record<TextVariant, string> = {
  sectionTitle: 'font-body size-lg line-height-leading-7 font-semibold text-default',
  sectionDesc: 'font-body size-xs line-height-leading-4 font-normal text-muted',
  cardTitle: 'font-body size-md line-height-leading-6 font-semibold text-default',
  period: 'font-body size-xs line-height-leading-4 font-normal text-muted',
  metricLabel: 'font-body size-sm line-height-leading-5 font-medium text-subtle',
  metricValue: 'font-body size-2xl line-height-leading-8 text-default',
  metricValueInformative: 'font-body size-2xl line-height-leading-8 text-informative',
  chartTitle: 'font-body size-sm line-height-leading-5 font-medium text-subtle',
  legend: 'font-body size-xs line-height-leading-4 font-normal text-muted',
};

function Text({
  variant,
  children,
  className,
}: {
  variant: TextVariant;
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(textVariantClassName[variant], className)}>{children}</div>;
}

function MetricValue({
  fragments,
  tone,
  multiline = false,
}: {
  fragments: MetricItem['fragments'];
  tone: MetricItem['tone'];
  multiline?: boolean;
}) {
  return (
    <div
      className={cn(
        'text-center',
        tone === 'informative' ? textVariantClassName.metricValueInformative : textVariantClassName.metricValue,
      )}
    >
      {fragments.map((fragment, index) => (
        <span
          key={`${fragment.text}-${index}`}
          className={cn(
            fragment.emphasis ? 'font-semibold' : 'font-normal',
            multiline && 'block whitespace-pre-line',
          )}
        >
          {fragment.text}
        </span>
      ))}
    </div>
  );
}

function MetricCard({ item }: { item: MetricItem }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center ds-gap-16 self-stretch padding-16">
      <Text variant="metricLabel">{item.label}</Text>
      <MetricValue fragments={item.fragments} tone={item.tone} />
    </div>
  );
}

function LegendList({ items }: { items: LegendItem[] }) {
  return (
    <div className="flex w-full flex-col ds-gap-6">
      {items.map((item) => (
        <div key={item.id} className="flex items-center ds-gap-12">
          <div className={cn('h-3 w-3 shrink-0 rounded-radius-full', item.colorClassName)} />
          <Text variant="legend" className="flex-1">
            {item.label}
          </Text>
          <Text variant="legend" className="flex-1 text-right">
            {item.value}
          </Text>
        </div>
      ))}
    </div>
  );
}

function PieChart({
  background,
  children,
}: {
  background: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="relative h-[200px] w-[200px] shrink-0 rounded-radius-full"
      style={{
        background,
      }}
    >
      {children}
    </div>
  );
}

function ChartPanel({
  title,
  chart,
  legend,
}: {
  title: string;
  chart: React.ReactNode;
  legend: LegendItem[];
}) {
  return (
    <div className="flex flex-1 flex-col items-center ds-gap-16 self-stretch padding-16">
      <Text variant="chartTitle">{title}</Text>
      {chart}
      <div className="w-full">
        <LegendList items={legend} />
      </div>
    </div>
  );
}

type ContainerType = 'border' | 'clean' | 'card';

const containerClassName: Record<ContainerType, string> = {
  border: 'rounded-radius-lg border-default bg-default padding-16',
  clean: 'rounded-radius-lg bg-default padding-16',
  card: 'rounded-radius-lg bg-default padding-16 shadow-card',
};

function Skeleton({ className }: { className: string }) {
  return <div className={cn('rounded-radius-sm bg-muted', className)} />;
}

function SampleContent() {
  return (
    <div className="flex w-full flex-col ds-gap-16">
      <div className="flex ds-gap-12">
        <Skeleton className="h-[96px] w-[96px] shrink-0 rounded-radius-lg" />
        <div className="flex flex-1 flex-col ds-gap-6">
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-5/6" />
          <Skeleton className="h-[12px] w-2/3" />
          <Skeleton className="mt-auto h-[10px] w-1/4" />
        </div>
      </div>
      <div className="flex items-center ds-gap-8">
        <Skeleton className="h-[24px] w-[56px] rounded-radius-full" />
        <Skeleton className="h-[24px] w-[72px] rounded-radius-full" />
        <Skeleton className="h-[24px] w-[48px] rounded-radius-full" />
        <div className="flex-1" />
        <Skeleton className="h-[16px] w-[16px] rounded-radius-full" />
        <Skeleton className="h-[16px] w-[16px] rounded-radius-full" />
      </div>
    </div>
  );
}

function UISample() {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      return;
    }

    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <main className="min-h-screen bg-muted padding-16">
      <div className="mx-auto flex w-full max-w-[960px] flex-col ds-gap-8">

        {/* ── Contents / Charts ── */}
        <div className="flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">Contents / Charts</Text>
          <Text variant="sectionDesc">
            카드 내부를 수직으로 쌓는 기본 구조. 상단 Header(타이틀 + 부가정보, 양끝 정렬) → 중단 지표 영역(균등 분배) → Divider → 하단 시각화 영역. 지표와 시각화를 Divider로 분리해 2-tier 계층을 만든다.
          </Text>
        </div>

        <section className="flex w-full flex-col ds-gap-16 rounded-radius-lg border-default bg-default padding-16">
          <div className="flex items-start justify-between ds-gap-24">
            <Text variant="cardTitle">월간 상담 요약</Text>
            <Text variant="period">기간 : 2026-03-01 ~ 2026-03-31</Text>
          </div>

          <div className="flex items-start ds-gap-12">
            {metrics.map((item) => (
              <MetricCard key={item.id} item={item} />
            ))}
          </div>

          <div className="w-full border-t-default" />

          <div className="flex min-h-[374px] items-start ds-gap-12">
            <ChartPanel
              title="채널별 상담"
              chart={
                <PieChart background="conic-gradient(from 330deg, var(--bg-state-primary) 0deg 120deg, #fbe152 120deg 240deg, var(--bg-basic-green-accent) 240deg 360deg)">
                  <div className="absolute inset-0 rounded-radius-full border-default" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-default" />
                  <div className="absolute left-[100px] top-[100px] h-px w-[100px] origin-left -rotate-[30deg] bg-default" />
                  <div className="absolute left-[100px] top-[100px] h-px w-[100px] origin-left rotate-[210deg] bg-default" />
                </PieChart>
              }
              legend={channelLegend}
            />

            <ChartPanel
              title="대분류별 상담"
              chart={<PieChart background="linear-gradient(90deg, var(--bg-muted) 0 50%, var(--bg-state-primary) 50% 100%)" />}
              legend={categoryLegend}
            />
          </div>
        </section>

        {/* ── Contents / Infobox ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">Contents / Infobox</Text>
          <Text variant="sectionDesc">
            안내 블록. 음소거된 배경 위에 dot·텍스트 행을 수직 나열한다. 기본 행과 강조 행의 색상·두께 차이로 시각 위계를 만든다.
          </Text>
        </div>

        <div className="flex w-full flex-col ds-gap-2 rounded-radius-lg bg-subtle padding-16">
          <div className="flex items-center ds-gap-6">
            <div className="shrink-0 rounded-radius-full" style={{ width: 4, height: 4, background: 'var(--icon-default-muted)' }} />
            <div className="flex-1 font-body size-sm line-height-leading-5 font-normal text-subtle">채팅 화면에서 사용할 고객 등급 코드를 설정합니다.</div>
          </div>
          <div className="flex items-center ds-gap-6">
            <div className="shrink-0 rounded-radius-full" style={{ width: 4, height: 4, background: 'var(--icon-default-muted)' }} />
            <div className="flex-1 font-body size-sm line-height-leading-5 font-normal text-subtle">목록의 아이콘 클릭 시 등급 아이콘을 수정할 수 있습니다.</div>
          </div>
          <div className="flex items-center ds-gap-6">
            <div className="shrink-0 rounded-radius-full" style={{ width: 4, height: 4, background: 'var(--icon-default-muted)' }} />
            <div className="flex-1 font-body size-sm line-height-leading-5 font-medium text-informative">강조 설정 'ON'시 채팅 화면의 채팅 메시지 상단에 등급 아이콘이 표시됩니다.</div>
          </div>
        </div>

        {/* ── Contents / MultiBlock / 01 ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">Contents / MultiBlock / 01</Text>
          <Text variant="sectionDesc">
            단일 카드 안에 두 단계의 탭 내비게이션이 수직으로 쌓이는 복합 레이아웃. Header(타이틀 + 부가정보, 양끝 정렬) → 상위 탭(페이지 전환) → 하위 탭(필터) → Content 영역. 상위·하위 탭은 서로 다른 시각 스타일로 계층을 구분한다.
          </Text>
        </div>

        <section className="flex w-full flex-col ds-gap-16 rounded-radius-lg border-default bg-default padding-16">
          <div className="flex items-start justify-between ds-gap-24">
            <Text variant="cardTitle">월간 상담 요약</Text>
            <Text variant="period">기간 : 2026-03-01 ~ 2026-03-31</Text>
          </div>

          <TabsView defaultValue="tab1" className="w-full">
            <TabsListView variant="underline" size="sm" type="fixed">
              <TabsTriggerView value="tab1">근무 시간 관리</TabsTriggerView>
              <TabsTriggerView value="tab2">정보 조회 설정</TabsTriggerView>
              <TabsTriggerView value="tab3">상담 배분 설정</TabsTriggerView>
              <TabsTriggerView value="tab4">자동 응답 메시지</TabsTriggerView>
              <TabsTriggerView value="tab5">상담 통계 보기</TabsTriggerView>
              <TabsTriggerView value="tab6">상담 운영 설정</TabsTriggerView>
            </TabsListView>
          </TabsView>

          <TabsView defaultValue="sub1">
            <TabsListView variant="segmented" size="sm" className="rounded-sm">
              <TabsTriggerView value="sub1">Label</TabsTriggerView>
              <TabsTriggerView value="sub2">Label</TabsTriggerView>
              <TabsTriggerView value="sub3">Label</TabsTriggerView>
            </TabsListView>
          </TabsView>

          <SampleContent />
        </section>

        {/* ── Contents / MultiBlock / 02 ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">Contents / MultiBlock / 02</Text>
          <Text variant="sectionDesc">
            토글 컨트롤과 리스트 항목이 결합된 마스터-디테일 패턴. 상단(타이틀·설명 + 토글, 양끝 정렬) → Divider → 하단 리스트(아이콘 + 텍스트 블록 + 액션 슬롯). 상단 토글의 ON/OFF가 하위 리스트의 활성 상태를 제어한다.
          </Text>
        </div>

        <section className="flex w-full flex-col ds-gap-16 rounded-radius-lg border-default bg-default padding-16">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col ds-gap-4">
              <div className="font-body size-sm line-height-leading-5 font-semibold text-default">
                상담사 상담 종료 안내 메시지 및 종료 예고 설정
              </div>
              <div className="font-body size-xs line-height-leading-4 font-normal text-muted">
                상담사가 상담종료 시 종료 안내 메시지를 고객에게 전송 여부를 설정합니다.
              </div>
            </div>
            <SwitchView defaultChecked size="md" />
          </div>

          <div className="w-full border-t-default" />

          <div className="flex w-full flex-col ds-gap-12">
            <div className="flex items-center ds-gap-12">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-radius-md" style={{ background: 'linear-gradient(135deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%)' }}>
                <span className="font-body size-md font-semibold text-white-default">G</span>
              </div>
              <div className="flex flex-1 flex-col ds-gap-2">
                <div className="font-body size-sm line-height-leading-5 font-semibold text-default">Google Drive</div>
                <div className="font-body size-xs line-height-leading-4 font-normal text-muted">Upload Google Docs, Sheets, Slides and other files.</div>
              </div>
              <ButtonView buttonStyle="secondary" size="xs">Connected</ButtonView>
            </div>

            <div className="flex items-center ds-gap-12">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-radius-md bg-state-informative-soft">
                <span className="font-body size-md font-semibold text-informative">☁</span>
              </div>
              <div className="flex flex-1 flex-col ds-gap-2">
                <div className="font-body size-sm line-height-leading-5 font-semibold text-default">Microsoft OneDrive (personal)</div>
                <div className="font-body size-xs line-height-leading-4 font-normal text-muted">Upload Microsoft Word, Excel, PowerPoint and other files.</div>
              </div>
              <ButtonView buttonStyle="secondary" size="xs">Connect</ButtonView>
            </div>

            <div className="flex items-center ds-gap-12">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-radius-md bg-state-informative-soft">
                <span className="font-body size-md font-semibold text-informative">☁</span>
              </div>
              <div className="flex flex-1 flex-col ds-gap-2">
                <div className="font-body size-sm line-height-leading-5 font-semibold text-default">Microsoft OneDrive (work/school)</div>
                <div className="font-body size-xs line-height-leading-4 font-normal text-muted">Upload Microsoft Word, Excel, PowerPoint and other files, including those from SharePoint sites.</div>
              </div>
              <ButtonView buttonStyle="secondary" size="xs">Connect</ButtonView>
            </div>
          </div>
        </section>

        {/* ── ConsultationFilter / Complex ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">ConsultationFilter / Complex</Text>
          <Text variant="sectionDesc">
            복수 입력 행이 수직으로 쌓이는 필터 카드. 각 행은 좌측 라벨 + 입력 슬롯들로 구성되며, 라벨 너비는 텍스트 길이에 맞춘다. 기간 행은 입력 옆에 빠른 선택 버튼 그룹을 붙이고(공간 부족 시 wrap), 필드 그리드는 라벨 위에 입력을 둔다. 한 라벨 아래 두 개의 콤보박스를 묶는 그룹 패턴도 사용 가능. 그룹 사이는 Divider로 분리한다. 최종 액션(검색)은 키워드 행 우측 끝에 배치한다.
          </Text>
        </div>

        <section className="flex w-full flex-col ds-gap-16 rounded-radius-lg border-default bg-default padding-16">
          {/* 기간 행 */}
          <div className="flex items-start ds-gap-12">
            <div className="flex shrink-0 items-center ds-gap-8 padding-y-6 w-[140px]">
              <span className="font-body size-sm line-height-leading-5 font-medium text-default">조회기간</span>
              <span className="font-body size-xs line-height-leading-4 font-normal text-muted">최대 3개월</span>
            </div>
            <div className="flex flex-1 flex-wrap items-center ds-gap-8">
              <div className="w-[180px]">
                <InputView size="sm" placeholder="2024.01.01" />
              </div>
              <span className="font-body size-sm text-muted">~</span>
              <div className="w-[180px]">
                <InputView size="sm" placeholder="2024.03.31" />
              </div>
              <div className="flex flex-wrap items-center ds-gap-4">
                <ButtonView buttonStyle="soft" size="xs">오늘</ButtonView>
                <ButtonView buttonStyle="soft" size="xs">어제</ButtonView>
                <ButtonView buttonStyle="secondary" size="xs">1주일</ButtonView>
                <ButtonView buttonStyle="soft" size="xs">1개월</ButtonView>
                <ButtonView buttonStyle="soft" size="xs">3개월</ButtonView>
                <ButtonView buttonStyle="soft" size="xs">6개월</ButtonView>
                <ButtonView buttonStyle="soft" size="xs">1년</ButtonView>
              </div>
            </div>
          </div>

          <div className="w-full border-t-default" />

          {/* 필드 그리드 — 1개 라벨 + 2개 콤보박스 그룹 패턴 포함 */}
          <div className="grid w-full ds-gap-12" style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
            <SelectView size="sm" label="상담상태" placeholder="레이블" options={[{ id: 'a', label: '옵션 A' }, { id: 'b', label: '옵션 B' }]} />
            <SelectView size="sm" label="상담종료" placeholder="종료" disabled options={[{ id: 'a', label: '종료' }]} />
            <SelectView size="sm" label="종료 전 상태" placeholder="전체" disabled options={[{ id: 'a', label: '전체' }]} />
            <SelectView size="sm" label="상담채널" placeholder="레이블" options={[{ id: 'a', label: '옵션 A' }, { id: 'b', label: '옵션 B' }]} />

            {/* 콤보박스 그룹: 1 라벨 + 2 셀렉트 */}
            <div className="flex flex-col ds-gap-4" style={{ gridColumn: 'span 2' }}>
              <span className="font-body size-sm line-height-leading-5 font-medium text-default">상담사</span>
              <div className="flex items-center ds-gap-4">
                <div className="flex-1">
                  <SelectView size="sm" placeholder="레이블" options={[{ id: 'a', label: '옵션 A' }]} />
                </div>
                <div className="flex-1">
                  <SelectView size="sm" placeholder="레이블" options={[{ id: 'a', label: '옵션 A' }]} />
                </div>
              </div>
            </div>

            <SelectView size="sm" label="상담분류 (대)" placeholder="레이블" options={[{ id: 'a', label: '옵션 A' }, { id: 'b', label: '옵션 B' }]} />
            <SelectView size="sm" label="상담분류 (소)" placeholder="레이블" options={[{ id: 'a', label: '옵션 A' }, { id: 'b', label: '옵션 B' }]} />
          </div>

          <div className="w-full border-t-default" />

          {/* 키워드 검색 행 */}
          <div className="flex items-center ds-gap-12">
            <span className="shrink-0 font-body size-sm line-height-leading-5 font-medium text-default">키워드</span>
            <div className="flex flex-1 flex-wrap items-center ds-gap-8">
              <div className="w-[120px]">
                <SelectView size="sm" placeholder="방번호" options={[{ id: 'room', label: '방번호' }, { id: 'phone', label: '전화번호' }]} />
              </div>
              <div className="w-[220px]">
                <InputView size="sm" placeholder="123-456-7890" />
              </div>
              <div className="min-w-[200px] flex-1">
                <InputView size="sm" placeholder="검색어를 입력하세요" />
              </div>
            </div>
            <ButtonView buttonStyle="primary" size="sm">검색</ButtonView>
          </div>
        </section>

        {/* ── ConsultationFilter / Thin ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">ConsultationFilter / Thin</Text>
          <Text variant="sectionDesc">
            단일 행으로 압축된 필터 카드. 모든 필터 필드를 좌측 인라인 라벨 + 입력 슬롯 형태로 한 줄에 배치하고, 행 끝에 액션 버튼을 둔다. 조건이 적거나 부가 필터로 사용할 때의 압축 패턴.
          </Text>
        </div>

        <section className="flex w-full items-center ds-gap-12 rounded-radius-lg border-default bg-default padding-16">
          <div className="flex flex-1 items-center ds-gap-8">
            <span className="shrink-0 font-body size-sm line-height-leading-5 font-medium text-default">구분</span>
            <div className="flex-1">
              <SelectView size="sm" placeholder="레이블" options={[{ id: 'a', label: '옵션 A' }, { id: 'b', label: '옵션 B' }]} />
            </div>
          </div>
          <div className="flex flex-1 items-center ds-gap-8">
            <span className="shrink-0 font-body size-sm line-height-leading-5 font-medium text-default">인증여부</span>
            <div className="flex-1">
              <SelectView size="sm" placeholder="레이블" options={[{ id: 'y', label: '인증' }, { id: 'n', label: '미인증' }]} />
            </div>
          </div>
          <div className="flex flex-1 items-center ds-gap-8">
            <span className="shrink-0 font-body size-sm line-height-leading-5 font-medium text-default">키워드</span>
            <div className="w-[80px]">
              <SelectView size="sm" placeholder="US" options={[{ id: 'us', label: 'US' }, { id: 'kr', label: 'KR' }]} />
            </div>
            <div className="flex-1">
              <InputView size="sm" placeholder="123-456-7890" />
            </div>
          </div>
          <ButtonView buttonStyle="primary" size="sm">검색</ButtonView>
        </section>

        {/* ── UI-Pattern / Search-Option / Type="Button" ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">UI-Pattern / Search-Option / Type="Button"</Text>
          <Text variant="sectionDesc">
            개별 버튼이 일렬로 나열되는 빠른 선택 패턴. 버튼 사이는 균등한 gap으로 분리되며, 선택된 항목만 강조 스타일로 표시한다. 항목 수가 많거나 그룹 경계를 강조하지 않을 때 사용한다.
          </Text>
        </div>

        <section className="flex w-full items-center ds-gap-4 rounded-radius-lg border-default bg-default padding-16">
          <ButtonView buttonStyle="soft" size="sm">오늘</ButtonView>
          <ButtonView buttonStyle="soft" size="sm">어제</ButtonView>
          <ButtonView buttonStyle="secondary" size="sm">1주일</ButtonView>
          <ButtonView buttonStyle="soft" size="sm">1개월</ButtonView>
          <ButtonView buttonStyle="soft" size="sm">3개월</ButtonView>
          <ButtonView buttonStyle="soft" size="sm">6개월</ButtonView>
          <ButtonView buttonStyle="soft" size="sm">1년</ButtonView>
        </section>

        {/* ── UI-Pattern / Search-Option / Type="Button Groups" ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">UI-Pattern / Search-Option / Type="Button Groups"</Text>
          <Text variant="sectionDesc">
            버튼들이 하나의 컨테이너 안에 묶여 인접 경계를 공유하는 패턴. 시각적으로 한 덩어리로 인식되어 동일 카테고리의 옵션 묶음임을 명확히 드러낸다. 항목 수가 많고 상호 배타적 선택 관계일 때 사용한다.
          </Text>
        </div>

        <section className="flex w-full items-center rounded-radius-lg border-default bg-default padding-16">
          <ButtonGroupView
            size="sm"
            className="rounded-sm"
            items={[
              { id: 'today', label: '오늘' },
              { id: 'yesterday', label: '어제' },
              { id: 'week', label: '1주일' },
              { id: 'm1', label: '1개월' },
              { id: 'm3', label: '3개월' },
              { id: 'm6', label: '6개월' },
              { id: 'y1', label: '1년' },
            ]}
          />
        </section>

        {/* ── UI-Pattern / Search-Option / Type="Tabs" ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">UI-Pattern / Search-Option / Type="Tabs (세그먼트탭)"</Text>
          <Text variant="sectionDesc">
            세그먼트 탭으로 옵션을 표현하는 패턴. 선택 강조가 가장 강하고 컨텐츠 전환 메타포를 가진다. ConsultationFilter처럼 복잡한 컨텍스트에서는 3개 초과 시 비권장(Button Groups로 대체). 단독·간단한 컨텍스트에서는 항목 수 제약이 느슨하다.
          </Text>
        </div>

        <section className="flex w-full items-center rounded-radius-lg border-default bg-default padding-16">
          <TabsView defaultValue="t1">
            <TabsListView variant="segmented" size="sm" className="rounded-sm">
              <TabsTriggerView value="t1">Label</TabsTriggerView>
              <TabsTriggerView value="t2">Label</TabsTriggerView>
              <TabsTriggerView value="t3">Label</TabsTriggerView>
            </TabsListView>
          </TabsView>
        </section>

        {/* ── UI-Style / Container Type ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">UI-Style / Container Type</Text>
          <Text variant="sectionDesc">
            카드 컨테이너의 스타일 변주. border(테두리), clean(면만), card(그림자). 동일한 콘텐츠를 담되 외곽 스타일만 변경해 시각 무게감을 조절한다.
          </Text>
        </div>

        <div className="flex w-full flex-col ds-gap-8">
          <Text variant="period">Container Type="border"</Text>
          <div className={containerClassName.border}>
            <SampleContent />
          </div>

          <Text variant="period">Container Type="clean"</Text>
          <div className={containerClassName.clean}>
            <SampleContent />
          </div>

          <Text variant="period">Container Type="card"</Text>
          <div className={containerClassName.card}>
            <SampleContent />
          </div>
        </div>

        {/* ── Codex Freeform Sample ── */}
        <div className="mt-[48px] flex flex-col ds-gap-4 padding-y-8">
          <Text variant="sectionTitle">Codex가 자유롭게 만들어본 화면 ㅋㅋ</Text>
          <Text variant="sectionDesc">
            DS 지침들과 이 페이지 안의 샘플 케이스들을 바탕으로, Codex가 PRD 없이 자유롭게 만들어본 화면입니다 ㅋㅋ 그래도 상단 요약, 필터 툴바, 좌측 대기열, 우측 상세 패널, 하단 액션 바까지 한 흐름으로 묶어서 complex UI 참고용으로 볼 수 있게 구성했습니다.
          </Text>
        </div>

        <section className="flex w-full flex-col ds-gap-16 rounded-radius-lg border-default bg-default padding-16">
          <div className="flex items-start justify-between ds-gap-24">
            <div className="flex flex-col ds-gap-4">
              <Text variant="cardTitle">자동 분류 검수 작업대</Text>
              <div className="flex flex-wrap items-center ds-gap-12">
                <span className="font-body size-xs line-height-leading-4 font-normal text-muted">대기 12건</span>
                <span className="font-body size-xs line-height-leading-4 font-medium text-warning">검토 필요 3건</span>
                <span className="font-body size-xs line-height-leading-4 font-medium text-success">적용 완료 24건</span>
              </div>
            </div>

            <div className="flex items-center ds-gap-8">
              <span className="font-body size-sm line-height-leading-5 font-medium text-subtle">자동 적용</span>
              <SwitchView defaultChecked size="md" />
            </div>
          </div>

          <div className="w-full border-t-default" />

          <div className="flex w-full flex-wrap items-end ds-gap-12">
            <div className="min-w-[280px] flex-1">
              <TabsView defaultValue="pending" className="w-full">
                <TabsListView variant="segmented" size="sm" className="rounded-sm" type="fixed">
                  <TabsTriggerView value="pending">대기중</TabsTriggerView>
                  <TabsTriggerView value="review">검토 필요</TabsTriggerView>
                  <TabsTriggerView value="done">적용 완료</TabsTriggerView>
                </TabsListView>
              </TabsView>
            </div>

            <div className="w-[160px]">
              <SelectView
                size="sm"
                placeholder="우선순위"
                options={[
                  { id: 'all', label: '전체' },
                  { id: 'high', label: '높음 우선' },
                  { id: 'latest', label: '최신순' },
                ]}
              />
            </div>

            <div className="min-w-[240px] flex-1">
              <InputView size="sm" placeholder="고객명, 방번호, 키워드 검색" />
            </div>

            <ButtonView buttonStyle="secondary" size="sm">초기화</ButtonView>
          </div>

          <div className="grid w-full ds-gap-12" style={{ gridTemplateColumns: '320px minmax(0, 1fr)' }}>
            <div className="flex flex-col ds-gap-8 rounded-radius-md bg-subtle padding-12">
              <div className="flex items-center justify-between">
                <span className="font-body size-sm line-height-leading-5 font-semibold text-default">대기열</span>
                <span className="font-body size-xs line-height-leading-4 font-normal text-muted">3 / 12 선택됨</span>
              </div>

              <div className="flex flex-col ds-gap-8">
                <div className="flex flex-col ds-gap-6 rounded-radius-md border-default bg-default padding-12">
                  <div className="flex items-start justify-between ds-gap-12">
                    <div className="flex flex-col ds-gap-2">
                      <span className="font-body size-sm line-height-leading-5 font-semibold text-default">#240331-1382 상품문의</span>
                      <span className="font-body size-xs line-height-leading-4 font-normal text-muted">고객: 김하늘 · 3분 전</span>
                    </div>
                    <span className="font-body size-xs line-height-leading-4 font-medium text-warning">검토 필요</span>
                  </div>
                  <span className="font-body size-sm line-height-leading-5 font-normal text-subtle">
                    배송지 변경 요청과 상품 옵션 문의가 함께 포함되어 있어 분류 충돌 가능성이 있습니다.
                  </span>
                </div>

                <div className="flex flex-col ds-gap-6 rounded-radius-md bg-default padding-12">
                  <div className="flex items-start justify-between ds-gap-12">
                    <div className="flex flex-col ds-gap-2">
                      <span className="font-body size-sm line-height-leading-5 font-semibold text-default">#240331-1379 결제문의</span>
                      <span className="font-body size-xs line-height-leading-4 font-normal text-muted">고객: 이서준 · 12분 전</span>
                    </div>
                    <span className="font-body size-xs line-height-leading-4 font-medium text-informative">자동 추천</span>
                  </div>
                  <span className="font-body size-sm line-height-leading-5 font-normal text-subtle">
                    무통장 입금 확인 지연 관련 문의로 감지되었습니다.
                  </span>
                </div>

                <div className="flex flex-col ds-gap-6 rounded-radius-md bg-default padding-12">
                  <div className="flex items-start justify-between ds-gap-12">
                    <div className="flex flex-col ds-gap-2">
                      <span className="font-body size-sm line-height-leading-5 font-semibold text-default">#240331-1375 취소/환불</span>
                      <span className="font-body size-xs line-height-leading-4 font-normal text-muted">고객: 박민지 · 18분 전</span>
                    </div>
                    <span className="font-body size-xs line-height-leading-4 font-medium text-success">적용 가능</span>
                  </div>
                  <span className="font-body size-sm line-height-leading-5 font-normal text-subtle">
                    주문 취소 의도가 명확하고 추가 문맥이 적어 자동 적용 후보입니다.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col ds-gap-12 rounded-radius-md border-default bg-default padding-12">
              <div className="flex items-start justify-between ds-gap-12">
                <div className="flex flex-col ds-gap-2">
                  <span className="font-body size-md line-height-leading-6 font-semibold text-default">상세 검수</span>
                  <span className="font-body size-xs line-height-leading-4 font-normal text-muted">
                    선택한 대화의 추천 분류를 검토하고 수정한 뒤 적용합니다.
                  </span>
                </div>

                <ButtonView buttonStyle="soft" size="xs">원문 보기</ButtonView>
              </div>

              <div className="grid w-full ds-gap-12" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                <SelectView
                  size="sm"
                  label="추천 대분류"
                  placeholder="상품문의"
                  options={[
                    { id: 'product', label: '상품문의' },
                    { id: 'delivery', label: '배송문의' },
                    { id: 'refund', label: '취소/환불' },
                  ]}
                />
                <SelectView
                  size="sm"
                  label="추천 소분류"
                  placeholder="옵션 변경"
                  options={[
                    { id: 'option', label: '옵션 변경' },
                    { id: 'address', label: '배송지 변경' },
                    { id: 'payment', label: '결제 확인' },
                  ]}
                />
                <InputView size="sm" label="추천 키워드" value="배송지 변경, 옵션 문의" readOnly />
                <InputView size="sm" label="담당자 메모" placeholder="검수 판단 근거를 입력하세요" />
              </div>

              <div className="flex flex-col ds-gap-8 rounded-radius-md bg-subtle padding-12">
                <span className="font-body size-sm line-height-leading-5 font-semibold text-default">AI 요약</span>
                <span className="font-body size-sm line-height-leading-5 font-normal text-subtle">
                  고객은 기본적으로 상품 옵션 변경을 요청하고 있으나, 동일 대화 안에서 배송지 수정 의사도 함께 표현했습니다. 단일 분류로 자동 적용하기보다 담당자 검수가 필요한 케이스입니다.
                </span>
              </div>

              <div className="flex flex-col ds-gap-8 rounded-radius-md border-default bg-default padding-12">
                <span className="font-body size-sm line-height-leading-5 font-semibold text-default">원문 미리보기</span>
                <div className="flex flex-col ds-gap-6">
                  <div className="max-w-[85%] rounded-radius-lg bg-subtle padding-12">
                    <span className="font-body size-sm line-height-leading-5 font-normal text-default">
                      어제 주문한 상품 옵션을 바꾸고 싶은데요. 배송 시작 전이면 주소도 같이 변경 가능한가요?
                    </span>
                  </div>
                  <div className="max-w-[85%] self-end rounded-radius-lg border-default bg-default padding-12">
                    <span className="font-body size-sm line-height-leading-5 font-normal text-default">
                      현재 기준으로는 옵션 변경과 배송지 변경 요청이 함께 확인됩니다. 담당자 확인 후 처리 방향을 안내드릴게요.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-radius-md bg-subtle padding-12">
                <div className="flex flex-col ds-gap-2">
                  <span className="font-body size-sm line-height-leading-5 font-medium text-default">적용 메모</span>
                  <span className="font-body size-xs line-height-leading-4 font-normal text-muted">
                    같은 패턴의 대화 18건에 재사용될 수 있으므로 분류 확정 시 후속 자동화에 반영됩니다.
                  </span>
                </div>

                <div className="flex items-center ds-gap-8">
                  <ButtonView buttonStyle="secondary" size="sm">보류</ButtonView>
                  <ButtonView buttonStyle="primary" size="sm">분류 적용</ButtonView>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default UISample;
