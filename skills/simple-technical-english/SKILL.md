---
name: simple-technical-english
description: Use when writing technical explanations, investigation findings, code reviews, architecture notes, plans, progress updates, incident reports, or recommendations that should be concise and easy to understand. Use especially when the reader asks for simple English, less jargon, less verbosity, clearer meaning, or a direct answer.
---

# Simple Technical English

## Purpose

Explain technical work clearly without removing important facts.

Write for a smart person who may not know specialized engineering language. Do not speak to the reader like a child.

The reader should understand:

1. What happened?
2. Why did it happen?
3. Why does it matter?
4. What should happen next?

## Scope

Apply this skill to user-facing writing, including:

- Code explanations
- Code reviews
- Investigation results
- Bug explanations
- Architecture explanations
- Security findings
- Technical plans
- Recommendations
- Progress updates
- Incident reports
- Pull request summaries
- Test results

This skill changes how technical information is explained. It does not change the technical work itself.

Keep exact technical content when accuracy matters, including:

- Source code
- Commands
- File paths
- Error messages
- Version numbers
- API field names
- Function and class names
- Configuration values
- Direct quotations

Explain these details using simple language around the exact text.

## Core Writing Method

### 1. Give the conclusion first

Start with the answer or most important finding.

Use one to three short sentences.

Do not begin with:

- A history of the investigation
- Raw logs or code
- A long introduction
- A summary of the user's question
- A description of what you are about to explain

**Avoid:**

> Following a comprehensive investigation of the application's dependency tree, several noteworthy inconsistencies were identified.

**Use:**

> The application contains two outdated packages. One is used directly. Another is included through a different package.

### 2. Explain what the evidence means

Do not give the reader raw evidence and expect them to interpret it.

Use this order:

1. State the finding.
2. Give the strongest evidence.
3. Explain what the evidence proves.
4. State the impact or next step.

**Avoid:**

> `version = "2.4.1"` appears in `dist/app.js`.

**Use:**

> The built JavaScript file contains version `2.4.1` of the library. This means that version is included in the file sent to users.

### 3. Use simple technical English

Prefer familiar words over formal, academic, or dramatic words.

Use technical terms when they add useful precision. Explain an unfamiliar term the first time it appears.

**Example:**

> The application receives the library through another package. This is called a transitive dependency.

After defining the term, it is fine to use it again.

### 4. Put the plain meaning before the technical term

Use this pattern:

> Plain explanation (technical term).

Examples:

- A package the application relies on (a dependency).
- A package included through another package (a transitive dependency).
- The file created for users to download (the production build).
- An automatic build-and-test system (CI).
- A file that records exact package versions (a lockfile).
- The part that stores information between requests (the database).

Do not define terms the reader clearly already understands.

### 5. Keep sentences focused

Each sentence should normally communicate one main idea.

Break a sentence apart when it contains several:

- Findings
- Causes
- Conditions
- Risks
- Qualifications

**Avoid:**

> The component contains the largest outdated library bundle and has no lockfile, so checking every lockfile still misses the component with the greatest amount of affected code.

**Use:**

> This component contains the most outdated library code. It does not have a lockfile. Checking lockfiles alone would miss it.

### 6. State cause and effect directly

Do not make the reader work out why a fact matters.

**Avoid:**

> The lockfile is not reliable production evidence.

**Use:**

> The lockfile records what a new installation would use. It does not prove which version is already inside an older built file.

### 7. Separate facts from explanations

Use clear confidence language when uncertainty matters:

- **Confirmed:** Directly supported by code, tests, logs, or documentation.
- **Likely:** Supported by evidence but not fully proven.
- **Not confirmed:** More evidence is needed.

**Example:**

> **Confirmed:** The build requires a package from a private registry.
>
> **Likely:** The automated build fails because it does not have registry credentials.
>
> **Not confirmed:** We have not checked whether another build system already has those credentials.

Do not add confidence labels to every point. Use them only when the difference matters.

## Default Answer Structures

Choose the smallest structure that communicates the result clearly.

### Simple question

Use:

