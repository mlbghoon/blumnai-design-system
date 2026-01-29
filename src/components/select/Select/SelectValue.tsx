import { Avatar } from '../../avatar/Avatar';
import { Badge } from '../../badge/Badge';
import { cn } from '../../../utils/cn';

import type { SelectOption } from '../Select.types';

export interface SelectValueProps {
  selectedOptions: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'avatar' | 'multi-select' | 'tags';
  disabled?: boolean;
  onRemoveTag?: (id: string) => void;
  selectedText?: string | ((count: number) => string);
  className?: string;
}

export const SelectValue = ({
  selectedOptions,
  placeholder = 'Select...',
  variant = 'default',
  disabled = false,
  onRemoveTag,
  selectedText,
  className,
}: SelectValueProps) => {
  const isEmpty = selectedOptions.length === 0;

  if (isEmpty) {
    return (
      <span className={cn('text-hint truncate', className)}>
        {placeholder}
      </span>
    );
  }

  if (variant === 'avatar' && selectedOptions[0]) {
    const option = selectedOptions[0];
    return (
      <div className={cn('flex items-center gap-6', className)}>
        <Avatar
          size="2xs"
          src={option.avatarSrc}
          alt={option.label}
        />
        <span className={cn('truncate', disabled ? 'text-hint' : 'text-default')}>
          {option.label}
        </span>
      </div>
    );
  }

  if (variant === 'tags') {
    return (
      <div className={cn('flex flex-wrap gap-4 items-center', className)}>
        {selectedOptions.map((option) => (
          <Badge
            key={option.id}
            size="sm"
            color="neutral"
            border
            label={option.label}
            closeIcon={!disabled}
            onClose={disabled ? undefined : () => onRemoveTag?.(option.id)}
          />
        ))}
      </div>
    );
  }

  if (variant === 'multi-select') {
    if (selectedOptions.length === 1) {
      return (
        <span className={cn('truncate', disabled ? 'text-hint' : 'text-default', className)}>
          {selectedOptions[0].label}
        </span>
      );
    }
    const displayText = typeof selectedText === 'function'
      ? selectedText(selectedOptions.length)
      : selectedText ?? `${selectedOptions.length} selected`;
    return (
      <span className={cn('truncate', disabled ? 'text-hint' : 'text-default', className)}>
        {displayText}
      </span>
    );
  }

  return (
    <span className={cn('truncate', disabled ? 'text-hint' : 'text-default', className)}>
      {selectedOptions[0]?.label}
    </span>
  );
};

SelectValue.displayName = 'SelectValue';
