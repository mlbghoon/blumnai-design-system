## Claude 개발 자동화 가이드 (Hooks · Bridge Watcher · Skills)

이 문서는 “공급자(Supplier, BlumnAi-design-system) 프로젝트 ↔ 소비자(Consumer, Happytalk-front) 프로젝트”처럼 **서로 다른 2개 프로젝트를 나란히 개발**할 때, Claude Code를 **개발 워크플로 자동화 체계**로 쓰기 위해 구성한 자동화(훅/워처/스킬)를 정리한 가이드입니다.

- **목표**: “요청 → 구현 → 배포 → 적용”을 반복 가능한 프로세스로 만들고, 품질/일관성을 자동으로 끌어올리기

---

## 한 줄 요약

Claude Code의 **이벤트 훅(Hooks)** 으로 에이전트 팀 작업을 표준화하고, **Bridge Watcher** 로 Supplier↔Consumer 간 변경 요청을 파일 기반으로 동기화하며, **Skills** 로 반복 업무를 SOP(표준 절차)로 고정해 “AI 작업을 개발 자동화로” 만듭니다. 이 구조 덕분에 요청 감지→작업 진행→품질 게이트→리뷰 루프까지 연결되며, 장시간 동안 사람 개입 없이도 흐름이 끊기지 않게 구성할 수 있습니다.

---

## 용어 정리

- **Supplier(공급자 프로젝트)**: 공통 패키지/라이브러리(BlumnAi-design-system)를 제공하는 프로젝트
- **Consumer(소비자 프로젝트)**: Supplier 패키지를 설치해서 실제 서비스/제품 UI를 만드는 애플리케이션(Happytalk-front) 프로젝트
  - Bridge 기준 역할: `requests/`에 변경 요청 작성 → Supplier의 `completed/` 안내를 따라 적용 → 적용 완료 시 `consumed/` 마커 생성

## 설정부터 시작하기

이 문서는 “설정 방법”을 중심으로 작성되어 있으며, 아래 순서대로 읽으면 바로 재현할 수 있습니다.

1. **빠른 설정 가이드(Quick setup)**: 로컬/세션에 필요한 최소 구성
2. **개발 Phase + Phase 인터럽트 루프**: 진행 중 Supplier 변경 요청 → watcher 알림 → 업데이트 → 복귀 흐름
3. **상세 레퍼런스**: Hooks / Bridge / Skills / Watcher / 트러블슈팅
4. **CodeRabbit**: 기본 구성

---

## 빠른 설정 가이드(Quick setup) — Bridge + Hooks + Skills + CodeRabbit

아래는 **각자 프로젝트에 맞게 가져다 적용할 수 있는** 개발 자동화 가이드(템플릿)입니다.  
핵심은 **(A) Supplier↔Consumer 파일 프로토콜**과 **(B) PR+CodeRabbit 리뷰 루프**를 합쳐서, 변경이 끝까지 흘러가게 만드는 것입니다.

### 0) 사전 준비(필수)

- **tmux**: 에이전트 팀/워처가 세션을 깨우는 방식이 tmux 기반인 경우가 많으므로 설치/사용 가능해야 합니다.
- **GitHub CLI(`gh`)**: PR 생성/코멘트/상태 확인 자동화에 필요합니다.
  - 인증 상태 확인: `gh auth status`
- **레포 설정**:
  - 자동 머지를 사용할 경우, 브랜치 보호(필수 체크/필수 승인)와 Auto-merge 허용 여부가 설정되어 있어야 합니다.

### 1) Bridge 디렉토리 준비

아래 디렉토리가 있어야 합니다(없으면 생성).

- `~/.claude/ds-bridge/requests/`
- `~/.claude/ds-bridge/completed/`
- `~/.claude/ds-bridge/consumed/`

```bash
mkdir -p ~/.claude/ds-bridge/{requests,completed,consumed}
```

### 2) Bridge 워크플로우 시작(파일 기반)

이 워크플로우는 **현재 Claude(세션)끼리 “서로 대화/호출”을 깔끔하게 연결하는 표준 방식이 없기 때문에**, `requests/`, `completed/`, `consumed/` 같은 파일을 매개로 하는 **파일 기반 프로토콜**로 설계했습니다.  
핵심은 **“같은 파일명”을 `requests/ → completed/ → consumed/`로 흐르게** 만들어, 두 프로젝트가 독립적으로 움직이면서도 “요청/완료/적용 상태”를 자동으로 매칭할 수 있게 하는 것입니다.

#### 2-0) 중요한 전제: Claude에게 “Bridge를 쓰는 방식”을 알려줘야 합니다

watcher는 “이미 생성된 파일”을 감지해 세션을 깨우는 역할만 합니다.  
즉, **Claude가 스스로 `requests/`에 요청 파일을 만들게 하려면**, 아래 3가지를 Claude의 컨텍스트(온보딩/시스템 프롬프트/컨텍스트 주입 훅/스킬 문서 등)에 **명시적으로 넣어야 합니다**.

