# Skills

Claude Skills I use day to day as a software engineer. Copy any of them and use them freely.

## Skills

- [Absolute Code Review](./skills/absolute-code-review/) - Reviews a diff or pull request for real risks, each with evidence and the smallest safe fix, instead of a long list of comments.
- [Explain Code](./skills/explain-code/) - Teaches how code works by tracing one example through the whole flow, so you can review similar code yourself.
- [Simple Technical English](./skills/simple-technical-english/) - Explains technical work simply and directly, instead of verbose or over-engineered detail.

## Install

Every skill lives in `skills/`, so one command installs all of them.

```bash
git clone https://github.com/kurtjallo/skills.git kurt-skills
mkdir -p ~/.claude/skills
cp -r kurt-skills/skills/* ~/.claude/skills/
```

To install one skill, copy just that folder. For a single project, copy into `<project>/.claude/skills/` instead.

Restart Claude Code and the skills load automatically. On Claude.ai, click the skill icon (🧩) and upload a folder from `skills/`.

## Usage

Installing a skill does not mean it always runs. Each skill has a description saying when it applies, and Claude uses the ones that match your request. To be certain one applies, name it: *"Use explain-code to walk me through this pull request."*

## License

MIT — see [LICENSE](./LICENSE).
