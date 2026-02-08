import { createContext } from 'react';

import type { FormFieldContextValue, FormItemContextValue } from './Form.types';

/**
 * FormField Context
 */
export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * FormItem Context
 */
export const FormItemContext = createContext<FormItemContextValue | null>(null);