- **프로토콜**: `~/.claude/ds-bridge/{requests,completed,consumed}` 경로와 “동일 파일명” 규칙
- **트리거 조건**: Consumer 작업 중 Supplier 변경이 필요하면 `requests/*.md`를 생성한다(요청 생성 후에는 블로킹 아닌 작업을 계속 진행)
- **실행 수단**: 요청 파일을 항상 같은 형식으로 쓰는 스킬/명령(또는 템플릿)을 제공한다

#### 2-1) Bridge 스크립트

`~/.claude/ds-bridge/` 아래 스크립트들이 “2개 프로젝트 동시 운영”을 자동화합니다. (폴더 이름이 `ds-bridge`이지만 역할은 일반적인 Supplier↔Consumer 브리지입니다.)

- **`watcher.sh`**: `requests/`/`completed/` 변화를 감지해 tmux로 **두 세션을 poke**
  - 주요 설정: `DS_PANE`, `CONSUMER_PANE`, `POLL_INTERVAL`
  - (선택) pane 자동 탐지: 프로젝트 경로 힌트로 탐지(각자 레포명에 맞게 수정)
- **`check-requests.sh`**: Supplier 프로젝트 쪽에서 “미처리 요청”이 있는지 주기적으로 체크(쿨다운 포함)
- **`check-completions.sh`**: Consumer 프로젝트 쪽에서 “새 완료”가 있는지 주기적으로 체크(쿨다운 포함)
- **`cleanup-bridge.sh`**: `consumed/` 마커가 생기면 관련 파일을 정리

##### `~/.claude/ds-bridge/check-requests.sh`

```bash
#!/bin/bash
# Check for pending bridge requests — Supplier 프로젝트 전용 (60s 쿨다운)

case “$PWD” in
  */<your-supplier-project>*) ;;
  *) exit 0 ;;
esac

LOCK=”$HOME/.claude/ds-bridge/.last-request-check”
NOW=$(date +%s)

if [ -f “$LOCK” ]; then
  LAST=$(cat “$LOCK”)
  DIFF=$((NOW - LAST))
  [ “$DIFF” -lt 60 ] && exit 0
fi

echo “$NOW” > “$LOCK”

REQUESTS_DIR=”$HOME/.claude/ds-bridge/requests”
COMPLETED_DIR=”$HOME/.claude/ds-bridge/completed”

if [ ! -d “$REQUESTS_DIR” ]; then
  echo “✅ DS Bridge requests: nothing new”
  exit 0
fi

pending=””
for req in “$REQUESTS_DIR”/*.md; do
  [ -f “$req” ] || continue
  basename=$(basename “$req”)
  if [ ! -f “$COMPLETED_DIR/$basename” ]; then
    pending=”$pending\n  - $basename”
  fi
done

if [ -n “$pending” ]; then
  echo “⚠️ DS Bridge: Pending request(s) from consumer project:$pending”
  echo “Read the request files in ~/.claude/ds-bridge/requests/ and process them.”
else
  echo “✅ DS Bridge requests: nothing new”
fi
```

##### `~/.claude/ds-bridge/check-completions.sh`

```bash
#!/bin/bash
# Check for bridge completion notices — Consumer 프로젝트 전용 (60s 쿨다운)

case “$PWD” in
  */<your-consumer-project>*) ;;
  *) exit 0 ;;
esac

LOCK=”$HOME/.claude/ds-bridge/.last-completion-check”
NOW=$(date +%s)

if [ -f “$LOCK” ]; then
  LAST=$(cat “$LOCK”)
  DIFF=$((NOW - LAST))
  [ “$DIFF” -lt 60 ] && exit 0
fi

echo “$NOW” > “$LOCK”

COMPLETED_DIR=”$HOME/.claude/ds-bridge/completed”
CONSUMED_DIR=”$HOME/.claude/ds-bridge/consumed”

mkdir -p “$CONSUMED_DIR”

if [ ! -d “$COMPLETED_DIR” ]; then
  echo “✅ DS Bridge completions: nothing new”
  exit 0
fi

pending=””
for comp in “$COMPLETED_DIR”/*.md; do
  [ -f “$comp” ] || continue
  basename=$(basename “$comp”)
  if [ ! -f “$CONSUMED_DIR/$basename” ]; then
    pending=”$pending\n  - $basename”
  fi
done

if [ -n “$pending” ]; then
  echo “⚠️ DS Bridge: New DS update(s) available:$pending”
  echo “Read the completion files in ~/.claude/ds-bridge/completed/ and apply the changes.”
  echo “After applying, touch the matching file in ~/.claude/ds-bridge/consumed/ to mark it done.”
else
  echo “✅ DS Bridge completions: nothing new”
fi
```

##### `~/.claude/ds-bridge/cleanup-bridge.sh`

