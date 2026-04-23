import { forwardRef } from 'react';

import type { SelectProps, DefaultSelectProps, AvatarSelectProps, MultiSelectProps, TagsSelectProps } from './Select.types';
import { ExtendedSelect } from './RadixSelect';
import { MultiSelect } from './RadixMultiSelect';

/**
 * Select — 클릭해서 여는 picker (폼 필드용 기본 선택 컴포넌트)
 *
 * 버튼을 눌러 드롭다운을 여는 전통적인 select 패턴입니다.
 * 옵션이 적거나(~20개 이하), 폼의 일반적인 선택 필드로 사용할 때 적합합니다.
 *
 * **언제 Select를 쓸까 (vs Combobox)**
 * - ✅ 폼 필드, 일반적인 드롭다운 — 기본값
 * - ✅ 옵션이 많지 않고 스크롤/키보드 타입어헤드로 충분한 경우
 * - ✅ 다중 선택(`multi-select` / `tags`) — 현재 Combobox에도 지원되지만 Select가 form context에 더 자연스러움
 * - ❌ 사용자가 타이핑으로 빠르게 찾는 게 주 용도 → {@link Combobox}
 * - ❌ 새 항목을 생성할 수 있어야 함(`creatable`) → {@link Combobox}
 * - ❌ 옵션이 1000개 이상 → `VirtualSelect`
 *
 * `variant`:
 * - `default`: 단일 선택
 * - `avatar`: 아바타가 있는 단일 선택
 * - `multi-select`: 체크박스가 있는 다중 선택
 * - `tags`: 태그로 표시되는 다중 선택
 *
 * `searchable` prop은 popover 안에 검색 입력을 띄우는 하이브리드 UX를 제공하지만,
 * 타이핑이 주 상호작용이라면 {@link Combobox}를 사용하는 것이 더 명확합니다.
 *
 * @example
 * <Select variant="default" label="선택" options={[{ id: 'a', label: 'A' }]} />
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const variant = props.variant ?? 'default';

  if (variant === 'multi-select') {
    // 스프레드 패턴: 새 prop 추가 시 wrapper에서 누락되지 않도록 자동 forward
    const { variant: _variant, ...rest } = props as MultiSelectProps;
    void _variant;
    return <MultiSelect ref={ref} variant="default" {...rest} />;
  }

  if (variant === 'tags') {
    const { variant: _variant, ...rest } = props as TagsSelectProps;
    void _variant;
    return <MultiSelect ref={ref} variant="tags" {...rest} />;
  }

  if (variant === 'avatar') {
    const avatarProps = props as AvatarSelectProps;
    return (
      <ExtendedSelect
        ref={ref}
        variant="avatar"
        selectStyle={avatarProps.selectStyle}
        size={avatarProps.size}
        label={avatarProps.label}
        labelPosition={avatarProps.labelPosition}
        labelWidth={avatarProps.labelWidth}
        required={avatarProps.required}
        supportText={avatarProps.supportText}
        caption={avatarProps.caption}
        error={avatarProps.error}
        success={avatarProps.success}
        disabled={avatarProps.disabled}
        placeholder={avatarProps.placeholder}
        leadIcon={avatarProps.leadIcon}
        tailIcon={avatarProps.tailIcon}
        options={avatarProps.options}
        value={avatarProps.value}
        onChange={avatarProps.onChange}
        defaultValue={avatarProps.defaultValue}
        searchable={avatarProps.searchable}
        searchPlaceholder={avatarProps.searchPlaceholder}
        noResultsText={avatarProps.noResultsText}
        open={avatarProps.open}
        onOpenChange={avatarProps.onOpenChange}
        maxHeight={avatarProps.maxHeight}
        contentWidth={avatarProps.contentWidth}
        width={avatarProps.width}
        minWidth={avatarProps.minWidth}
        className={avatarProps.className}
        clearable={avatarProps.clearable}
        loading={avatarProps.loading}
        optionGroups={avatarProps.optionGroups}
        renderOption={avatarProps.renderOption}
        renderValue={avatarProps.renderValue}
      />
    );
  }

  const defaultProps = props as DefaultSelectProps;
  return (
    <ExtendedSelect
      ref={ref}
      variant="default"
      selectStyle={defaultProps.selectStyle}
      size={defaultProps.size}
      label={defaultProps.label}
      labelPosition={defaultProps.labelPosition}
      labelWidth={defaultProps.labelWidth}
      required={defaultProps.required}
      supportText={defaultProps.supportText}
      caption={defaultProps.caption}
      error={defaultProps.error}
      success={defaultProps.success}
      disabled={defaultProps.disabled}
      placeholder={defaultProps.placeholder}
      leadIcon={defaultProps.leadIcon}
      tailIcon={defaultProps.tailIcon}
      options={defaultProps.options}
      value={defaultProps.value}
      onChange={defaultProps.onChange}
      defaultValue={defaultProps.defaultValue}
      searchable={defaultProps.searchable}
      searchPlaceholder={defaultProps.searchPlaceholder}
      noResultsText={defaultProps.noResultsText}
      open={defaultProps.open}
      onOpenChange={defaultProps.onOpenChange}
      maxHeight={defaultProps.maxHeight}
      contentWidth={defaultProps.contentWidth}
      width={defaultProps.width}
      minWidth={defaultProps.minWidth}
      className={defaultProps.className}
      selectType={defaultProps.selectType}
      clearable={defaultProps.clearable}
      loading={defaultProps.loading}
      optionGroups={defaultProps.optionGroups}
      renderOption={defaultProps.renderOption}
      renderValue={defaultProps.renderValue}
    />
  );
});

Select.displayName = 'Select';
