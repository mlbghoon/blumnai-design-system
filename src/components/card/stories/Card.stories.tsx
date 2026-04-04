import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../Card';
import { Button } from '../../button/Button';
import { Input } from '../../input/Input';

const meta: Meta<typeof Card> = {
  title: 'DataDisplay/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
      description: '카드의 시각적 스타일을 설정합니다. default(그림자+테두리), outline(테두리만), ghost(배경만) 중 선택할 수 있습니다',
      table: {
        type: { summary: "'default' | 'outline' | 'ghost'" },
        defaultValue: { summary: 'default' },
      },
    },
    interactive: {
      control: 'boolean',
      description: '인터랙티브 카드로 설정합니다. 클릭 가능하며 role="button", tabIndex, 키보드(Enter/Space) 지원이 추가됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '카드 클릭 시 호출되는 콜백 함수입니다. interactive가 true일 때 사용합니다',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * 기본 카드
 *
 * 콘텐츠를 그룹화하는 컨테이너입니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  args: {
    variant: 'default',
    interactive: false,
    onClick: () => {},
  },
  render: function Render(args) {
    return (
      <Card
        className="w-[350px]"
        variant={args.variant}
        interactive={args.interactive}
        onClick={args.onClick}
      >
        <CardHeader>
          <CardTitle>카드 제목</CardTitle>
          <CardDescription>카드에 대한 간단한 설명입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="size-sm font-body line-height-leading-5">
            카드 콘텐츠가 여기에 들어갑니다.
          </p>
        </CardContent>
        <CardFooter>
          <Button buttonStyle="primary" size="sm">
            액션
          </Button>
        </CardFooter>
      </Card>
    );
  },
};

/**
 * 카드 변형
 *
 * variant prop으로 다양한 스타일을 적용할 수 있습니다.
 */
export const Variants: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-16">
        <Card className="w-[200px]" variant="default">
          <CardHeader>
            <CardTitle>기본형</CardTitle>
            <CardDescription>기본 스타일</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-[200px]" variant="outline">
          <CardHeader>
            <CardTitle>외곽선</CardTitle>
            <CardDescription>테두리만</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-[200px]" variant="ghost">
          <CardHeader>
            <CardTitle>고스트</CardTitle>
            <CardDescription>배경만</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  },
};

/**
 * 로그인 폼 카드
 */
export const LoginForm: Story = {
  render: function Render() {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>계정에 로그인하세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col ds-gap-16">
          <Input variant="default" label="이메일" placeholder="name@example.com" />
          <Input variant="password" label="비밀번호" placeholder="비밀번호 입력" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button buttonStyle="ghost" size="sm">
            비밀번호 찾기
          </Button>
          <Button buttonStyle="primary" size="sm">
            로그인
          </Button>
        </CardFooter>
      </Card>
    );
  },
};

/**
 * 알림 카드
 */
export const NotificationCard: Story = {
  render: function Render() {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>알림</CardTitle>
          <CardDescription>읽지 않은 알림 3개가 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col ds-gap-12">
          {[
            { title: '새 메시지', desc: '홍길동님이 메시지를 보냈습니다.', time: '5분 전' },
            { title: '시스템 알림', desc: '시스템이 업데이트되었습니다.', time: '1시간 전' },
            { title: '팔로우', desc: '김철수님이 팔로우했습니다.', time: '2시간 전' },
          ].map((item, i) => (
            <div key={i} className="flex items-start ds-gap-12 padding-12 rounded-md bg-muted/30">
              <div className="width-8 height-8 rounded-full bg-state-primary margin-t-4" />
              <div className="flex-1">
                <p className="size-sm font-body font-medium line-height-leading-5">
                  {item.title}
                </p>
                <p className="size-xs font-body text-muted line-height-leading-4">
                  {item.desc}
                </p>
              </div>
              <span className="size-xs font-body text-muted">{item.time}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button buttonStyle="secondary" size="sm" fullWidth>
            모두 읽음으로 표시
          </Button>
        </CardFooter>
      </Card>
    );
  },
};

/**
 * 통계 카드
 */
export const StatsCard: Story = {
  render: function Render() {
    return (
      <div className="grid grid-cols-3 ds-gap-16">
        <Card>
          <CardHeader className="padding-16">
            <CardDescription>총 사용자</CardDescription>
            <CardTitle className="size-2xl">12,345</CardTitle>
          </CardHeader>
          <CardContent className="padding-16 [padding-top:0]">
            <p className="size-xs font-body text-state-success">
              +12% 지난 달 대비
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="padding-16">
            <CardDescription>활성 세션</CardDescription>
            <CardTitle className="size-2xl">1,234</CardTitle>
          </CardHeader>
          <CardContent className="padding-16 [padding-top:0]">
            <p className="size-xs font-body text-state-success">
              +5% 지난 주 대비
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="padding-16">
            <CardDescription>전환율</CardDescription>
            <CardTitle className="size-2xl">3.2%</CardTitle>
          </CardHeader>
          <CardContent className="padding-16 [padding-top:0]">
            <p className="size-xs font-body text-state-destructive">
              -0.5% 지난 달 대비
            </p>
          </CardContent>
        </Card>
      </div>
    );
  },
};

/**
 * 이미지 카드
 */
export const ImageCard: Story = {
  render: function Render() {
    return (
      <Card className="w-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop"
          alt="코드"
          className="w-full [height:160px] object-cover"
        />
        <CardHeader>
          <CardTitle>프로젝트 템플릿</CardTitle>
          <CardDescription>
            React와 TypeScript로 구성된 스타터 템플릿입니다.
          </CardDescription>
        </CardHeader>
        <CardFooter className="ds-gap-8">
          <Button buttonStyle="primary" size="sm">
            사용하기
          </Button>
          <Button buttonStyle="secondary" size="sm">
            미리보기
          </Button>
        </CardFooter>
      </Card>
    );
  },
};
