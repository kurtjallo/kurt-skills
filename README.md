# Skills

Agent Skills I use day to day as a software engineer. Copy any of them and use them freely.

The `SKILL.md` instructions are agent-agnostic. You can copy them into any harness that supports Agent Skills. The plugin commands below are the Claude Code installation path.

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

Installed this way the skills update when you run `claude plugin update`, and you get the whole set at once.

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

In Claude Code, each skill is a slash command. Type the command to run it. Skills that permit automatic invocation may also be selected when you describe a matching task.

| Command | Skill | What it does |
| --- | --- | --- |
| `/absolute-code-review` | [Absolute Code Review](./skills/absolute-code-review/) | Reviews a diff or pull request for real risks, each with evidence and the smallest safe fix, instead of a long list of comments. |
| `/articulate` | [Articulate](./skills/articulate/) | Trains clear, answer-first technical communication that stays aligned with the exact question and audience. |
| `/comprehend` | [Comprehend](./skills/comprehend/) | Builds durable mental models of code and technical concepts through source-grounded explanation, reconstruction, and recall. |
| `/explain-code` | [Explain Code](./skills/explain-code/) | Teaches how code works by tracing one example through the whole flow, so you can review similar code yourself. |
| `/reason` | [Reason](./skills/reason/) | Trains engineering judgment by testing implementation choices, assumptions, evidence, alternatives, and tradeoffs. |
| `/simple-technical-english` | [Simple Technical English](./skills/simple-technical-english/) | Explains technical work simply and directly, instead of verbose or over-engineered detail. |

## Usage

Installing a skill does not mean it always runs. Invoke it by name when you need it. Depending on the skill settings and harness, the assistant may also select it automatically.

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
