import * as React from 'react';

import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';
import type { CheckboxCardProps } from './CheckboxCard.types';

/**
 * CheckboxCard 컴포넌트
 *
 * 카드 형태의 체크박스입니다. 제목, 설명, 섹션을 표시할 수 있습니다.
 *
 * @example
 * <CheckboxCard title="옵션 A" description="설명" checked={checked} onCheckedChange={setChecked} />
 */
const CheckboxCard = React.forwardRef<HTMLDivElement, CheckboxCardProps>(
  (
    {
      title,
      description,
      sections = [],
      layout = 'vertical',
      checked = false,
      disabled = false,
      background = 'default',
      checkboxPosition = 'right',
      checkboxStyle = 'with-shadow',
      name,
      value,
      onCheckedChange,
      className,
    },
    ref
  ) => {
    const backgroundStyles = background === 'default' ? 'bg-card' : 'bg-state-soft';

    const getBorderStyles = () => {
      if (disabled) {
        return background === 'default' ? 'card-border-default' : '';
      }
      if (checked) {
        return background === 'default' ? 'card-border-selected' : 'card-border-selected-soft';
      }
      if (background === 'default') {
        return 'card-border-darker';
      }
      return '';
    };

    const cardClassName = cn(
      'group w-full padding-16 rounded-md overflow-hidden',
      layout === 'vertical' ? 'flex flex-col ds-gap-24' : 'flex',
      backgroundStyles,
      getBorderStyles(),
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      className
    );

    const contentRowClassName = cn(
      'flex items-start ds-gap-10',
      layout === 'horizontal' && 'w-full'
    );

    const textContainerClassName =
      layout === 'vertical'
        ? 'flex-1 flex flex-col ds-gap-24'
        : 'flex-1 flex items-start';

    const sectionClassName = 'flex flex-col ds-gap-4';

    const horizontalRightSectionClassName = cn(
      'flex flex-col items-end ds-gap-4',
      'text-right'
    );

    const getTitleClassName = () => {
      return cn(
        'font-body size-sm font-medium line-height-leading-5 letter-spacing-tracking-normal',
        disabled ? 'text-hint' : 'text-default'
      );
    };

    const getDescriptionClassName = () => {
      return cn(
        'font-body size-sm font-normal line-height-leading-5 letter-spacing-tracking-normal',
        disabled ? 'text-hint' : 'text-subtle'
      );
    };

    const handleCardClick = () => {
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    };

    const checkboxElement = (
      <div className="height-20 flex items-center shrink-0" onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={checked}
          disabled={disabled}
          checkboxStyle={checkboxStyle}
          name={name}
          value={value}
          onCheckedChange={onCheckedChange}
        />
      </div>
    );

    const renderContent = () => {
      if (layout === 'horizontal') {
        const supporterSection = sections[0];

        if (checkboxPosition === 'off') {
          return (
            <div className={textContainerClassName}>
              <div className="flex-1 flex flex-col ds-gap-4">
                <div className={getTitleClassName()}>{title}</div>
                <div className={getDescriptionClassName()}>{description}</div>
              </div>
              {supporterSection && (
                <div className={horizontalRightSectionClassName}>
                  <div className={getTitleClassName()}>{supporterSection.title}</div>
                  <div className={getDescriptionClassName()}>{supporterSection.description}</div>
                </div>
              )}
            </div>
          );
        }

        return (
          <div className={contentRowClassName}>
            {checkboxPosition === 'left' && checkboxElement}
            <div className={textContainerClassName}>
              <div className="flex-1 flex flex-col ds-gap-4">
                <div className={getTitleClassName()}>{title}</div>
                <div className={getDescriptionClassName()}>{description}</div>
              </div>
              {supporterSection && (
                <div className={horizontalRightSectionClassName}>
                  <div className={getTitleClassName()}>{supporterSection.title}</div>
                  <div className={getDescriptionClassName()}>{supporterSection.description}</div>
                </div>
              )}
            </div>
            {checkboxPosition === 'right' && checkboxElement}
          </div>
        );
      }

      const mainSection = (
        <div className={sectionClassName}>
          <div className={getTitleClassName()}>{title}</div>
          <div className={getDescriptionClassName()}>{description}</div>
        </div>
      );

      const additionalSections = sections.map((section, index) => (
        <div key={index} className={sectionClassName}>
          <div className={getTitleClassName()}>{section.title}</div>
          <div className={getDescriptionClassName()}>{section.description}</div>
        </div>
      ));

      if (checkboxPosition === 'off') {
        return (
          <div className={textContainerClassName}>
            {mainSection}
            {additionalSections}
          </div>
        );
      }

      return (
        <div className={contentRowClassName}>
          {checkboxPosition === 'left' && checkboxElement}
          <div className={textContainerClassName}>
            {mainSection}
            {additionalSections}
          </div>
          {checkboxPosition === 'right' && checkboxElement}
        </div>
      );
    };

    return (
      <div ref={ref} className={cardClassName} onClick={handleCardClick}>
        {renderContent()}
      </div>
    );
  }
);

CheckboxCard.displayName = 'CheckboxCard';

export { CheckboxCard };
