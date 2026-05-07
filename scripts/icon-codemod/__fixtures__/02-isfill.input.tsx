import { Icon } from '@blumnai-studio/blumnai-design-system';

export function MyComponent() {
  return (
    <div>
      <Icon iconType={['system', 'check']} isFill />
      <Icon iconType={['health', 'heart']} isFill={true} size={20} />
      <Icon iconType={['system', 'add']} isFill={false} />
    </div>
  );
}
