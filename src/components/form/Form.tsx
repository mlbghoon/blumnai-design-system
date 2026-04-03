import { FormProvider, type FieldValues } from 'react-hook-form';

import type { FormProps } from './Form.types';

/**
 * Form 컴포넌트
 *
 * react-hook-form의 FormProvider를 래핑하고 form 요소를 렌더링합니다.
 *
 * @example
 * <Form form={form} onSubmit={handleSubmit}>
 *   <FormField name="email" render={({ field }) => <Input {...field} />} />
 * </Form>
 */
export const Form = <TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.displayName = 'Form';
