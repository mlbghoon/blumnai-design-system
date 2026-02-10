import { forwardRef, useRef, useState, useCallback } from 'react';

import { Icon } from '../icons/Icon';
import { parseIconTypeWithFill } from '../icons/Icon/Icon.types';
import { cn } from '../../lib/utils';
import {
  FILE_UPLOAD_AREA_BASE,
  FILE_UPLOAD_AREA_STATE,
  FILE_UPLOAD_AREA_PADDING,
  FILE_UPLOAD_AREA_TITLE,
  FILE_UPLOAD_AREA_TITLE_DISABLED,
  FILE_UPLOAD_AREA_CLICK_TEXT,
  FILE_UPLOAD_AREA_CLICK_TEXT_DISABLED,
  FILE_UPLOAD_AREA_DESC,
  FILE_UPLOAD_AREA_DESC_DISABLED,
  FILE_UPLOAD_AREA_CAPTION,
  FILE_UPLOAD_AREA_ERROR_CAPTION,
  FILE_UPLOAD_AREA_ICON_SIZE,
} from '../../constants/file-upload/file-upload.constants';

import type { FileUploadAreaProps } from './FileUpload.types';

const DEFAULT_TITLE = 'Drop your files here, or';
const DEFAULT_CLICK_TEXT = 'click to browse';
const DEFAULT_DESCRIPTION = 'Up to 10 files, 100MB total limit';

/**
 * FileUploadArea 컴포넌트
 *
 * 드래그 앤 드롭 파일 업로드 영역입니다. 파일 타입/크기 제한을 지원합니다.
 *
 * @example
 * <FileUploadArea
 *   accept={{ 'image/*': ['.png', '.jpg'] }}
 *   maxFiles={5}
 *   onFilesSelected={handleFiles}
 * />
 */
export const FileUploadArea = forwardRef<HTMLDivElement, FileUploadAreaProps>(({
  onFilesSelected,
  onDragEnter,
  onDragLeave,
  accept,
  maxFiles,
  maxSize,
  multiple = true,
  title = DEFAULT_TITLE,
  clickText = DEFAULT_CLICK_TEXT,
  description = DEFAULT_DESCRIPTION,
  icon = ['system', 'upload-cloud'],
  disabled = false,
  error,
  caption,
  className,
  width,
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  }, [disabled]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let fileArray = Array.from(files);

    if (maxFiles && fileArray.length > maxFiles) {
      fileArray = fileArray.slice(0, maxFiles);
    }

    if (maxSize) {
      const totalSize = fileArray.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > maxSize) {
        return;
      }
    }

    onFilesSelected?.(fileArray);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [maxFiles, maxSize, onFilesSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
    onDragEnter?.();
  }, [disabled, onDragEnter]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(false);
    onDragLeave?.();
  }, [disabled, onDragLeave]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    setIsDragging(false);
    onDragLeave?.();

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    let fileArray = Array.from(files);

    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      fileArray = fileArray.filter(file => {
        return acceptedTypes.some(acceptType => {
          if (acceptType.startsWith('.')) {
            return file.name.toLowerCase().endsWith(acceptType.toLowerCase());
          }
          if (acceptType.endsWith('/*')) {
            const baseType = acceptType.slice(0, -2);
            return file.type.startsWith(baseType);
          }
          return file.type === acceptType;
        });
      });
    }

    if (maxFiles && fileArray.length > maxFiles) {
      fileArray = fileArray.slice(0, maxFiles);
    }

    if (maxSize) {
      const totalSize = fileArray.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > maxSize) {
        return;
      }
    }

    if (fileArray.length > 0) {
      onFilesSelected?.(fileArray);
    }
  }, [accept, disabled, maxFiles, maxSize, onDragLeave, onFilesSelected]);

  const getStateClassName = () => {
    if (disabled) return FILE_UPLOAD_AREA_STATE.disabled;
    if (error) return FILE_UPLOAD_AREA_STATE.error;
    if (isDragging) return FILE_UPLOAD_AREA_STATE.dragging;
    return FILE_UPLOAD_AREA_STATE.default;
  };

  const { iconType, isFill } = parseIconTypeWithFill(icon);

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const errorText = typeof error === 'string' && error.length > 0 ? error : undefined;
  const captionText = errorText || caption;
  const showCaption = captionText !== undefined && captionText.length > 0;

  const containerStyle = width !== undefined
    ? { width: typeof width === 'number' ? `${width}px` : /^\d+$/.test(width) ? `${width}px` : width }
    : undefined;

  const titleClassName = disabled ? FILE_UPLOAD_AREA_TITLE_DISABLED : FILE_UPLOAD_AREA_TITLE;
  const clickTextClassName = disabled ? FILE_UPLOAD_AREA_CLICK_TEXT_DISABLED : FILE_UPLOAD_AREA_CLICK_TEXT;
  const descClassName = disabled ? FILE_UPLOAD_AREA_DESC_DISABLED : FILE_UPLOAD_AREA_DESC;

  return (
    <div
      ref={ref}
      className={cn('flex flex-col', width === undefined && 'w-full', className)}
      style={containerStyle}
    >
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          FILE_UPLOAD_AREA_BASE,
          FILE_UPLOAD_AREA_PADDING,
          getStateClassName()
        )}
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="sr-only"
          disabled={disabled}
        />

        <Icon
          iconType={iconType}
          isFill={isFill}
          size={FILE_UPLOAD_AREA_ICON_SIZE}
          color={disabled ? 'default-disabled' : 'default-muted'}
        />

        <div className="flex flex-col items-center gap-4">
          <span className={titleClassName}>
            {title}
            {clickText && (
              <>
                {' '}
                <span className={clickTextClassName}>{clickText}</span>
              </>
            )}
          </span>
          <span className={descClassName}>{description}</span>
        </div>
      </div>

      {showCaption && (
        <div className={cn('margin-t-6', hasError ? FILE_UPLOAD_AREA_ERROR_CAPTION : FILE_UPLOAD_AREA_CAPTION)}>
          {captionText}
        </div>
      )}
    </div>
  );
});

FileUploadArea.displayName = 'FileUploadArea';
