import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

import type { AspectRatioProps } from './AspectRatio.types';

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ ratio = 1, ...props }, ref) => (
  <AspectRatioPrimitive.Root ref={ref} ratio={ratio} {...props} />
));
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
