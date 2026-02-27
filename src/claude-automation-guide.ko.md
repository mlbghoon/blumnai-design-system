## Claude 개발 자동화 가이드 (Hooks · Bridge Watcher · Skills)

**서로 다른 2개 프로젝트를 나란히 개발**할 때, Claude Code를 **개발 워크플로 자동화 체계**로 쓰기 위해 구성한 자동화(훅/워처/스킬)를 정리한 가이드입니다.

라이브러리↔앱, 백엔드↔프론트엔드, 마이크로서비스 간 등 — **협업이 필요한 두 프로젝트**라면 어디든 적용할 수 있습니다.

- **목표**: “요청 → 구현 → 배포 → 적용”을 반복 가능한 프로세스로 만들고, 품질/일관성을 자동으로 끌어올리기

---

## 한 줄 요약

Claude Code의 **이벤트 훅(Hooks)** 으로 에이전트 팀 작업을 표준화하고, **Bridge Watcher** 로 Project A↔Project B 간 변경 요청을 파일 기반으로 동기화하며, **Skills** 로 반복 업무를 SOP(표준 절차)로 고정해 “AI 작업을 개발 자동화로” 만듭니다. 이 구조 덕분에 요청 감지→작업 진행→품질 게이트→**CodeRabbit 리뷰 자동 트리거**→머지까지 연결되며, 장시간 동안 사람 개입 없이도 흐름이 끊기지 않게 구성할 수 있습니다.

---

## 용어 정리

- **Project A / Project B**: 편의상 구분하지만, Bridge는 **양방향**입니다 — 어느 쪽이든 요청을 만들고 응답을 받을 수 있습니다.
  - 일반적으로 Project A = 공통 패키지/라이브러리/백엔드, Project B = 앱/프론트엔드/소비자 프로젝트
  - Bridge 흐름: `requests/`에 변경 요청 작성(`to`/`from` 필수) → 상대가 처리 후 `completed/` 작성 → 요청자가 적용 완료 시 `consumed/` 마커 생성
- 이 문서에서는 **BlumnAi-design-system(= Project A)** 과 **Happytalk-front(= Project B)** 를 예시로 사용합니다.

## 문서 구조

1. **설정 내용**: 실제로 구성한 Bridge / Hooks / Skills / CodeRabbit
2. **운영 원칙**: Phase 인터럽트 루프 — 진행 중 변경 요청 → watcher 알림 → 업데이트 → 복귀 흐름
3. **상세 레퍼런스**: `src/claude-automation-guide.ko.details.md`로 분리

---

## 설정 내용 — Bridge + Hooks + Skills + CodeRabbit

**(A) Project A↔Project B 파일 프로토콜**과 **(B) PR+CodeRabbit 리뷰 루프**를 합쳐서, 변경이 끝까지 흘러가게 만드는 것이 핵심이었습니다.

### 0) 전제 조건

이 구성에서 사용한 도구/환경:

- **tmux**: 에이전트 팀/워처가 세션을 깨우는 방식이 tmux 기반
- **GitHub CLI(`gh`)**: PR 생성/코멘트/상태 확인 자동화에 사용
  - 인증 상태 확인: `gh auth status`
- **레포 설정**: 자동 머지를 쓰려면 브랜치 보호(필수 체크/필수 승인)와 Auto-merge 허용이 되어 있어야 함

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
핵심은 **”같은 파일명”을 `requests/ → completed/ → consumed/`로 흐르게** 만들어, 두 프로젝트가 독립적으로 움직이면서도 “요청/완료/적용 상태”를 자동으로 매칭할 수 있게 하는 것입니다.

#### 2-0) 전제: Claude가 Bridge를 스스로 사용하려면

watcher는 “이미 생성된 파일”을 감지해 세션을 깨우는 역할만 합니다. Claude가 스스로 `requests/`에 요청 파일을 만들려면 프로토콜/트리거 조건/실행 수단을 알아야 했고, 이를 아래 구성으로 해결했습니다:

- **프로토콜** → `inject_context.sh`(4절)가 서브에이전트 시작 시 Bridge 경로/규칙을 자동 주입
- **트리거 조건** → `check-requests.sh` / `check-completions.sh`가 양쪽 프로젝트에서 주기적 체크, watcher가 양쪽 세션 poke
- **실행 수단** → 요청/완료 템플릿을 스킬 문서·온보딩에 포함
- **양방향**: 어느 프로젝트든 `requests/`에 요청을 만들 수 있고, `type: question`으로 상대에게 질문할 수도 있습니다

#### 2-1) Bridge 스크립트

`~/.claude/ds-bridge/` 아래 스크립트들이 “2개 프로젝트 동시 운영”을 자동화합니다. (폴더 이름이 `ds-bridge`이지만 역할은 일반적인 Project A↔Project B 브리지입니다.)

> **`ds` / `consumer` 역할명**: 스크립트에서 쓰이는 `ds`와 `consumer`는 **watcher가 tmux pane을 식별하기 위한 라벨**입니다.
> - `ds` = Project A 세션의 pane (예: blumnai-design-system)
> - `consumer` = Project B 세션의 pane (예: happytalk-front)
>
> Bridge는 **양방향**입니다 — 어느 쪽이든 `requests/`에 요청을 만들 수 있고, 상대가 `completed/`로 응답합니다.
> watcher는 새 요청/완료가 생기면 **양쪽 pane 모두에 알림**을 보내고, 각 세션은 `to` 필드를 확인해 자신에게 해당하는 항목만 처리합니다.
> 이름은 원래 사용 사례(디자인 시스템↔앱)에서 유래했지만, 어떤 프로젝트 조합이든 pane 라벨만 맞으면 그대로 사용할 수 있습니다.

