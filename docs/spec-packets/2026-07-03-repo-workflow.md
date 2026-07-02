# Repo Workflow SPEC Packet

날짜: 2026-07-03
상태: 검증됨
대상 repo/surface: `~/dev/p/note` root docs
모드: 빠른
사용자 확정 신호: 사용자가 레포 목표와 6단계 루프를 직접 제시함

## 내가 이해한 요청

- 요청 요약: 이 레포를 목표 기반 UI/제품 구현 연습 루프의 작업공간으로 운영한다.
- 사용자가 원하는 결과: 목표 설정 -> 레퍼런스 생성 -> 섹션별 SPEC -> 사용자 구현 -> 채점/피드백 -> 반복 -> 다음 목표 전환 흐름이 에이전트와 사람이 모두 따를 수 있게 남는다.
- 원문 요청: 사용자가 6단계 루프와 사용할 스킬(`uiux-experiment-runner`, `research-query`, `spec-gated-coding`)을 명시했다.

## 현재 확정된 것

- 사용자가 목표를 먼저 정한다. 예: 프로덕션급 todo 앱.
- 레퍼런스 생성은 `uiux-experiment-runner`를 사용하되, 목표에 맞는 회사/제품 anchor를 잡고 `research-query`로 anti-slop 근거를 확인한다.
- 레퍼런스 생성 단계에서는 코드 구현을 하지 않는다.
- SPEC은 전체 앱 단위가 아니라 레퍼런스 이미지 기반 섹션별로 작성한다.
- 실제 구현은 사용자가 직접 한다.
- 구현 후 평가는 `research-query` 기반 채점/피드백으로 진행한다.
- 목표가 완료되면 다음 주제로 넘어간다.

## 미정 질문 (Open Questions)

| 질문 | 왜 묻는가 | 답변이 구현에 미치는 영향 | 상태 |
|---|---|---|---|
| 없음 | 이번 변경은 운영 문서 작성으로 닫힌다. | 없음 | answered |

## 임시 가정 (Assumptions)

| 가정 | 이유 | 확정 전 구현 가능? |
|---|---|---|
| 빈 레포이므로 루트 `AGENTS.md`와 `README.md`를 source of truth로 둔다. | 현재 `.git` 외 파일이 없다. | yes |
| 목표별 산출물 경로는 `docs/` 아래에 둔다. | 코드 구현 전 레퍼런스/SPEC/evidence를 분리하기 쉽다. | yes |

## 목표 (Goal)

- 관찰 가능한 결과: 새 세션의 에이전트가 이 레포에서 코드를 먼저 만들지 않고, 목표별 reference -> section SPEC -> user implementation -> feedback loop를 따른다.
- 사용자/행위자: 사용자, Codex 에이전트.
- source request: 현재 대화의 6단계 레포 목표.

## 범위 (Scope)

- 포함: 루트 `AGENTS.md` 작성.
- 포함: 사람용 `README.md` 작성.
- 포함: 이번 변경의 SPEC packet 작성.

## 제외 범위 (Non-goal)

- 제외: 앱 코드 scaffold 생성.
- 제외: 실제 UI reference image 생성.
- 제외: 목표별 SPEC packet 작성.
- 제외: 중앙 research wiki 직접 수정.

## 도메인 계약 (Domain Contract)

- 도메인 object/resource: goal, reference artifact, section SPEC packet, implementation attempt, feedback report.
- 상태 또는 전이: goal proposed -> reference generated -> section spec locked -> user implemented -> feedback reviewed -> next section 또는 goal completed.
- 권위: local-only.
- invariant: reference generation 단계에서는 production/test code를 수정하지 않는다.

## 확정된 결정 (Prior Decisions)

- 결정: 코드 구현은 사용자가 직접 하며, 에이전트는 레퍼런스 생성, SPEC 작성, 채점/피드백에 집중한다.
- 이유/source: 사용자 원문 요청.

## 선택지 / 프로토타입 결정 (Option Fan-out / Prototype Decision)

- 고려한 선택지: `AGENTS.md`만 작성, `README.md`만 작성, 둘 다 작성.
- 선택한 안: `AGENTS.md`와 `README.md`를 함께 작성.
- 기각한 대안: 한 파일만 두면 에이전트 운영 규칙과 사람용 설명이 섞인다.
- 결정 주체/source: local repo docs 관례와 사용자 요청.
- 다시 열 조건: 레포에 별도 docs/source-of-truth 구조가 생길 때.

