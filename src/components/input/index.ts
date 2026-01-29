// Main unified Input component
export { Input } from './Input';

// All types from the unified type system
export type {
  InputProps,
  InputStyle,
  InputSize,
  InputVariant,
  InputBaseProps,
  DefaultVariantProps,
  ShortcutVariantProps,
  TagsVariantProps,
  InlineTagsVariantProps,
  TailDropdownVariantProps,
  LeadDropdownVariantProps,
  QuantityVariantProps,
  Quantity2VariantProps,
  TailButtonVariantProps,
  LeadButtonVariantProps,
  AddOnVariantProps,
  InlineAddOnVariantProps,
  PasswordVariantProps,
  PasswordStrength,
  DropdownOption,
  IconTypeWithFill,
} from './Input.types';

// Shared components (for advanced usage)
export { InputWrapper, InputLabel, InputCaption } from './shared';
export type { InputWrapperProps, InputLabelProps, InputCaptionProps } from './shared';

// Shared hook (for custom variants)
export { useInputState } from './shared';
export type { UseInputStateOptions, UseInputStateReturn } from './shared';

// Constants (for custom variants and consistency)
export {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  LABEL_STYLE,
  SUPPORT_TEXT_STYLE,
  CAPTION_STYLE,
  ERROR_CAPTION_STYLE,
  SUCCESS_CAPTION_STYLE,
  REQUIRED_STYLE,
  SHORTCUT_STYLE,
  INPUT_CONTAINER_BASE,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
} from 'constants/input/Input/Input.constants';

// Individual variant exports (for tree-shaking and direct imports)
export {
  DefaultInput,
  PasswordInput,
  QuantityInput,
  TagsInput,
  AddOnInput,
  ButtonInput,
  DropdownInput,
  ShortcutInput,
} from './variants';

export type {
  DefaultInputProps,
  PasswordInputProps,
  QuantityInputProps,
  TagsInputProps,
  AddOnInputProps,
  ButtonInputProps,
  DropdownInputProps,
  ShortcutInputProps,
  ButtonPosition,
  DropdownPosition,
} from './variants';
