#!/usr/bin/env bash
set -euo pipefail

# Dev-only script, for working on this repo. It is not the supported installer;
# see the README for that.
#
# Symlinks every skill in this repo into the local skill directories:
#   ~/.claude/skills  Claude Code
#   ~/.agents/skills  Codex and other Agent Skills-compatible harnesses
# Each entry is a symlink into this repo, so `git pull` is enough to update an
# installed skill. Re-run after adding, removing, or renaming one.

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DESTS=("$HOME/.claude/skills" "$HOME/.agents/skills")

names=()
srcs=()
while IFS= read -r -d '' skill_md; do
  src="$(dirname "$skill_md")"
  names+=("$(basename "$src")")
  srcs+=("$src")
done < <(find "$REPO/skills" -name SKILL.md -print0)

if [ ${#names[@]} -eq 0 ]; then
  echo "error: no SKILL.md found under $REPO/skills" >&2
  exit 1
fi

for DEST in "${DESTS[@]}"; do
  # If $DEST is itself a symlink into this repo, the per-skill links below would
  # be written back into the repo's own skills/ tree. Bail out rather than
  # polluting the working copy.
  if [ -L "$DEST" ]; then
    resolved="$(cd "$(dirname "$DEST")" && cd "$(readlink "$DEST")" 2>/dev/null && pwd || true)"
    case "$resolved" in
      "$REPO" | "$REPO"/*)
        echo "error: $DEST is a symlink into this repo ($resolved)." >&2
        echo "Remove it (rm \"$DEST\") and re-run to recreate it as a real directory." >&2
        exit 1
        ;;
    esac
  fi

  mkdir -p "$DEST"

  for i in "${!names[@]}"; do
    target="$DEST/${names[$i]}"

    # A real directory here is a copied-in older version of the skill. Replace
    # it, so the symlink becomes the single source of truth.
    if [ -e "$target" ] && [ ! -L "$target" ]; then
      rm -rf "$target"
    fi

    ln -sfn "${srcs[$i]}" "$target"
    echo "linked ${names[$i]} -> ${srcs[$i]} ($DEST)"
  done
done
