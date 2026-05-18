import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function assertIncludes(file, text, label = text) {
  const content = read(file);
  if (!content.includes(text)) fail(`${file} is missing ${label}`);
}

function assertFile(file) {
  if (!fs.existsSync(path.join(root, file))) fail(`${file} is missing`);
}

function parseFrontmatter(file) {
  const content = read(file);
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    fail(`${file} is missing YAML frontmatter`);
    return {};
  }

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2]]),
  );
}

const skills = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(root, entry.name, 'SKILL.md')))
  .map((entry) => entry.name);

if (skills.length === 0) fail('No skills found');

for (const skill of skills) {
  const skillFile = `${skill}/SKILL.md`;
  const readmeFile = `${skill}/README.md`;
  const templateFile = `${skill}/references/goals.template.md`;

  assertFile(skillFile);
  assertFile(readmeFile);

  const frontmatter = parseFrontmatter(skillFile);
  if (frontmatter.name !== skill) fail(`${skillFile} name must be ${skill}`);
  if (!frontmatter.description || frontmatter.description.length < 40) {
    fail(`${skillFile} needs a useful description`);
  }

  assertIncludes(skillFile, '## When to use');
  assertIncludes(skillFile, '## File locations');
  assertIncludes(skillFile, '## File format');
  assertIncludes(skillFile, '## Workflow');
  assertIncludes(skillFile, '## Anti-patterns');
  assertIncludes(skillFile, 'license: MIT', 'license frontmatter');
  assertIncludes(readmeFile, `gh skill install BunsDev/copilot-skills ${skill}`, 'GitHub skill install command');
  assertIncludes(readmeFile, `npx skills add BunsDev/copilot-skills --skill ${skill}`, 'canonical install command');

  if (skill === 'long-running-goals') {
    assertFile(templateFile);
    for (const section of ['## active', '## paused', '## done']) {
      assertIncludes(skillFile, section);
      assertIncludes(templateFile, section);
    }
    assertIncludes(skillFile, '.copilot/goals.md');
    assertIncludes(skillFile, '~/.copilot/goals.md');
    assertIncludes(skillFile, 'Do **not** auto-start work');
  }
}

console.log(`Validated ${skills.length} skill(s): ${skills.join(', ')}`);
