# Skills

A collection of reusable Claude Skills. Copy any of them into your own setup and use them freely.

## Skills

- [Simple Technical English](./simple-technical-english/) - Explains technical work simply and directly, instead of producing verbose or over-engineered detail.

## Getting Started

### Using Skills in Claude Code

Copy the individual skill folder — not the cloned repo — into your skills directory.

For personal use, available in every project:

```bash
mkdir -p ~/.claude/skills/
cp -r simple-technical-english ~/.claude/skills/
```

For one project only, so it can be committed and shared with a team:

```bash
mkdir -p /path/to/project/.claude/skills/
cp -r simple-technical-english /path/to/project/.claude/skills/
```

Verify the skill was found:

```bash
head ~/.claude/skills/simple-technical-english/SKILL.md
```

Then start Claude Code. The skill loads automatically.

### Using Skills in Claude.ai

1. Click the skill icon (🧩) in your chat interface.
2. Upload the skill folder.

## Usage

Claude activates a skill when your request matches its description, so often you do not need to mention it. To be certain it applies, name it: *"Use simple technical english to explain this bug."*

Simple Technical English changes explanations like this:

> **Before:** The controller delegates persistence concerns to the service layer and serializes the resulting domain entity.
>
> **After:** The controller sends the data to a service. The service saves it. The controller then returns the saved result in the API response.

It keeps the technical facts, including exact code, commands, versions, and error messages. It removes the language that makes those facts harder to understand.

## License

MIT — see [LICENSE](./LICENSE).
