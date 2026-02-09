import type { ComponentType } from 'react';

/**
 * Template for creating icon stories with proper controls
 * This template can be used to generate stories for individual icons
 */

/**
 * Helper function to check if icon is from file, brands, or flags category
 * These icons should not have color/cursor controls
 */
export const isRestrictedIcon = (componentName: string): boolean => {
  return (
    componentName.includes('FileArchive') ||
    componentName.includes('FileCode') ||
    componentName.includes('Brand') ||
    componentName.includes('Flag')
  );
};

/**
 * Create argTypes for icon stories
 * @param componentName - Name of the icon component
 * @returns argTypes configuration
 */
export const createIconArgTypes = (componentName: string) => {
  const isRestricted = isRestrictedIcon(componentName);
  
  return {
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: {
        category: 'Styling',
      },
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 1 },
      description: 'Icon size in pixels',
      table: {
        category: 'Appearance',
      },
    },
    title: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        category: 'Accessibility',
      },
    },
    ...(isRestricted
      ? {}
      : {
          color: {
            control: 'color',
            description: 'Icon color (applied to fill/color CSS property)',
            table: {
              category: 'Styling',
            },
          },
          cursor: {
            control: { type: 'select' },
            options: ['default', 'pointer', 'not-allowed', 'wait', 'text', 'move', 'grab', 'grabbing'],
            description: 'Cursor style for the icon',
            table: {
              category: 'Styling',
            },
          },
        }),
  };
};

/**
 * Create a render function that respects restricted icon rules
 * @param IconComponent - The icon component to render
 * @param componentName - Name of the icon component
 * @returns Render function
 */
export const createIconRender = <T extends ComponentType<Record<string, unknown>>>(
  IconComponent: T,
  componentName: string
) => {
  const isRestricted = isRestrictedIcon(componentName);

  return (args: Record<string, unknown>) => {
    if (isRestricted) {
      // Remove color and cursor for restricted icons
      const { color: _color, cursor: _cursor, ...restArgs } = args;
      return <IconComponent {...restArgs} />;
    }
    return <IconComponent {...args} />;
  };
};
