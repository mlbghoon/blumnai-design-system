## Claude 개발 자동화 — 요약 (What & Why)

Claude Code의 이벤트 훅, 파일 기반 브리지, SOP 스킬, 그리고 CodeRabbit 자동 리뷰를 조합해 "요청 → 구현 → 배포 → 적용"을 반복 가능한 개발 자동화 체계로 만든 구성입니다.

---

## 무엇을 만들었나

여섯 가지 구성 요소가 하나의 워크플로로 연결됩니다.

**Bridge** — 두 프로젝트(라이브러리↔앱, 백엔드↔프론트엔드 등) 사이에서 변경 요청과 완료 통지를 파일 기반으로 주고받는 양방향 협업 프로토콜입니다. 요청/완료/적용 상태가 자동으로 매칭되어 "누가 봤냐/누가 전달했냐" 같은 커뮤니케이션 부담이 사라집니다.

**Bridge Watcher** — Bridge 디렉토리를 주기적으로 감시하며, 새 요청이나 완료가 생기면 tmux를 통해 양쪽 세션에 알림을 보내는 자동 알림 시스템입니다. 사람이 폴더를 확인할 필요 없이 "컨텍스트 스위칭 비용"이 크게 줄어듭니다.

**Hooks** — Claude Code의 이벤트(프롬프트 제출, 서브에이전트 시작, 태스크 완료, idle 진입 등)에 자동으로 반응하는 스크립트 체계입니다. 규칙 주입, 품질 게이트(typecheck/lint), 작업 지속성(idle 방지), 이벤트 로깅 네 가지 역할을 담당합니다.

**Skills** — 반복 업무(컴포넌트 생성, 스토리 작성, Figma 스펙 저장, 시각 테스트 등)를 SOP(표준 절차)로 고정한 플레이북입니다. 에이전트 팀 작업에서 "완료의 정의"를 흔들리지 않게 만듭니다.

**CodeRabbit 자동 리뷰** — 구현이 끝나면 자동으로 PR을 만들고, CodeRabbit에 리뷰를 요청하며, 지적 사항을 수정한 뒤 머지까지 연결하는 시스템입니다. 팀 모드/솔로 모드 어디서든 트리거되고, 이중 Hook으로 중복 방지를 처리합니다.

**Phase 인터럽트 루프** — 작업을 단계(Phase)로 나누고, 중간에 상대 프로젝트 변경이 필요해지면 요청을 남긴 뒤 다른 일을 진행하며, 알림이 오면 업데이트 후 복귀하는 운영 패턴입니다. 자동화가 끊기지 않도록 Bridge와 Plan 모드를 연결합니다.

---

## 왜 이렇게 구성했나

이 자동화가 해결하는 네 가지 문제가 있습니다.

**프로젝트 간 동기화 격차** — Bridge 프로토콜과 Watcher가 파일 기반으로 "요청 → 완료 → 적용"을 자동 추적하므로, 수동 커뮤니케이션 없이도 양쪽이 동기화됩니다.

**에이전트 팀 작업의 품질 편차** — 서브에이전트가 늘어날수록 규칙 위반(잘못된 유틸리티 클래스, 빠진 타입 체크 등)이 누적되었습니다. Hooks가 서브에이전트 시작 시 규칙을 자동 주입하고, 태스크 완료 시 typecheck/lint 게이트를 걸어 "통과하지 않으면 완료 불가"로 만들었습니다.

**리뷰 병목** — 코드 변경이 끝나도 리뷰 요청/확인/수정 사이클이 수동이라 지연되었습니다. CodeRabbit 리뷰가 구현 완료 시 자동으로 트리거되고, 백그라운드에서 폴링/수정/재리뷰가 돌아가므로 메인 작업 흐름을 막지 않으면서 리뷰가 진행됩니다.

**에이전트 idle/stall** — 에이전트가 할 일이 남았는데 idle로 빠지거나, 작업 도중 상대 프로젝트 응답을 기다리며 멈추는 상황이 있었습니다. idle check 훅이 남은 태스크를 확인하고, Phase 인터럽트 루프가 "요청 후 다른 일 진행 → 알림 시 복귀"로 멈춤 없이 작업을 이어갑니다.

---

## 실제 효과

**개발 커뮤니케이션 비용 감소** — 사람이 직접 확인하거나 전달할 필요 없이, 파일과 워처가 변경 요청/완료/적용 상태를 자동으로 추적합니다.