```bash
#!/bin/bash
# Auto-delete bridge files once consumed (full cycle complete)
# Runs on both projects — only cleans files with consumed markers

BRIDGE_DIR=”$HOME/.claude/ds-bridge”
REQUESTS_DIR=”$BRIDGE_DIR/requests”
COMPLETED_DIR=”$BRIDGE_DIR/completed”
CONSUMED_DIR=”$BRIDGE_DIR/consumed”

[ -d “$CONSUMED_DIR” ] || exit 0

cleaned=0
for marker in “$CONSUMED_DIR”/*.md; do
  [ -f “$marker” ] || continue
  basename=$(basename “$marker”)

  [ -f “$REQUESTS_DIR/$basename” ] && rm “$REQUESTS_DIR/$basename”
  [ -f “$COMPLETED_DIR/$basename” ] && rm “$COMPLETED_DIR/$basename”
  rm “$marker”
  echo “🧹 DS Bridge: Cleaned up $basename”
  cleaned=$((cleaned + 1))
done

if [ “$cleaned” -eq 0 ]; then
  echo “🔄 DS Bridge cleanup: nothing to clean”
fi
```

### 3) watcher 실행으로 자동 알림 연결

```bash
bash ~/.claude/ds-bridge/watcher.sh
```

#### `~/.claude/ds-bridge/watcher.sh` (전체)

