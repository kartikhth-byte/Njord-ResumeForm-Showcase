# Validation and evidence

[← Project overview](../README.md) · [Architecture](architecture.md) · [Walkthrough](walkthrough.md) · [Aggregate metrics](../evidence/metrics.json)

## Checks performed for this showcase

On September 29, 2026, the current tracked implementation was inspected and its frontend/test sources copied to an isolated local directory. No production environment files, stored sessions, applicant records, or customer templates were used. The copy reused the existing installed dependency directory; this was not a clean dependency installation from the lockfile.

| Check | Result | Scope |
|---|---|---|
| ESLint | Passed | Copied JavaScript application, tests, scripts, and lint configuration |
| Vite build | Passed with large-chunk warning | Frontend compilation without production environment configuration |
| Existing validation-contract tests | 16 passed, 0 failed, 0 skipped | One run of the isolated contract spec; no browser or backend required |
| Public illustrative example | 3 scenarios matched documented output | Newly authored synthetic input only |
| Public example regression checks | 8 passed | Empty rows, date ordering, whitespace, consent and partial completion |

The private test source is `tests/smoke/applicant-validation-contract.spec.js`. An isolated Playwright configuration selected that file only and omitted the normal global setup, browser fixtures, stored sessions, and server startup. It was run with `playwright test --config contract.config.mjs`. Lint and build used `npm run lint` and `npm run build`.

The 16 test cases cover mandatory-section aggregation, conditional referral fields, malformed email/phone, date ordering, empty education rows, minimum repeated records, conditional medical-history details, physical measurements, course fields, expanded sea-service fields, references, and declarations. One test iterates over valid payloads for all 13 mandatory sections; 16 is a count of test cases, not unique people or independent datasets. Fixtures were authored test inputs, not applicant samples.

The [public example](../examples/README.md) has its own commands and expected output. Its 8 checks are separate from the 16 private implementation tests and must not be added together as a product-wide pass total.

## Historical validation

The private README and `docs/test-plan.md` record **77 passed and 2 skipped** for the June 8, 2026 smoke baseline: 79 reported test outcomes, not 79 unique applicants. This is a documentation-reported historical result. It was not rerun or reconstructed from raw browser artifacts for this showcase.

The current code changed applicant authentication to emailed magic links. Some smoke expectations still reference Google sign-in and the old login route. The June result therefore does not certify current authentication, authorization, or end-to-end application behavior.

Project memory also records a May 2026 database check with a temporary applicant: a second active application was rejected, a terminal status allowed a subsequent application, and temporary records were removed. This was a sequential diagnostic, not a concurrent-load test. Historical worksheet notes describe manual inspection of an early two-section export; the full current writer and template matrix remain unverified here.

## What the evidence does not establish

- No measured recruiter time savings, revenue impact, active-user scale, or deployment uptime is claimed.
- No model accuracy, calibrated confidence, or end-to-end candidate-matching quality metric is available in the reviewed evidence.
- Passing a frontend build does not validate database migrations, email delivery, integrations, or live configuration.
- Newer invite/bounce handling, role restrictions, reporting, and worksheet overwrite/fidelity flows have pending rollout or manual checks.
- Daily expiry scheduling and complete status-history rollout are not assumed to be active.
- Product screenshots and a public synthetic-data application environment were unavailable for this publication. The walkthrough is textual and synthetic.

## Claim provenance

| Published claim | Private evidence source | Interpretation |
|---|---|---|
| 19 form sections; 13 mandatory | `src/constants/formSections.js` | Current code scope |
| 3 recruiter roles | `AGENTS.md`, current route guards and permissions code | Named access roles, not a completed authorization audit |
| 16 validation tests pass | Isolated execution of the contract spec | Current local check |
| Lint/build pass | Isolated command execution | Current static verification with installed dependencies |
| 77 passed; 2 skipped | README and test plan dated June 8, 2026 | Historical documentation report |
| 3 public scenarios; 8 checks | [Fixtures](../examples/synthetic-scenarios.json), [tests](../examples/intake-demo.test.mjs) | Reproducible illustrative logic only |

The [JSON evidence file](../evidence/metrics.json) contains manually allowlisted aggregate fields and provenance categories. It contains no records, raw logs, private URLs, or production identifiers. Anyone can reproduce the public example; access to the original implementation would be needed to independently rerun its private tests.
