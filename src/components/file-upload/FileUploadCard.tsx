import { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  RiImageLine,
  RiMovieLine,
  RiMusicLine,
  RiFilePdfLine,
  RiFileWordLine,
  RiFileExcelLine,
  RiFilePptLine,
  RiFileZipLine,
  RiCodeSLine,
  RiFileTextLine,
  RiFileLine,
  RiRefreshLine,
  RiCloseLine,
} from '@remixicon/react';

import { Icon } from '../icons/Icon';
import { ControlButton } from '../button/ControlButton';
import { cn } from '../../lib/utils';
import {
  FILE_UPLOAD_CARD_BASE,
  FILE_UPLOAD_CARD_SIZE,
  FILE_UPLOAD_CARD_THUMBNAIL_HEIGHT_PX,
  FILE_UPLOAD_CARD_THUMBNAIL_MAX_ASPECT,
  FILE_UPLOAD_THUMBNAIL,
  FILE_UPLOAD_CONTENT,
  FILE_UPLOAD_FILENAME,
  FILE_UPLOAD_META,
  FILE_UPLOAD_META_DIVIDER,
  FILE_UPLOAD_STATUS_TEXT,
  FILE_UPLOAD_STATUS_LABEL,
  FILE_UPLOAD_PROGRESS_TRACK,
  FILE_UPLOAD_PROGRESS_FILL,
  FILE_UPLOAD_ACTIONS,
  FILE_UPLOAD_CARD_ICON_SIZE,
} from '../../constants/file-upload/file-upload.constants';

import type { FileUploadCardProps } from './FileUpload.types';
import type { RemixiconLikeComponent } from '../icons/Icon/Icon.types';

function formatFileSize(bytes: number): string {
  if (bytes <= 0 || !Number.isFinite(bytes)) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

function getFileTypeIcon(mimeType: string): RemixiconLikeComponent {
  if (mimeType.startsWith('image/')) return RiImageLine;
  if (mimeType.startsWith('video/')) return RiMovieLine;
  if (mimeType.startsWith('audio/')) return RiMusicLine;
  if (mimeType === 'application/pdf') return RiFilePdfLine;
  if (mimeType.includes('word') || mimeType.includes('document')) return RiFileWordLine;
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return RiFileExcelLine;
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return RiFilePptLine;
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('archive') || mimeType.includes('compressed') || mimeType.includes('tar') || mimeType.includes('gzip')) return RiFileZipLine;
  if (mimeType === 'application/json' || mimeType === 'application/xml' || mimeType === 'application/javascript' || mimeType === 'application/typescript') return RiCodeSLine;
  if (mimeType.startsWith('text/html') || mimeType.startsWith('text/css') || mimeType.startsWith('text/javascript') || mimeType.startsWith('text/xml')) return RiCodeSLine;
  if (mimeType.startsWith('text/csv')) return RiFileExcelLine;
  if (mimeType.startsWith('text/')) return RiFileTextLine;
  return RiFileLine;
}

export const FileUploadCard = forwardRef<HTMLDivElement, FileUploadCardProps>(({
  file,
  thumbnail,
  status,
  progress = 0,
  errorMessage,
  size = 'lg',
  hideSize = false,
  hideFilename = false,
  onRemove,
  onRetry,
  className,
}, ref) => {
  const sizeConfig = FILE_UPLOAD_CARD_SIZE[size];
  const iconSize = FILE_UPLOAD_CARD_ICON_SIZE[size];
  const thumbH = FILE_UPLOAD_CARD_THUMBNAIL_HEIGHT_PX[size];

  const fileTypeIcon = useMemo(() => getFileTypeIcon(file.type), [file.type]);
  // size span 표시 여부: 명시적으로 hideSize 이거나, file.size 가 undefined 면 숨긴다.
  const shouldShowSize = !hideSize && typeof file.size === 'number';
  const formattedSize = useMemo(
    () => (shouldShowSize ? formatFileSize(file.size as number) : null),
    [shouldShowSize, file.size],
  );

  const statusLabel = status === 'error' && errorMessage ? errorMessage : FILE_UPLOAD_STATUS_LABEL[status];

  // 이미지 원본 비율 → [1, MAX_ASPECT] 로 clamp. 초기값 1 = 1:1 square.
  const [imageAspect, setImageAspect] = useState(1);
  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      const natural = img.naturalWidth / img.naturalHeight;
      setImageAspect(
        Math.max(1, Math.min(FILE_UPLOAD_CARD_THUMBNAIL_MAX_ASPECT, natural)),
      );
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        FILE_UPLOAD_CARD_BASE,
        sizeConfig.container,
        className
      )}
    >
      {thumbnail ? (
        <div
          className={FILE_UPLOAD_THUMBNAIL}
          style={{
            height: thumbH,
            minWidth: thumbH,
            maxWidth: thumbH * FILE_UPLOAD_CARD_THUMBNAIL_MAX_ASPECT,
            aspectRatio: imageAspect,
          }}
        >
          <img
            src={thumbnail}
            alt={file.name}
            onLoad={handleImageLoad}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={cn(FILE_UPLOAD_THUMBNAIL, sizeConfig.thumbnail)}>
          <Icon
            icon={fileTypeIcon}
            size={iconSize}
            color="default-muted"
          />
        </div>
      )}

      <div className={FILE_UPLOAD_CONTENT}>
        {!hideFilename && (
          <span className={FILE_UPLOAD_FILENAME} title={file.name}>
            {file.name}
          </span>
        )}

        {status === 'uploading' ? (
          <div className={FILE_UPLOAD_PROGRESS_TRACK}>
            <div
              className={FILE_UPLOAD_PROGRESS_FILL}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        ) : (
          <div className={FILE_UPLOAD_META}>
            {shouldShowSize && (
              <>
                <span>{formattedSize}</span>
                <span className={FILE_UPLOAD_META_DIVIDER}>|</span>
              </>
            )}
            <span className={FILE_UPLOAD_STATUS_TEXT[status]}>
              {statusLabel}
            </span>
          </div>
        )}
      </div>

      <div className={FILE_UPLOAD_ACTIONS}>
        {status === 'error' && onRetry && (
          <ControlButton
            icon={RiRefreshLine}
            size="sm"
            onClick={onRetry}
            aria-label="Retry upload"
          />
        )}
        {onRemove && (
          <ControlButton
            icon={RiCloseLine}
            size="sm"
            onClick={onRemove}
            aria-label="Remove file"
          />
        )}
      </div>
    </div>
  );
});

FileUploadCard.displayName = 'FileUploadCard';
