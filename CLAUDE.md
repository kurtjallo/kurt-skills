Every skill lives in a flat folder under `skills/`, as `skills/<name>/SKILL.md`. There are no category folders; add them only when the count makes a flat list hard to scan.

A skill's frontmatter `name` must match its folder name. The slash command comes from `name`, so a mismatch means the command is not the one the README documents.

Adding, renaming, or removing a skill means three files change together:

1. `skills/<name>/SKILL.md`
2. `.claude-plugin/plugin.json`, in the `skills` array
3. `README.md`, in the skills table, with the skill name linked to its folder and its `/command` in the first column

Miss the manifest and the skill still works locally, because Claude reads `skills/` directly, but nobody who installed the plugin ever receives it. Run `npm run check` to catch that; CI runs it on every push and pull request.

Keep `package.json` and `.claude-plugin/plugin.json` on the same version number. `npm run check` fails when they drift.

Run `bash scripts/link-skills.sh` to symlink every skill into `~/.claude/skills` and `~/.agents/skills`. Each entry is a symlink into this repo, so `git pull` updates an installed skill. Re-run it after adding, removing, or renaming one.

`scripts/` holds no dependencies on purpose. The shell scripts use POSIX tools and the check script uses only Node built-ins, so there is nothing to install before running them.
