#!/usr/bin/env node
// Checks that the skills on disk, the plugin manifest, and the README agree.
//
// The failure this prevents: you add a skill, and it works locally because
// Claude reads skills/ directly, but it is missing from plugin.json, so anyone
// who installed the plugin never receives it. The README goes stale the same
// way. Both are silent, so CI checks them on every push.
//
// Exits 0 when everything agrees, 1 with a list of problems otherwise.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];

function fail(message) {
  problems.push(message);
}

// --- Read the skills on disk -------------------------------------------------

const skillsDir = join(repo, "skills");
const folders = readdirSync(skillsDir)
  .filter((entry) => statSync(join(skillsDir, entry)).isDirectory())
  .sort();

if (folders.length === 0) {
  fail("skills/ contains no skill folders.");
}

const skills = [];

for (const folder of folders) {
  const path = join(skillsDir, folder, "SKILL.md");

  let source;
  try {
    source = readFileSync(path, "utf8");
  } catch {
    fail(`skills/${folder}/SKILL.md is missing.`);
    continue;
  }

  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    fail(`skills/${folder}/SKILL.md has no frontmatter block.`);
    continue;
  }

  const field = (key) => {
    const match = frontmatter[1].match(new RegExp(`^${key}:[ \\t]*(.+)$`, "m"));
    return match ? match[1].trim() : null;
  };

  const name = field("name");
  const description = field("description");

  if (!name) {
    fail(`skills/${folder}/SKILL.md frontmatter has no name.`);
    continue;
  }

  // The slash command comes from `name`, not the folder, so a mismatch means
  // the command is not the one the README documents.
  if (name !== folder) {
    fail(
      `skills/${folder}/SKILL.md is named "${name}". The folder is "${folder}", so its command is /${name}, not /${folder}. Make them match.`,
    );
  }

  if (!description) {
    fail(
      `skills/${folder}/SKILL.md frontmatter has no description. Without one, Claude cannot tell when the skill applies.`,
    );
  }

  skills.push({ folder, name });
}

// --- Compare against the plugin manifest -------------------------------------

const pluginPath = join(repo, ".claude-plugin", "plugin.json");
let plugin;
try {
  plugin = JSON.parse(readFileSync(pluginPath, "utf8"));
} catch (error) {
  fail(`.claude-plugin/plugin.json could not be read: ${error.message}`);
}

if (plugin) {
  const listed = plugin.skills ?? [];
  const expected = skills.map((skill) => `./skills/${skill.folder}`);

  for (const path of expected) {
    if (!listed.includes(path)) {
      fail(
        `.claude-plugin/plugin.json is missing "${path}". Anyone who installs the plugin will not get that skill.`,
      );
    }
  }

  for (const path of listed) {
    if (!expected.includes(path)) {
      fail(
        `.claude-plugin/plugin.json lists "${path}", which is not a skill on disk. Installing the plugin would fail.`,
      );
    }
  }

  const pkg = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
  if (pkg.version !== plugin.version) {
    fail(
      `package.json is version ${pkg.version} but plugin.json is ${plugin.version}. Set both to the same value.`,
    );
  }
}

// --- Compare against the README ----------------------------------------------

const readme = readFileSync(join(repo, "README.md"), "utf8");

for (const { folder, name } of skills) {
  if (!readme.includes(`./skills/${folder}/`)) {
    fail(`README.md does not link to ./skills/${folder}/.`);
  }
  if (!readme.includes(`\`/${name}\``)) {
    fail(
      `README.md does not show the command \`/${name}\`, so nobody reading it knows how to run that skill.`,
    );
  }
}

// --- Report ------------------------------------------------------------------

if (problems.length > 0) {
  console.error(`${problems.length} problem(s):\n`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

console.log(
  `ok: ${skills.length} skills, all listed in plugin.json and the README`,
);
for (const { name } of skills) {
  console.log(`  /${name}`);
}
