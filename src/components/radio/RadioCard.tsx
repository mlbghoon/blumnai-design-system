import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';
import { RadioContext, RadioIndicator } from './Radio';
import type { RadioCardProps } from './RadioCard.types';

/**
 * RadioCard 컴포넌트
 *
 * 카드 형태의 라디오 버튼입니다. RadioGroup 안에서 사용합니다.
 *
 * @example
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioCard value="a" title="옵션 A" description="설명" />
 * </RadioGroup>
 */
const RadioCard = React.forwardRef<HTMLLabelElement, RadioCardProps>(
  (
    {
      value,
      title,
      description,
      sections = [],
      layout = 'vertical',
      disabled = false,
      background = 'default',
      radioPosition = 'right',
      radioStyle = 'with-shadow',
      className,
    },
    ref
  ) => {
    const context = React.useContext(RadioContext);
    const isChecked = context.value === value;

    const backgroundStyles = background === 'default' ? 'bg-card' : 'bg-state-soft';

    const getBorderStyles = () => {
      if (disabled) {
        return background === 'default' ? 'card-border-default' : '';
      }
      if (isChecked) {
        return background === 'default' ? 'card-border-selected' : 'card-border-selected-soft';
      }
      if (background === 'default') {
        return 'card-border-darker';
      }
      return '';
    };

    const cardClassName = cn(
      'group w-full padding-16 rounded-md overflow-hidden',
      'focus-visible:outline-none focus-visible:shadow-component-focus',
      layout === 'vertical' ? 'flex flex-col ds-gap-24' : 'flex',
      backgroundStyles,
      getBorderStyles(),
      radioPosition === 'off' && isChecked && !disabled && 'bg-state-soft',
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

    const shadowEffects = radioStyle === 'with-shadow' && !isChecked && !disabled
      ? 'shadow-[inset_0_-1px_0_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.04)]'
      : '';

    const checkedInnerShadow = radioStyle === 'with-shadow' && isChecked && !disabled;
    const iconColor = disabled ? 'var(--icon-default-disabled)' : 'var(--icon-white-default, #FFF)';

    const radioVisual = (
      <div className="height-20 flex items-center shrink-0">
        <div
          className={cn(
            'relative shrink-0 group/radio',
            'width-16 height-16',
            'rounded-full',
            'overflow-hidden',
            'transition-colors',
            disabled
              ? 'bg-checkbox-disabled border-default'
              : isChecked
                ? 'border-none bg-checkbox-active group-hover:bg-checkbox-active-hover'
                : 'border-darker bg-checkbox-default group-hover:border-strong',
            shadowEffects
          )}
        >
          {checkedInnerShadow && (
            <div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: '1px', boxShadow: '0px 1px 0px rgba(255, 255, 255, 0.25) inset' }}
            />
          )}
          {isChecked && (
            <div className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
              <RadioIndicator color={iconColor} />
            </div>
          )}
          {!disabled && !isChecked && (
            <div
              className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ inset: '1px' }}
            >
              <RadioIndicator color="var(--icon-default-disabled)" />
            </div>
          )}
        </div>
      </div>
    );

    const renderContent = () => {
      if (layout === 'horizontal') {
        const supporterSection = sections[0];

        if (radioPosition === 'off') {
          return (
            <div className={textContainerClassName}>
              <div className="flex-1 flex flex-col ds-gap-4">
                <div className={getTitleClassName()}>{title}</div>
                {description && <div className={getDescriptionClassName()}>{description}</div>}
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
            {radioPosition === 'left' && radioVisual}
            <div className={textContainerClassName}>
              <div className="flex-1 flex flex-col ds-gap-4">
                <div className={getTitleClassName()}>{title}</div>
                {description && <div className={getDescriptionClassName()}>{description}</div>}
              </div>
              {supporterSection && (
                <div className={horizontalRightSectionClassName}>
                  <div className={getTitleClassName()}>{supporterSection.title}</div>
                  <div className={getDescriptionClassName()}>{supporterSection.description}</div>
                </div>
              )}
            </div>
            {radioPosition === 'right' && radioVisual}
          </div>
        );
      }

      const mainSection = (
        <div className={sectionClassName}>
          <div className={getTitleClassName()}>{title}</div>
          {description && <div className={getDescriptionClassName()}>{description}</div>}
        </div>
      );

      const additionalSections = sections.map((section, index) => (
        <div key={index} className={sectionClassName}>
          <div className={getTitleClassName()}>{section.title}</div>
          <div className={getDescriptionClassName()}>{section.description}</div>
        </div>
      ));

      if (radioPosition === 'off') {
        return (
          <div className={textContainerClassName}>
            {mainSection}
            {additionalSections}
          </div>
        );
      }

      return (
        <div className={contentRowClassName}>
          {radioPosition === 'left' && radioVisual}
          <div className={textContainerClassName}>
            {mainSection}
            {additionalSections}
          </div>
          {radioPosition === 'right' && radioVisual}
        </div>
      );
    };

    return (
      <RadioGroupPrimitive.Item value={value} disabled={disabled} asChild>
        <label ref={ref} className={cardClassName}>
          {renderContent()}
        </label>
      </RadioGroupPrimitive.Item>
    );
  }
);

RadioCard.displayName = 'RadioCard';

export { RadioCard };