1. Direct answer
2. Short explanation
3. Example, if useful

**Example:**

> A lockfile records the exact package versions used during installation. It does not always prove which versions exist inside an old built file.

### Technical investigation

Use:

```markdown
## Short answer

[Main conclusion in one to three sentences.]

## What I confirmed

- [Finding and what it means.]
- [Finding and what it means.]

## Why it matters

[Practical effect.]

## Next step

[Recommendation or remaining investigation.]
```

Remove sections that do not add useful information.

### Bug explanation

Use:

```markdown
## What is happening

[The problem the user can see.]

## Why it happens

[The cause in simple technical English.]

## Fix

[What needs to change.]

## Risk

[Anything that could break or requires verification.]
```

### Architecture explanation

Use:

```markdown
## What it does

[Purpose of the system or component.]

## How it works

[Short explanation of the main flow.]

## Main parts

- [Part]: [Responsibility]
- [Part]: [Responsibility]

## Important limitation

[Risk, missing capability, or trade-off.]
```

Do not describe every file unless the user requests a file-by-file explanation.

### Progress update

Use:

```text
I confirmed [main finding].

I am still checking [remaining question].

The next step is [next action].
```

A progress update should not become a full technical report.

### Recommendation

Use:

```text
I recommend [action].

Why: [main reason].

Main limitation: [important cost, risk, or missing requirement].
```

## Formatting Rules

Make responses easy to scan.

Use:

- Short paragraphs
- Small bullet lists
- Clear headings when several sections are needed
- Numbered steps when order matters
- Inline code formatting for technical names
- Examples only when they improve understanding

Avoid:

- Decorative Unicode boxes
- Text borders
- "Insight" or "lesson" callout blocks
- ASCII diagrams unless the user requests one
- Wide tables
- Excessive headings
- Deeply nested lists
- Excessive bold text
- Decorative emojis
- Repeating the conclusion
- A closing paragraph that repeats every bullet

Use a table only when the reader needs to compare the same fields across several items. Keep the table narrow.

## Word-Choice Guidance

Replace dramatic or indirect wording with literal wording.

Prefer these changes:

- "A phantom version" → "An incorrect version"
- "The claim does not survive" → "The evidence does not support the claim"
- "A dead end" → "Not enough by itself"
- "The worst offender" → "The component with the most affected code"
- "The remaining workflow legs" → "The remaining checks"
- "Source-versus-build drift" → "The source code and built file stopped matching"
- "The repository's stated intent" → "The repository is configured this way"
- "The package arrives transitively" → "Another package brings it into the build"
- "The shipped payload" → "The file sent to users"
- "Dependency remediation" → "Updating the affected package"
- "Operational complexity" → "This makes the process harder to run"
- "Non-trivial" → Explain exactly what makes it difficult
- "Hydrates the entity" → "Creates the object from the saved data"
- "Persists the data" → "Saves the data"
- "Invokes the service" → "Calls the service"
- "Leverages the cache" → "Uses the cache"
- "Facilitates communication" → "Allows the systems to communicate"

Do not replace a precise technical term with a vague metaphor.

## Evidence Rules

Keep exact evidence when it matters.

Put the explanation before the raw evidence.

**Avoid:**

> `AuthenticationException: TokenExpiredException at Auth.php:42`

**Use:**

> The request failed because the login token had expired.
>
> Error: `AuthenticationException: TokenExpiredException at Auth.php:42`

When there is a large amount of evidence:

1. Give the conclusion.
2. Show the strongest one or two examples.
3. Put the remaining details under `Additional evidence`.
4. Do not place every log line or search result in the main answer.

## Accuracy Rules

Simple language must remain technically correct.

Do not:

- Remove an important limitation.
- Hide uncertainty.
- Change an exact version number.
- Change an error message.
- Present a guess as a fact.
- Replace a specific cause with a vague summary.
- Say something is fixed without verification.
- Remove evidence needed to support a serious finding.

Clear writing is not incomplete writing.

## Redundancy Rules

Each important fact should normally appear once.

Before including a sentence, check whether it:

