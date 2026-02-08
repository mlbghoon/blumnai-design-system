import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

/**
 * Form Props
 */
export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  /**
   * react-hook-form의 useForm 반환값
   */
  form: UseFormReturn<TFieldValues>;
  /**
   * 폼 제출 핸들러
   */
  onSubmit?: (values: TFieldValues) => void | Promise<void>;
  /**
   * 폼 컨텐츠
   */
  children: ReactNode;
}

/**
 * FormField Context Value
 */
export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

/**
 * FormItem Context Value
 */
export interface FormItemContextValue {
  id: string;
}

/**
 * FormItem Props
 */
export interface FormItemProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * FormItem 컨텐츠
   */
  children: ReactNode;
}

/**
 * FormControl Props
 */
export interface FormControlProps {
  /**
   * 폼 컨트롤 요소 (Input, Textarea, Select, Checkbox 등)
   */
  children: ReactNode;
}

/**
 * FormDescription Props
 */
export interface FormDescriptionProps extends ComponentPropsWithoutRef<'p'> {
  /**
   * 설명 텍스트
   */
  children?: ReactNode;
}

/**
 * FormError Props
 */
export interface FormErrorProps extends ComponentPropsWithoutRef<'p'> {
  /**
   * 커스텀 에러 메시지 (미제공시 필드 에러 사용)
   */
  children?: ReactNode;
}
