import type { ReactNode } from 'react';
import type { IconType } from '../icons/Icon/Icon.types';

export type StepperOrientation = 'horizontal' | 'vertical';

export type StepperIndicatorType = 'number' | 'icon' | 'dot';

export type StepperSize = 'sm' | 'md' | 'lg';

export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

export type StepperColor =
  | 'gray'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

export type StepperHorizontalAlign = 'left' | 'center' | 'right';

export type StepperVerticalAlign = 'left' | 'right';

export type StepperIndicatorPosition = 'top' | 'bottom';

export interface StepItem {
  label: string;
  caption?: string;
  supportText?: string;
  icon?: IconType;
  error?: boolean;
  children?: ReactNode;
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  steps: StepItem[];
  activeStep?: number;
  orientation?: StepperOrientation;
  indicatorType?: StepperIndicatorType;
  size?: StepperSize;
  color?: StepperColor;
  horizontalAlign?: StepperHorizontalAlign;
  verticalAlign?: StepperVerticalAlign;
  indicatorPosition?: StepperIndicatorPosition;
  clickable?: boolean;
  onStepClick?: (index: number) => void;
  showCheckOnCompleted?: boolean;
}
