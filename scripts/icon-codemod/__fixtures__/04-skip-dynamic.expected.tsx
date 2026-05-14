import { Icon } from '@blumnai-studio/blumnai-design-system';
import type { IconType } from '@blumnai-studio/blumnai-design-system';

export function MyComponent({ iconType }: { iconType: IconType }) {
  // 동적 케이스이므로 codemod 변환 대상에서 제외
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