- **`watcher.sh`**: `requests/`/`completed/` 변화를 감지해 tmux로 **두 세션을 poke**
  - 주요 설정: `DS_PANE`, `CONSUMER_PANE`, `POLL_INTERVAL`
  - **pane 식별**: 등록 파일(`.ds-pane`, `.consumer-pane`) 우선 → 자동 탐지는 후보가 1개일 때만
  - 여러 `node` 프로세스가 같은 프로젝트 경로에 있으면(팀원 세션 등) 자동 탐지를 거부하고 수동 등록을 요구
- **`register.sh`**: 현재 tmux 팬에서 실행하여 해당 팬의 Bridge 역할을 등록/해제
  - `bash ~/.claude/ds-bridge/register.sh ds` — 구현하는 쪽(Project A) 팬 등록
  - `bash ~/.claude/ds-bridge/register.sh consumer` — 요청하는 쪽(Project B) 팬 등록
  - `bash ~/.claude/ds-bridge/register.sh unregister ds|consumer|all` — 등록 해제
  - `bash ~/.claude/ds-bridge/register.sh status` — 현재 등록 상태 확인
  - 등록 파일이 존재하면 `plan_review_inject.sh`가 Plan 모드에서 Bridge 인터럽트/복귀 규칙을 자동 주입
- **`check-requests.sh`**: 양쪽 프로젝트에서 “미처리 요청”이 있는지 주기적으로 체크(쿨다운 포함)
- **`check-completions.sh`**: 양쪽 프로젝트에서 “새 완료”가 있는지 주기적으로 체크(쿨다운 포함)
- **`cleanup-bridge.sh`**: `consumed/` 마커가 생기면 관련 파일을 정리

##### `~/.claude/ds-bridge/check-requests.sh`

```bash
#!/bin/bash
# Check for pending Bridge requests — both projects (60s 쿨다운)

case “$PWD” in
  */<your-project-a>*|*/<your-project-b>*) ;;
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
  echo “⚠️ DS Bridge: Pending request(s):$pending”
  echo “Read the request files in ~/.claude/ds-bridge/requests/ — check the to: field and process if addressed to you.”
else
  echo “✅ DS Bridge requests: nothing new”
fi
```

##### `~/.claude/ds-bridge/check-completions.sh`

```bash
#!/bin/bash
# Check for Bridge completion notices — both projects (60s 쿨다운)

case “$PWD” in
  */<your-project-a>*|*/<your-project-b>*) ;;
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
  echo “⚠️ DS Bridge: New completion(s) available:$pending”
  echo “Read the completion files in ~/.claude/ds-bridge/completed/ — check and apply if addressed to you.”
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

#### 3-1) pane 등록 (최초 1회, 세션 재시작 시 재등록)

구현하는 쪽(Project A) Claude 세션이 실행 중인 tmux 팬의 **셸**에서:

```bash
bash ~/.claude/ds-bridge/register.sh ds        # ds = 요청을 받아 구현하는 쪽
```

요청하는 쪽(Project B) Claude 세션이 실행 중인 tmux 팬의 **셸**에서:

```bash
bash ~/.claude/ds-bridge/register.sh consumer   # consumer = 요청을 만들고 결과를 적용하는 쪽
```

등록하면 `~/.claude/ds-bridge/.ds-pane`과 `.consumer-pane` 파일에 팬 ID가 저장됩니다.
watcher는 매 폴링 때 이 파일을 읽고, 팬이 유효한지(tmux 세션 존재 + 경로 일치) 검증합니다.
유효하지 않으면 자동으로 등록을 제거하고 재등록을 안내합니다.

#### 3-2) watcher 실행

```bash
bash ~/.claude/ds-bridge/watcher.sh
```

#### `~/.claude/ds-bridge/register.sh`

```bash
#!/bin/bash
# Register/unregister tmux panes as DS bridge roles
#
# Register (run from inside the Claude session's tmux pane):
#   bash ~/.claude/ds-bridge/register.sh ds
#   bash ~/.claude/ds-bridge/register.sh consumer
#
# Unregister:
#   bash ~/.claude/ds-bridge/register.sh unregister ds
#   bash ~/.claude/ds-bridge/register.sh unregister consumer
#   bash ~/.claude/ds-bridge/register.sh unregister all
#
# Status:
#   bash ~/.claude/ds-bridge/register.sh status

BRIDGE_DIR="$HOME/.claude/ds-bridge"

# ── Unregister ────────────────────────────────────────────────
if [ "$1" = "unregister" ]; then
  TARGET="$2"
  case "$TARGET" in
    ds)
      if [ -f "$BRIDGE_DIR/.ds-pane" ]; then
        rm -f "$BRIDGE_DIR/.ds-pane"
        echo "✅ Unregistered ds pane"
      else
        echo "ℹ️  ds pane was not registered"
      fi
      ;;
    consumer)
      if [ -f "$BRIDGE_DIR/.consumer-pane" ]; then
        rm -f "$BRIDGE_DIR/.consumer-pane"
        echo "✅ Unregistered consumer pane"
      else
        echo "ℹ️  consumer pane was not registered"
      fi
      ;;
    all)
      rm -f "$BRIDGE_DIR/.ds-pane" "$BRIDGE_DIR/.consumer-pane"
      echo "✅ Unregistered all panes"
      ;;
    *)
      echo "Usage: register.sh unregister <ds|consumer|all>"
      exit 1
      ;;
  esac
  exit 0
fi

# ── Status ────────────────────────────────────────────────────
if [ "$1" = "status" ]; then
  echo "Bridge registration status:"
  if [ -f "$BRIDGE_DIR/.ds-pane" ]; then
    echo "  ds:       $(cat "$BRIDGE_DIR/.ds-pane")"
  else
    echo "  ds:       (not registered)"
  fi
  if [ -f "$BRIDGE_DIR/.consumer-pane" ]; then
    echo "  consumer: $(cat "$BRIDGE_DIR/.consumer-pane")"
  else
    echo "  consumer: (not registered)"
  fi
  exit 0
