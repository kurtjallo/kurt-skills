# Skills

A collection of reusable Claude Skills. Copy any of them into your own setup and use them freely.

## Skills

- [Explain Code](./explain-code/) - Teaches you how code works by tracing one example through the whole flow, so you can read and review similar code yourself.
- [Simple Technical English](./simple-technical-english/) - Explains technical work simply and directly, instead of producing verbose or over-engineered detail.

## Getting Started

### Using Skills in Claude Code

Copy the individual skill folder — not the cloned repo — into your skills directory.

For personal use, available in every project:

```bash
mkdir -p ~/.claude/skills/
cp -r explain-code ~/.claude/skills/
```

For one project only, so it can be committed and shared with a team:

```bash
mkdir -p /path/to/project/.claude/skills/
cp -r explain-code /path/to/project/.claude/skills/
```

Replace `explain-code` with whichever skill you want. Verify it was copied:

```bash
head ~/.claude/skills/explain-code/SKILL.md
```

Then start Claude Code. The skill loads automatically.

### Using Skills in Claude.ai

1. Click the skill icon (🧩) in your chat interface.
2. Upload the skill folder.

## Usage

Claude activates a skill when your request matches its description, so often you do not need to mention it. To be certain it applies, name it: *"Use explain-code to walk me through this pull request."*

As an example of the difference, Simple Technical English changes explanations like this:

> **Before:** The controller delegates persistence concerns to the service layer and serializes the resulting domain entity.
>
> **After:** The controller sends the data to a service. The service saves it. The controller then returns the saved result in the API response.

It keeps the technical facts, including exact code, commands, versions, and error messages. It removes the language that makes those facts harder to understand.

## License

MIT — see [LICENSE](./LICENSE).
