# 프로덕션급 Todo 앱 목표

상태: active
목표 slug: `production-todo-app`
앱 코드 위치: `apps/production-todo-app/`
운영 문서 위치: `docs/goals/production-todo-app/`
시작일: 2026-07-03

## 목표

사용자가 직접 구현하며, 단순 CRUD 예제를 넘어 실제 제품에 가까운 Todo 앱을 완성한다.

## 현재 확정된 범위

- 목표 앱은 `apps/production-todo-app/` 아래 독립 앱으로 시작한다.
- 레퍼런스, 피드백, 화면 evidence는 `docs/goals/production-todo-app/` 아래에 둔다.
- 섹션별 SPEC은 `docs/spec-packets/YYYY-MM-DD-production-todo-app-<section-slug>.md` 형식으로 둔다.
- 레퍼런스 생성 전에는 앱 scaffold, production code, test code를 만들지 않는다.

## 초기 비목표

- 첫 단계에서 기술 스택을 확정하지 않는다.
- 첫 단계에서 Turbo, pnpm workspace, shared package를 만들지 않는다.
- 첫 단계에서 전체 앱 SPEC을 한 번에 작성하지 않는다.

## 다음 액션

1. 선택된 레퍼런스 이미지를 기준으로 첫 섹션 SPEC을 작성한다.
2. 첫 SPEC 후보는 `Inbox shell`로 시작한다.
3. 다음 reference run 전에 Playwright capture infra SPEC을 별도로 작성한다.

## 현재 레퍼런스

- run: `docs/goals/production-todo-app/references/linear-workspace-run1/`
- final direction: Linear-style Today Command workspace.
- primary screenshot: `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/final-desktop.png`
- mobile screenshot: `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/final-mobile.png`

## 완료 방향

- 목표가 끝날 때 완료한 섹션, 구현 evidence, 남은 gap, 다음 목표 후보를 이 문서 또는 goal-local summary에 정리한다.
