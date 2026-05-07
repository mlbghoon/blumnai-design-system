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

import type { FileUploadAreaProps, FileError } from './FileUpload.types';

const DEFAULT_TITLE = '파일을 여기에 놓거나';
const DEFAULT_CLICK_TEXT = '클릭하여 찾아보기';
const DEFAULT_DESCRIPTION = '최대 10개 파일, 총 100MB 제한';

/**
 * FileUploadArea 컴포넌트
 *
 * 드래그 앤 드롭 파일 업로드 영역입니다. 파일 타입/크기 제한을 지원합니다.
 *
 * @example
 * ```tsx
 * <FileUploadArea
 *   accept="image/*,.pdf"
 *   maxFiles={5}
 *   onFilesSelected={handleFiles}
 * />
 * ```
 */
export const FileUploadArea = forwardRef<HTMLDivElement, FileUploadAreaProps>(({
  onFilesSelected,
  onValidationError,
  onDragEnter,
  onDragLeave,
  accept,
  maxFiles,
  maxSize,
  maxFileSize,
  multiple = true,
  title = DEFAULT_TITLE,
  clickText = DEFAULT_CLICK_TEXT,
  description = DEFAULT_DESCRIPTION,
  icon = ['system', 'upload-cloud'],
  compact = false,
  disabled = false,
  error,
  caption,
  className,
  width,
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const effectiveDragging = isDragging && !disabled;

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

  const validateAndEmit = useCallback((fileArray: File[], source: 'click' | 'drop') => {
    const errors: FileError[] = [];
    let validFiles = fileArray;

    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const rejected = validFiles.filter(file => {
        return !acceptedTypes.some(acceptType => {
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
      if (rejected.length > 0) {
        rejected.forEach(f => {
          errors.push({ file: f, code: 'invalid-type', message: `"${f.name}" 파일은 지원하지 않는 형식입니다` });
        });
        validFiles = validFiles.filter(f => !rejected.includes(f));
      }
    }

    if (maxFileSize !== undefined) {
      const oversized = validFiles.filter(f => f.size > maxFileSize);
      if (oversized.length > 0) {
        oversized.forEach(f => {
          errors.push({ file: f, code: 'file-too-large', message: `"${f.name}" 파일이 ${maxFileSize} 바이트를 초과합니다` });
        });
        validFiles = validFiles.filter(f => f.size <= maxFileSize);
      }
    }

    if (maxFiles !== undefined && validFiles.length > maxFiles) {
      errors.push({ code: 'too-many-files', message: `최대 ${maxFiles}개 파일만 허용됩니다` });
      validFiles = validFiles.slice(0, maxFiles);
    }

    if (maxSize !== undefined) {
      const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > maxSize) {
        errors.push({ code: 'total-size-exceeded', message: `총 파일 크기가 ${maxSize} 바이트를 초과합니다` });
        validFiles = [];
      }
    }

    if (errors.length > 0) {
      onValidationError?.(errors);
    }

    if (validFiles.length > 0) {
      onFilesSelected?.(validFiles, source);
    }
  }, [accept, maxFileSize, maxFiles, maxSize, onValidationError, onFilesSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    validateAndEmit(fileArray, 'click');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [validateAndEmit]);

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
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
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

    if (!multiple) {
      fileArray = fileArray.slice(0, 1);
    }

    validateAndEmit(fileArray, 'drop');
  }, [disabled, multiple, onDragLeave, validateAndEmit]);

  const getStateClassName = () => {
    if (disabled) return FILE_UPLOAD_AREA_STATE.disabled;
    if (error) return FILE_UPLOAD_AREA_STATE.error;
    if (effectiveDragging) return FILE_UPLOAD_AREA_STATE.dragging;
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
          compact ? 'flex-row padding-12 ds-gap-10' : FILE_UPLOAD_AREA_PADDING,
          getStateClassName()
        )}
        aria-disabled={disabled}
        aria-label={clickText ? [title, clickText].filter(Boolean).join(' ') : title || DEFAULT_TITLE}
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
          size={compact ? 24 : FILE_UPLOAD_AREA_ICON_SIZE}
          color={disabled ? 'default-disabled' : 'default-muted'}
          className="flex-shrink-0"
        />

        <div className={cn('flex flex-col ds-gap-4', !compact && 'items-center')}>
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
