import { Button, Dialog, Icon, RiCheckLine } from '@blumnai-studio/blumnai-design-system';
import { useState } from 'react';

export function MyComponent() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open}>
      <Icon icon={RiCheckLine} size={16} />
      <Button onClick={() => setOpen(false)}>닫기</Button>
    </Dialog>
  );
}
