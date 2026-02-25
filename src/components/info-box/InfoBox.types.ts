import type { HTMLAttributes, ReactNode } from 'react';
import type { IconType } from '../icons/Icon/Icon.types';

export type InfoBoxVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface InfoBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: InfoBoxVariant;
  icon?: IconType;
  visible?: boolean;
  title?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  children: ReactNode;
}
