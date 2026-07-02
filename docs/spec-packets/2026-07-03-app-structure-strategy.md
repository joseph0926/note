# 앱 구조 전략 SPEC Packet

날짜: 2026-07-03
상태: 검증됨
대상 repo/surface: `~/dev/p/note` repo structure
모드: 대화형
사용자 확정 신호: 2026-07-03 사용자가 "확정"이라고 답함

## 내가 이해한 요청

- 요청 요약: 이 레포에 여러 주제/목표 앱이 점차 쌓일 때, 앱들을 어떤 구조로 구성할지 결정한다.
- 사용자가 원하는 결과: Turbo 모노레포를 바로 쓸지, 단순 폴더 분리로 갈지, 또는 단계적으로 승격할지 판단한다.
- 원문 요청: `$spec-gated-coding 목표: 운영에 맞게 여러 주제가 점차 쌓일텐데 어떤 구조로 앱들을 구성할지? turbo 모노레포? 아니면 폴더만 분리?`

## 현재 확정된 것

- 이 레포는 목표 기반 UI/제품 구현 연습 작업공간이다.
- 목표별 레퍼런스, 섹션별 SPEC, 구현 후 피드백 artifact가 누적된다.
- 사용자가 구현을 직접 하는 루프가 기본이다.
- `~/dev/p/` 아래 프로젝트는 `pnpm`을 사용한다.
- 현재 앱 코드, package manager 설정, workspace 설정, Turbo 설정은 없다.
- 목표 앱들은 React라는 큰 틀은 공유하지만 frontend-only, Next.js 풀스택, React + Fastify 조합처럼 스택이 달라질 수 있다.
- 목표 앱들을 동시에 실행하거나 동시에 검증할 필요는 없다.
- 공유 UI/token/test helper 필요성은 아직 불확실하다. shadcn을 쓰면 공유 가능성이 생길 수 있지만, 목표 앱별 복사/변형 가능성도 열려 있다.
- 1차 목적은 포트폴리오가 아니라 AI 의존도를 줄이고 사용자 본인의 코딩 감각을 유지하는 것이다.

## 미정 질문 (Open Questions)

| 질문 | 왜 묻는가 | 답변이 구현에 미치는 영향 | 상태 |
|---|---|---|---|
| 첫 2~3개 목표 앱은 같은 기술 스택으로 갈 예정인가? | shared package와 workspace 도입 타이밍을 결정한다. | React 기반은 공유하지만 앱 형태는 달라질 수 있으므로 goal-local 격리를 기본으로 둔다. | answered |
| 목표 앱들이 동시에 실행/검증될 필요가 있는가? | Turbo의 task graph/cache 가치가 여기서 생긴다. | 동시 실행/검증이 필요 없으므로 Turbo 도입 trigger가 없다. | answered |
| 여러 앱이 공유해야 할 UI token, primitive, test helper가 곧 생기는가? | `packages/ui`, `packages/test-utils` 같은 내부 패키지의 필요성을 판단한다. | 공유 가능성은 있으나 불확실하므로 실제 2개 이상 앱에서 재사용될 때 package로 승격한다. | answered |
| 이 레포를 포트폴리오/이력서 evidence로 보여줄 계획인가? | 구조가 학습용 convenience인지, 운영 품질 signal인지가 달라진다. | 1차 목적은 학습 루프 유지이므로 운영 품질 signal보다 낮은 마찰을 우선한다. | answered |

## 임시 가정 (Assumptions)