```bash
#!/bin/bash
# DS Bridge Watcher — polls every 60s, pokes Claude sessions when action needed
#
# Usage:  bash ~/.claude/ds-bridge/watcher.sh
# Stop:   Ctrl+C
#
# Prerequisites:
#   - Both Claude sessions running in tmux
#   - Set DS_PANE and CONSUMER_PANE below (or pass as env vars)

# ── Configuration ──────────────────────────────────────────────
# Find your pane IDs with: tmux list-panes -a -F '#{session_name}:#{window_index}.#{pane_index} #{pane_title}'
DS_PANE="${DS_PANE:-}"
CONSUMER_PANE="${CONSUMER_PANE:-}"
POLL_INTERVAL="${POLL_INTERVAL:-60}"

BRIDGE_DIR="$HOME/.claude/ds-bridge"
REQUESTS_DIR="$BRIDGE_DIR/requests"
COMPLETED_DIR="$BRIDGE_DIR/completed"
CONSUMED_DIR="$BRIDGE_DIR/consumed"
NOTIFIED_REQUESTS="$BRIDGE_DIR/.notified-requests"
NOTIFIED_COMPLETIONS="$BRIDGE_DIR/.notified-completions"

# ── Helpers ────────────────────────────────────────────────────
log() {
  echo "$(date '+%H:%M:%S') $1"
}

# Check if a filename is already in a tracking file
is_notified() {
  local tracking_file="$1"
  local name="$2"
  [ -f "$tracking_file" ] && grep -qxF "$name" "$tracking_file"
}

# Mark a filename as notified in a tracking file
mark_notified() {
  local tracking_file="$1"
  local name="$2"
  echo "$name" >> "$tracking_file"
}

# Remove a filename from a tracking file
unmark_notified() {
  local tracking_file="$1"
  local name="$2"
  [ -f "$tracking_file" ] && grep -vxF "$name" "$tracking_file" > "${tracking_file}.tmp" && mv "${tracking_file}.tmp" "$tracking_file"
}

# Auto-detect Claude panes by working directory
detect_panes() {
  if [ -z "$DS_PANE" ] || [ -z "$CONSUMER_PANE" ]; then
    log "🔍 Auto-detecting Claude panes..."

    local panes
    panes=$(tmux list-panes -a -F '#{session_name}:#{window_index}.#{pane_index}|#{pane_current_path}|#{pane_current_command}' 2>/dev/null)

    if [ -z "$panes" ]; then
      log "❌ tmux not running or no panes found"
      return 1
    fi

    while IFS='|' read -r pane_id pane_path pane_cmd; do
      case "$pane_path" in
        */blumnai-design-system*)
          [ -z "$DS_PANE" ] && DS_PANE="$pane_id" && log "   DS pane: $pane_id ($pane_path)"
          ;;
        */happytalk-front*)
          [ -z "$CONSUMER_PANE" ] && CONSUMER_PANE="$pane_id" && log "   Consumer pane: $pane_id ($pane_path)"
          ;;
      esac
    done <<< "$panes"

    [ -z "$DS_PANE" ] && log "⚠️  DS pane not found — set DS_PANE manually"
    [ -z "$CONSUMER_PANE" ] && log "⚠️  Consumer pane not found — set CONSUMER_PANE manually"
  fi
}

# Check for NEW unprocessed requests we haven't notified about yet
has_new_requests() {
  [ ! -d "$REQUESTS_DIR" ] && return 1
  for req in "$REQUESTS_DIR"/*.md; do
    [ -f "$req" ] || continue
    local base
    base=$(basename "$req")
    [ ! -f "$COMPLETED_DIR/$base" ] && ! is_notified "$NOTIFIED_REQUESTS" "$base" && return 0
  done
  return 1
}

# Check for NEW unprocessed completions we haven't notified about yet
has_new_completions() {
  [ ! -d "$COMPLETED_DIR" ] && return 1
  mkdir -p "$CONSUMED_DIR"
  for comp in "$COMPLETED_DIR"/*.md; do
    [ -f "$comp" ] || continue
    local base
    base=$(basename "$comp")
    [ ! -f "$CONSUMED_DIR/$base" ] && ! is_notified "$NOTIFIED_COMPLETIONS" "$base" && return 0
  done
  return 1
}

# List and mark new pending requests
list_and_mark_new_requests() {
  for req in "$REQUESTS_DIR"/*.md; do
    [ -f "$req" ] || continue
    local base
    base=$(basename "$req")
    if [ ! -f "$COMPLETED_DIR/$base" ] && ! is_notified "$NOTIFIED_REQUESTS" "$base"; then
      echo "  - $base"
      mark_notified "$NOTIFIED_REQUESTS" "$base"
    fi
  done
}

# List and mark new pending completions
list_and_mark_new_completions() {
  for comp in "$COMPLETED_DIR"/*.md; do
    [ -f "$comp" ] || continue
    local base
    base=$(basename "$comp")
    if [ ! -f "$CONSUMED_DIR/$base" ] && ! is_notified "$NOTIFIED_COMPLETIONS" "$base"; then
      echo "  - $base"
      mark_notified "$NOTIFIED_COMPLETIONS" "$base"
    fi
  done
}

# Clear stale entries from tracking files (request completed or consumed)
clean_notified_tracking() {
  if [ -f "$NOTIFIED_REQUESTS" ]; then
    while IFS= read -r name; do
      [ -z "$name" ] && continue
      [ -f "$COMPLETED_DIR/$name" ] && unmark_notified "$NOTIFIED_REQUESTS" "$name"
      [ ! -f "$REQUESTS_DIR/$name" ] && unmark_notified "$NOTIFIED_REQUESTS" "$name"
    done < "$NOTIFIED_REQUESTS"
  fi
  if [ -f "$NOTIFIED_COMPLETIONS" ]; then
    while IFS= read -r name; do
      [ -z "$name" ] && continue
      [ -f "$CONSUMED_DIR/$name" ] && unmark_notified "$NOTIFIED_COMPLETIONS" "$name"
      [ ! -f "$COMPLETED_DIR/$name" ] && unmark_notified "$NOTIFIED_COMPLETIONS" "$name"
    done < "$NOTIFIED_COMPLETIONS"
  fi
}

# Poke a Claude session via tmux
poke() {
  local pane="$1"
  local message="$2"

  if [ -z "$pane" ]; then
    log "   ⚠️  No pane configured, skipping"
    return 1
  fi

  # Check pane exists
  if ! tmux has-session -t "${pane%%:*}" 2>/dev/null; then
    log "   ⚠️  Session ${pane%%:*} not found"
    return 1
  fi

  # Send text literally (-l avoids key-name interpretation),
  # then pause so the TUI registers the input before submitting.
  tmux send-keys -t "$pane" -l "$message"
  sleep 0.5
  tmux send-keys -t "$pane" Enter
  log "   ✅ Poked $pane"
  return 0
}

# ── Main Loop ──────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║    DS Bridge Watcher                     ║"
echo "║    Polling every ${POLL_INTERVAL}s · Ctrl+C to stop    ║"
echo "╚══════════════════════════════════════════╝"
echo ""

detect_panes

# Reset notification tracking on fresh start
rm -f "$NOTIFIED_REQUESTS" "$NOTIFIED_COMPLETIONS"
touch "$NOTIFIED_REQUESTS" "$NOTIFIED_COMPLETIONS"

echo ""
log "👀 Watching..."
echo ""

while true; do
  # Re-detect panes periodically in case sessions restarted
  detect_panes 2>/dev/null

  # Clean stale entries from tracking files
  clean_notified_tracking

  # Check for NEW requests → poke DS (only once per request)
  if has_new_requests; then
    log "📨 New request(s) for DS:"
    list_and_mark_new_requests
    poke "$DS_PANE" "There are pending DS bridge requests. Check ~/.claude/ds-bridge/requests/ and process them."
  fi

  # Check for NEW completions → poke Consumer (only once per completion)
  if has_new_completions; then
    log "📦 New completion(s) for Consumer:"
    list_and_mark_new_completions
    poke "$CONSUMER_PANE" "There are new DS bridge completions. Check ~/.claude/ds-bridge/completed/ and apply the updates."
  fi

  # Cleanup consumed files (full cycle: request → completion → consumed → delete)
  if [ -d "$CONSUMED_DIR" ]; then
    for marker in "$CONSUMED_DIR"/*.md; do
      [ -f "$marker" ] || continue
      base=$(basename "$marker")
      [ -f "$REQUESTS_DIR/$base" ] && rm "$REQUESTS_DIR/$base"
      [ -f "$COMPLETED_DIR/$base" ] && rm "$COMPLETED_DIR/$base"
      unmark_notified "$NOTIFIED_REQUESTS" "$base"
      unmark_notified "$NOTIFIED_COMPLETIONS" "$base"
      rm "$marker"
      log "🧹 Cleaned up $base"
    done
  fi

  sleep "$POLL_INTERVAL"
done
```

