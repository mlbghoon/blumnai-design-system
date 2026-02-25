import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

export type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;

export type HoverCardTriggerProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>;

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  container?: HTMLElement | null;
  /**
   * Custom width for the hover card content.
   * Overrides the default 256px width.
   * @example width={320}
   * @example width="auto"
   */
  width?: number | string;
}

export type HoverCardArrowProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Arrow>;
