import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  ratio?: number;
}
