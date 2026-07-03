# Production Todo Inbox Shell UI SPEC Packet

날짜: 2026-07-03
상태: 구현 준비 완료
대상 repo/surface: `~/dev/p/note` `apps/production-todo-app/`
모드: 대화형
사용자 확정 신호: 2026-07-03 사용자 답변 "기본화면 우선", "제가 전부"

## 내가 이해한 요청

- 요청 요약: `production-todo-app`의 첫 구현 단위로 Vite + TypeScript + React 앱을 시작하고, Linear-style reference의 `final-desktop.png`, `final-mobile.png` 기준 UI/UX shell만 구현한다.
- 사용자가 원하는 결과: 기능 동작 없이 레퍼런스의 시각 구조, 밀도, 배치, 텍스트 계층, selected row, busy-looking primary action, desktop/mobile 반응형 형태를 재현할 수 있는 첫 앱 화면.
- 원문 요청: "$spec-gated-coding 목표: production-todo-app / 이미지 레퍼런스: docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/final-*.png / scope: vite + ts + react 로 스타트 / 이미지 레퍼런스 기준 uiux 만 그대로 구현 / non-goal: 기능적인 모든것"

## 현재 확정된 것

- 목표 slug는 `production-todo-app`이다.
- 앱 코드는 `apps/production-todo-app/` 아래 독립 앱으로 시작한다.
- 첫 섹션은 `Inbox shell`이다.
- 기술 시작점은 Vite + TypeScript + React다.
- 구현 기준 이미지는 `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/final-desktop.png`, `final-mobile.png`이다.
- 이번 범위는 UI/UX 재현이며 기능 동작은 전부 제외한다.
- root workspace, shared package, Turbo 설정은 만들지 않는다.

## 미정 질문 (Open Questions)

| 질문 | 왜 묻는가 | 답변이 구현에 미치는 영향 | 상태 |
|---|---|---|---|
| Q1. 이번 SPEC acceptance는 `final-desktop.png`, `final-mobile.png` 기본 화면만 기준으로 잠글까? 아니면 loading/empty/error/focus 상태 스크린샷도 같은 구현 범위에 포함할까? | reference brief에는 상태 화면이 있지만 사용자가 지정한 glob은 `final-*.png`다. | 상태 화면을 포함하면 화면 상태 fixture, route/query/state toggle, 추가 screenshot 검증이 필요하다. 기본 화면만이면 첫 shell 구현이 작아진다. | answered: 기본 화면 우선 |
| Q2. 확정 후 production code 구현은 사용자가 직접 할까, 아니면 사용자가 별도로 "네가 구현"이라고 요청할 때 에이전트가 맡을까? | 이 레포의 기본 루프는 사용자가 직접 구현하는 것이다. | 사용자가 직접 구현하면 이 packet은 구현 지침으로 닫고, 에이전트는 이후 채점/피드백을 맡는다. 에이전트 구현이면 이후 scaffold와 코드를 수정한다. | answered: 사용자가 전부 구현 |

## 임시 가정 (Assumptions)

| 가정 | 이유 | 확정 전 구현 가능? |
|---|---|---|
| A1. 이번 packet은 기본 화면 2장(`final-desktop.png`, `final-mobile.png`)만 acceptance 기준으로 둔다. | 사용자가 "기본화면 우선"이라고 확정했다. | yes |
| A2. 기능 동작 제외는 form submit, search/filter, row selection 변경, persistence, routing, API, drag/drop, keyboard command 처리를 모두 제외한다는 뜻이다. | 사용자가 "기능적인 모든것"을 non-goal로 지정했다. | yes |
| A3. 정적 fixture 텍스트와 시각 상태는 UI 재현을 위해 허용한다. | 기능 없이 화면을 만들려면 reference와 같은 표시 데이터가 필요하다. | yes |
| A4. hover/focus CSS 같은 브라우저 기본 상호작용 시각은 UI 품질 범위에 포함하되, 상태 변경 로직은 만들지 않는다. | UI/UX 구현과 기능 구현의 경계를 분리하기 위함이다. | yes |

## 목표 (Goal)

- 관찰 가능한 결과: 로컬 dev server에서 `production-todo-app` 첫 화면이 desktop에서는 sidebar + main list + detail pane 3열 shell로 보이고, mobile에서는 reference처럼 capture/search, busy button, title/filter/list 중심의 단일 column shell로 보인다.
- 사용자/행위자: 직접 구현 연습을 진행하는 사용자.
- source request: 2026-07-03 사용자 `$spec-gated-coding` 요청.

## 범위 (Scope)

- 포함: `apps/production-todo-app/`에 Vite + TypeScript + React 앱 시작.
- 포함: reference의 near-black workspace, charcoal panels, hairline borders, sparse lavender-blue accent, compact product UI typography, dense list rhythm을 local token으로 번역.
- 포함: desktop 1440px 기준 sidebar, top command/capture, primary busy-looking button, filter pills, task list, selected row, right detail pane, warning note, borrow/do-not-borrow panels.
- 포함: mobile 390px 기준 sidebar/detail pane을 숨기거나 제외하고 capture/search, busy-looking button, title, filter pills, task list가 안정적으로 보이는 layout.
- 포함: 정적 fixture task rows, counts, labels, metadata, selected row visual.
- 포함: CSS responsive rules, visible focus style, reduced-motion rule.

