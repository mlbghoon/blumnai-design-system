import { Icon, RiAddLine, RiCheckFill, RiHeartFill } from '@blumnai-studio/blumnai-design-system';

export function MyComponent() {
  return (
    <div>
      <Icon icon={RiCheckFill} />
      <Icon icon={RiHeartFill} size={20} />
      <Icon icon={RiAddLine} />
    </div>
  );
}
