// Unified Select component
export { Select } from './Select';

// Combobox component
export { Combobox } from './Combobox';
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxStyle,
  ComboboxSize,
  ComboboxVariant,
  ComboboxBaseProps,
  DefaultComboboxProps,
  AvatarComboboxProps,
  TagsComboboxProps,
} from './Combobox';

// Types
export type {
  SelectProps,
  SelectStyle,
  SelectSize,
  SelectVariant,
  SelectType,
  SelectOption,
  SelectBaseProps,
  DefaultSelectProps,
  AvatarSelectProps,
  MultiSelectProps,
  TagsSelectProps,
  RadixMultiSelectProps,
  RadixMultiSelectVariant,
  SelectTriggerProps,
  SelectContentProps,
  ExtendedSelectItemProps,
  ExtendedSelectProps,
  MultiSelectItemProps,
} from './Select.types';

// Radix primitives (for advanced customization)
export {
  Select as SelectRadix,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  ExtendedSelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  ExtendedSelect,
} from './RadixSelect';

export { MultiSelect as RadixMultiSelect } from './RadixMultiSelect';