## 제외 범위 (Non-goal)

- 제외: task 생성, 수정, 완료, 삭제, 선택 변경, 필터링, 검색, reset, save 같은 모든 기능 동작.
- 제외: loading/empty/error/focus 상태 화면 구현. 이번 섹션은 `final-desktop.png`, `final-mobile.png` 기본 화면만 기준으로 한다.
- 제외: persistence, localStorage, server API, database, authentication.
- 제외: routing, URL state, query param state, app-wide state management.
- 제외: drag-and-drop, keyboard shortcut command 처리.
- 제외: app E2E, production correctness test, backend, deployment.
- 제외: root `pnpm-workspace.yaml`, `turbo.json`, shared `packages/` 생성.
- 제외: Linear raw brand color, custom font, brand mark, exact product clone.

## 도메인 계약 (Domain Contract)

- 도메인 object/resource: `InboxShell`, `TaskRowFixture`, `FilterPill`, `DetailPanel`, `ResponsiveShell`.
- 상태 또는 전이: static default view only. `Saving`, selected row, blocked warning은 화면에 보이는 정적 visual state이며 실제 transition은 없다.
- 권위: local-only.
- invariant: 모든 표시 데이터는 UI fixture이며 product data authority가 아니다. 클릭 가능한 형태로 보이는 요소도 이번 scope에서는 동작하지 않는다.

## 확정된 결정 (Prior Decisions)

- 결정: 첫 앱은 `apps/<goal-slug>/` 아래 독립 앱으로 시작한다.
- 이유/source: `AGENTS.md`, `docs/spec-packets/2026-07-03-app-structure-strategy.md`.
- 결정: reference는 Linear raw copy가 아니라 hierarchy, density, grouping, state role을 local UI로 번역한다.
- 이유/source: `docs/goals/production-todo-app/references/linear-workspace-run1/brief.md`.
- 결정: final reference가 첫 shell 구현 기준이다.
- 이유/source: `docs/goals/production-todo-app/references/linear-workspace-run1/score.md`.

## 선택지 / 프로토타입 결정 (Option Fan-out / Prototype Decision)

- 고려한 선택지: A. final desktop/mobile만 구현, B. final + loading/empty/error/focus visual states까지 구현, C. reference HTML을 앱으로 그대로 이식.
- 선택한 안: A를 확정한다. 첫 섹션은 static Inbox shell의 desktop/mobile parity를 좁게 닫는다.
- 기각한 대안: B는 첫 구현 단위가 커지고 state fixture 계약이 필요하다. C는 reference raw copy에 가까워져 local implementation 연습 목표가 약해진다.
- 결정 주체/source: 사용자 `final-*.png` 지정 + repo section SPEC 규칙.
- 다시 열 조건: 첫 shell review에서 state coverage가 blocker로 판정되거나, 다음 섹션에서 loading/empty/error/focus 상태 SPEC을 별도로 열 때.

## 제약 (Constraints)

- 반드시 보존: 사용자가 직접 구현하는 학습 루프.
- 반드시 보존: 이번 섹션 구현은 사용자가 직접 수행한다.
- 반드시 보존: 기능 동작 제외.
- 반드시 보존: reference는 구현 정답이 아니라 UI/UX 판단 재료라는 경계.
- 반드시 읽을 source: `AGENTS.md`, `docs/goals/production-todo-app/goal.md`, reference `brief.md`, `score.md`, `final-desktop.png`, `final-mobile.png`.
- local source-of-truth: 이 packet, `AGENTS.md`, `docs/goals/production-todo-app/references/linear-workspace-run1/`.

## 금지 리팩터 (Forbidden Refactor)

- 하지 않음: root workspace/Turbo/shared package 도입.
- 하지 않음: reference capture tooling을 앱 E2E나 acceptance baseline으로 변경.
- 하지 않음: reference 문서와 screenshot artifact 재작성.
- 하지 않음: 기능 구현을 UI shell 구현에 섞기.

## 완료 조건 (Acceptance Criteria)

- [ ] AC1: `apps/production-todo-app/`에 Vite + TypeScript + React 앱이 독립적으로 생성되고 app-local `package.json` script로 실행 가능하다.
- [ ] AC2: desktop 1440px 근처 viewport에서 reference처럼 sidebar, main list, detail pane이 안정적인 3열 workspace로 보인다.
- [ ] AC3: mobile 390px 근처 viewport에서 reference처럼 단일 column shell로 보이며 텍스트와 controls가 겹치거나 잘리지 않는다.
- [ ] AC4: selected row, busy-looking primary action, filter pills, warning note, muted metadata, priority/due labels이 reference의 역할과 위계를 유지한다.
- [ ] AC5: 모든 control은 기능 동작 없이 정적 UI로 남고, 클릭/입력/저장/필터/검색 결과 변화가 구현되지 않는다.
- [ ] AC6: 구현 후 최소 정적 검증과 rendered visual evidence가 남는다.