**품질/일관성 증가** — 스킬(SOP)과 훅(규칙 주입/게이트)으로 실수를 구조적으로 줄입니다. 에이전트가 바뀌어도 같은 방식으로 작업이 진행됩니다.

**디버깅 가능** — 에이전트 팀 이벤트가 JSONL로 자동 로깅되어 문제 재현과 원인 파악이 쉽습니다.

**장시간 저개입(무인) 실행 가능** — Watcher가 요청/완료를 감지해 세션을 깨우고, 훅이 품질 게이트를 걸며, idle 방지로 작업이 중간에 멈추는 상황을 줄입니다. CodeRabbit 루프와 자동 머지까지 연결하면 "수정 → 재리뷰 → 머지"가 연속적으로 진행되어 긴 시간 동안 안정적으로 운영할 수 있습니다.

---

## 다른 프로젝트에 적용하면

이 구성은 "두 프로젝트가 서로 의존하는" 상황이라면 어디든 적용할 수 있습니다. 라이브러리↔앱, 백엔드↔프론트엔드, 마이크로서비스 간 — 협업이 필요한 두 프로젝트라면 Bridge/Watcher/Hooks/Skills 구조를 그대로 가져갈 수 있습니다.

적용에 필요한 최소 전제 조건은 세 가지입니다. tmux(세션 관리), GitHub CLI(PR/코멘트 자동화), 그리고 CodeRabbit(자동 리뷰)입니다. 레포에 브랜치 보호와 Auto-merge 설정이 되어 있으면 머지까지 완전 자동화됩니다.

프로젝트별로 달라지는 부분은 훅 스크립트의 경로 패턴(프로젝트 판별)과 스킬 문서(SOP 내용)뿐입니다. 나머지 자동화 인프라(Bridge 디렉토리, Watcher, Hook 이벤트 연결, 로깅)는 프로젝트에 무관하게 재사용 가능합니다.

---

## 구성 요소 한눈에

| 구성 요소 | 역할 | 트리거 | 핵심 파일 |
|-----------|------|--------|-----------|
| Bridge | 양방향 파일 기반 변경 요청/완료 프로토콜 | 수동 또는 에이전트가 파일 생성 | `~/.claude/ds-bridge/requests/`, `completed/`, `consumed/` |
| Bridge Watcher | 새 요청/완료 감지 → tmux로 양쪽 세션 알림 | 60초 폴링 | `~/.claude/ds-bridge/watcher.sh`, `register.sh` |
| Hooks (규칙 주입) | 서브에이전트 시작 시 프로젝트 규칙 자동 주입 | `SubagentStart` 이벤트 | `~/.claude/hooks/team/inject_context.sh` |
| Hooks (품질 게이트) | 태스크 완료 시 typecheck/lint 자동 실행 | `TaskCompleted` 이벤트 | `~/.claude/hooks/team/quality_gate.sh` |
| Hooks (idle 방지) | idle 직전 남은 태스크 확인, 있으면 차단 | `TeammateIdle` 이벤트 | `~/.claude/hooks/team/teammate_idle_check.sh` |
| Hooks (로깅) | 팀 이벤트 JSONL 자동 기록 | `PreToolUse`, `PostToolUse` 등 | `~/.claude/hooks/team/log_event.sh` |
| Hooks (Plan 주입) | Plan 모드에서 리뷰 템플릿 + Bridge 규칙 자동 주입 | `UserPromptSubmit` 이벤트 | `~/.claude/hooks/plan_review_inject.sh` |
| Hooks (CodeRabbit 트리거) | 구현 완료 시 CodeRabbit 리뷰 자동 시작 | `TaskCompleted` / `Stop` 이벤트 | `coderabbit_review_trigger.sh`, `coderabbit_stop_trigger.sh` |
| Hooks (pane 정리) | 종료된 팀원의 tmux pane 자동 정리 | `PostToolUse`(`TeamDelete`) / `Stop` 이벤트 | `~/.claude/hooks/team/cleanup_tmux_panes.sh` |
| Skills | 반복 업무를 SOP로 고정 | 에이전트가 스킬 호출 | `<repo>/.claude/skills/*/SKILL.md` |
| Phase 인터럽트 루프 | 상대 프로젝트 변경 필요 시 요청 후 비블로킹 진행 → 알림 시 복귀 | Bridge 알림 + Plan 모드 주입 | `plan_review_inject.sh` + Bridge 스크립트 |

---

## 상세 구현 가이드

모든 스크립트 코드, 설정 예시, 트러블슈팅은 구현 가이드를 참고합니다.

→ `src/claude-automation-guide.ko.md`
