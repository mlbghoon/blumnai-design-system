import { forwardRef } from 'react';

import type { SelectProps, DefaultSelectProps, AvatarSelectProps, MultiSelectProps, TagsSelectProps } from './Select.types';
import { ExtendedSelect } from './RadixSelect';
import { MultiSelect } from './RadixMultiSelect';

/**
 * Select 컴포넌트
 *
 * 다양한 변형을 지원하는 통합 Select 컴포넌트입니다.
 * `variant` prop으로 원하는 선택 유형을 선택하세요.
 *
 * - `default`: 단일 선택
 * - `avatar`: 아바타가 있는 단일 선택
 * - `multi-select`: 체크박스가 있는 다중 선택
 * - `tags`: 태그로 표시되는 다중 선택
 *
 * @example
 * <Select variant="default" label="선택" options={[{ label: 'A', value: 'a' }]} />
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const variant = props.variant ?? 'default';

  if (variant === 'multi-select') {
    const multiProps = props as MultiSelectProps;
    return (
      <MultiSelect
        ref={ref}
        variant="default"
        selectStyle={multiProps.selectStyle}
        size={multiProps.size}
        label={multiProps.label}
        labelPosition={multiProps.labelPosition}
        labelWidth={multiProps.labelWidth}
        required={multiProps.required}
        supportText={multiProps.supportText}
        caption={multiProps.caption}
        error={multiProps.error}
        success={multiProps.success}
        disabled={multiProps.disabled}
        placeholder={multiProps.placeholder}
        leadIcon={multiProps.leadIcon}
        tailIcon={multiProps.tailIcon}
        options={multiProps.options}
        value={multiProps.value}
        onChange={multiProps.onChange}
        searchable={multiProps.searchable}
        searchPlaceholder={multiProps.searchPlaceholder}
        noResultsText={multiProps.noResultsText}
        open={multiProps.open}
        onOpenChange={multiProps.onOpenChange}
        maxHeight={multiProps.maxHeight}
        contentWidth={multiProps.contentWidth}
        width={multiProps.width}
        minWidth={multiProps.minWidth}
        className={multiProps.className}
        maxSelections={multiProps.maxSelections}
        selectedText={multiProps.selectedText}
        showSelectAll={multiProps.showSelectAll}
        selectAllLabel={multiProps.selectAllLabel}
        clearable={multiProps.clearable}
        loading={multiProps.loading}
        optionGroups={multiProps.optionGroups}
        renderOption={multiProps.renderOption}
      />
    );
  }

  if (variant === 'tags') {
    const tagsProps = props as TagsSelectProps;
    return (
      <MultiSelect
        ref={ref}
        variant="tags"
        selectStyle={tagsProps.selectStyle}
        size={tagsProps.size}
        label={tagsProps.label}
        labelPosition={tagsProps.labelPosition}
        labelWidth={tagsProps.labelWidth}
        required={tagsProps.required}
        supportText={tagsProps.supportText}
        caption={tagsProps.caption}
        error={tagsProps.error}
        success={tagsProps.success}
        disabled={tagsProps.disabled}
        placeholder={tagsProps.placeholder}
        leadIcon={tagsProps.leadIcon}
        tailIcon={tagsProps.tailIcon}
        options={tagsProps.options}
        value={tagsProps.value}
        onChange={tagsProps.onChange}
        searchable={tagsProps.searchable}
        searchPlaceholder={tagsProps.searchPlaceholder}
        noResultsText={tagsProps.noResultsText}
        open={tagsProps.open}
        onOpenChange={tagsProps.onOpenChange}
        maxHeight={tagsProps.maxHeight}
        contentWidth={tagsProps.contentWidth}
        width={tagsProps.width}
        minWidth={tagsProps.minWidth}
        className={tagsProps.className}
        maxSelections={tagsProps.maxSelections}
        maxVisibleTags={tagsProps.maxVisibleTags}
        overflowText={tagsProps.overflowText}
        clearable={tagsProps.clearable}
        loading={tagsProps.loading}
        optionGroups={tagsProps.optionGroups}
        renderOption={tagsProps.renderOption}
      />
    );
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
