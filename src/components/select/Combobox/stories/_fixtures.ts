import type { ComboboxOption, ComboboxOptionGroup } from '../Combobox.types';

export const fruitOptions: ComboboxOption[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Date', disabled: true, tooltip: '품절' },
  { id: '5', label: 'Elderberry' },
  { id: '6', label: 'Fig' },
  { id: '7', label: 'Grape' },
  { id: '8', label: 'Honeydew' },
  { id: '9', label: 'Jackfruit' },
  { id: '10', label: 'Kiwi' },
];

export const iconOptions: ComboboxOption[] = [
  { id: 'home', label: 'Home', leadIcon: ['buildings', 'home'] },
  { id: 'settings', label: 'Settings', leadIcon: ['system', 'settings'] },
  { id: 'profile', label: 'Profile', leadIcon: ['user', 'user'] },
  { id: 'notifications', label: 'Notifications', leadIcon: ['others', 'bell'] },
  { id: 'help', label: 'Help', leadIcon: ['system', 'question'] },
];

export const coloredIconOptions: ComboboxOption[] = [
  { id: 'success', label: 'Success', leadIcon: ['system', 'check'], iconColor: 'success' },
  { id: 'warning', label: 'Warning', leadIcon: ['system', 'alert'], iconColor: 'warning' },
  { id: 'error', label: 'Error', leadIcon: ['system', 'close'], iconColor: 'destructive' },
  { id: 'info', label: 'Info', leadIcon: ['editor', 'info-i'], iconColor: 'informative' },
  { id: 'primary', label: 'Primary', leadIcon: ['health', 'heart'], iconColor: 'primary' },
];

export const countryOptions: ComboboxOption[] = [
  { id: 'kr', label: '대한민국', description: '동아시아의 한반도 남부에 위치한 나라' },
  { id: 'jp', label: '일본', description: '동아시아의 섬나라' },
  { id: 'cn', label: '중국', description: '동아시아의 대륙 국가' },
  { id: 'us', label: '미국', description: '북아메리카의 연방 공화국' },
  { id: 'uk', label: '영국', description: '유럽 서부의 섬나라' },
];

export const userOptions: ComboboxOption[] = [
  { id: 'user1', label: '김민수', description: 'minsu@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: '이서연', description: 'seoyeon@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: '박지훈', description: 'jihun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'user4', label: '최수진', description: 'sujin@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'user5', label: '정태현', description: 'taehyun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=charlie' },
];

export const frameworkOptions: ComboboxOption[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte', disabled: true },
  { id: 'next', label: 'Next.js' },
  { id: 'nuxt', label: 'Nuxt' },
  { id: 'remix', label: 'Remix' },
  { id: 'astro', label: 'Astro' },
  { id: 'solid', label: 'SolidJS' },
  { id: 'qwik', label: 'Qwik' },
];

export const employeeOptions: ComboboxOption[] = [
  { id: 'emp-001', label: 'John Doe', description: 'john.doe@company.com', badge: 'EMP-001' },
  { id: 'emp-002', label: 'Jane Smith', description: 'jane.smith@company.com', badge: 'EMP-002' },
  { id: 'emp-003', label: 'Bob Wilson', description: 'bob.wilson@company.com', badge: 'EMP-003' },
  { id: 'emp-004', label: 'Alice Brown', description: 'alice.brown@company.com', badge: 'EMP-004' },
  { id: 'emp-005', label: 'Charlie Davis', description: 'charlie.davis@company.com', badge: 'EMP-005' },
];

export const longTextOptions: ComboboxOption[] = [
  { id: '1', label: 'Extremely long option label that will not fit in a narrow trigger width' },
  { id: '2', label: 'Another lengthy choice with considerable descriptive text' },
  { id: '3', label: 'Short one' },
  { id: '4', label: 'Yet another option with a very verbose name for testing truncation' },
];

// Grouped: frontend / backend / mobile
export const techOptions: ComboboxOption[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'node', label: 'Node.js' },
  { id: 'django', label: 'Django' },
  { id: 'rails', label: 'Ruby on Rails' },
  { id: 'spring', label: 'Spring Boot' },
  { id: 'flutter', label: 'Flutter' },
  { id: 'reactnative', label: 'React Native' },
  { id: 'ios', label: 'iOS (Swift)' },
  { id: 'android', label: 'Android (Kotlin)' },
];

export const techGroups: ComboboxOptionGroup[] = [
  { label: 'Frontend', optionIds: ['react', 'vue', 'angular', 'svelte'] },
  { label: 'Backend', optionIds: ['node', 'django', 'rails', 'spring'] },
  { label: 'Mobile', optionIds: ['flutter', 'reactnative', 'ios', 'android'] },
];
