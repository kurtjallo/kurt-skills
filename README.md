# Skills

A collection of reusable Claude Skills. Copy any of them into your own setup and use them freely.

## Skills

- [Explain Code](./skills/explain-code/) - Teaches you how code works by tracing one example through the whole flow, so you can read and review similar code yourself.
- [Simple Technical English](./skills/simple-technical-english/) - Explains technical work simply and directly, instead of producing verbose or over-engineered detail.

## Getting Started

Every skill lives in the [`skills/`](./skills/) folder, so you can install all of them with one command.

### Install every skill (Claude Code)

```bash
git clone https://github.com/kurtjallo/skills.git kurt-skills
mkdir -p ~/.claude/skills
cp -r kurt-skills/skills/* ~/.claude/skills/
```

This makes the skills available in every project.

### Install one skill

```bash
cp -r kurt-skills/skills/explain-code ~/.claude/skills/
```

### Install into a single project

Use this when the skill should be committed and shared with a team:

```bash
mkdir -p /path/to/project/.claude/skills
cp -r kurt-skills/skills/* /path/to/project/.claude/skills/
```

Check what is installed:

```bash
ls ~/.claude/skills/
```

Then start Claude Code. The skills load automatically.

### Using Skills in Claude.ai

1. Click the skill icon (🧩) in your chat interface.
2. Upload a skill folder from `skills/`.

## Usage

Installing every skill does not mean every skill runs. Each one has a description saying when it applies, and Claude uses only the ones that match your request. There is nothing to switch on or off.

So you often do not need to mention a skill at all. To be certain one applies, name it: *"Use explain-code to walk me through this pull request."*

As an example of the difference, Simple Technical English changes explanations like this:

> **Before:** The controller delegates persistence concerns to the service layer and serializes the resulting domain entity.
>
> **After:** The controller sends the data to a service. The service saves it. The controller then returns the saved result in the API response.

It keeps the technical facts, including exact code, commands, versions, and error messages. It removes the language that makes those facts harder to understand.

## License

MIT — see [LICENSE](./LICENSE).
