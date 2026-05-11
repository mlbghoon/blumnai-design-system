import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiArrowGoBackLine, RiArrowGoForwardLine, RiBugLine, RiClipboardLine, RiCloseLine, RiDeleteBinLine, RiFileAddLine, RiFileCopyLine, RiFolderAddLine, RiFolderOpenLine, RiInformationLine, RiLink, RiMailLine, RiQuestionLine, RiSaveLine, RiScissorsLine } from '../../icons/Icon';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarRadioGroup,
  MenubarLabel,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '../Menubar';
import type { MenubarProps } from '../Menubar.types';

const meta: Meta<MenubarProps> = {
  title: 'Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<MenubarProps>;

/**
 * 기본 Menubar
 *
 * 수평 앱 네비게이션 메뉴입니다. 화살표 키로 메뉴 간 이동이 가능합니다.
 *
 * MenubarItem의 상세 props는 MenuItem 스토리에서 테스트할 수 있습니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  render: function Render() {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘N">새 파일</MenubarItem>
            <MenubarItem shortcut="⌘O">열기</MenubarItem>
            <MenubarItem shortcut="⌘S">저장</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘Q">종료</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>편집</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘Z">실행 취소</MenubarItem>
            <MenubarItem shortcut="⇧⌘Z">다시 실행</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘X">잘라내기</MenubarItem>
            <MenubarItem shortcut="⌘C">복사</MenubarItem>
            <MenubarItem shortcut="⌘V">붙여넣기</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>보기</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarItem>확대</MenubarItem>
            <MenubarItem>축소</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>전체 화면</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 아이콘이 있는 메뉴
 *
 * 각 메뉴 아이템에 아이콘을 추가할 수 있습니다.
 */
export const WithIcons: Story = {
  render: function Render() {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={RiFileAddLine} shortcut="⌘N">
              새 파일
            </MenubarItem>
            <MenubarItem leadIcon={RiFolderOpenLine} shortcut="⌘O">
              열기
            </MenubarItem>
            <MenubarItem leadIcon={RiSaveLine} shortcut="⌘S">
              저장
            </MenubarItem>
            <MenubarItem leadIcon={RiSaveLine} shortcut="⇧⌘S">
              다른 이름으로 저장...
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiCloseLine} shortcut="⌘Q">
              종료
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>편집</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={RiArrowGoBackLine} shortcut="⌘Z">
              실행 취소
            </MenubarItem>
            <MenubarItem leadIcon={RiArrowGoForwardLine} shortcut="⇧⌘Z">
              다시 실행
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiScissorsLine} shortcut="⌘X">
              잘라내기
            </MenubarItem>
            <MenubarItem leadIcon={RiFileCopyLine} shortcut="⌘C">
              복사
            </MenubarItem>
            <MenubarItem leadIcon={RiClipboardLine} shortcut="⌘V">
              붙여넣기
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiDeleteBinLine} destructive>
              삭제
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 체크박스 메뉴
 *
 * View 메뉴에서 체크박스를 사용하여 옵션을 토글할 수 있습니다.
 */
