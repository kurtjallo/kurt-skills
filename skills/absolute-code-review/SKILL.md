---
name: absolute-code-review
description: Use when reviewing code changes, diffs, patches, commits, branches, pull requests, or proposed fixes before merge or release.
---

# Absolute Code Review

## Purpose

Find the real risks in a change, then recommend the smallest safe fix that fits the existing codebase.

Investigate deeply and report briefly. Thoroughness means covering the ways the change can fail, not writing more comments.

The review is finished when the reader knows three things:

1. Whether the change is safe to merge.
2. Which problems must be fixed, and why each one matters.
3. What the smallest fix is for each problem.

## Set the Review Boundary

1. Identify the requirement and exact change. For a branch or pull request, identify the base and target. If intended behavior is unclear, state the missing fact instead of guessing.
2. Read repository instructions and the diff. Inspect surrounding callers, callees, types, tests, schemas, configuration, and helpers only where they can confirm behavior.
3. Focus on problems introduced or exposed by the change. Ignore unrelated existing problems unless the change depends on them or makes them worse. Review only; do not modify code or expand the task unless asked.

## Investigate the Changed Behavior

Trace at least one concrete input through the changed success path and failure path. Compare the observable behavior before and after, including state changes and external effects.

Ask the questions that apply:

- **Correctness and edge cases:** What happens with null, missing, empty, zero, boundary, duplicate, malformed, or unexpected values? Check conditions, ordering, defaults, rounding, and state transitions.
- **Errors and recovery:** If an operation fails halfway through, what state remains? Are errors swallowed, converted incorrectly, retried unsafely, or exposed to users?
- **Security and privacy:** When input, files, credentials, or user-owned data cross a trust boundary, check validation, authentication, authorization, ownership, and sensitive output.
- **Data and reliability:** When the change writes data, uses jobs, caches, events, or external services, check transactions, concurrency, uniqueness, idempotency, retries, and stale state.
- **Contracts and compatibility:** When an API, schema, event, job, configuration, or public type changes, inspect consumers. Check omitted versus null values, defaults, migrations, old data, and mixed-version deployments.
- **Performance and resources:** For loops, queries, large collections, uploads, or hot paths, check repeated queries, unbounded work, blocking calls, memory growth, and unnecessary network calls.
- **Local consistency:** Match the surrounding code's naming, file organization, control flow, abstraction boundaries, error handling, types, test style, formatting, and comment style unless a requirement or repository instruction justifies a difference. Prefer established nearby patterns over generic best practices.

Apply only relevant questions. Do not manufacture hypothetical failures to fill every category.

## Require Evidence

Support each finding with code, a test, or a reachable scenario. Name the input or sequence that triggers the problem and its observable impact.

Run focused checks when the task allows it. Call tests `verified` only after observing the command and result; treat author claims or old CI as reported. Request tests only for a concrete behavior or realistic failure, naming the missing case.

If evidence is incomplete, label the uncertainty and say what would confirm it. Block merge only when required behavior cannot be judged safely.

## Choose the Smallest Safe Fix

Prefer fixes in this order:

1. Reuse an existing helper, service, validation rule, or project pattern when its semantics and ownership fit the requirement cleanly. Do not force reuse that creates awkward coupling or hides meaningfully different behavior.
2. Make a small local change.
3. Refactor or add an abstraction only when simpler options cannot solve the proven problem safely.

Do not request unrelated cleanup, speculative flexibility, or architecture for imagined future needs.

## Classify Findings

- **Must fix:** A demonstrated correctness bug, security or privacy issue, data-integrity risk, meaningful regression, or breaking contract. The verdict is `Request changes`.
- **Suggestion:** A specific non-blocking improvement with a measurable benefit. Suggestions do not change an `Approve` verdict.

Personal preferences without a project rule or concrete impact are not findings. A clean change may have zero findings.

## Findings Contract

Each finding contains:

- severity
- exact file and line
- concrete failure scenario and impact
- smallest safe fix, naming reusable code when available

Keep each finding to 1–3 sentences. Combine findings with the same root cause, sort by impact, and omit empty sections.

If there are no findings, say `No actionable findings.` Do not repeat the requirement, summarize every changed line, pad the review with praise, or create comments to demonstrate effort.

## Working Rules

- **Plain English.** Write the finding so a reader who does not know this codebase understands the failure. Say "the version in the built file does not match the lockfile", not "source-versus-build drift".
- **Answer the question asked.** If the author asks "is this over-engineered?", give a verdict with numbers — lines, queries, call sites, files touched. Do not answer with a list of extra work.
- **Comments stay brief and meaningful.** An inline comment or docstring explains why a decision exists. Remove comments that restate the code, and never put issue or ticket ids in code comments.
- **Tests in the project's current style.** Check what recently added tests use, not the oldest file. If recent tests use plain functions and fixtures, do not request an older class-based style.
- **Scope stays where the author put it.** Name a nearby improvement in one sentence as a suggestion; do not turn the review into a redesign or a backlog.
- **Review only.** Do not edit, commit, push, amend, or rerun anything that changes the branch. Recommend the fix and let the author apply it.
- **Report what you actually ran.** If a check was skipped or a test failed, say so with the output. Never describe an unverified expectation as a confirmed result.

## Output

```markdown
Verdict: Approve | Request changes

Must fix
- `path/file.ts:42` — Failure scenario, impact, and smallest safe fix.

Suggestions
- `path/file.ts:57` — Specific improvement and why it matters.

Testing or uncertainty
- Include only information that affects confidence in the verdict.
```

## Common Mistakes

- Reviewing a changed contract without checking its consumers
- Flagging a theoretical possibility without a reachable scenario
- Inflating optional tests, types, naming, or cleanup into blockers
- Proposing a refactor before checking for reuse or a local fix
- Ignoring a consistent local convention because no formatter or linter enforces it
- Forcing reuse of code whose behavior or ownership does not fit the requirement
- Answering a direct question with follow-up work instead of a verdict

## Example

> **Must fix — `src/users.ts:18`:** When `find` returns `null`, this dereferences `user.email` and throws instead of returning the required `null`. Restore the existing guard and reuse `normalizeEmail`.

## Final Rule

Trace one real input through the change.

Report only what you can prove, with its impact.

Recommend the smallest fix that fits the code already there.
