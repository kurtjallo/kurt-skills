# Skills

Claude Skills I use day to day as a software engineer. Copy any of them and use them freely.

## Install

Install the whole set as a Claude Code plugin. Add this repo as a marketplace once, then install from it:

```bash
claude plugin marketplace add kurtjallo/kurt-skills
claude plugin install kurt-skills@kurtjallo
```

Or from inside a session:

```
/plugin marketplace add kurtjallo/kurt-skills
/plugin install kurt-skills@kurtjallo
```

Installed this way the skills update when you run `claude plugin update`, and you get all three at once.

<details>
<summary><strong>Copy the files instead</strong></summary>

Take this route if you want to edit the skills rather than track mine.

```bash
git clone https://github.com/kurtjallo/kurt-skills.git
mkdir -p ~/.claude/skills
cp -r kurt-skills/skills/* ~/.claude/skills/
```

Copy one folder for one skill, or into `<project>/.claude/skills/` for a single project. These are now your files, so nothing updates behind your back. Restart Claude Code and they load.

On Claude.ai, click the skill icon (🧩) and upload a folder from `skills/`.

</details>

## Skills

Each skill is a slash command. Type the command to run it, or describe the task and Claude reaches for the matching skill on its own.

| Command | Skill | What it does |
| --- | --- | --- |
| `/absolute-code-review` | [Absolute Code Review](./skills/absolute-code-review/) | Reviews a diff or pull request for real risks, each with evidence and the smallest safe fix, instead of a long list of comments. |
| `/explain-code` | [Explain Code](./skills/explain-code/) | Teaches how code works by tracing one example through the whole flow, so you can review similar code yourself. |
| `/simple-technical-english` | [Simple Technical English](./skills/simple-technical-english/) | Explains technical work simply and directly, instead of verbose or over-engineered detail. |

## Usage

Installing a skill does not mean it always runs. Each skill has a description saying when it applies, and Claude uses the ones that match your request.

Two ways to run one yourself:

```
/explain-code                                          run it directly
Use explain-code to walk me through this pull request   name it in a sentence
```

## Working on this repo

```bash
npm run list     # every skill and its command
npm run link     # symlink skills into ~/.claude/skills so git pull updates them
npm run check    # verify skills, plugin.json and the README agree
```

`npm run check` is the one that matters. A new skill works locally as soon as the folder exists, but it reaches nobody who installed the plugin until it is listed in `.claude-plugin/plugin.json`. That gap is silent, so CI checks it on every push, along with the README and each skill's frontmatter.

There are no dependencies to install. The check is one Node script using only built-ins.

## License

MIT — see [LICENSE](./LICENSE).