### 4) Claude Hooks 설치/활성화 — “한 번 세팅 후 자동으로 동작”

Bridge + watcher가 “요청/완료 알림(세션 깨우기)”를 담당한다면, Hooks는 Claude Code 내부 이벤트에서 아래를 자동화합니다.

- plan 모드에서 계획 리뷰 템플릿 자동 주입
- 에이전트 팀/서브에이전트 시작 시 규칙 자동 주입
- 태스크 완료 시 typecheck/lint 자동 실행(실패하면 완료를 막음)
- idle 직전 “할 일 남았는지” 자동 검사(작업이 끊기는 상황 감소)
- 팀 이벤트를 JSONL로 자동 로깅(관측/디버깅)

#### 4-1) 훅 스크립트 실행 권한

```bash
chmod +x ~/.claude/hooks/plan_review_inject.sh
chmod +x ~/.claude/hooks/team/*.sh
```

#### 4-2) `~/.claude/settings.json`에 hooks 연결(예시)

아래는 “동작에 필요한 최소 예시”입니다. 기존 설정이 있다면 **`hooks`/`teammateMode`만 병합**합니다.

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "teammateMode": "tmux",
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/plan_review_inject.sh"
          }
        ]
      }
    ],
    "SubagentStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/inject_context.sh",
            "timeout": 5000
          }
        ]
      }
    ],
    "TeammateIdle": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/log_event.sh",
            "async": true
          },
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/teammate_idle_check.sh",
            "timeout": 10000
          }
        ]
      }
    ],
    "TaskCompleted": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/log_event.sh",
            "async": true
          },
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/quality_gate.sh",
            "timeout": 90000
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Task",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/log_event.sh",
            "async": true
          }
        ]
      },
      {
        "matcher": "SendMessage",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/log_event.sh",
            "async": true
          }
        ]
      },
      {
        "matcher": "TeamCreate",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/log_event.sh",
            "async": true
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "TeamCreate",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/log_event.sh",
            "async": true
          }
        ]
      }
    ]
  }
}
```

#### 4-3) 훅 스크립트 템플릿

아래는 `settings.json`에서 연결한 훅 스크립트의 **일반화된 템플릿**입니다.
팀/회사 공유를 위해, **프로젝트별 규칙 주입 내용은 간소화**하고 **절대 경로는 패턴 매칭(`*/project-name*`)으로 대체**했습니다. 실제 운영 스크립트에는 프로젝트별 상세 규칙(타이포그래피·스페이싱·컬러 등)이 추가되어 있습니다.

##### `~/.claude/hooks/plan_review_inject.sh`

```bash
#!/bin/bash
INPUT=$(cat)
PERMISSION_MODE=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('permission_mode',''))" 2>/dev/null)

PLAN_REVIEW_FILE="$HOME/.claude/commands/plan-review.md"

# Plan 모드일 때만 리뷰 프로세스 주입
if [ "$PERMISSION_MODE" = "plan" ]; then
  if [ -f "$PLAN_REVIEW_FILE" ]; then
    echo "[Plan Mode 리뷰 프로세스 - 자동 적용]"
    cat "$PLAN_REVIEW_FILE"
  fi
fi
```

##### `~/.claude/hooks/team/inject_context.sh`

```bash
#!/usr/bin/env bash
# Injects context into every spawned subagent
# Global: naming conventions (all projects)
# Project-specific: project rules (only within <your-project-name>)

set -uo pipefail

INPUT=$(cat)

TEAM_NAME=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('team_name', ''))
" 2>/dev/null || echo "")

# Skip injection for non-team subagents (Explore, Plan, etc.)
if [ -z "$TEAM_NAME" ]; then
  exit 0
fi

CWD=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('cwd', ''))
" 2>/dev/null || echo "")

# --- Global context (all projects) ---
cat <<'GLOBAL'

## Agent Naming Convention (MANDATORY)
Use generic sequential names when spawning teammates:
- reviewer-one, reviewer-two, reviewer-three
- implementer-one, implementer-two
- analyst-one, researcher-one, tester-one
NEVER use task-specific names like \"button-reviewer\", \"sidebar-fixer\", \"auth-implementer\".
When your work is complete and no tasks remain, send a message to the team lead requesting shutdown.

GLOBAL

