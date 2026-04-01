### Contributing to Remotion Release Videos

Thanks for your interest in contributing. Remotion Release Videos is a collection of open-source release video templates built with Remotion and React, used to create polished announcement videos for various open-source projects. Contributions should keep the code clean, composable, and easy to adapt across different projects.

## Conventional Commits

This repo uses Conventional Commits for all commits. Keep it simple: we do not use scopes.

Use the form:

```
<type>: <subject>

[optional body]

[optional footer(s)]
```

Subject rules:

- Imperative mood, no trailing period, ≤ 72 characters
- UTF‑8 allowed; avoid emoji in the subject

Accepted types:

- `build` – build system or external dependencies (e.g., package.json, tooling)
- `chore` – maintenance (no app behavior change)
- `ci` – continuous integration configuration (workflows, pipelines)
- `docs` – documentation only
- `feat` – user-facing feature or capability
- `fix` – bug fix
- `perf` – performance improvements
- `refactor` – code change that neither fixes a bug nor adds a feature
- `revert` – revert of a previous commit
- `style` – formatting/whitespace (no code behavior)
- `test` – add/adjust tests only

Examples:

```text
feat: add changelog timeline animation sequence
fix: correct text overflow in release highlights scene
docs: document how to add a new project video template
style: format Tailwind classes and fix linting warnings
chore: update Remotion and React dependencies
ci: add workflow to render and upload release videos
perf: reduce render time by optimizing spring animations
refactor: extract shared motion presets into reusable hooks
test: add snapshot tests for release banner composition
revert: revert "perf: reduce render time by optimizing spring animations"
```

Breaking changes:

- Use `!` after the type or a `BREAKING CHANGE:` footer.

```text
feat!: restructure composition props to support multi-project configs

BREAKING CHANGE: Video compositions now require a project config object instead of individual props; update all render calls.
```

### Branching rules

- `main`: default branch.
- All work branches are created from `main`.

#### Branch naming

- Use lowercase kebab-case; no spaces; keep names concise (aim ≤ 40 chars).
- Branch prefixes match Conventional Commit types:
  - `feat/<short-desc>`
  - `fix/<short-desc>`
  - `chore/<short-desc>`
  - `docs/<short-desc>`
  - `ci/<short-desc>`
  - `refactor/<short-desc>`
  - `test/<short-desc>`
  - `perf/<short-desc>`
  - `build/<short-desc>`

Examples:

```text
feat/changelog-timeline
fix/text-overflow-highlights
docs/contributing-guidelines
ci/render-upload-workflow
build/update-remotion
refactor/shared-motion-presets
test/release-banner-snapshots
fix/spring-animation-timing
```