fi

# ── Register ──────────────────────────────────────────────────
ROLE="$1"

if [ -z "$ROLE" ] || [[ "$ROLE" != "ds" && "$ROLE" != "consumer" ]]; then
  echo "Usage: register.sh <ds|consumer>"
  echo "       register.sh unregister <ds|consumer|all>"
  echo "       register.sh status"
  echo ""
  echo "  ds        Register this pane as the design system (supplier) session"
  echo "  consumer  Register this pane as the happytalk-front (consumer) session"
  exit 1
fi

# Get current tmux pane ID
PANE_ID=$(tmux display-message -p '#{session_name}:#{window_index}.#{pane_index}' 2>/dev/null)
if [ -z "$PANE_ID" ]; then
  echo "❌ Not in a tmux session"
  exit 1
fi

PANE_PATH=$(tmux display-message -p '#{pane_current_path}' 2>/dev/null)

# Sanity check: verify path matches role
case "$ROLE" in
  ds)
    if [[ "$PANE_PATH" != *"blumnai-design-system"* ]]; then
      echo "⚠️  Warning: This pane's path ($PANE_PATH) doesn't look like blumnai-design-system"
      read -p "Register anyway? [y/N] " -n 1 -r
      echo
      [[ ! $REPLY =~ ^[Yy]$ ]] && exit 1
    fi
    ;;
  consumer)
    if [[ "$PANE_PATH" != *"happytalk-front"* ]]; then
      echo "⚠️  Warning: This pane's path ($PANE_PATH) doesn't look like happytalk-front"
      read -p "Register anyway? [y/N] " -n 1 -r
      echo
      [[ ! $REPLY =~ ^[Yy]$ ]] && exit 1
    fi
    ;;
esac

echo "$PANE_ID" > "$BRIDGE_DIR/.${ROLE}-pane"
echo "✅ Registered $ROLE pane: $PANE_ID ($PANE_PATH)"
```

#### `~/.claude/ds-bridge/watcher.sh` (전체)

```bash
#!/bin/bash
# DS Bridge Watcher — polls every 60s, pokes Claude sessions when action needed
#
# Usage:  bash ~/.claude/ds-bridge/watcher.sh
# Stop:   Ctrl+C
#
# Pane registration (run from the correct tmux pane):
#   bash ~/.claude/ds-bridge/register.sh ds
#   bash ~/.claude/ds-bridge/register.sh consumer

# ── Configuration ──────────────────────────────────────────────
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

is_notified() {
  local tracking_file="$1"
  local name="$2"
  [ -f "$tracking_file" ] && grep -qxF "$name" "$tracking_file"
}

mark_notified() {
  local tracking_file="$1"
  local name="$2"
  echo "$name" >> "$tracking_file"
}

unmark_notified() {
  local tracking_file="$1"
  local name="$2"
  [ -f "$tracking_file" ] && grep -vxF "$name" "$tracking_file" > "${tracking_file}.tmp" && mv "${tracking_file}.tmp" "$tracking_file"
}

# ── Pane validation ───────────────────────────────────────────
# Check: tmux session exists + pane path contains expected pattern
validate_pane() {
  local pane="$1"
  local path_pattern="$2"

  tmux has-session -t "${pane%%:*}" 2>/dev/null || return 1

  local pane_path
  pane_path=$(tmux display-message -t "$pane" -p '#{pane_current_path}' 2>/dev/null)
  [[ "$pane_path" == *"$path_pattern"* ]]
}

