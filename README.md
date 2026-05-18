# copilot-skills

Agent skills by [@BunsDev](https://github.com/BunsDev), compatible with GitHub Copilot CLI, Claude Code, Codex, and other markdown-skill-loading agents.

These skills are intentionally plain Markdown: each skill lives in its own directory with a `SKILL.md` file, optional `references/`, and no runtime dependency.

## Skills

- **[long-running-goals](./long-running-goals)** — Persistent, cross-session goals in a human-editable `goals.md` file.

## Install

With GitHub Copilot CLI / `gh skill`:

```bash
gh skill install BunsDev/copilot-skills <skill-name>
```

With the cross-agent `skills` installer:

```bash
npx skills add BunsDev/copilot-skills --skill <skill-name>
```

For example:

```bash
gh skill install BunsDev/copilot-skills long-running-goals
# or
npx skills add BunsDev/copilot-skills --skill long-running-goals
```

To inspect without installing:

```bash
npx skills add BunsDev/copilot-skills --list
```

## Versioning

For reproducible installs, prefer tagged releases once a skill is stable:

```bash
gh skill install BunsDev/copilot-skills long-running-goals@v1.0.0
```

Until tags exist, installers resolve to the default branch head.

## Validate

```bash
npm run validate
```

This checks skill frontmatter, required sections, reference templates, and documented install commands.
