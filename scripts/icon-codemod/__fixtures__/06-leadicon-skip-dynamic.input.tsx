import { Button } from '@blumnai-studio/blumnai-design-system';

export function MyComponent({ isOpen, dynamicIcon }: { isOpen: boolean; dynamicIcon: [string, string] }) {
  return (
    <>
      <Button leadIcon={['system', 'add']}>static</Button>
      <Button leadIcon={isOpen ? ['arrows', 'arrow-up-s'] : ['arrows', 'arrow-down-s']}>conditional</Button>
      <Button leadIcon={dynamicIcon}>variable</Button>
      <Button leadIcon={['system', 'check', true]}>fill</Button>
    </>
  );
}
