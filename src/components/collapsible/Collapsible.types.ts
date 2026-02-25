import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

export type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;

export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>;

export interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
  /**
   * When `true`, the content remains mounted in the DOM even when collapsed.
   * Useful for preserving form state, enabling CSS-driven animations,
   * or keeping content accessible to search engines.
   *
   * @default undefined (content is unmounted when collapsed)
   */
  forceMount?: true;
}
