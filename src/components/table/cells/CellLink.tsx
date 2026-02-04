import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';

interface CellLinkProps {
  href: string;
  label?: string;
  external?: boolean;
  className?: string;
}

export function CellLink({
  href,
  label,
  external = false,
  className,
}: CellLinkProps) {
  const displayLabel = label || href;

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-4 truncate',
        'text-state-primary hover:underline',
        'font-body size-sm',
        className
      )}
    >
      <span className="truncate">{displayLabel}</span>
      {external && (
        <Icon
          iconType={['system', 'external-link']}
          size={12}
        />
      )}
    </a>
  );
}
