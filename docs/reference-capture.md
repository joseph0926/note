# Reference Capture

상태: 운영 계약 확정, Playwright tooling 구현됨

## 결정

이 레포는 레퍼런스 screenshot 캡처를 위한 repo-local Playwright capture-only harness를 도입한다.

이 harness는 앱 E2E suite가 아니고, production correctness evidence도 아니다. `uiux-experiment-runner`가 만든 standalone HTML 또는 generated reference packet을 desktop/mobile/state PNG로 반복 캡처해서, 이후 `spec-gated-coding` packet을 작성할 때 같은 시각 근거를 보게 하는 운영 도구다. 근거: [[playwright/reference-screenshot-capture-harness]], [[uiux/generated-reference-packet-model]].

## 경계

- Capture-only harness는 레퍼런스 산출물만 캡처한다.
- 앱 구현, 앱 scaffold, API, persistence, production test를 만들지 않는다.
- 앱 E2E, visual regression, accessibility test, implementation acceptance와 분리한다.
- 캡처 실패는 레퍼런스 산출물 문제이지 제품 회귀가 아니다.
- SPEC이 명시적으로 승격하기 전까지 reference screenshot은 acceptance baseline이 아니다.

## 대상

캡처 대상은 아래 형태로 제한한다.

- `docs/goals/<goal-slug>/references/<run-slug>/reference.html`
- `uiux-experiment-runner`가 만든 standalone HTML 후보
- selected/generated reference packet의 `multi-html-preview`
- 동일 HTML 안에서 query, hash, data attribute, 또는 URL variant로 노출되는 candidate/state 화면

앱 dev server 화면을 캡처해야 하는 순간부터는 이 문서가 아니라 해당 섹션 SPEC의 verification plan에서 다룬다.

## 산출물 위치

각 run은 goal-local evidence로 닫는다.

```text
docs/goals/<goal-slug>/references/<run-slug>/
  brief.md
  score.md
  reference.html
  capture-manifest.json
  screenshots/
    candidate-<name>-desktop.png
    candidate-<name>-mobile.png
    final-desktop.png
    final-mobile.png
    state-<state>-desktop.png
```

`screenshots/` 아래 PNG는 사람이 비교하기 위한 evidence다. `capture-manifest.json`은 PNG가 어떤 후보, 상태, viewport, 역할을 의미하는지 설명하는 계약이다.

## Manifest

각 capture run은 최소 아래 필드를 남긴다.

```json
{
  "goal_slug": "production-todo-app",
  "run_slug": "linear-workspace-run1",
  "source": "docs/goals/production-todo-app/references/linear-workspace-run1/reference.html",
  "captured_at": "2026-07-03",
  "tool": "playwright",
  "matrix": [
    {
      "id": "final-desktop",
      "candidate": "final",
      "state": "default",
      "artifact_role": "selected-full",
      "viewport": { "width": 1440, "height": 1000 },
      "output": "screenshots/final-desktop.png",
      "selected": true
    }
  ],
  "known_gaps": []
}
```

필수 의미:

- `goal_slug`: 목표 디렉터리 이름.
- `run_slug`: reference run 이름.
- `source`: 캡처 대상 HTML.
- `candidate`: 후보 또는 최종안 이름.
- `state`: `default`, `loading`, `empty`, `error`, `focus`, `selected`, `disabled` 같은 상태.
- `artifact_role`: `selected-full`, `mobile-reference`, `state-reference`, `region-zoom`, `selected-zoom`, `whole-candidate-sheet`, `motion-state-strip` 중 하나.
- `viewport`: 실제 캡처 크기.
- `output`: run directory 기준 screenshot 경로.
- `selected`: 이후 SPEC 작성의 1차 기준인지 여부.

## 최소 Matrix

일반 reference run은 아래를 최소로 캡처한다.

