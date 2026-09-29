import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assessDraft, formatScenario } from './intake-demo.mjs';

const scenarios = JSON.parse(readFileSync(new URL('./synthetic-scenarios.json', import.meta.url), 'utf8'));
const complete = () => structuredClone(scenarios[2].draft);

test('documented scenarios have stable output', () => {
  assert.deepEqual(scenarios.map(formatScenario), [
    'blank-row: 0/2 sections | 0% | blocked (education, declaration)',
    'partial: 1/2 sections | 50% | blocked (declaration)',
    'complete: 2/2 sections | 100% | ready',
  ]);
});
test('missing records cannot pass the gate', () => {
  assert.deepEqual(assessDraft({}).blockers, ['education', 'declaration']);
});
test('a valid row cannot hide a second blank row', () => {
  const draft = complete();
  draft.education.push({});
  assert.equal(assessDraft(draft).ready, false);
  assert.equal(assessDraft(draft).completed, 1);
});
test('whitespace is not evidence of completion', () => {
  const draft = complete();
  draft.education[0].institution = '  ';
  assert.deepEqual(assessDraft(draft).blockers, ['education']);
});
test('reversed dates block the education section', () => {
  const draft = complete();
  draft.education[0].to = '2019-01-01';
  assert.deepEqual(assessDraft(draft).blockers, ['education']);
});
test('an impossible calendar date is rejected', () => {
  const draft = complete();
  draft.education[0].to = '2021-02-30';
  assert.equal(assessDraft(draft).ready, false);
});
test('truthy text does not substitute for explicit consent', () => {
  const draft = complete();
  draft.declaration.consent = 'true';
  assert.deepEqual(assessDraft(draft).blockers, ['declaration']);
});
test('assessment leaves the draft intact', () => {
  const draft = complete();
  const before = structuredClone(draft);
  assessDraft(draft);
  assert.deepEqual(draft, before);
});
