import type {
  HoverCardProps as RadixHoverCardProps,
  HoverCardTriggerProps as RadixHoverCardTriggerProps,
  HoverCardContentProps as RadixHoverCardContentProps,
  HoverCardArrowProps as RadixHoverCardArrowProps,
} from '@radix-ui/react-hover-card';

export type HoverCardProps = RadixHoverCardProps;

export type HoverCardTriggerProps = RadixHoverCardTriggerProps;

export interface HoverCardContentProps
  extends RadixHoverCardContentProps {
  container?: HTMLElement | null;
  /**
   * Custom width for the hover card content.
   * Overrides the default 256px width.
   * @example width={320}
   * @example width="auto"
   */
  width?: number | string;
}

export type HoverCardArrowProps = RadixHoverCardArrowProps;
