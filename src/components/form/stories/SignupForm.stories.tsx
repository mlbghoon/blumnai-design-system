import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormControl, FormError } from '../index';
import { Input } from '../../input/Input';
import { Button } from '../../button/Button';
import { LinkButton } from '../../button/LinkButton';
import { Checkbox } from '../../checkbox/Checkbox';
import { Divider } from '../../divider';
import type { FormProps } from '../Form.types';

const meta: Meta<FormProps> = {
  title: 'DataEntry/Form/SignupForm',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component: `
회원가입 폼의 다양한 레이아웃 예제입니다.

- **SingleColumn**: 기본적인 단일 컬럼 회원가입 폼
- **WithSocialLogin**: 소셜 로그인 버튼이 포함된 회원가입 폼
- **Minimal**: 이메일과 비밀번호만 있는 미니멀 회원가입 폼
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<FormProps>;

// ============================================================================
// SINGLE COLUMN SIGNUP FORM
// ============================================================================

const singleColumnSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
    email: z.string().email('유효한 이메일을 입력해주세요'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, '이용약관에 동의해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SingleColumnFormValues = z.infer<typeof singleColumnSchema>;

/**
 * 단일 컬럼 회원가입 폼
 *
 * 이름, 이메일, 비밀번호, 비밀번호 확인, 이용약관 동의를 포함한 기본 회원가입 폼입니다.
 * 비밀번호 강도 표시를 통해 사용자에게 피드백을 제공합니다.
 */
export const SingleColumn: Story = {
  render: function Render() {
    const form = useForm<SingleColumnFormValues>({
      resolver: zodResolver(singleColumnSchema),
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      },
    });

    const onSubmit = (values: SingleColumnFormValues) => {
      console.log('Signup submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-md">
        <h2 className="font-headline size-2xl font-bold text-default">회원가입</h2>
        <p className="size-sm text-subtle">계정을 만들어 서비스를 시작하세요.</p>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormControl>
              <Input
                variant="default"
                label="이름"
                placeholder="홍길동"
                required
                {...field}
              />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormControl>
              <Input
                variant="default"
                label="이메일"
                placeholder="example@email.com"
                required
                {...field}
              />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormControl>
              <Input
                variant="password"
                label="비밀번호"
                placeholder="8자 이상 입력하세요"
                required
                showStrength
                autoCalculateStrength
                {...field}
              />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormControl>
              <Input
                variant="password"
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력하세요"
                required
                {...field}
              />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  label="이용약관에 동의합니다"
                  description="서비스 이용약관 및 개인정보처리방침에 동의합니다."
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          buttonStyle="primary"
          size="lg"
          fullWidth
          loading={form.formState.isSubmitting}
        >
          가입하기
        </Button>
      </Form>
    );
  },
};

// ============================================================================
// WITH SOCIAL LOGIN SIGNUP FORM
// ============================================================================

const socialLoginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

type SocialLoginFormValues = z.infer<typeof socialLoginSchema>;

/**
 * 소셜 로그인 포함 회원가입 폼
 *
 * Google, GitHub, Apple 소셜 로그인 버튼과 이메일 회원가입 폼을
 * Divider로 구분한 레이아웃입니다.
 */
export const WithSocialLogin: Story = {
  render: function Render() {
    const form = useForm<SocialLoginFormValues>({
      resolver: zodResolver(socialLoginSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });

    const onSubmit = (values: SocialLoginFormValues) => {
      console.log('Signup submitted:', values);
    };

    return (
      <div className="flex ds-gap-32 max-w-3xl">
        {/* 소셜 로그인 */}
        <div className="flex flex-col ds-gap-16 flex-1">
          <h2 className="font-headline size-2xl font-bold text-default">회원가입</h2>
          <p className="size-sm text-subtle">소셜 계정으로 간편하게 시작하세요.</p>

          <div className="flex flex-col ds-gap-12">
            <Button buttonStyle="secondary" size="lg" fullWidth>
              Google로 계속하기
            </Button>
            <Button buttonStyle="secondary" size="lg" fullWidth>
              GitHub로 계속하기
            </Button>
            <Button buttonStyle="secondary" size="lg" fullWidth>
              Apple로 계속하기
            </Button>
          </div>
        </div>

        {/* 구분선 영역 */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-px bg-muted flex-1" />
          <span className="font-body size-sm text-muted padding-y-8">또는</span>
          <div className="w-px bg-muted flex-1" />
        </div>

        {/* 이메일 회원가입 */}
        <div className="flex-1">
          <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16">
            <h3 className="font-headline size-lg font-bold text-default">이메일로 가입</h3>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormControl>
                  <Input
                    variant="default"
                    label="이메일"
                    placeholder="example@email.com"
                    required
                    {...field}
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormControl>
                  <Input
                    variant="password"
                    label="비밀번호"
                    placeholder="8자 이상 입력하세요"
                    required
                    showStrength
                    autoCalculateStrength
                    {...field}
                  />
                </FormControl>
              )}
            />

            <Button
              type="submit"
              buttonStyle="primary"
              size="lg"
              fullWidth
              loading={form.formState.isSubmitting}
            >
              이메일로 가입하기
            </Button>
          </Form>
        </div>
      </div>
    );
  },
};

// ============================================================================
// MINIMAL SIGNUP FORM
// ============================================================================

const minimalSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

type MinimalFormValues = z.infer<typeof minimalSchema>;

/**
 * 미니멀 회원가입 폼
 *
 * 이메일과 비밀번호만 있는 가장 간단한 형태의 회원가입 폼입니다.
 * 하단에 로그인 페이지로의 링크를 제공합니다.
 */
export const Minimal: Story = {
  render: function Render() {
    const form = useForm<MinimalFormValues>({
      resolver: zodResolver(minimalSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });

    const onSubmit = (values: MinimalFormValues) => {
      console.log('Signup submitted:', values);
    };

    return (
      <div className="flex flex-col items-center ds-gap-24 max-w-xs mx-auto">
        <div className="flex flex-col items-center ds-gap-4">
          <h2 className="font-headline size-2xl font-bold text-default">시작하기</h2>
          <p className="size-sm text-subtle">이메일로 간편하게 가입하세요.</p>
        </div>

        <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl>
                <Input
                  variant="default"
                  label="이메일"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormControl>
                <Input
                  variant="password"
                  label="비밀번호"
                  placeholder="8자 이상 입력하세요"
                  {...field}
                />
              </FormControl>
            )}
          />

          <Button
            type="submit"
            buttonStyle="primary"
            size="lg"
            fullWidth
            loading={form.formState.isSubmitting}
          >
            가입하기
          </Button>
        </Form>

        <Divider type="default" />

        <p className="size-sm text-subtle font-body">
          이미 계정이 있으신가요?{' '}
          <LinkButton label="로그인" size="sm" />
        </p>
      </div>
    );
  },
};
