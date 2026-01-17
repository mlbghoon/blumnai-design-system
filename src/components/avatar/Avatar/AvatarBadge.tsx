import { useMemo } from 'react';

import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import { sizes, statusBadgePositions } from './Avatar.constants';
import type { AvatarBadgeLocation, AvatarShape, AvatarSize, AvatarStatus } from './Avatar.types';

interface AvatarBadgeProps {
  status: AvatarStatus;
  size: AvatarSize;
  shape: AvatarShape;
  badgeLocation: AvatarBadgeLocation;
  darkMode: boolean;
  logoImage?: string;
  icon?: string;
  color?: string;
}

/**
 * Avatar Badge component
 *
 * Displays status indicators (online, offline, notification, checkmark, logo, icon)
 * positioned at the top-right or bottom-right corner of the avatar.
 */
export const AvatarBadge = ({
  status,
  size,
  shape,
  badgeLocation,
  darkMode,
  logoImage,
  icon,
  color,
}: AvatarBadgeProps) => {
  const badgeSize = sizes[size].statusBadge;

  const statusBadgeStyle = useMemo(() => {
    const position = statusBadgePositions[size]?.[shape];
    if (!position) {
      return {
        width: `${badgeSize}px`,
        height: `${badgeSize}px`,
      };
    }

    const isBottom = badgeLocation === 'bottom';
    return {
      width: `${badgeSize}px`,
      height: `${badgeSize}px`,
      right: `0px`,
      ...(isBottom ? { bottom: `0px`, top: 'auto' } : { top: `0px` }),
    };
  }, [size, shape, badgeLocation, badgeSize]);

  const innerSize = useMemo(() => {
    // Inner elements (checkmark, logo, icon) are at 8.33% inset, so size is badgeSize * (1 - 2 * 0.0833) = badgeSize * 0.8334
    return badgeSize * 0.8334;
  }, [badgeSize]);

  const ringColor = darkMode ? '#18181b' : '#ffffff';

  // Checkmark badge doesn't use border, others do
  const containerClassName = useMemo(() => {
    if (status === 'checkmark') {
      return cn(
        'absolute flex items-center justify-center shrink-0 pointer-events-none bg-transparent overflow-visible'
      );
    }
    return cn(
      'absolute flex items-center justify-center shrink-0 pointer-events-none rounded-full  bg-transparent overflow-hidden'
    );
  }, [status]);


  return (
    <div
      className={containerClassName}
      style={statusBadgeStyle}
    >
      {/* Online badge: Single SVG with white outer and green inner circle */}
      {status === 'online' && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
        >
          <circle cx="12" cy="12" r="9" fill={ringColor} />
          <circle cx="12" cy="12" r="7" fill="#90CD22" />
        </svg>
      )}

      {/* Offline badge: Single SVG with white outer and dark inner circle with opacity */}
      {status === 'offline' && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
        >
          <circle cx="12" cy="12" r="9" fill={ringColor} />
          <circle cx="12" cy="12" r="7" fill="#27272A" fillOpacity="0.35" />
        </svg>
      )}

      {/* Notification badge: Single SVG with white outer and red inner circle */}
      {status === 'notification' && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
        >
          <circle cx="12" cy="12" r="9" fill={ringColor} />
          <circle cx="12" cy="12" r="7" fill="#E74341" />
        </svg>
      )}

      {/* Checkmark badge: Single SVG with multiple paths */}
      {status === 'checkmark' && (
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
          >
            {/* White wavy star shape (outer border) */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.162087 8.91257L0.457446 8.00017L0.162088 7.08777C-0.34076 5.53442 0.358689 3.8458 1.81265 3.10297L2.66665 2.66665L3.10297 1.81265C3.8458 0.358692 5.53442 -0.34076 7.08777 0.162088L8.00017 0.457446L8.91257 0.162087C10.466 -0.340756 12.1545 0.358699 12.8974 1.81262L13.3337 2.66664L14.1877 3.10296C15.6417 3.84579 16.3411 5.53442 15.8383 7.08776L15.5429 8.00017L15.8383 8.91255C16.3411 10.4659 15.6417 12.1545 14.1878 12.8974L13.3337 13.3337L12.8974 14.1877C12.1546 15.6416 10.466 16.3411 8.91259 15.8383L8.00017 15.5429L7.08779 15.8383C5.53445 16.3411 3.8458 15.6417 3.10297 14.1877L2.66664 13.3337L1.8127 12.8974C0.35878 12.1546 -0.340756 10.466 0.162087 8.91257Z"
              fill="white"
            />
            {/* Blue checkmark (inner) */}
            <path
              d="M6.67759 1.4307C5.74717 1.12951 4.73572 1.54846 4.29077 2.41936L3.75586 3.46636C3.6923 3.59076 3.59113 3.69194 3.46672 3.7555L2.41973 4.29041C1.54883 4.73535 1.12988 5.7468 1.43107 6.67722L1.79317 7.7958C1.8362 7.9287 1.8362 8.07183 1.79317 8.20473L1.43107 9.32331C1.12988 10.2538 1.54883 11.2652 2.41973 11.7102L3.46672 12.245C3.59113 12.3086 3.6923 12.4098 3.75586 12.5342L4.29077 13.5812C4.73572 14.4521 5.74717 14.8711 6.67759 14.5699L7.79617 14.2077C7.92907 14.1647 8.07219 14.1647 8.20509 14.2077L9.32367 14.5699C10.2541 14.8711 11.2655 14.4521 11.7105 13.5812L12.2454 12.5342C12.309 12.4098 12.4102 12.3086 12.5346 12.245L13.5816 11.7102C14.4525 11.2652 14.8714 10.2538 14.5702 9.32331L14.2081 8.20473C14.1651 8.07183 14.1651 7.9287 14.2081 7.7958L14.5702 6.67722C14.8714 5.7468 14.4525 4.73535 13.5816 4.29041L12.5346 3.7555C12.4102 3.69194 12.309 3.59076 12.2454 3.46636L11.7105 2.41936C11.2655 1.54846 10.2541 1.12951 9.32367 1.4307L8.20509 1.79281C8.07219 1.83582 7.92907 1.83583 7.79617 1.79281L6.67759 1.4307ZM4.52193 7.83915L5.46075 6.90027L7.33838 8.77796L11.0937 5.02269L12.0325 5.9615L7.33838 10.6556L4.52193 7.83915Z"
              fill="#437DFC"
            />
          </svg>
        </div>
      )}

      {/* Logo badge: Outer white circle + Inner logo image */}
      {status === 'logo' && (
        <>
          {/* White circle ring - centered */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
          >
            <circle cx="12" cy="12" r="12" fill={ringColor} />
          </svg>
          {/* Logo image - centered */}
          {logoImage && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
              <img
                src={logoImage}
                alt=""
                className="object-cover"
                style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
              />
            </div>
          )}
        </>
      )}

      {/* Icon badge: Outer white circle + Inner icon */}
      {status === 'icon' && (
        <>
          {/* White circle ring - centered */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
          >
            <circle cx="12" cy="12" r="12" fill={ringColor} />
          </svg>
          {/* Icon - centered */}
          {icon && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
              <IconLoader
                type={icon}
                size={innerSize}
                color={color}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
