// Newly written illustrative code. This is not the production validator.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const textPresent = value => typeof value === 'string' && value.trim().length > 0;

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// Both progress and the submission gate consume these same results.
export function assessDraft(draft = {}) {
  const education = Array.isArray(draft.education) ? draft.education : [];
  const errors = { education: [], declaration: [] };
  if (education.length === 0) errors.education.push('Add an education record.');
  education.forEach((row, index) => {
    if (!textPresent(row?.institution) || !textPresent(row?.qualification)) {
      errors.education.push(`Education ${index + 1}: institution and qualification required.`);
    }
    if (!validDate(row?.from) || !validDate(row?.to) || row.to < row.from) {
      errors.education.push(`Education ${index + 1}: valid dates in chronological order required.`);
    }
  });
  if (draft.declaration?.consent !== true || !textPresent(draft.declaration?.signature)) {
    errors.declaration.push('Consent and a signature are required.');
  }
  const blockers = Object.keys(errors).filter(section => errors[section].length > 0);
  const total = Object.keys(errors).length;
  const completed = total - blockers.length;
  return { completed, total, percent: Math.round(completed / total * 100), ready: blockers.length === 0, blockers, errors };
}

export function formatScenario(scenario) {
  const result = assessDraft(scenario.draft);
  const state = result.ready ? 'ready' : `blocked (${result.blockers.join(', ')})`;
  return `${scenario.id}: ${result.completed}/${result.total} sections | ${result.percent}% | ${state}`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const scenarios = JSON.parse(readFileSync(new URL('./synthetic-scenarios.json', import.meta.url), 'utf8'));
  for (const scenario of scenarios) console.log(formatScenario(scenario));
}