| Artifact | Viewport | Filename |
|---|---:|---|
| 최종안 전체 | 1440x1000 | `final-desktop.png` |
| 최종안 모바일 | 390x844 | `final-mobile.png` |
| 후보 desktop | 1440x1000 | `candidate-<name>-desktop.png` |
| 후보 mobile | 390x844 | `candidate-<name>-mobile.png` |
| loading | 1440x1000 | `state-loading-desktop.png` |
| empty | 1440x1000 | `state-empty-desktop.png` |
| error | 1440x1000 | `state-error-desktop.png` |
| focus 또는 selected | 1440x1000 | `state-<state>-desktop.png` |

Broad/high-risk reference는 필요하면 region zoom, reduced-motion, dark/light, motion strip을 추가한다. 추가 기준은 예쁜 장면 수가 아니라, 나중에 SPEC 범위 판단에 필요한 상태와 정보 구조다.

## Playwright 운영

Playwright는 `@playwright/test` runner를 기준으로 둔다. 이유는 viewport, project, output, reporter, `webServer`, `baseURL` 같은 실행 계약을 config로 고정할 수 있기 때문이다. 근거: [[playwright/playwright-test-runner]], [[playwright/playwright-suite-operating-model]].

실제 캡처는 아래 명령을 `## 실행 환경` 기준으로 승인된 외부 실행 또는 로컬 터미널에서 실행한다.

```bash
pnpm capture:reference
```

특정 manifest만 캡처할 때:

```bash
REFERENCE_CAPTURE_MANIFEST=docs/goals/production-todo-app/references/linear-workspace-run1/capture-manifest.json pnpm capture:reference
```

구현 시 기본 방향:

- capture 전용 `testDir`를 앱 E2E와 분리한다.
- capture 전용 config 또는 project 이름을 둔다.
- `outputDir`, reporter, screenshot output path를 앱 test 결과와 분리한다.
- `page.screenshot()` 또는 `locator.screenshot()`은 PNG 생성에 사용한다.
- `expect(page).toHaveScreenshot()`은 reference packet drift control이 필요할 때만 쓴다.
- baseline snapshot을 쓰더라도 product correctness로 해석하지 않는다.

## 실행 환경

실제 screenshot 재생성은 기본적으로 승인된 외부 실행 또는 사용자의 로컬 터미널 실행으로 수행한다.

```bash
pnpm capture:reference
```

Codex/managed shell 안에서는 브라우저를 띄우지 않는 정적 확인만 수행한다.

```bash
pnpm exec playwright test -c playwright.reference.config.ts --list
```

이렇게 나누는 이유는 Codex/managed shell 샌드박스에서 macOS Chromium 실행이 아래 계열 오류로 실패할 수 있기 때문이다.

```text
FATAL:base/apple/mach_port_rendezvous_mac.cc
bootstrap_check_in org.chromium.Chromium.MachPortRendezvousServer... Permission denied (1100)
kill EPERM
```

이 오류는 reference HTML, manifest, Playwright config의 실패로 보지 않는다. 브라우저 프로세스가 샌드박스 권한 경계에서 시작하지 못한 실행환경 실패이며, 이 문서가 실제 캡처의 기본 실행 경로를 외부 실행으로 두는 근거다.

처리 순서:

1. 브라우저를 띄우지 않는 manifest/test discovery 확인은 managed shell에서 실행할 수 있다.
2. 실제 screenshot 재생성은 `pnpm capture:reference`를 승인된 외부 실행 또는 로컬 터미널에서 실행한다.
3. 사용자가 외부 실행을 승인하지 않거나 직접 실행하지 않으면, screenshot 재생성은 `verification gap`으로 남긴다.
4. 이 gap은 앱 구현 blocker가 아니다. 다만 "새 PNG가 Playwright로 재생성됐다"는 evidence는 없는 상태로 기록한다.
5. 임시 direct Chrome 대체 스크립트를 새로 만들지 않는다. 대체 경로가 필요하면 별도 SPEC으로 연다.

2026-07-03 기준 첫 tooling 검증에서 managed shell 내부 `pnpm capture:reference`는 위 Mach port 권한 오류로 실패했다. 이후 운영 기준은 실제 캡처를 managed shell에서 시도하지 않고, 승인된 외부 실행 또는 로컬 터미널 실행을 기본값으로 둔다. 아직 이 기본 경로에서의 성공 evidence는 capture infra SPEC의 gap으로 기록한다.