# --- Project-specific context (패턴 매칭으로 프로젝트 판별) ---
case "$CWD" in
  */<your-project-name>*)
    cat <<'PROJECT_RULES'
## Project Rules (ACTIVE PROJECT)
- After ALL code changes: run `npm run typecheck && npm run lint`
# 여기에 프로젝트별 규칙 추가 (타이포그래피, 스페이싱, 컬러 등)
PROJECT_RULES
    ;;
esac

exit 0
```

##### `~/.claude/hooks/team/quality_gate.sh`

```bash
#!/usr/bin/env bash
# Quality gate for TaskCompleted events
# Runs typecheck + lint when cwd is within the target project
# Exit 0 = allow, Exit 2 = block with feedback

set -uo pipefail

INPUT=$(cat)

CWD=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('cwd', ''))
" 2>/dev/null || echo "")

# Skip gate if not within the target project
case "$CWD" in
  */<your-project-name>*) ;;
  *)
    exit 0
    ;;
esac

# CWD에서 프로젝트 루트를 추출
PROJECT_ROOT=$(echo "$CWD" | sed 's|\(.*<your-project-name>\).*|\1|')

ERRORS=""

# Run typecheck
TC_OUTPUT=$(cd "$PROJECT_ROOT" && npm run typecheck 2>&1) || {
  ERRORS="TYPECHECK FAILED:\n$(echo "$TC_OUTPUT" | tail -30)"
}

# Run lint
LINT_OUTPUT=$(cd "$PROJECT_ROOT" && npm run lint 2>&1) || {
  if [ -n "$ERRORS" ]; then
    ERRORS="$ERRORS\n\n"
  fi
  ERRORS="${ERRORS}LINT FAILED:\n$(echo "$LINT_OUTPUT" | tail -30)"
}

if [ -n "$ERRORS" ]; then
  echo -e "$ERRORS" >&2
  exit 2
fi

exit 0
```

##### `~/.claude/hooks/team/teammate_idle_check.sh`

```bash
#!/usr/bin/env bash
# Checks if an idle teammate still has work to do
# Reads task files from ~/.claude/tasks/{team_name}/
# Exit 2 = work remains (keep working), Exit 0 = no work (allow idle/shutdown)

set -uo pipefail

INPUT=$(cat)

AGENT_NAME=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('agent_name', ''))
" 2>/dev/null || echo "")

TEAM_NAME=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('team_name', ''))
" 2>/dev/null || echo "")

if [ -z "$TEAM_NAME" ]; then
  exit 0
fi

TASKS_DIR="$HOME/.claude/tasks/$TEAM_NAME"

if [ ! -d "$TASKS_DIR" ]; then
  exit 0
fi

RESULT=$(/usr/bin/python3 -c "
import json, os, glob

tasks_dir = '$TASKS_DIR'
agent = '$AGENT_NAME'
my_in_progress = 0
pending_unblocked = 0
pending_tasks = []

for f in glob.glob(os.path.join(tasks_dir, '*.json')):
    try:
        with open(f) as fh:
            t = json.load(fh)
        status = t.get('status', '')
        owner = t.get('owner', '')
        blocked_by = t.get('blockedBy', [])
        subject = t.get('subject', '')

        if status == 'in_progress' and owner == agent:
            my_in_progress += 1
        elif status == 'pending' and len(blocked_by) == 0:
            pending_unblocked += 1
            pending_tasks.append(subject)
    except:
        pass

print(f'{my_in_progress}|{pending_unblocked}|{\";\".join(pending_tasks[:3])}')
" 2>/dev/null || echo "0|0|")

MY_IN_PROGRESS=$(echo "$RESULT" | cut -d'|' -f1)
PENDING_UNBLOCKED=$(echo "$RESULT" | cut -d'|' -f2)
PENDING_SUBJECTS=$(echo "$RESULT" | cut -d'|' -f3)

TOTAL=$((MY_IN_PROGRESS + PENDING_UNBLOCKED))

if [ "$TOTAL" -gt 0 ]; then
  MSG="You still have work to do."
  if [ "$MY_IN_PROGRESS" -gt 0 ]; then
    MSG="$MSG You have $MY_IN_PROGRESS in-progress task(s) assigned to you."
  fi
  if [ "$PENDING_UNBLOCKED" -gt 0 ]; then
    MSG="$MSG There are $PENDING_UNBLOCKED pending unblocked task(s) available: $PENDING_SUBJECTS"
  fi
  MSG="$MSG Check TaskList and continue working. If you believe all your work is truly done, send a message to the team lead requesting shutdown."
  echo "$MSG" >&2
  exit 2
fi

exit 0
```

##### `~/.claude/hooks/team/log_event.sh`

```bash
#!/usr/bin/env bash
# Universal async logger for all team events
# Appends structured JSONL to ~/.claude/logs/team-events.jsonl
# Always exits 0 — never blocks execution

set -euo pipefail

LOG_FILE="$HOME/.claude/logs/team-events.jsonl"
mkdir -p "$(dirname "$LOG_FILE")"

INPUT=$(cat)

HOOK_EVENT=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('hook_event_name', 'unknown'))
" 2>/dev/null || echo "unknown")

