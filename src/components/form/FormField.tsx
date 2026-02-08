import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

import { FormFieldContext } from './FormContext';

/**
 * FormField 컴포넌트
 *
 * react-hook-form의 Controller를 감싸고 필드 컨텍스트를 제공합니다.
 */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

FormField.displayName = 'FormField';
