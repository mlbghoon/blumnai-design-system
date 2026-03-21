import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormControl, FormDescription, FormError } from '../index';
import { Input } from '../../input/Input';
import { Textarea } from '../../textarea/Textarea';
import { Select } from '../../select/Select';
import { Checkbox } from '../../checkbox/Checkbox';
import { Button } from '../../button/Button';
import type { FormProps } from '../Form.types';

const meta: Meta<FormProps> = {
  title: 'DataEntry/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component: `
React Hook Form과 Zod를 통합한 폼 컴포넌트입니다.

## 설치

\`\`\`bash
npm install react-hook-form @hookform/resolvers zod
\`\`\`

## 기본 사용법

\`\`\`tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormControl } from '@/components/form';
import { Input } from '@/components/input/Input';

// 1. Zod 스키마 정의
const schema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '8자 이상 필요'),
});

// 2. 스키마에서 타입 추론
type FormValues = z.infer<typeof schema>;

function MyForm() {
  // 3. useForm 훅 사용
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  // 4. 제출 핸들러
  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormControl>
            <Input variant="default" label="이메일" {...field} />
          </FormControl>
        )}
      />
    </Form>
  );
}
\`\`\`

---

## zodResolver 상세 설명

\`zodResolver\`는 Zod 유효성 검사와 React Hook Form을 연결하는 브릿지입니다.

\`\`\`tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
});

const form = useForm({
  resolver: zodResolver(schema),  // Zod 에러를 RHF 형식으로 변환
});
\`\`\`

**동작 방식:**
\`\`\`
사용자 입력 → zodResolver → Zod 스키마 검증 → 에러 변환 → React Hook Form

// Zod 에러 형식:
{ code: 'invalid_string', message: '유효한 이메일을 입력해주세요', path: ['email'] }

// RHF 에러 형식으로 변환:
{ email: { type: 'invalid_string', message: '유효한 이메일을 입력해주세요' } }
\`\`\`

**자주 사용하는 Zod 유효성 검사:**
\`\`\`tsx
const schema = z.object({
  // 문자열 검증
  name: z.string().min(2, '2자 이상').max(50, '50자 이하'),
  email: z.string().email('유효한 이메일 필요'),
  url: z.string().url('유효한 URL 필요'),

  // 숫자 검증
  age: z.number().min(18, '18세 이상').max(100),

  // 불리언 (체크박스 필수)
  terms: z.boolean().refine(val => val === true, '동의 필요'),

  // 선택적 필드
  bio: z.string().max(200).optional(),

  // 열거형/선택 값
  role: z.enum(['admin', 'user', 'guest']),

  // 정규식
  username: z.string().regex(/^[a-z0-9_]+$/, '소문자, 숫자, 밑줄만'),
});
\`\`\`

**필드 간 검증 (비밀번호 확인 등):**
\`\`\`tsx
const schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],  // 에러가 표시될 필드
});
\`\`\`

---

## UseFormReturn<TFieldValues> 상세 설명

\`useForm()\`의 반환 타입으로, 폼 관리에 필요한 모든 것을 포함합니다.

\`\`\`tsx
type LoginFormValues = { email: string; password: string };

const form: UseFormReturn<LoginFormValues> = useForm<LoginFormValues>({
  resolver: zodResolver(schema),
  defaultValues: { email: '', password: '' },
});
\`\`\`

**주요 속성:**

| 속성 | 타입 | 설명 |
|------|------|------|
| \`form.control\` | \`Control\` | FormField에 전달 (필수) |
| \`form.handleSubmit\` | \`(onValid, onInvalid?) => (e) => void\` | 폼 제출 처리 |
| \`form.formState\` | \`FormState\` | 에러, 로딩 등 상태 |
| \`form.watch\` | \`(name?) => value\` | 필드 값 구독 |
| \`form.setValue\` | \`(name, value) => void\` | 프로그래밍 방식으로 값 설정 |
| \`form.setError\` | \`(name, error) => void\` | 수동으로 에러 설정 |
| \`form.reset\` | \`(values?) => void\` | 폼 초기화 |
| \`form.getValues\` | \`(name?) => value\` | 현재 값 가져오기 |

**formState 상세:**
\`\`\`tsx
const { formState } = form;

formState.errors        // { email?: { message: string }, ... }
formState.isSubmitting  // boolean - 제출 중 여부
formState.isValid       // boolean - 유효성 통과 여부
formState.isDirty       // boolean - 변경 여부
formState.touchedFields // { email?: boolean, ... }
\`\`\`

**활용 예시:**
\`\`\`tsx
<Button
  type="submit"
  loading={form.formState.isSubmitting}
  disabled={!form.formState.isValid}
>
  제출
</Button>
\`\`\`

---

## onSubmit 핸들러 상세 설명

제출 핸들러는 **검증된, 타입이 지정된 값**을 받습니다.

\`\`\`tsx
// 동기 핸들러
const onSubmit = (values: LoginFormValues) => {
  console.log(values.email);    // string (타입 지정됨!)
  console.log(values.password); // string (타입 지정됨!)
};

// 비동기 핸들러
const onSubmit = async (values: LoginFormValues) => {
  await api.login(values.email, values.password);
};
\`\`\`

**동작 흐름:**
\`\`\`
<Form form={form} onSubmit={onSubmit}>

// Form.tsx 내부:
<form onSubmit={form.handleSubmit(onSubmit)}>

// handleSubmit 동작:
1. 기본 폼 제출 방지
2. zodResolver를 통한 유효성 검사 실행
3. 유효 → onSubmit(values) 호출
4. 무효 → form.formState.errors 설정, onSubmit 호출 안 함
\`\`\`

**서버 에러 처리:**
\`\`\`tsx
const onSubmit = async (values: FormValues) => {
  try {
    await api.login(values);
  } catch (error) {
    // 특정 필드에 에러 설정
    form.setError('email', {
      type: 'server',
      message: '이메일 또는 비밀번호가 올바르지 않습니다'
    });

    // 또는 루트 레벨 에러 설정
    form.setError('root', {
      message: '서버 오류가 발생했습니다'
    });
  }
};
\`\`\`

---

## 유효성 검사 모드

기본적으로 React Hook Form은 **제출 시에만** 검사합니다.
실시간 검사를 원하면 \`mode\` 옵션을 설정하세요.

\`\`\`tsx
const form = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur',  // 포커스 아웃 시 검사
});
\`\`\`

| 모드 | 검사 시점 |
|------|----------|
| \`onSubmit\` | 폼 제출 시에만 (기본값) |
| \`onBlur\` | 필드 포커스 아웃 시 |
| \`onChange\` | 입력할 때마다 |
| \`onTouched\` | 첫 포커스 아웃 후, 이후 입력마다 |
| \`all\` | 포커스 아웃 AND 입력 시 |

---

## 컴포넌트 구조

| 컴포넌트 | 용도 |
|----------|------|
| \`Form\` | FormProvider + form 요소 래퍼 |
| \`FormField\` | react-hook-form Controller 래퍼 |
| \`FormItem\` | 필드 컨테이너 (ID 생성) |
| \`FormControl\` | 자식에게 에러 자동 주입 |
| \`FormDescription\` | 도움말 텍스트 |
| \`FormError\` | 독립적인 에러 표시 (Checkbox, Radio용) |

**패턴 A: Input/Textarea/Select (에러 자동 주입)**
\`\`\`tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormControl>
      <Input variant="default" label="이메일" {...field} />
      {/* FormControl이 자동으로 error prop 주입 */}
    </FormControl>
  )}
/>
\`\`\`

**패턴 B: Checkbox/Radio/Switch (별도 에러 표시)**
\`\`\`tsx
<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Checkbox
          label="동의합니다"
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormError />  {/* 별도 에러 표시 */}
    </FormItem>
  )}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    form: {
      description: 'react-hook-form의 useForm() 훅에서 반환되는 폼 관리 객체입니다. control, handleSubmit, formState 등을 포함합니다',
      table: {
        type: {
          summary: 'UseFormReturn<TFieldValues>',
          detail: `useForm() 훅의 반환값으로, 폼 관리에 필요한 모든 메서드와 상태를 포함합니다.

주요 속성:
- control: FormField에 전달
- handleSubmit: 폼 제출 처리
- formState: 에러, 로딩 등 상태
- watch: 필드 값 구독
- setValue: 값 설정
- setError: 에러 설정
- reset: 폼 초기화
- getValues: 현재 값 가져오기`,
        },
      },
    },
    onSubmit: {
      description: 'Zod 스키마 검증을 통과한 경우에만 호출되는 폼 제출 핸들러입니다. 타입 안전한 폼 값을 인자로 받습니다',
      table: {
        type: {
          summary: '(values: TFieldValues) => void | Promise<void>',
          detail: `Zod 스키마 검증을 통과한 타입 안전한 값을 받습니다.

예시:
const onSubmit = async (values: FormValues) => {
  // values는 스키마에 정의된 타입
  await api.submit(values);
};

서버 에러 처리:
form.setError('email', {
  type: 'server',
  message: '이미 사용 중인 이메일입니다'
});`,
        },
      },
    },
    children: {
      description: '폼 내부에 렌더링되는 자식 요소들입니다. FormField, Button 등의 컴포넌트를 배치합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<FormProps>;

// ============================================================================
// DEFAULT EXAMPLE
// ============================================================================

const defaultSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
});

type DefaultFormValues = z.infer<typeof defaultSchema>;

/**
 * 기본 폼
 *
 * 이 스토리에서 Form 컴포넌트의 기본 사용법을 확인할 수 있습니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  render: function Render() {
    const form = useForm<DefaultFormValues>({
      resolver: zodResolver(defaultSchema),
      defaultValues: { email: '' },
    });

    const onSubmit = (values: DefaultFormValues) => {
      console.log('Form submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-sm">
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
        <Button type="submit" buttonStyle="primary" size="lg" fullWidth>
          제출
        </Button>
      </Form>
    );
  },
};

// ============================================================================
// LOGIN FORM EXAMPLE
// ============================================================================

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * 로그인 폼
 *
 * 이메일과 비밀번호 입력을 포함한 기본 로그인 폼 예제입니다.
 * FormControl이 자동으로 Input에 에러 메시지를 주입합니다.
 */
export const LoginForm: Story = {
  render: function Render() {
    const form = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });

    const onSubmit = (values: LoginFormValues) => {
      console.log('Form submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-sm">
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
                placeholder="비밀번호를 입력하세요"
                {...field}
              />
            </FormControl>
          )}
        />

        <Button type="submit" buttonStyle="primary" size="lg" fullWidth>
          로그인
        </Button>
      </Form>
    );
  },
};

// ============================================================================
// REGISTRATION FORM EXAMPLE
// ============================================================================

const registrationSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
    email: z.string().email('유효한 이메일을 입력해주세요'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
    confirmPassword: z.string(),
    bio: z.string().max(200, '자기소개는 200자 이내로 작성해주세요').optional(),
    role: z.string().min(1, '역할을 선택해주세요'),
    terms: z.boolean().refine((val) => val === true, '이용약관에 동의해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const roleOptions = [
  { id: 'developer', label: '개발자' },
  { id: 'designer', label: '디자이너' },
  { id: 'pm', label: '프로젝트 매니저' },
  { id: 'other', label: '기타' },
];

/**
 * 회원가입 폼
 *
 * 다양한 입력 필드와 유효성 검사를 포함한 회원가입 폼입니다.
 * Input, Textarea, Select, Checkbox 컴포넌트를 모두 사용합니다.
 */
export const RegistrationForm: Story = {
  render: function Render() {
    const form = useForm<RegistrationFormValues>({
      resolver: zodResolver(registrationSchema),
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        role: '',
        terms: false,
      },
    });

    const onSubmit = (values: RegistrationFormValues) => {
      console.log('Form submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-md">
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
          name="role"
          render={({ field }) => (
            <FormControl>
              <Select
                variant="default"
                label="역할"
                placeholder="역할을 선택하세요"
                required
                options={roleOptions}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormControl>
              <Textarea
                label="자기소개"
                placeholder="간단한 자기소개를 작성해주세요"
                showCount
                maxLength={200}
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

        <Button type="submit" buttonStyle="primary" size="lg" fullWidth>
          가입하기
        </Button>
      </Form>
    );
  },
};

// ============================================================================
// WITH DESCRIPTION EXAMPLE
// ============================================================================

const profileSchema = z.object({
  username: z
    .string()
    .min(3, '사용자명은 3자 이상이어야 합니다')
    .max(20, '사용자명은 20자 이하여야 합니다')
    .regex(/^[a-z0-9_]+$/, '소문자, 숫자, 밑줄만 사용 가능합니다'),
  website: z.string().url('유효한 URL을 입력해주세요').or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

/**
 * 도움말 텍스트가 있는 폼
 *
 * FormDescription을 사용하여 필드에 대한 추가 설명을 제공합니다.
 */
export const WithDescription: Story = {
  render: function Render() {
    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        username: '',
        website: '',
      },
    });

    const onSubmit = (values: ProfileFormValues) => {
      console.log('Form submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-md">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="default"
                  label="사용자명"
                  placeholder="username"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                프로필 URL에 사용됩니다: example.com/@{field.value || 'username'}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="default"
                  label="웹사이트"
                  placeholder="https://example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>개인 웹사이트 또는 블로그 주소를 입력하세요</FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" buttonStyle="primary" size="lg">
          저장
        </Button>
      </Form>
    );
  },
};

// ============================================================================
// ASYNC VALIDATION EXAMPLE
// ============================================================================

const asyncSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
});

type AsyncFormValues = z.infer<typeof asyncSchema>;

/**
 * 비동기 유효성 검사
 *
 * 서버 측 유효성 검사를 시뮬레이션하는 예제입니다.
 */
export const AsyncValidation: Story = {
  render: function Render() {
    const form = useForm<AsyncFormValues>({
      resolver: zodResolver(asyncSchema),
      defaultValues: {
        email: '',
      },
    });

    const onSubmit = async (values: AsyncFormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (values.email === 'test@test.com') {
        form.setError('email', {
          type: 'server',
          message: '이미 사용 중인 이메일입니다',
        });
        return;
      }

      console.log('Form submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="default"
                  label="이메일"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                test@test.com을 입력하면 서버 에러를 확인할 수 있습니다
              </FormDescription>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          buttonStyle="primary"
          size="lg"
          loading={form.formState.isSubmitting}
          fullWidth
        >
          확인
        </Button>
      </Form>
    );
  },
};

// ============================================================================
// PASSWORD STRENGTH EXAMPLE
// ============================================================================

const passwordStrengthSchema = z.object({
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

type PasswordStrengthFormValues = z.infer<typeof passwordStrengthSchema>;

/**
 * 비밀번호 강도 표시
 *
 * 비밀번호 입력 시 실시간으로 강도를 표시하는 예제입니다.
 * `showStrength`와 `autoCalculateStrength` props를 사용합니다.
 *
 * 강도 계산 기준:
 * - 8자 이상: +1점
 * - 12자 이상: +1점
 * - 소문자 포함: +1점
 * - 대문자 포함: +1점
 * - 숫자 포함: +1점
 * - 특수문자 포함: +1점
 *
 * 점수에 따른 강도:
 * - 0-2점: Low (낮음)
 * - 3-4점: Medium (보통)
 * - 5-6점: High (높음)
 */
export const PasswordStrength: Story = {
  render: function Render() {
    const form = useForm<PasswordStrengthFormValues>({
      resolver: zodResolver(passwordStrengthSchema),
      defaultValues: {
        password: '',
      },
      mode: 'onChange',
    });

    const onSubmit = (values: PasswordStrengthFormValues) => {
      console.log('Form submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-sm">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="password"
                  label="비밀번호"
                  placeholder="비밀번호를 입력하세요"
                  showStrength
                  autoCalculateStrength
                  {...field}
                />
              </FormControl>
              <FormDescription>
                대소문자, 숫자, 특수문자를 조합하면 강도가 높아집니다
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" buttonStyle="primary" size="lg" fullWidth>
          확인
        </Button>
      </Form>
    );
  },
};

// ============================================================================
// ALL FIELD TYPES EXAMPLE
// ============================================================================

const allFieldsSchema = z.object({
  text: z.string().min(1, '필수 입력입니다'),
  password: z.string().min(1, '필수 입력입니다'),
  textarea: z.string().min(1, '필수 입력입니다'),
  select: z.string().min(1, '선택해주세요'),
  checkbox: z.boolean(),
});

type AllFieldsFormValues = z.infer<typeof allFieldsSchema>;

/**
 * 모든 필드 타입
 *
 * Form 컴포넌트에서 지원하는 모든 필드 타입 예제입니다.
 */
export const AllFieldTypes: Story = {
  render: function Render() {
    const form = useForm<AllFieldsFormValues>({
      resolver: zodResolver(allFieldsSchema),
      defaultValues: {
        text: '',
        password: '',
        textarea: '',
        select: '',
        checkbox: false,
      },
    });

    const onSubmit = (values: AllFieldsFormValues) => {
      console.log('Form submitted:', values);
    };

    return (
      <Form form={form} onSubmit={onSubmit} className="flex flex-col ds-gap-16 max-w-md">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormControl>
              <Input variant="default" label="텍스트 입력" placeholder="텍스트를 입력하세요" {...field} />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormControl>
              <Input variant="password" label="비밀번호 입력" placeholder="비밀번호를 입력하세요" {...field} />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="textarea"
          render={({ field }) => (
            <FormControl>
              <Textarea label="긴 텍스트" placeholder="내용을 입력하세요" {...field} />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="select"
          render={({ field }) => (
            <FormControl>
              <Select
                variant="default"
                label="선택"
                placeholder="옵션을 선택하세요"
                options={roleOptions}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />

        <FormField
          control={form.control}
          name="checkbox"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  label="동의합니다"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex ds-gap-8">
          <Button type="button" buttonStyle="secondary" size="lg" onClick={() => form.reset()}>
            초기화
          </Button>
          <Button type="submit" buttonStyle="primary" size="lg">
            제출
          </Button>
        </div>
      </Form>
    );
  },
};
