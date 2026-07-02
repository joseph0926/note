# Reference Capture Infra SPEC Packet

날짜: 2026-07-03
상태: 완료
대상 repo/surface: `~/dev/p/note` reference capture tooling
모드: 빠른
사용자 확정 신호: "나머지는 당신이 진행"

## 내가 이해한 요청

- 요청 요약: 이미 설치된 `@playwright/test`와 Chromium을 기반으로 reference screenshot capture tooling의 나머지 구성을 구현한다.
- 사용자가 원하는 결과: `docs/goals/<goal-slug>/references/<run-slug>/capture-manifest.json`을 읽어 desktop/mobile/state PNG를 반복 생성할 수 있어야 한다.
- 원문 요청: "pnpm add -D @playwright/test / pnpm exec playwright install chromium 여기까진 완료하였습니다. 나머진느 당신이 진행"

## 현재 확정된 것

- `docs/reference-capture.md`가 capture-only harness 운영 계약이다.
- root tooling으로 둔다.
- 앱 scaffold, 앱 E2E, Turbo, workspace는 만들지 않는다.
- 현재 첫 대상 run은 `docs/goals/production-todo-app/references/linear-workspace-run1/`이다.

## 미정 질문 (Open Questions)

| 질문 | 왜 묻는가 | 답변이 구현에 미치는 영향 | 상태 |
|---|---|---|---|
| 없음 | 현재 범위는 문서와 사용자 확정 신호로 닫힘 | 구현 진행 가능 | answered |

## 임시 가정 (Assumptions)

| 가정 | 이유 | 확정 전 구현 가능? |
|---|---|---|
| `capture:reference`는 모든 `capture-manifest.json`을 자동 발견한다 | 목표가 늘어날 때 매번 script를 늘리지 않기 위함 | yes |
| 각 manifest item의 `output`은 manifest 파일이 있는 run directory 기준 상대경로다 | `docs/reference-capture.md`의 goal-local evidence 계약과 맞음 | yes |

## 목표 (Goal)

- 관찰 가능한 결과: `pnpm capture:reference`가 reference manifest를 읽고 PNG screenshot을 생성하며 PNG 치수를 검증한다.
- 사용자/행위자: 레퍼런스 생성 루프를 운영하는 사용자와 에이전트.
- source request: 사용자 설치 완료 후 나머지 진행 요청.

## 범위 (Scope)

- 포함: root `package.json` script 추가.
- 포함: Playwright reference capture config 추가.
- 포함: capture tooling 전용 TypeScript config와 typecheck script 추가.
- 포함: capture manifest 기반 Playwright spec 추가.
- 포함: 현재 production todo reference run의 `capture-manifest.json` 추가.
- 포함: 관련 문서의 tooling 상태와 실행 명령 갱신.

## 제외 범위 (Non-goal)

- 제외: 앱 scaffold 생성.
- 제외: 앱 E2E test 작성.
- 제외: visual regression baseline 도입.
- 제외: CI workflow 작성.
- 제외: Turbo, pnpm workspace, shared package 도입.

## 도메인 계약 (Domain Contract)

- 도메인 object/resource: reference run, capture manifest, screenshot matrix item.
- 상태 또는 전이: manifest item pending -> screenshot generated -> PNG size verified.
- 권위: local-only.
- invariant: capture output은 goal-local `screenshots/` 아래에 남고, app E2E artifact와 섞이지 않는다.

## 확정된 결정 (Prior Decisions)

- 결정: capture-only harness로 구현한다.
- 이유/source: `docs/reference-capture.md`, [[playwright/reference-screenshot-capture-harness]], [[uiux/generated-reference-packet-model]].

## 선택지 / 프로토타입 결정 (Option Fan-out / Prototype Decision)

- 고려한 선택지: root tooling, goal-local tooling, direct Chrome script.
- 선택한 안: root Playwright capture-only tooling.
- 기각한 대안: goal-local tooling은 목표가 늘 때 중복이 생긴다. direct Chrome script는 manifest, reporter, viewport 계약이 약하다.
- 결정 주체/source: 사용자 확정 + `docs/reference-capture.md`.
- 다시 열 조건: 앱별로 서로 다른 browser/runtime이 필요해지거나 capture가 app dev server와 강하게 결합될 때.

## 제약 (Constraints)

- 반드시 보존: reference screenshot은 SPEC 판단 재료이며 production acceptance baseline이 아니다.
- 반드시 읽을 source: `AGENTS.md`, `docs/reference-capture.md`.
- local source-of-truth: `docs/reference-capture.md`.

## 금지 리팩터 (Forbidden Refactor)

- 하지 않음: 앱 코드 생성.
- 하지 않음: workspace/Turbo 도입.
- 하지 않음: 기존 reference HTML 구조 변경.

## 완료 조건 (Acceptance Criteria)

- [x] AC1: `pnpm capture:reference` script가 존재한다.
- [x] AC2: Playwright reference config가 앱 E2E와 분리된 `testDir`, `outputDir`, reporter를 사용한다.
- [x] AC3: capture spec이 manifest를 읽어 screenshot을 생성하고 PNG dimensions를 검증한다.
- [x] AC4: 현재 production todo reference run에 manifest가 존재한다.
- [x] AC5: 승인된 외부 실행 또는 로컬 터미널의 `pnpm capture:reference` 실행으로 현재 run의 screenshot 생성이 성공한다.
- [x] AC6: `pnpm typecheck`가 capture tooling TypeScript file set을 검증한다.

