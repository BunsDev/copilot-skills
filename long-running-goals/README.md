# long-running-goals

Agent skill that maintains long-running, cross-session goals via a human-editable `goals.md` file. Works with Copilot CLI, Claude Code, Codex, and any agent that loads markdown skills.

## Install

```bash
gh skill install BunsDev/copilot-skills long-running-goals
```

Or with the cross-agent `skills` installer:

```bash
npx skills add BunsDev/copilot-skills --skill long-running-goals
```

Or copy `SKILL.md` and `references/` into your agent's skills directory.

For reproducible installs after a release is tagged:

```bash
gh skill install BunsDev/copilot-skills long-running-goals@v1.0.0
```

## Why

Sessions die. Context windows compact. Plans get lost. This skill gives agents a tiny, durable, user-owned file (`.copilot/goals.md` per-repo, `~/.copilot/goals.md` global) that survives all of that.

No daemons, no databases, no JSON the user can't read. Just markdown.

## Workflow

1. Set a goal: "Let's set a long-running goal: migrate from npm to pnpm across all repos."
2. The agent writes it to `~/.copilot/goals.md` under `## active`.
3. Days later, in a fresh session: the agent reads goals.md, surfaces active goals, asks what to do.
4. Work happens, `notes:` and `next:` get updated.
5. When done, the goal moves to `## done` with an outcome.

See [`SKILL.md`](./SKILL.md) for the full spec.

## Relationship to Copilot CLI goals

This is a stopgap skill for the long-running goals proposal in [github/copilot-cli#3364](https://github.com/github/copilot-cli/issues/3364). It gives agents a convention they can follow today while leaving room for Copilot CLI to promote `.copilot/goals.md` and `/goals` into first-class native behavior later.

The skill does not add a slash command by itself. It teaches the agent how to read, update, and preserve the goals file when the skill is installed and invoked.

## License

MIT
