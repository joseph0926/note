# Candidate Score

Rubric: 0-2 per axis. All candidates use the same Linear anchor.

| Axis | Linear queue | Linear detail | Linear review | Final |
|---|---:|---:|---:|---:|
| First-glance comprehension | 2 | 2 | 2 | 2 |
| Information hierarchy | 2 | 2 | 1 | 2 |
| Visual completion | 2 | 2 | 2 | 2 |
| Product fit | 2 | 2 | 2 | 2 |
| Implementation feasibility | 2 | 1 | 1 | 2 |
| Mobile stability | 2 | 2 | 1 | 2 |
| State extensibility | 1 | 2 | 2 | 2 |
| Surface economy | 2 | 2 | 2 | 2 |
| Total | 15 | 15 | 13 | 16 |

## Decision

Final direction: Linear-style Today Command workspace.

Why:

- Queue variant has the strongest first SPEC fit: stable shell, quick capture, list scan, selected detail.
- Detail variant clarifies selected task edit scope but risks over-weighting the right pane too early.
- Review variant best explains blocked/error recovery, but as a primary default it over-indexes on exceptions.
- Final combines queue-first IA with a strong detail pane and explicit recovery/disabled state notes.

## Surface Economy

- Main shell border: app/workspace boundary.
- Sidebar: scope and view navigation.
- Top command: capture/search entry, not decorative hero.
- Task row separators: scan and row hit-target boundary.
- Detail pane surface: edit and recovery scope boundary.
- Accent: selected/current, focus, and primary busy action only.
- Cards are not nested. Repeated work items use list rhythm instead of decorative card stacks.

## Anti-slop Check

- No marketing hero before the product surface.
- No ornamental images, floating cards, or decorative gradients.
- Every border or panel explains scope, selection, recovery, or navigation.
- Mobile uses stacked list representation instead of compressing desktop columns.
- Focus and hover are separated; focus capture is explicit.