## 완료 조건 분류 (Acceptance Buckets)

| Bucket | 필요한가 | Acceptance / 이유 |
|---|---|---|
| user-visible behavior | yes | 사용자는 명령 하나로 reference screenshot을 재생성할 수 있어야 한다. |
| server authority | N/A | 서버 동작 없음. |
| client recovery | no | reference capture 실패는 명령 실패로 충분하다. |
| data consistency | yes | manifest와 screenshot path가 일치해야 한다. |
| performance | no | 단일 reference capture 규모라 별도 성능 목표 없음. |
| accessibility | N/A | UI 구현이 아니라 capture tooling이다. |
| observability | yes | reporter와 command output이 실패 지점을 드러내야 한다. |

## 엣지 케이스 (Edge Cases)

- Empty/loading/error: reference state query로 캡처한다.
- Permission/eligibility: manifest/source file이 없으면 명령이 실패한다.
- Retry/duplicate/stale: 동일 output filename은 재생성으로 덮어쓴다.
- Partial failure: 한 matrix item 실패 시 Playwright test failure로 드러난다.

## 작업 분해 (Task Breakdown)

| Task | Acceptance | Output files/artifacts | Verification |
|---|---|---|---|
| T1 | AC1, AC2 | `package.json`, `playwright.reference.config.ts` | script/config 확인 |
| T2 | AC3 | `tools/reference-capture/capture-reference.spec.ts` | `pnpm exec playwright test -c playwright.reference.config.ts --list` + 외부/로컬 capture |
| T3 | AC4 | `capture-manifest.json` | file existence + test discovery |
| T4 | AC5 | regenerated screenshots | 외부/로컬 `pnpm capture:reference` + PNG dimension 확인 |

## 검증 계획 (Verification Map)

| Acceptance | Evidence | Status |
|---|---|---|
| AC1 | `package.json` script 확인 | passed |
| AC2 | `playwright.reference.config.ts` 확인 | passed |
| AC3 | `pnpm exec playwright test -c playwright.reference.config.ts --list`, 승인된 외부 실행 `pnpm capture:reference` | passed |
| AC4 | `capture-manifest.json` 확인 | passed |
| AC5 | Playwright run + PNG dimension 확인 | passed |
| AC6 | `pnpm typecheck` | passed |

## 증거 / 공백 로그 (Evidence / Gap Log)

- Research evidence: [[playwright/reference-screenshot-capture-harness]], [[uiux/generated-reference-packet-model]]
- Local evidence: `docs/reference-capture.md`
- Verification evidence:
  - `pnpm exec playwright test -c playwright.reference.config.ts --list`가 1개 spec 파일에서 12개 capture test를 발견했다.
  - managed shell 내부 `pnpm capture:reference` 실행 시 Playwright test 12개가 시작됐으나 Chromium launch 단계에서 실패했다.
  - 실패 signature: `MachPortRendezvousServer... Permission denied (1100)`, `kill EPERM`.
  - 이는 capture code나 manifest failure가 아니라 managed shell sandbox의 macOS browser process 권한 문제로 판단한다.
  - 사용자 피드백에 따라 실제 screenshot 재생성의 기본 실행 경로는 managed shell이 아니라 승인된 외부 실행 또는 로컬 터미널 실행으로 정리했다.
  - 승인된 외부 실행 `pnpm capture:reference`에서 12개 capture test가 모두 통과했다.
  - TypeScript config 기준은 [[typescript/tsconfig]], [[typescript/compiler-options-by-runtime]], [[typescript/module-system-and-resolution]]를 따랐다.
  - `pnpm typecheck`가 통과했다.
- Browser/visual/review evidence:
  - Playwright 기반 screenshot 12개가 `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/` 아래에 생성됐다.
  - `file screenshots/*.png` 확인 결과 desktop은 1440x1000, mobile은 390x844 PNG로 생성됐다.
- Gap:
  - 없음.

## 사용자 피드백 로그 (User Feedback Log)

- 2026-07-03: 사용자가 Playwright 패키지와 Chromium 설치 완료 후 나머지 진행을 요청.
- 2026-07-03: 사용자가 실제 캡처를 샌드박스 실패 후 대체 경로로 두지 말고, 승인된 외부 실행 또는 로컬 터미널 실행을 기본값으로 설정하라고 피드백.

## 조정 로그 (Reconciliation Log)

- 2026-07-03: 최초 packet 작성.
- 2026-07-03: `package.json`, `.gitignore`, Playwright config, capture spec, manifest, 운영 문서 갱신.
- 2026-07-03: managed shell 내부 `pnpm capture:reference`가 Chromium Mach port 권한 문제로 실패. 실제 캡처는 승인된 외부 실행 또는 로컬 터미널 실행을 기본값으로 운영 문서에 기록.
- 2026-07-03: 브라우저 실행 전 test discovery는 통과했고 12개 capture test가 확인됨.
- 2026-07-03: 승인된 외부 실행 `pnpm capture:reference`가 통과해 12개 screenshot PNG를 재생성함.
- 2026-07-03: root `tsconfig.json`과 `pnpm typecheck`를 추가해 capture tooling TS file set을 검증 대상으로 고정함.