## 안정화 규칙

Screenshot은 OS, browser, font, GPU, headless mode, animation, clock, random data, network asset에 민감하다. 비교 가능한 evidence로 쓰려면 아래를 먼저 고정한다.

- local font와 asset을 HTML 안에서 안정적으로 참조한다.
- 네트워크 의존 이미지는 피하거나 repo-local asset으로 둔다.
- 캡처 전 `data-ready`, 특정 selector, 또는 load completion 같은 ready condition을 기다린다.
- nonessential animation은 capture CSS로 끄거나 `prefers-reduced-motion` variant를 별도 캡처한다.
- clock/randomness가 UI에 보이면 고정한다.
- volatile 영역은 숨기거나 mask한다.
- 같은 baseline 비교는 같은 OS/browser/font 환경에서만 신뢰한다.

## CI 경계

기본은 local-first다. CI는 reference packet 자체가 재사용 자산이 된 뒤에만 검토한다.

CI에 올리는 경우:

- capture job 이름은 app E2E와 다르게 둔다.
- worker 수는 보수적으로 둔다.
- screenshot directory와 manifest를 artifact로 업로드한다.
- 실패 메시지는 reference capture failure로 분리한다.
- production deploy gate와 연결하지 않는다.

## SPEC Handoff

캡처가 끝난 reference run은 다음 정보를 section SPEC으로 넘긴다.

- 선택된 `final-desktop.png`, `final-mobile.png`
- SPEC에 직접 영향을 주는 state screenshot
- 버린 후보와 버린 이유
- reference에서 빌릴 신호: hierarchy, density, grouping, state, motion
- reference에서 빌리지 않을 것: 브랜드 원색, raw radius, raw font, 무관한 component
- 남은 gap: data model, interaction behavior, accessibility, implementation stack

레퍼런스 이미지에서 보이는 모든 요소가 구현 범위가 되는 것은 아니다. SPEC이 한 섹션을 닫을 때만 해당 screenshot을 acceptance 후보로 승격할 수 있다. 근거: [[uiux/reference-guided-ui-workflow]], [[uiux/ai-assisted-ui-implementation-workflow]].

## 구현 Gate

Playwright 패키지, config, capture script를 추가하기 전에는 별도 `spec-gated-coding` packet을 작성한다.

첫 capture infra SPEC은 아래만 닫는다.

- root tooling package로 둘지, goal-local tool로 둘지
- `pnpm` script 이름
- capture manifest schema
- source HTML discovery 방식
- screenshot filename 규칙
- 실패 조건
- 검증 evidence

이 SPEC 전에는 workspace 생성, Turbo 도입을 하지 않는다.

## 현재 Run

첫 run은 단일 Linear anchor reference로 정리했고, repo-local Playwright capture-only harness로 desktop/mobile/state PNG를 재생성했다.

- run: `docs/goals/production-todo-app/references/linear-workspace-run1/`
- source: `docs/goals/production-todo-app/references/linear-workspace-run1/reference.html`
- manifest: `docs/goals/production-todo-app/references/linear-workspace-run1/capture-manifest.json`
- output: `docs/goals/production-todo-app/references/linear-workspace-run1/screenshots/`
- 상태: Playwright capture 완료
- evidence: 승인된 외부 실행 `pnpm capture:reference`에서 12개 capture test 통과

다음 reference run부터는 이 문서의 운영 계약을 기준으로 `capture-manifest.json`을 먼저 작성한다.

## Research 근거

- [[playwright/reference-screenshot-capture-harness]]
- [[playwright/playwright-test-runner]]
- [[playwright/playwright-debugging-and-artifacts]]
- [[playwright/playwright-ci-runtime]]
- [[playwright/playwright-suite-operating-model]]
- [[uiux/generated-reference-packet-model]]
- [[uiux/reference-guided-ui-workflow]]
- [[uiux/ai-assisted-ui-implementation-workflow]]

Research status: wiki-supported
Freshness: current
Write-back: skipped