| 가정 | 이유 | 확정 전 구현 가능? |
|---|---|---|
| 지금은 Turbo를 바로 도입하지 않고, Turbo-compatible 폴더 구조만 먼저 예약한다. | 동시 실행/검증이 필요 없고 task graph가 아직 없다. | yes |
| 첫 앱은 `apps/<goal-slug>/`에 독립 앱으로 두고, 목표 운영 문서는 `docs/goals/<goal-slug>/`에 둔다. | 코드와 학습/evidence artifact를 분리할 수 있다. | yes |
| 공유 코드가 실제로 2개 이상 앱에서 쓰이기 전에는 `packages/`를 만들지 않는다. | premature shared package는 ownership을 흐린다. | yes |
| 각 앱은 우선 자기 `package.json`과 검증 명령을 소유한다. | 목표별 스택이 달라질 수 있으므로 root tooling보다 앱별 독립성이 중요하다. | yes |

## 목표 (Goal)

- 관찰 가능한 결과: 여러 목표 앱이 쌓여도 코드, reference, SPEC, feedback, 검증 evidence 위치가 예측 가능하다.
- 사용자/행위자: 사용자, Codex 에이전트.
- source request: 현재 대화의 구조 결정 요청.

## 범위 (Scope)

- 포함: 앱 누적 구조의 후보안 비교.
- 포함: Turbo 도입 기준과 보류 기준 정의.
- 포함: 첫 scaffold 전 확인해야 할 blocker 질문 정리.
- 포함: research 근거를 SPEC packet에 남기기.

## 제외 범위 (Non-goal)

- 제외: `package.json`, `pnpm-workspace.yaml`, `turbo.json` 생성.
- 제외: 앱 scaffold 생성.
- 제외: 특정 프레임워크 선택.
- 제외: 목표 앱의 첫 기능/SPEC 작성.

## 도메인 계약 (Domain Contract)

- 도메인 object/resource: goal app, shared package, reference artifact, section SPEC, feedback artifact, verification evidence.
- 상태 또는 전이: topic/goal proposed -> goal docs created -> app scaffolded -> shared package promoted if reused -> Turbo introduced if task graph/caching value exists.
- 권위: local-only.
- invariant: 구조 도입은 실제 반복 비용을 줄이는 방향이어야 하며, 레퍼런스/SPEC/피드백 artifact와 앱 코드는 경로상 분리된다.

## 확정된 결정 (Prior Decisions)

- 결정: "독립 앱 폴더 우선, workspace/Turbo 지연 도입"을 확정했다.
- 이유/source: 사용자는 목표 앱의 스택이 달라질 수 있고, 동시 실행/검증이 필요 없으며, 1차 목적은 학습 루프 유지라고 답했다.

## 선택지 / 프로토타입 결정 (Option Fan-out / Prototype Decision)

- 고려한 선택지:
  - A. 단순 폴더 분리: `goals/<goal>/app` 또는 `apps/<goal>`만 두고 workspace/tooling 없음.
  - B. pnpm workspace만 도입: `apps/*`, 필요 시 `packages/*`, Turbo 없음.
  - C. pnpm workspace + Turbo: task graph, cache, filter/affected 실행까지 도입.
- 임시 추천:
  - A를 기본으로 선택: 각 목표 앱은 `apps/<goal-slug>/` 아래 독립 앱으로 시작한다.
  - `docs/goals/<goal-slug>/`에는 reference, feedback, artifacts를 둔다.
  - `docs/spec-packets/YYYY-MM-DD-<goal-slug>-<section-slug>.md`에는 섹션별 SPEC을 둔다.
  - pnpm workspace는 공유 package가 실제로 필요해질 때 도입한다.
  - Turbo는 workspace가 생긴 뒤 root-level task graph/cache/affected 실행 가치가 생길 때 도입한다.
- 기각한 대안:
  - 지금 즉시 Turbo: 현재 task graph, shared package, CI/affected build 요구가 없어서 설정이 목적보다 앞선다.
  - 지금 즉시 pnpm workspace: 목표별 스택이 달라질 수 있고 공유 package가 확정되지 않아 root lockfile과 workspace 규칙이 먼저 부담이 된다.
  - 완전 자유 폴더: 목표가 늘어날수록 reference/SPEC/feedback/app 경계가 흐려진다.
