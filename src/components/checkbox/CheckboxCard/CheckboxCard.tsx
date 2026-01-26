import { forwardRef } from 'react';

import { Checkbox } from '../Checkbox/Checkbox';
import { cn } from '../../../utils/cn';

import type { CheckboxCardProps } from './CheckboxCard.types';

/**
 * CheckboxCard 컴포넌트
 *
 * 카드 형태의 체크박스 컴포넌트입니다.
 * 제목, 설명, 추가 섹션을 포함할 수 있으며, 다양한 배경과 테두리 스타일을 지원합니다.
 */
export const CheckboxCard = forwardRef<HTMLDivElement, CheckboxCardProps>(
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
      onChange,
      className,
    },
    ref
  ) => {
    // Background styles
    const backgroundStyles = background === 'default' ? 'bg-card' : 'bg-state-soft';

    // Border styles using inset box-shadow (no layout shift between states)
    const getBorderStyles = () => {
      if (checked) {
        // Selected state: 2px inset accent border
        return background === 'default' ? 'card-border-selected' : 'card-border-selected-soft';
      }
      if (background === 'default') {
        // Default background: 1px inset gray border
        return disabled ? 'card-border-default' : 'card-border-darker';
      }
      // Soft background unselected: no border
      return '';
    };

    const cardClassName = cn(
      'w-full padding-16 rounded-md overflow-hidden',
      layout === 'vertical' ? 'flex flex-col gap-24' : 'flex',
      backgroundStyles,
      getBorderStyles(),
      className
    );

    const contentRowClassName = cn(
      'flex items-start gap-10',
      layout === 'horizontal' && 'w-full'
    );

    const textContainerClassName =
      layout === 'vertical'
        ? 'flex-1 flex flex-col gap-24'
        : 'flex-1 flex items-start';

    const sectionClassName = 'flex flex-col gap-4';

    const horizontalRightSectionClassName = cn(
      'flex flex-col items-end gap-4',
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

    const checkboxWrapperClassName = 'width-20 height-20 flex items-center justify-center shrink-0';

    const checkboxElement = (
      <div className={checkboxWrapperClassName}>
        <Checkbox
          checked={checked}
          disabled={disabled}
          style={checkboxStyle}
          onChange={(e) => {
            onChange?.(e.target.checked);
          }}
          className="m-0"
        />
      </div>
    );

    const renderContent = () => {
      if (layout === 'horizontal') {
        const supporterSection = sections[0];

        return (
          <div className={contentRowClassName}>
            {checkboxPosition === 'left' && checkboxElement}
            <div className={textContainerClassName}>
              <div className="flex-1 flex flex-col gap-4">
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
      <div ref={ref} className={cardClassName}>
        {renderContent()}
      </div>
    );
  }
);

CheckboxCard.displayName = 'CheckboxCard';
