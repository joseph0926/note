# AGENTS.md

## 기본 응답

- 이 레포는 사용자가 직접 UI/제품 코드를 구현하며 학습하는 목표 기반 작업공간이다.
- 에이전트는 코드를 먼저 만들지 않고, 목표별 레퍼런스 생성, 섹션별 SPEC 작성, 구현 후 채점/피드백을 돕는다.

## 레포 목표

사용자가 하나의 목표를 정하면, 이 레포는 아래 루프를 따른다.

1. 사용자가 목표를 설정한다. 예: 프로덕션급 todo 앱.
2. 에이전트는 `uiux-experiment-runner`로 목표에 어울리는 회사/제품 anchor를 잡아 레퍼런스를 생성한다.
3. 레퍼런스 생성 시 `research-query`로 UI/UX 근거와 anti-slop 판단을 확인한다.
4. 레퍼런스 생성 단계에서는 앱 코드, 테스트 코드, production surface를 구현하지 않는다.
5. 사용자와 에이전트가 레퍼런스 이미지 기반으로 `spec-gated-coding` packet을 작성한다.
6. SPEC은 전체 앱 한 번에 작성하지 않고, 화면/섹션/흐름 단위로 쪼갠다.
7. 사용자가 해당 섹션을 직접 구현한다.
8. 구현 후 에이전트는 `research-query` 기반으로 채점, 피드백, evidence gap을 남긴다.
9. 같은 목표 안에서 다음 섹션으로 반복한다.
10. 목표가 완료되면 완료 evidence를 정리하고 다음 목표로 넘어간다.

## 산출물 위치

- 목표별 앱 코드: `apps/<goal-slug>/`
- 목표별 운영 문서: `docs/goals/<goal-slug>/`
- 레퍼런스 산출물: `docs/goals/<goal-slug>/references/`
- 섹션별 SPEC packet: `docs/spec-packets/YYYY-MM-DD-<goal-slug>-<section-slug>.md`
- 구현 후 피드백: `docs/goals/<goal-slug>/feedback/`
- 스크린샷과 검증 evidence: 목표별 `artifacts/` 또는 해당 스킬이 정한 더 가까운 경로

## 앱 구조

- 목표 앱은 기본적으로 `apps/<goal-slug>/` 아래 독립 앱으로 시작한다.
- 각 앱은 자기 `package.json`, dependency, script, dev server, test command를 소유한다.
- 목표 앱은 React 기반일 수 있지만 frontend-only, Next.js 풀스택, React + Fastify 조합처럼 스택이 달라질 수 있다.
- `packages/`는 같은 UI primitive, token, schema, test helper가 두 앱 이상에서 실제로 재사용되고 shared contract가 복사보다 단순해질 때 만든다.
- `pnpm-workspace.yaml`은 `packages/*`가 생기거나 root에서 여러 앱을 함께 관리해야 할 때 만든다.
- `turbo.json`은 workspace가 생긴 뒤 `build`, `test`, `lint`, `typecheck` task graph와 cache가 반복 시간을 실질적으로 줄일 때 만든다.
- shadcn은 첫 앱에서는 app-local로 둔다. 두 앱 이상에서 같은 token/primitive를 유지해야 할 때 shared `packages/ui` 승격을 검토한다.

## 경로 표기

- 절대경로를 작성할 때는 `~/`로 시작한다.

## 레퍼런스 생성 규칙

- 회사/제품 anchor는 그대로 복제하지 않고, color, typography, density, composition, interaction, motion signal로 번역한다.
- 가능한 경우 중앙 research wiki와 local design source of truth를 먼저 확인한다.
- `uiux-experiment-runner` 산출물에는 brief, 후보안, screenshot path, 점수표, final direction, 남은 위험이 있어야 한다.
- desktop/mobile screenshot evidence 없이 UI 실험 완료를 선언하지 않는다.
- 반복 가능한 reference screenshot capture는 `docs/reference-capture.md`의 결정을 따른다.
- 레퍼런스 단계의 산출물은 구현 지시가 아니라 SPEC 작성을 위한 판단 재료다.

## SPEC 작성 규칙

- `spec-gated-coding` packet은 한국어를 기본으로 작성한다.
- 한 packet은 한 섹션, 한 화면 상태, 또는 한 사용자 흐름을 대상으로 한다.
- Goal, Scope, Non-goal, Domain contract, Acceptance, Verification map이 닫히기 전에는 구현을 시작하지 않는다.
- 열린 질문은 blocker와 gap으로 구분한다.
- 레퍼런스 이미지에서 보이는 요소라도 해당 섹션 목표와 무관하면 Non-goal로 둔다.

## 구현/피드백 규칙

- 사용자가 직접 구현하는 루프가 기본이다. 에이전트가 대신 구현하려면 사용자의 명시 요청이 필요하다.
- 사용자가 구현한 뒤에는 먼저 관련 diff, 화면, 테스트 가능 범위를 확인한다.
- 피드백은 버그, 회귀, 접근성, 상태 누락, product-quality gap, 테스트 gap을 우선한다.
- 피드백 주장은 가능한 한 `research-query`의 `[[topic/page]]` citation이나 로컬 source로 추적 가능해야 한다.
- 평가 후 다음 액션은 같은 섹션 재작업, 다음 섹션 SPEC, 목표 완료 중 하나로 닫는다.

## 금지/주의

- 목표나 섹션이 확정되지 않은 상태에서 앱 scaffold를 만들지 않는다.
- 첫 목표 앱이 정해지기 전에는 root workspace, shared package, Turbo 설정을 만들지 않는다.
- 레퍼런스 생성 요청을 production 구현으로 해석하지 않는다.
- mock 데이터에 AI 제품/모델/벤더명을 쓰지 않는다.
- git 쓰기 작업은 하지 않는다.
- `.env`, `.env.loca`, `.env.local`은 읽거나 쓰지 않는다.

## 완료 기준

- 현재 목표와 현재 섹션이 문서로 추적된다.
- 레퍼런스, SPEC, 구현 feedback이 서로 연결된다.
- 검증을 실행할 수 없으면 이유와 가장 가까운 대체 evidence를 남긴다.
- 목표 종료 시 완료한 섹션, 남은 gap, 다음 목표 후보를 짧게 정리한다.
