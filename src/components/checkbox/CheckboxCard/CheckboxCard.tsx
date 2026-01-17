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
      indeterminate = false,
      disabled = false,
      background = 'default',
      border = 'default',
      checkboxPosition = 'right',
      size = 'md',
      checkboxStyle = 'with-shadow',
      darkMode = false,
      onChange,
      className,
    },
    ref
  ) => {
    // Card container styles
    const cardClassName = cn(
      'w-full p-4 rounded-lg overflow-hidden', // padding: 16px
      layout === 'vertical' ? 'flex flex-col gap-6' : 'flex', // gap: 24px for vertical
      background === 'default'
        ? darkMode
          ? 'bg-white'
          : 'bg-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]'
        : 'bg-[rgba(39,39,42,0.06)]',
      border === 'selected'
        ? 'outline outline-2 outline-[#437DFC] outline-offset-[-2px]'
        : background === 'default'
          ? disabled
            ? 'outline outline-1 outline-[rgba(39,39,42,0.10)] outline-offset-[-1px]'
            : 'outline outline-1 outline-[rgba(39,39,42,0.15)] outline-offset-[-1px]'
          : '',
      className
    );

    // Content row (checkbox + text)
    const contentRowClassName = cn(
      'flex items-start gap-2.5', // gap: 10px
      layout === 'horizontal' && 'w-full'
    );

    // Text container
    const textContainerClassName =
      layout === 'vertical'
        ? 'flex-1 flex flex-col gap-6' // gap: 24px between sections
        : 'flex-1 flex items-start'; // horizontal: row layout

    // Section container
    const sectionClassName = 'flex flex-col gap-1'; // gap: 4px between title and description

    // Horizontal layout: right section (Supporter)
    const horizontalRightSectionClassName = cn(
      'flex flex-col items-end gap-1', // gap: 4px, textAlign: right
      'text-right'
    );

    // Title styles
    const getTitleClassName = () => {
      return cn(
        'text-sm font-medium leading-5', // fontSize: 14, fontWeight: 500, lineHeight: 20
        disabled
          ? 'text-[rgba(39,39,42,0.30)]'
          : darkMode
            ? 'text-white'
            : 'text-[#111115]'
      );
    };

    // Description styles
    const getDescriptionClassName = () => {
      return cn(
        'text-sm font-normal leading-5', // fontSize: 14, fontWeight: 400, lineHeight: 20
        disabled
          ? 'text-[rgba(39,39,42,0.30)]'
          : darkMode
            ? 'text-[rgba(255,255,255,0.6)]'
            : 'text-[#4E4E55]'
      );
    };

    // Checkbox wrapper (20x20px container for alignment)
    const checkboxWrapperClassName = 'w-5 h-5 flex items-center justify-center shrink-0';

    // Checkbox element
    const checkboxElement = (
      <div className={checkboxWrapperClassName}>
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          size={size}
          style={checkboxStyle}
          darkMode={darkMode}
          onChange={(e) => {
            onChange?.(e.target.checked);
          }}
          className="m-0"
        />
      </div>
    );

    // Render content based on layout
    const renderContent = () => {
      if (layout === 'horizontal') {
        // Horizontal layout: Title/Description on left, Supporter on right
        const supporterSection = sections[0]; // First section is used as right side content

        return (
          <div className={contentRowClassName}>
            {checkboxPosition === 'left' && checkboxElement}
            <div className={textContainerClassName}>
              {/* Left section: Title/Description */}
              <div className="flex-1 flex flex-col gap-1">
                <div className={getTitleClassName()}>{title}</div>
                <div className={getDescriptionClassName()}>{description}</div>
              </div>
              {/* Right section: Supporter (if provided) */}
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

      // Vertical layout: sections stacked vertically
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
