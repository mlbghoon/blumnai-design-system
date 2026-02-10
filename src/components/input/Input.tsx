import { forwardRef } from 'react';

import type { InputProps } from './Input.types';
import {
  DefaultInput,
  PasswordInput,
  QuantityInput,
  TagsInput,
  AddOnInput,
  ButtonInput,
  DropdownInput,
  ShortcutInput,
} from './variants';

/**
 * Input 컴포넌트
 *
 * 다양한 변형을 지원하는 통합 입력 컴포넌트입니다.
 * `variant` prop으로 원하는 입력 유형을 선택하세요.
 *
 * @example
 * <Input variant="default" label="이름" placeholder="이름을 입력하세요" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  switch (props.variant) {
    case 'password': {
      const { variant: _variant, ...rest } = props;
      return <PasswordInput ref={ref} {...rest} />;
    }

    case 'shortcut': {
      const { variant: _variant, ...rest } = props;
      return <ShortcutInput ref={ref} {...rest} />;
    }

    case 'tags': {
      const { variant: _variant, ...rest } = props;
      return <TagsInput ref={ref} {...rest} inline={true} />;
    }

    case 'inline-tags': {
      const { variant: _variant, ...rest } = props;
      return <TagsInput ref={ref} {...rest} inline={false} />;
    }

    case 'quantity': {
      const { variant: _variant, ...rest } = props;
      return <QuantityInput ref={ref} {...rest} quantityVariant="default" />;
    }

    case 'quantity-2': {
      const { variant: _variant, ...rest } = props;
      return <QuantityInput ref={ref} {...rest} quantityVariant="compact" />;
    }

    case 'tail-dropdown': {
      const { variant: _variant, ...rest } = props;
      return <DropdownInput ref={ref} {...rest} dropdownPosition="tail" />;
    }

    case 'lead-dropdown': {
      const { variant: _variant, ...rest } = props;
      return <DropdownInput ref={ref} {...rest} dropdownPosition="lead" />;
    }

    case 'tail-button': {
      const { variant: _variant, ...rest } = props;
      return <ButtonInput ref={ref} {...rest} buttonPosition="tail" />;
    }

    case 'lead-button': {
      const { variant: _variant, ...rest } = props;
      return <ButtonInput ref={ref} {...rest} buttonPosition="lead" />;
    }

    case 'addon': {
      const { variant: _variant, ...rest } = props;
      return <AddOnInput ref={ref} {...rest} inline={false} />;
    }

    case 'inline-addon': {
      const { variant: _variant, ...rest } = props;
      return <AddOnInput ref={ref} {...rest} inline={true} />;
    }

    case 'default':
    default: {
      const { variant: _variant, ...rest } = props as Extract<InputProps, { variant?: 'default' }>;
      return <DefaultInput ref={ref} {...rest} />;
    }
  }
});

Input.displayName = 'Input';