## 완료 조건 분류 (Acceptance Buckets)

| Bucket | 필요한가 | Acceptance / 이유 |
|---|---|---|
| user-visible behavior | yes | AC2-AC5. 사용자는 reference에 맞는 첫 shell을 눈으로 확인할 수 있어야 한다. |
| server authority | N/A | 서버/API가 없다. |
| client recovery | no | error/loading recovery 화면은 Q1 기본안에서는 제외한다. |
| data consistency | yes | fixture task/count/detail text가 reference와 일관되어야 한다. |
| performance | no | 정적 첫 shell이라 별도 성능 목표는 두지 않는다. |
| accessibility | yes | focus-visible, semantic landmarks/headings/buttons/input label 수준은 지켜야 한다. |
| observability | yes | 실행 명령, screenshot/manual visual check, gap을 남겨야 한다. |

## 엣지 케이스 (Edge Cases)

- Empty/loading/error: 기본안에서는 제외한다. Q1에서 포함 결정 시 별도 state acceptance로 추가한다.
- Permission/eligibility: 기능 권한 없음. 모든 data는 local fixture다.
- Retry/duplicate/stale: repeated clicks는 화면 상태를 바꾸지 않는다.
- Partial failure: desktop 또는 mobile 중 하나만 맞으면 완료로 보지 않는다.

## 작업 분해 (Task Breakdown)

| Task | Acceptance | Output files/artifacts | Verification |
|---|---|---|---|
| T1 | AC1 | `apps/production-todo-app/package.json`, Vite/React/TS app files | app-local install/script 확인 |
| T2 | AC2, AC4 | desktop shell components/styles | desktop rendered screenshot/manual check |
| T3 | AC3, AC4 | mobile responsive styles | mobile rendered screenshot/manual check |
| T4 | AC5 | static fixture-only UI implementation | click/input smoke check 또는 code review |
| T5 | AC6 | verification evidence under goal-local artifacts or final report | typecheck/build/rendered evidence |

## 검증 계획 (Verification Map)

| Acceptance | Evidence | Status |
|---|---|---|
| AC1 | app-local `package.json` scripts and Vite dev/build command | pending |
| AC2 | desktop browser screenshot/manual rendered check against `final-desktop.png` | pending |
| AC3 | mobile browser screenshot/manual rendered check against `final-mobile.png` | pending |
| AC4 | visual review of hierarchy, selected row, busy button, filter pills, warning/detail panels | pending |
| AC5 | code review/manual smoke confirming no functional state transitions or persistence | pending |
| AC6 | command output and screenshot paths recorded in this packet or goal artifact | pending |

## 증거 / 공백 로그 (Evidence / Gap Log)

- Research evidence:
  - `[[uiux/uiux-review-rules]]`
  - `[[uiux/data-dense-workspace-patterns]]`
  - `[[uiux/component-state-feedback-system]]`
  - `[[uiux/visual-language-signal-extraction]]`
  - `[[uiux/reference-guided-ui-workflow]]`
  - `[[uiux/generated-reference-packet-model]]`
- Local evidence:
  - `docs/goals/production-todo-app/goal.md`
  - `docs/goals/production-todo-app/references/linear-workspace-run1/brief.md`
  - `docs/goals/production-todo-app/references/linear-workspace-run1/score.md`
  - `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/final-desktop.png`
  - `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/final-mobile.png`
- Verification evidence:
  - pending
- Browser/visual/review evidence:
  - pending
- Gap:
  - 빠진 것: loading/empty/error/focus 상태 화면 구현과 evidence.
  - 왜 중요한가: reference brief에는 상태 방향이 있지만, 이번 섹션은 기본 화면 UI shell만 닫는다.
  - 쉽게 말하면: 상태 화면은 다음 섹션에서 따로 만들 수 있다.
  - 판정: follow-up
- Gap:
  - 빠진 것: 에이전트 구현 diff.
  - 왜 중요한가: 이번 섹션은 사용자가 직접 구현하기로 확정했다.
  - 쉽게 말하면: 이 packet은 구현 지침이고, 코드는 사용자가 작성한다.
  - 판정: accepted gap
- PASS-with-gaps owner/expiry/trigger, if any: N/A

## 사용자 피드백 로그 (User Feedback Log)

- 2026-07-03: 사용자가 `production-todo-app` 시작을 선언하고 다음 작업 방향을 요청했다.
- 2026-07-03: 사용자가 `$spec-gated-coding`으로 목표, 이미지 레퍼런스, Vite + TS + React 시작, UI/UX only scope, 모든 기능 non-goal을 제시했다.
- 2026-07-03: 사용자가 범위는 기본 화면 우선, 구현은 사용자가 전부 진행한다고 답했다.

## 조정 로그 (Reconciliation Log)

- 2026-07-03: 대화형 packet 초안 작성. 사용자 확정 전 production/test code 수정 없음.
- 2026-07-03: Q1/Q2 답변을 반영해 상태를 `구현 준비 완료`로 변경. 구현 범위는 `final-desktop.png`, `final-mobile.png` 기본 화면으로 제한하고, 구현 주체는 사용자 직접 구현으로 확정.
