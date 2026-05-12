import type {
  CollapsibleProps as RadixCollapsibleProps,
  CollapsibleTriggerProps as RadixCollapsibleTriggerProps,
  CollapsibleContentProps as RadixCollapsibleContentProps,
} from '@radix-ui/react-collapsible';

export type CollapsibleProps = RadixCollapsibleProps;

export type CollapsibleTriggerProps = RadixCollapsibleTriggerProps;

export interface CollapsibleContentProps
  extends RadixCollapsibleContentProps {
  /**
   * When `true`, the content remains mounted in the DOM even when collapsed.
   * Useful for preserving form state, enabling CSS-driven animations,
   * or keeping content accessible to search engines.
   *
   * @default undefined (content is unmounted when collapsed)
   */
  forceMount?: true;
}
