import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface InputContextValue {
  captionId?: string;
  errorId?: string;
  required?: boolean;
}

const InputContext = createContext<InputContextValue | undefined>(undefined);

export function InputContextProvider({ children, value }: { children: ReactNode; value: InputContextValue }) {
  return <InputContext.Provider value={value}>{children}</InputContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInputContext(): InputContextValue | undefined {
  return useContext(InputContext);
}