- 결정 주체/source: 사용자 확정 필요.
- 다시 열 조건: 같은 코드가 두 앱 이상에서 반복되거나, shadcn/tokens/primitives를 한곳에서 관리해야 하거나, root-level 검증 명령이 필요해질 때.

## 구조 결정

```text
apps/
  <goal-slug>/
    package.json
    src/

docs/
  goals/
    <goal-slug>/
      references/
      feedback/
      artifacts/
  spec-packets/
    YYYY-MM-DD-<goal-slug>-<section-slug>.md
```

- 기본: 앱별 독립 폴더. 각 앱이 자기 dependency, script, dev server, test command를 소유한다.
- `packages/` 생성 trigger: 같은 UI primitive, token, schema, test helper가 두 앱 이상에서 실제로 재사용되고, 복사보다 shared contract가 더 단순해질 때.
- `pnpm-workspace.yaml` 생성 trigger: `packages/*`를 만들거나, root에서 여러 앱을 한 번에 관리해야 할 때.
- `turbo.json` 생성 trigger: workspace가 생긴 뒤 `build`, `test`, `lint`, `typecheck` 같은 task graph와 cache가 반복 시간을 실질적으로 줄일 때.
- shadcn 기본 원칙: 첫 앱에서는 app-local로 둔다. 두 앱 이상에서 같은 토큰/primitive를 유지해야 하는 순간 shared `packages/ui` 승격을 검토한다.

## 제약 (Constraints)

- 반드시 보존: 사용자가 직접 구현하는 루프.
- 반드시 읽을 source: `AGENTS.md`, `README.md`, 중앙 research `turbo`/`architecture` topic.
- local source-of-truth: `AGENTS.md`, 이 packet.

## 금지 리팩터 (Forbidden Refactor)

- 하지 않음: 사용자 확정 전 앱 scaffold 생성.
- 하지 않음: 사용자 확정 전 Turbo/pnpm workspace 설정 생성.
- 하지 않음: 기존 문서의 artifact layout을 구조 결정 없이 대규모 변경.

## 완료 조건 (Acceptance Criteria)

- [x] AC1: 앱 누적 구조의 기본안이 하나로 선택된다.
- [x] AC2: Turbo 도입/보류 trigger가 명시된다.
- [x] AC3: 코드 경로와 목표 artifact 경로가 충돌하지 않는다.
- [x] AC4: 사용자가 blocker 질문에 답하고 `확정` 또는 동등한 신호를 준다.

## 완료 조건 분류 (Acceptance Buckets)

| Bucket | 필요한가 | Acceptance / 이유 |
|---|---|---|
| user-visible behavior | yes | 새 목표를 시작할 때 어디에 앱과 문서를 둘지 명확해야 한다. |
| server authority | N/A | 서버 없음. |
| client recovery | N/A | 앱 구조 결정 단계. |
| data consistency | yes | goal/app/package/artifact 경로가 일관돼야 한다. |
| performance | yes | Turbo 도입은 task 실행 성능/캐시 가치가 있을 때만 한다. |
| accessibility | N/A | UI 구현 전. |
| observability | yes | 목표별 evidence가 추적 가능해야 한다. |

## 엣지 케이스 (Edge Cases)

- Empty/loading/error: 앱이 0개인 현재 상태에서 구조만 과하게 만들지 않는다.
- Permission/eligibility: git 쓰기 작업은 하지 않는다.
- Retry/duplicate/stale: 목표명이 바뀌면 app slug와 docs slug를 같이 조정한다.
- Partial failure: 첫 앱이 끝나기 전 shared package를 만들면 경계가 과해질 수 있다.

## 작업 분해 (Task Breakdown)

| Task | Acceptance | Output files/artifacts | Verification |
|---|---|---|---|
| T1 | AC1, AC2 | 이 packet의 후보안/trigger | 사용자 확인 |
| T2 | AC3 | future path contract 초안 | 문서 검색 |
| T3 | AC4 | 사용자 피드백 로그 | 사용자 확정 신호 |

