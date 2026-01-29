import { useId } from 'react';

import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
} from 'constants/input/Input/Input.constants';
import type { InputSize, InputStyle } from '../Input/Input.types';

export interface UseInputStateOptions {
  inputStyle?: InputStyle;
  size?: InputSize;
  disabled?: boolean;
  error?: boolean | string;
  success?: boolean | string;
}

export interface UseInputStateReturn {
  inputId: string;
  hasError: boolean;
  hasSuccess: boolean;
  state: 'default' | 'disabled' | 'error' | 'success';
  sizeConfig: (typeof SIZE_CONFIG)[InputSize];
  styleConfig: (typeof STYLE_CONFIG)[InputStyle];
  stateConfig: (typeof STATE_CONFIG)['default' | 'disabled' | 'error' | 'success'];
  iconColor: 'default-disabled' | 'destructive' | 'success' | 'default-subtle';
}

/**
 * 입력 필드 상태 로직을 위한 훅
 *
 * 모든 입력 필드 변형에서 공통으로 사용되는
 * 상태 결정, 크기/스타일 설정, 아이콘 색상을 처리합니다.
 */
export const useInputState = ({
  inputStyle = 'default',
  size = 'sm',
  disabled = false,
  error,
  success,
}: UseInputStateOptions): UseInputStateReturn => {
  const inputId = useId();

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);
  const state = disabled ? 'disabled' : hasError ? 'error' : hasSuccess ? 'success' : 'default';

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[inputStyle];
  const stateConfig = STATE_CONFIG[state];

  const iconColor = disabled ? 'default-disabled' : hasError ? 'destructive' : hasSuccess ? 'success' : 'default-subtle';

  return {
    inputId,
    hasError,
    hasSuccess,
    state,
    sizeConfig,
    styleConfig,
    stateConfig,
    iconColor,
  };
};
