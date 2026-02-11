import { forwardRef, Suspense } from 'react';
import type { ComponentType } from 'react';

import { getFileSync, getFileLazy, hasFile } from './file-registry';
import type { FileIconProps, FileVariant, FileSize } from './FileIcon.types';

/** fileType과 size를 레지스트리 키로 변환: 'pdf' + 'lg' -> 'pdf__lg' */
function toRegistryKey(fileType: FileVariant, size: FileSize): string {
  const normalizedType = fileType.replace('thumbnail-', 'thumbnail ');
  return `${normalizedType}__${size}`;
}

/** 사이즈 variant를 픽셀 크기로 매핑 */
const sizeMap: Record<FileSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
};

/** 파일 타입 아이콘 컴포넌트. Figma 디자인과 동일하게 표시 */
export const FileIcon = forwardRef<SVGSVGElement, FileIconProps>(({
  fileType,
  size = 'md',
  className,
  src,
  ...props
}, ref) => {
  const registryKey = toRegistryKey(fileType, size);
  const pixelSize = sizeMap[size];

  if (!hasFile(registryKey)) {
    console.warn(`FileIcon: Unknown file type "${fileType}" with size "${size}"`);
    return null;
  }

  const fallback = <div style={{ width: pixelSize, height: pixelSize, display: 'inline-block' }} />;

  const isThumbnail = fileType.startsWith('thumbnail');
  const thumbnailProps = isThumbnail && src ? { imageSrc: src } : {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (getFileSync(registryKey) || getFileLazy(registryKey)) as ComponentType<any> | null;
  if (!IconComponent) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <IconComponent
        ref={ref}
        size={pixelSize}
        className={className}
        {...thumbnailProps}
        {...props}
      />
    </Suspense>
  );
});

FileIcon.displayName = 'FileIcon';