SESSION_ID=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('session_id', 'unknown'))
" 2>/dev/null || echo "unknown")

CWD=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('cwd', ''))
" 2>/dev/null || echo "")

TOOL_NAME=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('tool_name', ''))
" 2>/dev/null || echo "")

AGENT_NAME=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('agent_name', ''))
" 2>/dev/null || echo "")

TEAM_NAME=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('team_name', ''))
" 2>/dev/null || echo "")

TOOL_INPUT_SUMMARY=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
ti = d.get('tool_input', {})
if isinstance(ti, dict):
    parts = []
    for k in ['description', 'name', 'team_name', 'subject', 'type', 'recipient', 'subagent_type']:
        if k in ti:
            parts.append(f'{k}={ti[k]}')
    print('; '.join(parts[:4]))
else:
    print('')
" 2>/dev/null || echo "")

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

/usr/bin/python3 -c "
import json

entry = {
    'ts': '$TIMESTAMP',
    'event': '$HOOK_EVENT',
    'session': '$SESSION_ID',
    'cwd': '$CWD',
}

if '$TOOL_NAME':
    entry['tool'] = '$TOOL_NAME'
if '$AGENT_NAME':
    entry['agent'] = '$AGENT_NAME'
if '$TEAM_NAME':
    entry['team'] = '$TEAM_NAME'

summary = '''$TOOL_INPUT_SUMMARY'''
if summary:
    entry['summary'] = summary

print(json.dumps(entry))
" >> "$LOG_FILE" 2>/dev/null

exit 0
```

##### `~/.claude/hooks/team/stats.sh`

```bash
#!/usr/bin/env bash
# Manual CLI tool to view team event stats
# Usage:
#   bash ~/.claude/hooks/team/stats.sh              # All-time stats
#   bash ~/.claude/hooks/team/stats.sh SESSION_ID   # Stats for one session

set -uo pipefail

LOG_FILE="$HOME/.claude/logs/team-events.jsonl"

if [ ! -f "$LOG_FILE" ]; then
  echo "No log file found at $LOG_FILE"
  echo "Events will appear here after team hooks start firing."
  exit 0
fi

SESSION_FILTER="${1:-}"

/usr/bin/python3 -c "
import json, sys
from collections import Counter

session_filter = '$SESSION_FILTER'
log_file = '$LOG_FILE'

events = []
with open(log_file) as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        try:
            events.append(json.loads(line))
        except:
            pass

if session_filter:
    events = [e for e in events if e.get('session') == session_filter]

if not events:
    if session_filter:
        print(f'No events found for session: {session_filter}')
    else:
        print('No events logged yet.')
    sys.exit(0)

event_counts = Counter(e['event'] for e in events)
timestamps = sorted(e['ts'] for e in events if 'ts' in e)

print('=' * 60)
if session_filter:
    print(f'  Team Stats — Session: {session_filter[:16]}...')
else:
    print(f'  Team Stats — All Time')
print('=' * 60)
print()
print(f'  Total events: {len(events)}')
print()
print('  Event Breakdown:')
for event, count in event_counts.most_common():
    print(f'    {event:30s} {count:>5}')
print()
if timestamps:
    print(f'  First event: {timestamps[0]}')
    print(f'  Last event:  {timestamps[-1]}')
    print()