- Adds a new fact
- Explains why a fact matters
- Provides necessary evidence
- Identifies a risk
- Gives a useful next step

Remove it if it does none of these.

Do not:

- Restate the question.
- Repeat the same conclusion at the beginning and end.
- Explain the same term several times.
- Repeat every bullet in a summary paragraph.
- Add a general lesson after already explaining the practical meaning.
- Describe the full investigation process unless the process matters.

## Examples

### Example 1: Dependency investigation

**Avoid:**

> The dependency analysis surfaced a transitive package version discrepancy that is not represented by the repository's tracked lockfile state.

**Use:**

> The built file contains a different package version from the lockfile. Another package added it during the build.

### Example 2: Build problem

**Avoid:**

> The committed distribution artifact has diverged from the source tree and lacks a reproducible build pathway.

**Use:**

> The built file no longer matches the source code. The repository also does not contain clear instructions for rebuilding it.

### Example 3: Difficult automated build

**Avoid:**

> The private package requirement creates a material operational constraint for the proposed CI implementation.

**Use:**

> The build downloads a package from a private registry. The automated build needs credentials before it can download that package.

### Example 4: Code explanation

**Avoid:**

> The controller delegates persistence concerns to the service layer and serializes the resulting domain entity.

**Use:**

> The controller sends the data to a service. The service saves it. The controller then returns the saved result in the API response.

### Example 5: Bug explanation

**Avoid:**

> A race condition causes the asynchronous callbacks to mutate shared state in a non-deterministic order.

**Use:**

> Two tasks can update the same data at nearly the same time. The final result depends on which task finishes first. This timing problem is called a race condition.

### Example 6: Security finding

**Avoid:**

> User-controlled input is interpolated into the query, creating an SQL injection vector.

**Use:**

> The application places user input directly into the database query. An attacker could use specially written input to change that query. This is an SQL injection risk.

### Example 7: Progress update

**Avoid:**

> I am waiting on the remaining investigative workstreams concerning vulnerability applicability, build provenance, and existing prevention mechanisms.

**Use:**

> I am still checking:
>
> - Whether the old package creates a real security risk.
> - When the built file stopped matching the source code.
> - Whether the project already has a check that can prevent this.

### Example 8: Recommendation

**Avoid:**

> A holistic dependency governance strategy should be established before remediation is attempted.

**Use:**

> First, create one reliable build command for every component. Then update the outdated packages and add an automated check to keep the built files current.

### Example 9: Complete investigation summary

```markdown
## Short answer

The ticket is partly incorrect. The application contains an outdated library, but the reported version and affected component are wrong.

## What I confirmed

- One built file contains version `2.4.1`.
- The component's lockfile lists version `2.7.0`.
- The built file was created before the lockfile was updated.
- The current build requires access to a private package.

## Why it matters

Updating the lockfile alone will not update the file sent to users. The team must rebuild the component and verify the new file.

## Next step

Create a repeatable production build. Then update the library, rebuild the component, and add an automated check that detects outdated built files.
```

## Adjusting to the Reader

Use clues from the conversation to choose the correct level of detail.

If the reader is new to the subject:

- Define technical terms.
- Use a small example.
- Explain cause and effect.
- Avoid unexplained abbreviations.

If the reader is experienced:

- Keep the conclusion direct.
- Use accepted technical terms.
- Do not explain basic concepts they already know.
- Continue avoiding unnecessary complexity and verbosity.

If the reader asks for more detail, add depth without making the wording more complicated.

## Final Simplification Check

Before sending the response, check:

- Does the first paragraph answer the question?
- Are the most important facts near the top?
- Did I explain what the evidence means?
- Did I define unfamiliar technical terms?
- Can I split any long sentence?
- Can I replace any complicated word with a common one?
- Did I repeat any fact?
- Did I use decorative formatting that adds no meaning?
- Did I separate facts from likely explanations?
- Is the impact clear?
- Is the next step clear?
- Can I remove anything without losing useful meaning?

Revise the response if any check fails.

## Final Rule

Keep the technical truth.

Remove the language that makes the truth harder to understand.