export const WithCheckboxItems: Story = {
  render: function Render() {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>보기</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarLabel>화면 구성</MenubarLabel>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              상태 표시줄
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              활동 표시줄
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              패널
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 라디오 메뉴
 *
 * 라디오 버튼으로 하나의 옵션만 선택할 수 있습니다.
 */
export const WithRadioItems: Story = {
  render: function Render() {
    const [theme, setTheme] = useState('system');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>설정</MenubarTrigger>
          <MenubarContent width={180}>
            <MenubarLabel>테마</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">라이트</MenubarRadioItem>
              <MenubarRadioItem value="dark">다크</MenubarRadioItem>
              <MenubarRadioItem value="system">시스템</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 서브메뉴
 *
 * 중첩된 메뉴를 표시할 수 있습니다.
 */
export const WithSubmenu: Story = {
  render: function Render() {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘N">새 파일</MenubarItem>
            <MenubarItem shortcut="⌘O">열기</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>최근 항목 열기</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>project-a.tsx</MenubarItem>
                <MenubarItem>project-b.tsx</MenubarItem>
                <MenubarItem>settings.json</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>최근 항목 지우기</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>공유</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem leadIcon={RiMailLine}>이메일</MenubarItem>
                <MenubarItem leadIcon={RiLink}>링크 복사</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘Q">종료</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 전체 앱 메뉴바 예시
 *
 * 완전한 데스크톱 앱 스타일의 메뉴바입니다.
 */
export const FullAppMenubar: Story = {
  render: function Render() {
    const [autoSave, setAutoSave] = useState(true);
    const [wordWrap, setWordWrap] = useState(true);
    const [minimap, setMinimap] = useState(false);
    const [theme, setTheme] = useState('system');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={RiFileAddLine} shortcut="⌘N">
              새 파일
            </MenubarItem>
            <MenubarItem leadIcon={RiFolderOpenLine} shortcut="⌘O">
              열기
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>최근 항목 열기</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>index.tsx</MenubarItem>
                <MenubarItem>App.tsx</MenubarItem>
                <MenubarItem>styles.css</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>최근 항목 지우기</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiSaveLine} shortcut="⌘S">
              저장
            </MenubarItem>
            <MenubarItem shortcut="⇧⌘S">다른 이름으로 저장...</MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={autoSave}
              onCheckedChange={setAutoSave}
            >
              자동 저장
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘Q">종료</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>편집</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={RiArrowGoBackLine} shortcut="⌘Z">
              실행 취소
            </MenubarItem>
            <MenubarItem leadIcon={RiArrowGoForwardLine} shortcut="⇧⌘Z">
              다시 실행
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiScissorsLine} shortcut="⌘X">
              잘라내기
            </MenubarItem>
            <MenubarItem leadIcon={RiFileCopyLine} shortcut="⌘C">
              복사
            </MenubarItem>
            <MenubarItem leadIcon={RiClipboardLine} shortcut="⌘V">
              붙여넣기
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘F">찾기</MenubarItem>
            <MenubarItem shortcut="⌘H">바꾸기</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>보기</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarLabel>화면 구성</MenubarLabel>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={wordWrap}
              onCheckedChange={setWordWrap}
            >
              자동 줄바꿈
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={minimap}
              onCheckedChange={setMinimap}
            >
              미니맵
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel>테마</MenubarLabel>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">라이트</MenubarRadioItem>
              <MenubarRadioItem value="dark">다크</MenubarRadioItem>
              <MenubarRadioItem value="system">시스템</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem shortcut="⌃⌘F">전체 화면 전환</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>도움말</MenubarTrigger>
          <MenubarContent width={180}>
            <MenubarItem leadIcon={RiQuestionLine}>
              문서
            </MenubarItem>
            <MenubarItem leadIcon={RiBugLine}>
              문제 신고
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiInformationLine}>
              정보
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 코드 에디터 메뉴바
 *
 * VSCode 스타일의 메뉴바입니다.
 */
export const CodeEditorMenubar: Story = {
  render: function Render() {
    const [autoSave, setAutoSave] = useState(false);
    const [formatOnSave, setFormatOnSave] = useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent width={240}>
            <MenubarItem leadIcon={RiFileAddLine} shortcut="⌘N">
              새 파일
            </MenubarItem>
            <MenubarItem leadIcon={RiFolderAddLine} shortcut="⇧⌘N">
              새 폴더
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiFolderOpenLine} shortcut="⌘O">
              파일 열기...
            </MenubarItem>
            <MenubarItem shortcut="⌘K ⌘O">폴더 열기...</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>최근 항목 열기</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarLabel>파일</MenubarLabel>
                <MenubarItem>~/projects/app/src/index.tsx</MenubarItem>
                <MenubarItem>~/projects/lib/utils.ts</MenubarItem>
                <MenubarSeparator />
                <MenubarLabel>폴더</MenubarLabel>
                <MenubarItem>~/projects/app</MenubarItem>
                <MenubarItem>~/projects/lib</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>최근 항목 모두 지우기</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={autoSave}
              onCheckedChange={setAutoSave}
            >
              자동 저장
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiSaveLine} shortcut="⌘S">
              저장
            </MenubarItem>
            <MenubarItem shortcut="⌥⌘S">모두 저장</MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiCloseLine} shortcut="⌘W">
              편집기 닫기
            </MenubarItem>
            <MenubarItem shortcut="⌘K W">모두 닫기</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>편집</MenubarTrigger>
          <MenubarContent width={240}>
            <MenubarItem shortcut="⌘Z">실행 취소</MenubarItem>
            <MenubarItem shortcut="⇧⌘Z">다시 실행</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘X">잘라내기</MenubarItem>
            <MenubarItem shortcut="⌘C">복사</MenubarItem>
            <MenubarItem shortcut="⌘V">붙여넣기</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘F">찾기</MenubarItem>
            <MenubarItem shortcut="⌥⌘F">바꾸기</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⇧⌥F">문서 포맷</MenubarItem>
            <MenubarCheckboxItem
              checked={formatOnSave}
              onCheckedChange={setFormatOnSave}
            >
              저장 시 포맷
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>선택</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘A">전체 선택</MenubarItem>
            <MenubarItem shortcut="⌘L">줄 선택 확장</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘D">다음 일치 항목에 선택 추가</MenubarItem>
            <MenubarItem shortcut="⇧⌘L">모든 일치 항목 선택</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>이동</MenubarTrigger>
          <MenubarContent width={240}>
            <MenubarItem shortcut="⌃G">줄로 이동...</MenubarItem>
            <MenubarItem shortcut="⌘P">파일로 이동...</MenubarItem>
            <MenubarItem shortcut="⇧⌘O">기호로 이동...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌃-">뒤로</MenubarItem>
            <MenubarItem shortcut="⌃⇧-">앞으로</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>터미널</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌃`">새 터미널</MenubarItem>
            <MenubarItem>터미널 분할</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘K">터미널 지우기</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 비활성화된 아이템
 *
 * disabled 속성으로 아이템을 비활성화할 수 있습니다.
 */
export const DisabledItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>파일</MenubarTrigger>
        <MenubarContent width={200}>
          <MenubarItem shortcut="⌘N">새 파일</MenubarItem>
          <MenubarItem disabled>최근 항목 열기</MenubarItem>
          <MenubarItem shortcut="⌘S">저장</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>내보내기</MenubarItem>
          <MenubarItem shortcut="⌘Q">종료</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * 큰 사이즈 아이템
 *
 * size="large"와 description을 사용하여 더 자세한 설명이 포함된 아이템을 표시합니다.
 */
export const LargeItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>옵션</MenubarTrigger>
        <MenubarContent width={280}>
          <MenubarItem
            size="large"
            leadIcon={RiFileAddLine}
            description="새 문서를 생성합니다"
          >
            새 파일
          </MenubarItem>
          <MenubarItem
            size="large"
            leadIcon={RiFolderOpenLine}
            description="기존 파일을 엽니다"
          >
            파일 열기
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            size="large"
            leadIcon={RiSaveLine}
            description="현재 파일을 저장합니다"
          >
            저장
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * 캡션이 있는 아이템
 *
 * caption 속성으로 라벨 옆에 추가 정보를 표시합니다.
 */
export const WithCaptions: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>도움말</MenubarTrigger>
        <MenubarContent width={200}>
          <MenubarItem caption="v2.0.0">정보</MenubarItem>
          <MenubarItem caption="Latest">업데이트 확인</MenubarItem>
          <MenubarSeparator />
          <MenubarItem leadIcon={RiQuestionLine}>문서</MenubarItem>
          <MenubarItem leadIcon={RiBugLine} caption="Beta">
            문제 신고
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