# ── Pane detection ────────────────────────────────────────────
# Priority: 1) registration files  2) auto-detect (only when unambiguous)
detect_panes() {
  # --- Validate currently held panes ---
  if [ -n "$DS_PANE" ] && ! validate_pane "$DS_PANE" "blumnai-design-system"; then
    log "   ⚠️  DS pane $DS_PANE gone — clearing"
    DS_PANE=""
  fi
  if [ -n "$CONSUMER_PANE" ] && ! validate_pane "$CONSUMER_PANE" "happytalk-front"; then
    log "   ⚠️  Consumer pane $CONSUMER_PANE gone — clearing"
    CONSUMER_PANE=""
  fi

  [ -n "$DS_PANE" ] && [ -n "$CONSUMER_PANE" ] && return 0

  # --- 1. Try registration files ---
  if [ -z "$DS_PANE" ] && [ -f "$BRIDGE_DIR/.ds-pane" ]; then
    local reg
    reg=$(cat "$BRIDGE_DIR/.ds-pane" 2>/dev/null | tr -d '[:space:]')
    if [ -n "$reg" ] && validate_pane "$reg" "blumnai-design-system"; then
      DS_PANE="$reg"
      log "   DS pane (registered): $DS_PANE"
    else
      log "   ⚠️  Registered DS pane ($reg) is stale — removing"
      rm -f "$BRIDGE_DIR/.ds-pane"
    fi
  fi

  if [ -z "$CONSUMER_PANE" ] && [ -f "$BRIDGE_DIR/.consumer-pane" ]; then
    local reg
    reg=$(cat "$BRIDGE_DIR/.consumer-pane" 2>/dev/null | tr -d '[:space:]')
    if [ -n "$reg" ] && validate_pane "$reg" "happytalk-front"; then
      CONSUMER_PANE="$reg"
      log "   Consumer pane (registered): $CONSUMER_PANE"
    else
      log "   ⚠️  Registered consumer pane ($reg) is stale — removing"
      rm -f "$BRIDGE_DIR/.consumer-pane"
    fi
  fi

  # --- 2. Auto-detect fallback (only when exactly 1 candidate) ---
  if [ -z "$DS_PANE" ] || [ -z "$CONSUMER_PANE" ]; then
    local panes
    panes=$(tmux list-panes -a -F '#{session_name}:#{window_index}.#{pane_index}|#{pane_current_path}|#{pane_current_command}' 2>/dev/null)

    if [ -z "$panes" ]; then
      log "   ❌ tmux not running or no panes found"
      return 1
    fi

    local ds_candidates=()
    local consumer_candidates=()

    while IFS='|' read -r pane_id pane_path pane_cmd; do
      if [ "$pane_cmd" = "node" ]; then
        case "$pane_path" in
          */blumnai-design-system*)
            ds_candidates+=("$pane_id")
            ;;
          */happytalk-front*)
            consumer_candidates+=("$pane_id")
            ;;
        esac
      fi
    done <<< "$panes"

    if [ -z "$DS_PANE" ]; then
      if [ ${#ds_candidates[@]} -eq 1 ]; then
        DS_PANE="${ds_candidates[0]}"
        log "   DS pane (auto): $DS_PANE"
      elif [ ${#ds_candidates[@]} -gt 1 ]; then
        log "   ⚠️  ${#ds_candidates[@]} DS panes found: ${ds_candidates[*]}"
        log "      → Register the correct one: bash ~/.claude/ds-bridge/register.sh ds"
      else
        log "   ⚠️  No DS pane found"
      fi
    fi

    if [ -z "$CONSUMER_PANE" ]; then
      if [ ${#consumer_candidates[@]} -eq 1 ]; then
        CONSUMER_PANE="${consumer_candidates[0]}"
        log "   Consumer pane (auto): $CONSUMER_PANE"
      elif [ ${#consumer_candidates[@]} -gt 1 ]; then
        log "   ⚠️  ${#consumer_candidates[@]} consumer panes found: ${consumer_candidates[*]}"
        log "      → Register the correct one: bash ~/.claude/ds-bridge/register.sh consumer"
      else
        log "   ⚠️  No consumer pane found"
      fi
    fi
  fi
}

# ── Request / completion checks ───────────────────────────────

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

clean_notified_tracking() {
  if [ -f "$NOTIFIED_REQUESTS" ]; then
    local to_remove=()
    while IFS= read -r name; do
      [ -z "$name" ] && continue
      if [ -f "$COMPLETED_DIR/$name" ] || [ ! -f "$REQUESTS_DIR/$name" ]; then
        to_remove+=("$name")
      fi
    done < "$NOTIFIED_REQUESTS"
    for name in "${to_remove[@]+"${to_remove[@]}"}"; do
      unmark_notified "$NOTIFIED_REQUESTS" "$name"
    done
  fi
  if [ -f "$NOTIFIED_COMPLETIONS" ]; then
    local to_remove=()
    while IFS= read -r name; do
      [ -z "$name" ] && continue
      if [ -f "$CONSUMED_DIR/$name" ] || [ ! -f "$COMPLETED_DIR/$name" ]; then
        to_remove+=("$name")
      fi
    done < "$NOTIFIED_COMPLETIONS"
    for name in "${to_remove[@]+"${to_remove[@]}"}"; do
      unmark_notified "$NOTIFIED_COMPLETIONS" "$name"
    done
  fi
}

# ── Poke a Claude session via tmux ────────────────────────────
poke() {
  local pane="$1"
  local message="$2"

  if [ -z "$pane" ]; then
    log "   ⚠️  No pane configured, skipping"
    return 1
  fi

  if ! tmux has-session -t "${pane%%:*}" 2>/dev/null; then
    log "   ⚠️  Session ${pane%%:*} not found"
    return 1
  fi

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

rm -f "$NOTIFIED_REQUESTS" "$NOTIFIED_COMPLETIONS"
touch "$NOTIFIED_REQUESTS" "$NOTIFIED_COMPLETIONS"

echo ""
log "👀 Watching..."
echo ""

while true; do
  detect_panes 2>/dev/null

  clean_notified_tracking

  # Requests — poke both panes
  if has_new_requests; then
    log "📨 New Bridge request(s):"
    list_and_mark_new_requests
    poke "$DS_PANE" "New items in ~/.claude/ds-bridge/requests/ — check the to: field and process if addressed to you."
    [ "$DS_PANE" != "$CONSUMER_PANE" ] && \
      poke "$CONSUMER_PANE" "New items in ~/.claude/ds-bridge/requests/ — check the to: field and process if addressed to you."
  fi

  # Completions — poke both panes
  if has_new_completions; then
    log "📦 New Bridge completion(s):"
    list_and_mark_new_completions
    poke "$DS_PANE" "New items in ~/.claude/ds-bridge/completed/ — check and apply if addressed to you."
    [ "$DS_PANE" != "$CONSUMER_PANE" ] && \
      poke "$CONSUMER_PANE" "New items in ~/.claude/ds-bridge/completed/ — check and apply if addressed to you."
  fi

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
- 태스크 전체 완료 시 CodeRabbit 리뷰 자동 트리거(팀 모드: `TaskCompleted`, 솔로 모드: `Stop`)
- idle 직전 “할 일 남았는지” 자동 검사(작업이 끊기는 상황 감소)
- 팀 이벤트를 JSONL로 자동 로깅(관측/디버깅)

#### 4-1) 훅 스크립트 실행 권한

```bash
chmod +x ~/.claude/hooks/plan_review_inject.sh
chmod +x ~/.claude/hooks/coderabbit_stop_trigger.sh
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
          },
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/team/coderabbit_review_trigger.sh",
            "timeout": 10000
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
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/coderabbit_stop_trigger.sh",
            "timeout": 15000
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
# UserPromptSubmit hook — injects context based on mode and active systems
# 1. Plan mode: plan review template
# 2. Plan mode + Bridge active: Bridge interrupt/resume rules

INPUT=$(cat)
PERMISSION_MODE=$(echo "$INPUT" | /usr/bin/python3 -c "import sys,json; print(json.load(sys.stdin).get('permission_mode',''))" 2>/dev/null)

# Only inject in plan mode
if [ "$PERMISSION_MODE" != "plan" ]; then
  exit 0
fi

# --- Plan review template ---
PLAN_REVIEW_FILE="$HOME/.claude/commands/plan-review.md"
if [ -f "$PLAN_REVIEW_FILE" ]; then
  echo "[Plan Mode 리뷰 프로세스 - 자동 적용]"
  cat "$PLAN_REVIEW_FILE"
fi

# --- Bridge awareness (only when Bridge is active) ---
BRIDGE_DIR="$HOME/.claude/ds-bridge"

if [ -f "$BRIDGE_DIR/.ds-pane" ] || [ -f "$BRIDGE_DIR/.consumer-pane" ]; then
  cat <<'BRIDGE_CONTEXT'

[DS Bridge Protocol - Active (Bidirectional)]
Two-project Bridge is registered. Both projects can create requests to each other.

## Bridge Interrupt/Resume Rules
- **Required fields**: Every request MUST have `to` and `from` fields to identify sender/receiver.
- **When to create a request**: If implementing the plan requires changes in the OTHER project, create a request file in `~/.claude/ds-bridge/requests/YYYY-MM-DD-<short-title>.md`
- **Clarification requests**: If a received request is unclear, create a `type: question` request back to the sender. The "completion" for a question is the answer.
- **After creating a request**: Do NOT block. Continue with other work that doesn't depend on the requested change.
- **When a completion arrives** (watcher will notify you): Check the `to` field — if addressed to you, pause current work at a safe point → read the completion file in `~/.claude/ds-bridge/completed/` → apply the update → mark consumed by touching the same filename in `~/.claude/ds-bridge/consumed/` → resume previous work.
- **Request file format**: Use the template in the Bridge protocol (to / from / What I Need / Context / Current Workaround).
- **Filename rule**: `completed/` filename MUST match the `requests/` filename exactly.

Include these as explicit steps in your plan phases where cross-project changes are likely.
BRIDGE_CONTEXT
fi

exit 0
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

# --- Bridge awareness (for team subagents) ---
BRIDGE_DIR="$HOME/.claude/ds-bridge"
if [ -f "$BRIDGE_DIR/.ds-pane" ] || [ -f "$BRIDGE_DIR/.consumer-pane" ]; then
  cat <<'BRIDGE_RULES'

## Bridge Protocol (ACTIVE — Bidirectional)
Cross-project changes MUST go through the Bridge protocol:
- Create requests in ~/.claude/ds-bridge/requests/ with `to` and `from` fields
- Use `type: question` to ask the other project for clarification
- Do NOT make direct changes in the other project's codebase
- Check ~/.claude/ds-bridge/completed/ for responses addressed to your project
BRIDGE_RULES
fi

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
  printf '%s\n' "$ERRORS" >&2
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

# Parse agent_name and team_name in a single Python call
PARSED=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('agent_name', '') + '|' + d.get('team_name', ''))
" 2>/dev/null || echo "|")

AGENT_NAME=$(echo "$PARSED" | cut -d'|' -f1)
TEAM_NAME=$(echo "$PARSED" | cut -d'|' -f2)

if [ -z "$TEAM_NAME" ]; then
  exit 0
fi

TASKS_DIR="$HOME/.claude/tasks/$TEAM_NAME"

if [ ! -d "$TASKS_DIR" ]; then
  exit 0
fi

# Pass tasks_dir and agent via env vars — no shell interpolation into Python
RESULT=$(TASKS_DIR="$TASKS_DIR" AGENT="$AGENT_NAME" /usr/bin/python3 -c "
import json, os, glob

tasks_dir = os.environ['TASKS_DIR']
agent = os.environ['AGENT']
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

LOG_FILE="$HOME/.claude/logs/team-events.jsonl"
mkdir -p "$(dirname "$LOG_FILE")"

INPUT=$(cat)

# Single Python call — reads JSON from stdin, no shell interpolation
echo "$INPUT" | /usr/bin/python3 -c "
import json, sys, datetime

try:
    d = json.load(sys.stdin)
except:
    sys.exit(0)

entry = {
    'ts': datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
    'event': d.get('hook_event_name', 'unknown'),
    'session': d.get('session_id', 'unknown'),
    'cwd': d.get('cwd', ''),
}

tool_name = d.get('tool_name', '')
if tool_name:
    entry['tool'] = tool_name

agent_name = d.get('agent_name', '')
if agent_name:
    entry['agent'] = agent_name

team_name = d.get('team_name', '')
if team_name:
    entry['team'] = team_name

ti = d.get('tool_input', {})
if isinstance(ti, dict):
    parts = []
    for k in ['description', 'name', 'team_name', 'subject', 'type', 'recipient', 'subagent_type']:
        if k in ti:
            parts.append(f'{k}={ti[k]}')
    summary = '; '.join(parts[:4])
    if summary:
        entry['summary'] = summary

print(json.dumps(entry))
" >> "$LOG_FILE" 2>/dev/null

exit 0
```

##### `~/.claude/hooks/team/coderabbit_review_trigger.sh` (팀 모드 — `TaskCompleted`)

```bash
#!/usr/bin/env bash
# CodeRabbit review auto-trigger for TaskCompleted events (TEAM mode)
# Fires ONLY when: leader agent + all tasks done + target project + has unreviewd commits
# Dedup: shares marker with Stop hook — only one fires per session
# Runs AFTER quality_gate.sh in the TaskCompleted hook chain

set -uo pipefail

INPUT=$(cat)

PARSED=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('cwd', '') + '|' + d.get('session_id', '') + '|' + d.get('team_name', ''))
" 2>/dev/null || echo "||")

CWD=$(echo "$PARSED" | cut -d'|' -f1)
SESSION_ID=$(echo "$PARSED" | cut -d'|' -f2)
TEAM_NAME=$(echo "$PARSED" | cut -d'|' -f3)

# 1. Project check
case "$CWD" in
  */<your-project-name>*) ;;
  *) exit 0 ;;
esac

# 2. Team mode only — solo mode uses Stop hook
if [ -z "$TEAM_NAME" ]; then
  exit 0
fi

# 3. Shared marker — skip if Stop hook already triggered this session
MARKER="/tmp/coderabbit-triggered-${SESSION_ID}"
if [ -f "$MARKER" ]; then
  exit 0
fi

# 4. Leader-only check
TEAM_CONFIG="$HOME/.claude/teams/$TEAM_NAME/config.json"
if [ ! -f "$TEAM_CONFIG" ]; then
  exit 0
fi

LEADER_ID=$(TEAM_CONFIG="$TEAM_CONFIG" /usr/bin/python3 -c "
import json, os
with open(os.environ['TEAM_CONFIG']) as f:
    config = json.load(f)
members = config.get('members', [])
if members:
    print(members[0].get('agentId', ''))
else:
    print('')
" 2>/dev/null || echo "")

if [ -z "$LEADER_ID" ] || [ "$SESSION_ID" != "$LEADER_ID" ]; then
  exit 0
fi

# 5. ALL tasks done — don't trigger on individual task completions
TASKS_DIR="$HOME/.claude/tasks/$TEAM_NAME"
if [ ! -d "$TASKS_DIR" ]; then
  exit 0
fi

INCOMPLETE=$(TASKS_DIR="$TASKS_DIR" /usr/bin/python3 -c "
import json, os, glob
tasks_dir = os.environ['TASKS_DIR']
count = 0
for f in glob.glob(os.path.join(tasks_dir, '*.json')):
    try:
        with open(f) as fh:
            t = json.load(fh)
        status = t.get('status', '')
        if status in ('pending', 'in_progress'):
            count += 1
    except:
        pass
print(count)
" 2>/dev/null || echo "1")

if [ "$INCOMPLETE" != "0" ]; then
  exit 0
fi

# 6. Has unreviewd commits (company remote behind or missing)
PROJECT_ROOT=$(echo "$CWD" | sed 's|\(.*<your-project-name>\).*|\1|')
HAS_COMPANY=$(cd "$PROJECT_ROOT" && git remote get-url company 2>/dev/null || echo "")

if [ -n "$HAS_COMPANY" ]; then
  cd "$PROJECT_ROOT" && git fetch company main --quiet 2>/dev/null
  AHEAD=$(cd "$PROJECT_ROOT" && git rev-list --count company/main..HEAD 2>/dev/null || echo "0")
else
  LAST_TAG=$(cd "$PROJECT_ROOT" && git describe --tags --abbrev=0 2>/dev/null || echo "")
  if [ -n "$LAST_TAG" ]; then
    AHEAD=$(cd "$PROJECT_ROOT" && git rev-list --count "${LAST_TAG}..HEAD" 2>/dev/null || echo "0")
  else
    AHEAD="0"
  fi
fi

if [ "$AHEAD" = "0" ]; then
  exit 0
fi

# All conditions met — write marker and inject trigger
touch "$MARKER"

cat <<'TRIGGER'

[CODERABBIT REVIEW AUTO-TRIGGER]
All team tasks are completed and the quality gate has passed.
You MUST now invoke the `coderabbit-review` skill to begin the automated review process.
Do NOT report completion to the user until the CodeRabbit review cycle is finished.

TRIGGER

exit 0
```

##### `~/.claude/hooks/coderabbit_stop_trigger.sh` (솔로 모드 — `Stop`)

```bash
#!/usr/bin/env bash
# CodeRabbit review auto-trigger for Stop events (SOLO mode)
# Fires when Claude finishes responding in target project without a team
# Dedup: shares marker with TaskCompleted hook — only one fires per session
#
# Conditions (ALL must pass):
#   1. stop_hook_active=false (prevent infinite loop)
#   2. Target project
#   3. Solo mode (no team — team mode uses TaskCompleted)
#   4. Shared marker not yet created
#   5. Has unreviewd commits (ahead of company/main or last tag)
#   6. last_assistant_message signals real completion (not mid-conversation)

set -uo pipefail

INPUT=$(cat)

# Parse input — use eval+shlex for multi-line last_assistant_message safety
eval "$(/usr/bin/python3 -c "
import json, sys, shlex
d = json.load(sys.stdin)
print('CWD=' + shlex.quote(d.get('cwd', '')))
print('SESSION_ID=' + shlex.quote(d.get('session_id', '')))
print('TEAM_NAME=' + shlex.quote(d.get('team_name', '')))
print('STOP_ACTIVE=' + shlex.quote(str(d.get('stop_hook_active', False))))
msg = d.get('last_assistant_message', '')
lower = msg.lower()
done_words = ['done', 'complete', 'finished', 'published', 'pushed',
              'committed', 'deployed', 'merged', 'v0.', 'npm publish']
has_done = any(w in lower for w in done_words)
has_question = msg.rstrip().endswith('?')
is_completion = has_done and not has_question
print('IS_COMPLETION=' + shlex.quote(str(is_completion)))
" <<< "$INPUT" 2>/dev/null)" 2>/dev/null

: "${CWD:=}" "${SESSION_ID:=}" "${TEAM_NAME:=}" "${STOP_ACTIVE:=}" "${IS_COMPLETION:=}"

# 1. Prevent infinite loop
if [ "$STOP_ACTIVE" = "True" ] || [ "$STOP_ACTIVE" = "true" ]; then
  exit 0
fi

# 2. Project check
case "$CWD" in
  */<your-project-name>*) ;;
  *) exit 0 ;;
esac

# 3. Solo mode only — team mode uses TaskCompleted
if [ -n "$TEAM_NAME" ]; then
  exit 0
fi

# 4. Shared marker — skip if TaskCompleted hook already triggered
MARKER="/tmp/coderabbit-triggered-${SESSION_ID}"
if [ -f "$MARKER" ]; then
  exit 0
fi

# 5. Has unreviewd commits
PROJECT_ROOT=$(echo "$CWD" | sed 's|\(.*<your-project-name>\).*|\1|')
HAS_COMPANY=$(cd "$PROJECT_ROOT" && git remote get-url company 2>/dev/null || echo "")

if [ -n "$HAS_COMPANY" ]; then
  cd "$PROJECT_ROOT" && git fetch company main --quiet 2>/dev/null
  AHEAD=$(cd "$PROJECT_ROOT" && git rev-list --count company/main..HEAD 2>/dev/null || echo "0")
else
  LAST_TAG=$(cd "$PROJECT_ROOT" && git describe --tags --abbrev=0 2>/dev/null || echo "")
  if [ -n "$LAST_TAG" ]; then
    AHEAD=$(cd "$PROJECT_ROOT" && git rev-list --count "${LAST_TAG}..HEAD" 2>/dev/null || echo "0")
  else
    AHEAD="0"
  fi
fi

if [ "$AHEAD" = "0" ]; then
  exit 0
fi

# 6. Last message must signal real completion
if [ "$IS_COMPLETION" != "True" ] && [ "$IS_COMPLETION" != "true" ]; then
  exit 0
fi

# All conditions met — write marker, block stop with trigger reason
touch "$MARKER"

cat <<'EOF'
{
  "decision": "block",
  "reason": "[CODERABBIT REVIEW AUTO-TRIGGER]\nImplementation is complete. Before reporting final status to the user, you MUST invoke the `coderabbit-review` skill to begin the automated review process.\nDo NOT report completion to the user until the CodeRabbit review cycle is finished."
}
EOF

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
from collections import Counter, defaultdict

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

# Counts
event_counts = Counter(e['event'] for e in events)
sessions = set(e.get('session', '') for e in events)
agents = set(e.get('agent', '') for e in events if e.get('agent'))
teams = set(e.get('team', '') for e in events if e.get('team'))

# Timeline
timestamps = sorted(e['ts'] for e in events if 'ts' in e)

print('=' * 60)
if session_filter:
    print(f'  Team Stats — Session: {session_filter[:16]}...')
else:
    print(f'  Team Stats — All Time')
print('=' * 60)
print()

print(f'  Sessions:     {len(sessions)}')
print(f'  Teams:        {len(teams)}')
print(f'  Agents:       {len(agents)}')
print(f'  Total events: {len(events)}')
print()

print('  Event Breakdown:')
for event, count in event_counts.most_common():
    print(f'    {event:30s} {count:>5}')
print()

if agents:
    print('  Agents seen:')
    for a in sorted(agents):
        print(f'    - {a}')
    print()

if teams:
    print('  Teams:')
    for t in sorted(teams):
        print(f'    - {t}')
    print()

if timestamps:
    print(f'  First event: {timestamps[0]}')
    print(f'  Last event:  {timestamps[-1]}')
    print()

print('=' * 60)
"
```

#### 4-4) 훅 범위 지정 방식(프로젝트 루트 매칭)

훅 스크립트는 모든 레포에서 실행되지 않도록, **특정 프로젝트 루트 하위에서만** 규칙 주입/품질 게이트가 켜지게 구성했습니다.

- `~/.claude/hooks/team/inject_context.sh`: `case “$CWD” in */<your-project-name>*)` 패턴으로 대상 프로젝트를 판별
- `~/.claude/hooks/team/quality_gate.sh`: 동일한 `case` 패턴 + `sed` 루트 추출

절대 경로 대신 글로브 패턴(`*/project-name*`)을 사용했기 때문에, 같은 프로젝트를 여러 경로에 클론해도 훅이 정상 동작합니다. 여러 프로젝트에 적용하려면 `case` 문에 패턴을 추가하면 됩니다.

#### 4-5) 동작 확인(설치 후에는 “수동 실행”이 아니라 “이벤트로 자동”)

- 에이전트 팀 작업을 조금 실행한 뒤(서브에이전트/태스크/메시지 전송 등), 아래로 로그가 쌓이는지 확인합니다.
  - `~/.claude/logs/team-events.jsonl`
  - 통계 보기: `bash ~/.claude/hooks/team/stats.sh`

### 5) Skills — “완료 기준”을 고정한 방식

에이전트 팀 작업의 “DONE 정의”를 스킬로 고정해서, 완료 기준이 흔들리지 않게 했습니다.

- 컴포넌트/스토리 변경: `component-checklist` 통과(타입체크/린트 포함)
- 스토리 작성: `storybook-story` 규칙 준수(controls 정책/argTypes/Default story 연결)
- Figma 스펙: `figma-save`로 `source/`에 저장(재호출 최소화)
- PR/리뷰: `coderabbit-review` — 구현 완료 보고 **전에** 자동 호출(Push → PR → CodeRabbit 리뷰 → 수정 → 머지)

### 6) CodeRabbit 자동 리뷰 시스템

이 섹션은 CodeRabbit 리뷰가 **자동으로 트리거되는 구조**를 설명합니다.

#### 트리거 방식 (이중 Hook + 중복 방지)

팀 모드/솔로 모드 **어디서든** CodeRabbit 리뷰가 자동 트리거됩니다. 두 훅은 **공유 마커 파일**(`/tmp/coderabbit-triggered-{SESSION_ID}`)로 중복을 방지합니다 — 먼저 트리거되는 쪽이 마커를 생성하면, 다른 쪽은 skip합니다.

| 모드 | Hook 이벤트 | 스크립트 | 트리거 시점 |
|------|-------------|----------|-------------|
| **팀 작업** | `TaskCompleted` | `~/.claude/hooks/team/coderabbit_review_trigger.sh` | 리더 에이전트 + 전체 태스크 완료 시 |
| **솔로 작업** | `Stop` | `~/.claude/hooks/coderabbit_stop_trigger.sh` | Claude 응답 완료 시 (`last_assistant_message`가 완료 신호일 때) |

#### 트리거 조건

**공통 조건** (두 훅 모두):
1. **프로젝트 확인**: `cwd`가 대상 프로젝트 내부인지
2. **공유 마커 미존재**: 같은 세션에서 이미 트리거되지 않았는지
3. **미리뷰 코드 변경 존재**: `company/main` 대비 ahead 커밋이 1개 이상이고, 변경 파일 중 코드 파일(`.md`/`.txt`/`.mdx` 제외)이 1개 이상 — 문서만 변경된 경우 트리거하지 않음

**팀 모드 추가 조건** (`TaskCompleted`):
4. **리더 전용**: `session_id`가 팀 config의 `members[0].agentId`와 일치
5. **전체 태스크 완료**: `pending`/`in_progress` 태스크가 0개 — 개별 태스크 완료 시에는 트리거되지 않음

**솔로 모드 추가 조건** (`Stop`):
4. **`stop_hook_active=false`**: 무한루프 방지
5. **완료 신호 감지**: `last_assistant_message`에 완료 키워드(done, published, pushed 등)가 있고 질문으로 끝나지 않을 때

#### `coderabbit-review` 스킬 4단계

| Phase | 내용 |
|-------|------|
| **1. Pre-flight** | dirty tree 확인, 브랜치 확인, typecheck/lint |
| **2. Push + PR** | 리모트 push, PR 생성/재사용 |
| **3. Review loop** | 최대 3라운드: **백그라운드 에이전트**가 CodeRabbit 리뷰 폴링(메인 에이전트 블로킹 없음) → actionable 코멘트 수집 → 수정 → push → `@coderabbitai review` 재리뷰 트리거 |
| **4. Merge + sync** | squash merge → main 동기화 |

#### 중단 조건

- actionable 코멘트 0개 → 즉시 Phase 4로
- 최대 3라운드 초과 (critical 이슈 시 4라운드까지 연장 가능)
- merge conflict / CI 실패 / 리뷰 해석 모호 / regression 발생

#### 안전장치

- **중복 방지**: 공유 마커 파일로 세션당 1회만 트리거
- **무한루프 방지**: `Stop` 훅은 `stop_hook_active` 플래그 체크
- **반복 제한**: 최대 3회 이후 자동 중단
- **force push 금지**: 항상 일반 `git push`
- **구체적 파일 스테이징**: `git add <specific-files>` — `git add -A` 사용 금지

## 운영 원칙(짧게): Plan + Phase 인터럽트

자동화가 끊기지 않도록, “해야 할 일”을 단계(Phase)로 나누고 중간에 상대 프로젝트 변경이 필요해지면 **요청을 남긴 뒤 다른 일을 진행**, watcher 알림이 오면 **현재 작업을 정리하고 업데이트 후 복귀**하는 루프로 운영했습니다. Bridge는 양방향이므로 어느 프로젝트에서든 이 흐름이 동일하게 적용됩니다.

Bridge가 등록된 상태(`.ds-pane`/`.consumer-pane` 존재)에서 Plan 모드에 진입하면, `plan_review_inject.sh`가 Bridge 인터럽트/복귀 규칙을 자동 주입합니다. 수동으로 Plan에 Bridge 항목을 넣을 필요가 없습니다.

자동 주입되는 항목:

- **요청 생성 시점**: 상대 프로젝트 변경이 필요할 때 `requests/*.md` 생성 (`to`/`from` 필수)
- **질문(clarification)**: 받은 요청이 불분명하면 `type: question` 요청을 상대에게 보내 확인
- **비블로킹 진행**: 요청 후 다른 작업 계속
- **인터럽트/복귀**: completion 알림 시 → `to` 필드 확인 → 안전한 지점에서 일시 중단 → 업데이트 적용 → consumed 마커 → 이전 작업 복귀
- **검증/종료 조건**: typecheck/lint + CodeRabbit 루프(최대 3회) + auto-merge 조건

상세 Phase 템플릿/다이어그램은 `src/claude-automation-guide.ko.details.md`로 분리했습니다.

## 상세 레퍼런스(분리)

이 문서가 길어지는 것을 막기 위해, 아래 내용은 별도 파일로 분리했습니다.

- 상세 레퍼런스 파일: `src/claude-automation-guide.ko.details.md`
  - Bridge 프로토콜(템플릿/시각화 포함)
  - Watcher 구성/원리/트러블슈팅(pane 등록 포함)
  - Hooks 이벤트 매핑/스크립트 상세/트러블슈팅
  - Skills 목록/운영 팁
  - CodeRabbit 자동 리뷰 시스템(이중 Hook 트리거 + 중복 방지 + Skill 4단계)