print('=' * 60)
"
```

#### 4-4) “어떤 프로젝트에서 훅을 켤지” 범위 지정(프로젝트 루트 매칭)

훅 스크립트는 보통 “모든 레포에서 무조건 실행”이 아니라, **특정 프로젝트 루트 하위에서만** 규칙 주입/품질 게이트 같은 동작을 켜도록 구성합니다.  
따라서 본인 환경에서는 아래처럼 “대상 프로젝트 루트”를 지정해 두면, 다른 레포에서는 훅이 과하게 개입하지 않습니다.

- `~/.claude/hooks/team/inject_context.sh`: `case “$CWD” in */<your-project-name>*)` 패턴을 본인 프로젝트 디렉토리명으로 맞춥니다.
- `~/.claude/hooks/team/quality_gate.sh`: 동일하게 `case` 패턴과 `sed` 루트 추출 패턴을 맞춥니다.

권장 방식:

- 절대 경로 대신 **글로브 패턴(`*/project-name*`)**을 사용하면, 같은 프로젝트를 여러 경로에 클론해도 훅이 정상 동작합니다.
- 여러 프로젝트에 적용하려면, `case` 문에 **여러 패턴**을 추가하는 방식이 운영하기 편합니다.

#### 4-5) 동작 확인(설치 후에는 “수동 실행”이 아니라 “이벤트로 자동”)

- 에이전트 팀 작업을 조금 실행한 뒤(서브에이전트/태스크/메시지 전송 등), 아래로 로그가 쌓이는지 확인합니다.
  - `~/.claude/logs/team-events.jsonl`
  - 통계 보기: `bash ~/.claude/hooks/team/stats.sh`

### 5) Skills를 “완료 기준”으로 고정

에이전트 팀 작업 기준으로 아래를 “DONE 정의”로 박아두면 안정성이 확 올라갑니다.

- 컴포넌트/스토리 변경: `component-checklist` 통과(타입체크/린트 포함)
- 스토리 작성: `storybook-story` 규칙 준수(controls 정책/argTypes/Default story 연결)
- Figma 스펙: `figma-save`로 `source/`에 저장(재호출 최소화)

### 6) CodeRabbit 포함 PR 루프(최대 3회) 개발 루프 가이드

이 섹션은 “자동 루프에서 실제로 무슨 일이 벌어지는지”만 짧게 정리합니다(세부는 `details`로 이동).

- **런타임(요약)**: 커밋/푸시 → PR 업데이트 → CI/CodeRabbit 반응 → 코멘트 반영 커밋/푸시 → 재리뷰 트리거 → 반복 → 조건 충족 시 auto-merge
- **에이전트가 하는 일**: PR 상태 읽기, CodeRabbit 코멘트 수집/요약/반영, 재리뷰 트리거 코멘트 작성, 반복 제한/중단 조건 적용, auto-merge 조건 확인

자동 루프 규칙:

1. 에이전트가 변경 생성(브랜치/커밋/푸시 포함)
2. PR이 없으면 생성, 있으면 재사용
3. CodeRabbit 코멘트가 생기면 반영 후 다시 커밋/푸시
4. 재리뷰 트리거 코멘트(예: `@CodeRabbit review`)로 다음 라운드 시작
5. **최대 3회** 반복(무한 루프 방지)
6. **필수 체크 Green + 정책 조건 충족** 시 auto-merge 활성화

안전장치(필수):

- **반복 제한**: 최대 3회 이후 자동 중단
- **중단 조건**: 충돌/빌드 실패/리뷰 해석 애매 → 자동 중단 후 사람이 판단
- **머지 조건 체크**: 필수 체크가 Green이 아니면 auto-merge를 켜지 않음
- **브랜치 정책 준수**: 보호 브랜치에는 직접 push하지 않고 PR 기반으로만 진행

## 운영 원칙(짧게): Plan + Phase 인터럽트

자동화가 끊기지 않게 하려면, “해야 할 일”을 단계(Phase)로 나누고, 중간에 Supplier/공통 라이브러리 변경이 필요해지면 **요청을 남긴 뒤 다른 일을 진행**하다가, watcher 알림이 오면 **현재 작업을 정리하고 업데이트 후 복귀**하는 루프가 필요합니다.

Plan 최소 체크리스트:

- **현재 Phase/목표 산출물**: PR/릴리스/완료 파일 등
- **변경이 필요한 파일/화면 기준**: 언제 요청을 만들지(Bridge `requests/*.md`)
- **인터럽트/복귀 규칙**: completed 알림 시 “무엇을 마무리→업데이트→어디로 복귀”
- **검증/종료 조건**: typecheck/lint + CodeRabbit 루프(최대 3회) + auto-merge 조건

상세 Phase 템플릿/다이어그램은 `src/claude-automation-guide.ko.details.md`로 분리했습니다.

## 실전 팁: Claude가 “Supplier 변경이 필요할 때” 스스로 요청을 남기게 하려면

목표는 “Consumer 작업 중 Supplier 변경이 필요하다고 판단되면, Claude가 요청 템플릿으로 `requests/`에 남기고 Supplier 쪽을 깨우는 것”입니다.

이를 위해 필요한 최소 조건:

- Claude가 Bridge 프로토콜(경로/파일명 규칙/템플릿)을 알고 있어야 함
- watcher가 켜져 있거나, 최소한 DS가 정기적으로 `requests/`를 확인해야 함

정착을 위해 다음 2가지를 추천합니다.

1. **문서 링크를 내부 온보딩에 포함**
   - 이 문서(`src/claude-automation-guide.ko.md`)를 “AI 개발 자동화 방식”의 단일 기준으로 삼음
2. **요청 템플릿을 스킬/명령으로 고정**
   - 사람이 매번 형식을 고민하지 않게 “요청 생성”을 반자동화

## 상세 레퍼런스(분리)

이 문서가 길어지는 것을 막기 위해, 아래 내용은 별도 파일로 분리했습니다.

- 상세 레퍼런스 파일: `src/claude-automation-guide.ko.details.md`
  - Bridge 프로토콜(템플릿/시각화 포함)
  - Watcher 구성/원리/트러블슈팅
  - Hooks 이벤트 매핑/스크립트 상세/트러블슈팅
  - Skills 목록/운영 팁
  - CodeRabbit 참고(요약)
