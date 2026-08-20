#!/usr/bin/env bash
set -euo pipefail

# Prints every skill in this repo, one per line, as `name<TAB>command`.

REPO="$(cd "$(dirname "$0")/.." && pwd)"

find "$REPO/skills" -name SKILL.md -print0 |
  xargs -0 -n1 dirname |
  xargs -n1 basename |
  sort |
  while read -r name; do
    printf '%s\t/%s\n' "$name" "$name"
  done
