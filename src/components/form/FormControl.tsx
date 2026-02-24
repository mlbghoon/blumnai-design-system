import { cloneElement, isValidElement, type ReactElement } from 'react';

import { useFormField } from './useFormField';
import type { FormControlProps } from './Form.types';

/**
 * error prop을 지원하는 컴포넌트 목록
 */
const COMPONENTS_WITH_ERROR_PROP = ['Input', 'Textarea', 'Select', 'Combobox'];

/**
 * 컴포넌트가 error prop을 지원하는지 확인
 */
const getDisplayName = (element: ReactElement): string => {
  const type = element.type;

  if (typeof type === 'string') {
    return type;
  }

  if (typeof type === 'object' && type !== null) {
    const obj = type as { displayName?: string; type?: { displayName?: string; name?: string } };
    return obj.displayName || obj.type?.displayName || obj.type?.name || '';
  }

  if (typeof type === 'function') {
    return (type as { displayName?: string }).displayName || type.name || '';
  }

  return '';
};

const supportsErrorProp = (element: ReactElement): boolean => {
  const displayName = getDisplayName(element);
  return COMPONENTS_WITH_ERROR_PROP.some((name) => displayName?.includes(name));
};

/**
 * FormControl 컴포넌트
 *
 * 자식 컴포넌트가 error prop을 지원하면 자동으로 에러 메시지를 주입합니다.
 * 또한 aria 속성을 추가하여 접근성을 향상시킵니다.
 */
export const FormControl = ({ children }: FormControlProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const hasError = !!error;
  const errorMessage = error?.message;

  const ariaProps = {
    id: formItemId,
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError
      ? `${formDescriptionId} ${formMessageId}`
      : formDescriptionId || undefined,
  };

  if (supportsErrorProp(children)) {
    return cloneElement(children, {
      ...ariaProps,
      error: errorMessage || (hasError ? true : undefined),
    } as Record<string, unknown>);
  }

  return cloneElement(children, ariaProps as Record<string, unknown>);
};

FormControl.displayName = 'FormControl';
