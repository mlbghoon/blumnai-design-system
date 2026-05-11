import { Button, Input, Chip, Select } from '@blumnai-studio/blumnai-design-system';

export function MyComponent() {
  return (
    <>
      <Button leadIcon={['system', 'add']}>추가</Button>
      <Button tailIcon={['arrows', 'arrow-right']}>다음</Button>
      <Button leadIcon={['system', 'check']} tailIcon={['arrows', 'arrow-right']}>완료</Button>
      <Chip icon={['health', 'heart', true]} label="찜" />
      <Input leadIcon={['system', 'search']} placeholder="검색..." />
      <Select leadIcon={['system', 'filter']} placeholder="필터" options={[]} />
    </>
  );
}
