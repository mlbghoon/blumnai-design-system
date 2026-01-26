import type { SVGProps } from 'react';

/**
 * Available file icon variants
 */
export type FileVariant =
  | 'archive'
  | 'code'
  | 'default'
  | 'image'
  | 'music'
  | 'pdf'
  | 'thumbnail-1:1'
  | 'thumbnail-4:3'
  | 'video';

/**
 * Available file icon sizes
 */
export type FileSize = 'sm' | 'md' | 'lg';

export interface FileIconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'cursor' | 'focusable'> {
  /**
   * File type variant
   */
  fileType: FileVariant;
  /**
   * Icon size
   * @default 'md'
   */
  size?: FileSize;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Image source URL for thumbnail types
   * Only applies to 'thumbnail-1:1' and 'thumbnail-4:3' types
   */
  src?: string;
}
