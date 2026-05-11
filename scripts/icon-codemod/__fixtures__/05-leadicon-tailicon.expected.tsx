import {
  Button,
  Chip,
  Input,
  RiAddLine,
  RiArrowRightLine,
  RiCheckLine,
  RiFilterLine,
  RiHeartFill,
  RiSearchLine,
  Select,
} from '@blumnai-studio/blumnai-design-system';

export function MyComponent() {
  return (
    <>
      <Button leadIcon={RiAddLine}>추가</Button>
      <Button tailIcon={RiArrowRightLine}>다음</Button>
      <Button leadIcon={RiCheckLine} tailIcon={RiArrowRightLine}>완료</Button>
      <Chip icon={RiHeartFill} label="찜" />
      <Input leadIcon={RiSearchLine} placeholder="검색..." />
      <Select leadIcon={RiFilterLine} placeholder="필터" options={[]} />
    </>
  );
}