## 제약 (Constraints)

- 반드시 보존: 사용자가 제공한 루프의 순서와 "코드 구현은 x" 제약.
- 반드시 읽을 source: 가까운 지침, 언급된 skill docs, 중앙 research routing docs.
- local source-of-truth: 이 레포의 루트 `AGENTS.md`와 `README.md`.

## 금지 리팩터 (Forbidden Refactor)

- 하지 않음: 앱 프레임워크/패키지 도입.
- 하지 않음: git write command 실행.

## 완료 조건 (Acceptance Criteria)

- [x] AC1: 에이전트가 따라야 할 반복 운영 규칙이 루트 `AGENTS.md`에 있다.
- [x] AC2: 사용자가 레포 목적과 루프를 빠르게 읽을 수 있는 `README.md`가 있다.
- [x] AC3: 이번 변경의 범위, 제외 범위, 검증 계획이 SPEC packet에 남아 있다.

## 완료 조건 분류 (Acceptance Buckets)

| Bucket | 필요한가 | Acceptance / 이유 |
|---|---|---|
| user-visible behavior | yes | 문서로 운영 흐름이 보인다. |
| server authority | N/A | 서버 없음. |
| client recovery | N/A | 앱 코드 없음. |
| data consistency | yes | 목표/레퍼런스/SPEC/피드백 산출물 경로가 일관돼야 한다. |
| performance | N/A | 런타임 없음. |
| accessibility | N/A | UI 없음. |
| observability | yes | 산출물/evidence 경로로 루프 추적 가능해야 한다. |

## 엣지 케이스 (Edge Cases)

- Empty/loading/error: 레포가 빈 상태여도 새 목표를 시작할 수 있어야 한다.
- Permission/eligibility: 중앙 research wiki는 query read-only로 다룬다.
- Retry/duplicate/stale: 같은 목표 내 반복 루프는 goal-local artifact로 누적한다.
- Partial failure: reference screenshot이나 채점 근거가 부족하면 gap으로 남기고 코드 구현으로 넘어가지 않는다.

## 작업 분해 (Task Breakdown)

| Task | Acceptance | Output files/artifacts | Verification |
|---|---|---|---|
| T1 | AC3 | `docs/spec-packets/2026-07-03-repo-workflow.md` | 파일 존재 및 내용 확인 |
| T2 | AC1 | `AGENTS.md` | 파일 존재 및 루프 규칙 확인 |
| T3 | AC2 | `README.md` | 파일 존재 및 사람용 설명 확인 |

## 검증 계획 (Verification Map)

| Acceptance | Evidence | Status |
|---|---|---|
| AC1 | `sed -n '1,240p' AGENTS.md` | passed |
| AC2 | `sed -n '1,220p' README.md` | passed |
| AC3 | `sed -n '1,260p' docs/spec-packets/2026-07-03-repo-workflow.md` | passed |

## 증거 / 공백 로그 (Evidence / Gap Log)

- Research evidence: 중앙 research index는 이 루프가 `feature-delivery`, `uiux`, `learning-engineering` 경계에 걸린다는 라우팅 근거를 제공한다.
- Local evidence: 레포는 현재 `.git`만 있는 빈 상태다.
- Verification evidence: `sed -n '1,240p' AGENTS.md`, `sed -n '1,220p' README.md`, `sed -n '1,260p' docs/spec-packets/2026-07-03-repo-workflow.md` 통과.
- Browser/visual/review evidence: N/A.
- Gap:
  - 빠진 것: 실제 목표별 reference artifact와 section SPEC은 아직 없다.
  - 왜 중요한가: 첫 목표가 정해져야 산출물이 생긴다.
  - 쉽게 말하면: 이번 변경은 작업장 규칙만 세우는 것이다.
  - 판정: follow-up

## 사용자 피드백 로그 (User Feedback Log)

- 2026-07-03: 사용자가 레포 목표와 루프를 6단계로 제시했다.

## 조정 로그 (Reconciliation Log)

- 2026-07-03: 초기 packet 작성.
- 2026-07-03: 루트 운영 문서 작성 후 packet acceptance와 verification status를 갱신.
