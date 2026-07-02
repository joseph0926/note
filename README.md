# note

목표 기반 UI/제품 구현 연습 레포입니다. 사용자가 목표를 정하고 직접 구현하며, 에이전트는 레퍼런스 생성, 섹션별 SPEC 작성, 구현 후 채점/피드백을 맡습니다.

## Workflow

1. 목표 설정
   - 예: 프로덕션급 todo 앱.
2. 레퍼런스 생성
   - `uiux-experiment-runner`로 목표에 맞는 회사/제품 anchor를 잡습니다.
   - `research-query`로 UI/UX 근거와 anti-slop 판단을 확인합니다.
   - 이 단계에서는 코드를 구현하지 않습니다.
3. 섹션별 SPEC 작성
   - 레퍼런스 이미지 기반으로 `spec-gated-coding` packet을 작성합니다.
   - 전체 앱이 아니라 화면/섹션/흐름 단위로 쪼갭니다.
4. 사용자 구현
   - 사용자가 해당 섹션을 직접 구현합니다.
5. 채점/피드백
   - 구현 후 `research-query` 기반으로 버그, 회귀, UX gap, 테스트 gap을 확인합니다.
6. 반복 또는 종료
   - 같은 목표의 다음 섹션으로 반복하거나, 목표 완료 evidence를 정리한 뒤 다음 주제로 넘어갑니다.

## Artifact Layout

```text
docs/
  goals/
    <goal-slug>/
      references/
      feedback/
      artifacts/
  spec-packets/
    YYYY-MM-DD-<goal-slug>-<section-slug>.md
```

## Operating Rules

- 레퍼런스 생성은 구현이 아니라 판단 재료 생성입니다.
- SPEC은 섹션 단위로 닫습니다.
- 구현은 사용자가 직접 합니다.
- 에이전트 피드백은 가능한 한 research/wiki citation 또는 로컬 source에 근거해야 합니다.
- 자세한 에이전트 규칙은 `AGENTS.md`를 따릅니다.
- [CLAUDE.md](./CLAUDE.md)는 `@AGENTS.md` 한줄만 작성합니다.
- 절대경로 작성시 `~/`로 시작한다.