## 검증 계획 (Verification Map)

| Acceptance | Evidence | Status |
|---|---|---|
| AC1 | 사용자 확정 신호 기반으로 "독립 앱 폴더 우선, workspace/Turbo 지연 도입" 선택 | passed |
| AC2 | packet의 구조 권고안 trigger | passed |
| AC3 | `apps/<goal-slug>/`, `docs/goals/<goal-slug>/`, `docs/spec-packets/*` 분리 | passed |
| AC4 | 2026-07-03 사용자 "확정" 답변 | passed |

## 증거 / 공백 로그 (Evidence / Gap Log)

- Research evidence:
  - Turborepo는 패키지 매니저 workspace가 만든 Package Graph와 `turbo.json`이 만든 Task Graph 위에서 동작하며, 각 package의 `package.json`, root lockfile, workspace 설정이 전제다. [[turbo/package-task-graph]]
  - Internal Package는 Application Package와 구분되며, JIT/Compiled/Publishable 전략에 따라 설정량과 cacheability가 달라진다. [[turbo/internal-package-strategies]]
  - Turborepo cache는 task 입력 hash를 기반으로 하며, build 결과에 영향을 주는 입력을 hash에 등록해야 정합성이 유지된다. [[turbo/caching-model]]
  - 프론트엔드 구조의 핵심은 프레임워크나 도구보다 domain, mapping, data-access, feature, render 같은 레이어 경계와 ownership이다. [[architecture/frontend-layer-architecture]]
  - 구체 scaffold는 `apps/`와 `packages/`를 나누되, 작은 팀은 domain, mapping, data-access, features, ui/tokens 같은 최소 레이어부터 시작하는 방식으로 제시된다. [[architecture/frontend-layer-scaffold]]
- Local evidence:
  - 현재 repo에는 `AGENTS.md`, `README.md`, `CLAUDE.md`, `docs/spec-packets/*`만 있고 앱/package 설정은 없다.
- Verification evidence: `sed -n '1,220p' AGENTS.md`, `sed -n '1,220p' README.md`, `sed -n '1,340p' docs/spec-packets/2026-07-03-app-structure-strategy.md`, 문서 절대경로 검색, `git diff --check` 통과.
- Browser/visual/review evidence: N/A.
- Gap:
  - 빠진 것: 첫 목표 앱의 실제 slug와 기술 스택.
  - 왜 중요한가: 앱 scaffold는 목표가 정해져야 생성할 수 있다.
  - 쉽게 말하면: 운영 구조는 확정됐지만 첫 앱 자체는 아직 정해지지 않았다.
  - 판정: follow-up

## 사용자 피드백 로그 (User Feedback Log)

- 2026-07-03: 사용자가 여러 주제/앱 누적 구조와 Turbo 도입 여부를 질문했다.
- 2026-07-03: 사용자가 React 큰 틀은 공유하되 목표별 앱 형태는 달라질 수 있고, 동시 실행/검증은 필요 없으며, 공유 코드는 불확실하고, 1차 목적은 학습 루프 유지라고 답했다.
- 2026-07-03: 사용자가 "확정"이라고 답해 구조 결정을 승인했다.

## 조정 로그 (Reconciliation Log)

- 2026-07-03: 대화형 packet 초안 작성. 사용자 확정 전 코드/설정 변경 없음.
- 2026-07-03: 사용자 답변을 반영해 "독립 앱 폴더 우선, workspace/Turbo 지연 도입" 권고안으로 갱신.
- 2026-07-03: 확정 신호를 반영해 `AGENTS.md`와 `README.md` 운영 규칙으로 승격.
- 2026-07-03: 운영 문서와 packet을 재검증하고 상태를 `검증됨`으로 갱신.
