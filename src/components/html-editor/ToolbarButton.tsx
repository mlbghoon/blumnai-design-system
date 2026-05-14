import { memo } from 'react';

import { Button } from '../button';
import type { ButtonStyle } from '../button/Button.types';
import type { RemixiconLikeComponent } from '../icons/Icon/Icon.types';

interface ToolbarButtonProps {
  icon: RemixiconLikeComponent;
  tooltip: string;
  isActive?: boolean;
  onClick: () => void;
  disabled?: boolean;
  /** 비활성 상태 버튼 스타일 (기본: 'soft') */
  inactiveStyle?: ButtonStyle;
}

export const ToolbarButton = memo(function ToolbarButton({
  icon,
  tooltip,
  isActive = false,
  onClick,
  disabled = false,
  inactiveStyle = 'soft',
}: ToolbarButtonProps) {
  return (
    <Button
      variant="iconOnly"
      size="xs"
      buttonStyle={isActive ? 'primary' : inactiveStyle}
      leadIcon={icon}
      tooltip={tooltip}
      tooltipPlacement="top"
      onClick={onClick}
      disabled={disabled}
    />
  );
});
