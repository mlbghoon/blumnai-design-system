import { forwardRef } from 'react';

import type { SelectProps } from './Select.types';
import {
  DefaultSelect,
  AvatarSelect,
  MultiSelect,
  TagsSelect,
} from './variants';

/**
 * 다양한 변형을 지원하는 통합 Select 컴포넌트입니다.
 * `variant` prop으로 원하는 선택 유형을 선택하세요.
 *
 * - `default`: 단일 선택
 * - `avatar`: 아바타가 있는 단일 선택
 * - `multi-select`: 체크박스가 있는 다중 선택
 * - `tags`: 태그로 표시되는 다중 선택
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  switch (props.variant) {
    case 'avatar':
      return <AvatarSelect ref={ref} {...props} />;

    case 'multi-select':
      return <MultiSelect ref={ref} {...props} />;

    case 'tags':
      return <TagsSelect ref={ref} {...props} />;

    case 'default':
    default:
      return <DefaultSelect ref={ref} {...(props as Extract<SelectProps, { variant?: 'default' }>)} />;
  }
});

Select.displayName = 'Select';
