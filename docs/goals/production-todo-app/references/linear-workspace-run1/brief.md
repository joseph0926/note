# Production Todo Reference Brief

상태: reference generated
목표: `production-todo-app`
모드: Greenfield/lab
회사 anchor: Linear 단일 확정
대상: 첫 reference packet
preview: `docs/goals/production-todo-app/references/linear-workspace-run1/reference.html`

## 요청 분류

- 요청: 기존 다중 회사 캡처를 제거하고, 프로덕션급 Todo 앱에 맞는 회사 하나를 확정해 레퍼런스를 생성 및 캡처.
- 해석: 앱 코드 구현이 아니라, 이후 섹션별 SPEC을 작성하기 위한 UI reference artifact 생성.
- baseline: 기존 앱 surface 없음. baseline screenshot은 `not-applicable`.

## User Job

사용자는 오늘 할 일을 단순 체크하는 것보다, 작업을 수집하고 우선순위화하고 상태를 추적하고 막힌 항목을 회복해야 한다.

## Content / Function Invariant

- task inbox, today focus, project/workstream, priority, due date, blocked state, review queue가 있어야 한다.
- 새 task capture, filter/search, selected task detail, empty/error/loading/focus 상태 방향을 포함한다.
- production code, framework scaffold, storage/API 동작은 만들지 않는다.

## Company Anchor Decision

확정 anchor: Linear.

선택 이유:

- 프로덕션급 Todo는 단순 checklist보다 execution queue, selected detail, blocked/recovery state, stable shell이 중요하다.
- Linear signal은 low-noise dense workspace, status clarity, sparse accent, precise state treatment에 강하다.
- 다른 회사/제품은 이번 run의 visual anchor에서 제외한다. 단일 회사 reference로 SPEC 판단을 더 좁게 유지한다.

## Anchor Signal Translation

- Color: near-black neutral shell, charcoal panels, hairline border, sparse lavender-blue accent.
- Typography: compact product UI scale, strong row title, quiet metadata, tabular numbers.
- Spacing: dense but not cramped list rhythm, 8px-ish local radius, stable left/main/detail shell.
- Composition: sidebar scope, top capture/search, filter toolbar, list as primary reading surface, detail pane as edit/recovery scope.
- Interaction/state: selected row stronger than hover, busy save indicator, disabled reason, error recovery path, visible focus.
- Local translation: Linear raw colors, custom font, exact radius, brand mark, and marketing-page darkness are not copied. The reference only translates hierarchy, density, grouping, and state roles.

Design source: local `DESIGN.md` cache at `~/dev/p/study-all/.ref/design-md/official/awesome-design-md/2026-06-28-HEAD-664b3e7/source/design-md/linear.app/DESIGN.md`.

## Candidate Axis

All candidates use the same Linear anchor and shared Todo content.

- Candidate A `linear-queue`: list-first inbox triage with selected task detail.
- Candidate B `linear-detail`: stronger selected detail pane and quieter row density.
- Candidate C `linear-review`: blocked/recovery-first view for production state coverage.
- Final `final`: list-first shell from A, selected-detail clarity from B, recovery note strength from C.

## State Matrix

| State | Status | Evidence |
|---|---|---|
| loading / first-load | implemented | `?candidate=loading` stable shell skeleton |
| refresh / busy | implemented | final save button `aria-busy="true"` |
| empty / no-results | implemented | `?candidate=empty` with reset and capture actions |
| error / recovery | implemented | `?candidate=error` scoped sync recovery |
| focus / keyboard | implemented | `?candidate=focus` visible command and row focus |
| hover / pointer | implemented | row hover CSS; not mixed into focus capture |
| disabled / blocked | implemented | final detail warning and review blocked state |
| selected / current | implemented | selected row + detail pane |
| reduced motion | implemented | `prefers-reduced-motion: reduce` disables transitions |

## Capture Contract

- Base file: `docs/goals/production-todo-app/references/linear-workspace-run1/reference.html`
- Manifest: `docs/goals/production-todo-app/references/linear-workspace-run1/capture-manifest.json`
- Query: `?candidate=queue|detail|review|final|loading|empty|error|focus`
- Desktop viewport: 1440x1000
- Mobile viewport: 390x844
- Output path: `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/`
- Auth/storage: none
- Execution environment: `docs/reference-capture.md` 기준으로 실제 캡처는 승인된 외부 실행 또는 로컬 터미널에서 수행한다.

## Screenshot Artifacts

- candidate linear queue desktop: `screenshots/candidate-linear-queue-desktop.png`
- candidate linear queue mobile: `screenshots/candidate-linear-queue-mobile.png`
- candidate linear detail desktop: `screenshots/candidate-linear-detail-desktop.png`
- candidate linear detail mobile: `screenshots/candidate-linear-detail-mobile.png`
- candidate linear review desktop: `screenshots/candidate-linear-review-desktop.png`
- candidate linear review mobile: `screenshots/candidate-linear-review-mobile.png`
- final desktop: `screenshots/final-desktop.png`
- final mobile: `screenshots/final-mobile.png`
- loading state: `screenshots/state-loading-desktop.png`
- empty state: `screenshots/state-empty-desktop.png`
- error state: `screenshots/state-error-desktop.png`
- focus state: `screenshots/state-focus-desktop.png`

## Capture Infra Decision

반복 가능한 캡처는 `docs/reference-capture.md`의 capture-only harness 계약을 따른다. 이 capture evidence는 SPEC 판단 재료이며 앱 E2E나 production acceptance baseline이 아니다.

## Non-goal

- 앱 scaffold 생성 안 함.
- React/Next/Fastify 기술 스택 확정 안 함.
- 실제 persistence/API/drag-and-drop 구현 안 함.
- public reference style raw copy 안 함.
- 다른 회사/제품 visual anchor를 섞지 않음.

## Research Evidence

- Primary job, operability/recovery, local-system translation이 함께 통과해야 review-ready surface로 본다. [[uiux/uiux-review-rules]]
- Dense workspace는 stable shell, search/filter/sort/selection 역할 분리, mobile representation decision이 핵심이다. [[uiux/data-dense-workspace-patterns]]
- Interactive controls는 default/hover/focus/pressed/selected/busy/disabled state vocabulary를 가져야 한다. [[uiux/component-state-feedback-system]]
- Visual reference는 raw copy가 아니라 color/type/spacing/motion/composition signal로 분해해 local tokens로 번역한다. [[uiux/visual-language-signal-extraction]], [[uiux/reference-guided-ui-workflow]]
- Generated/HTML reference packet은 구현 정답이 아니라 direction input이다. [[uiux/generated-reference-packet-model]]

Research status: wiki-supported
Freshness: local-cache 2026-06-28, live web not checked
Write-back: skipped
