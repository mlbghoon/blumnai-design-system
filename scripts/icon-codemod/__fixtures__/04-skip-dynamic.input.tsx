import { Icon } from '@blumnai-studio/blumnai-design-system';
import type { IconType } from '@blumnai-studio/blumnai-design-system';

export function MyComponent({ iconType }: { iconType: IconType }) {
  // These should NOT be transformed (dynamic):
  return (
    <div>
      <Icon iconType={iconType} />
      <Icon iconType={getIconType()} />
      <Icon iconType={cond ? ['system', 'check'] : ['system', 'add']} />
    </div>
  );
}

function getIconType(): IconType {
  return ['system', 'check'];
}

declare const cond: boolean;
