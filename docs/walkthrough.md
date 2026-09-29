# A synthetic recruitment walkthrough

[← Project overview](../README.md) · [Architecture](architecture.md) · [Validation](validation.md) · [Run the example](../examples/README.md)

This is a textual scenario explaining the implemented interfaces. It is not a recording of a live applicant, a product screenshot, or a claim that every integration has passed current end-to-end testing.

## Applicant: complete a structured record

1. A recruiter creates a prospect and associates that prospect with a vessel requirement. An emailed invitation brings the applicant into the enrollment/authentication flow.
2. The applicant uses an emailed sign-in link, opens a draft, and enters application details, qualifications, courses, sea service, and declarations across the guided form.
3. Autosave shows its state as edits are persisted. An empty education row does not count as completed progress; missing required fields keep the relevant section incomplete.
4. The applicant reviews the required-field results, corrects omissions, and submits. The applicant-facing submitted view omits recruiter status controls.

Current magic-link code is present, but email delivery, account migration, and complete live login validation remain open checks. The [runnable example](../examples/intake-demo.mjs) demonstrates step 3 locally without login or a backend.

## Recruiter: review evidence and move the workflow

1. A recruiter signs in and opens the applications workspace. Standard filters support ordinary review; optional AI search requires ready embeddings.
2. The recruiter opens an application, reviews qualification and expiry prompts, and considers any linked requirement context. Missing evidence requires human follow-up; a model confidence value is not a hiring decision.
3. The recruiter records status outcomes, schedules tests/interviews where integrations are configured, and assigns the application handler. The code distinguishes a failed test with a possible retake from a terminal rejection.
4. Requirement and candidate views expose progress toward joining. KPI views reuse common calculations; core load failures show a retry state instead of treating missing data as zero activity.
5. Authorized report actions request an audit record before creating a download. Current backend and permissions validation is still required for the full live reporting flow.

## Operator: configure and recover

- A Master Recruiter manages staff roles and configuration. Coordinators have a deliberately narrower interface; complete role-matrix verification is still pending.
- Authorized staff upload a normalized XLSX worksheet template and request generation from an application. A missing active template blocks generation; failed downloads should be investigated at the service/data boundary.
- Operators check mapped values and formatting in the generated workbook, including prefilled-cell overwrite behavior. The showcase includes no real customer template or generated applicant workbook.
- Expiry warnings have a manual invocation path. Daily automated scheduling remains a deployment task, so this walkthrough does not imply an unattended notification loop.

## Local example

Run the [synthetic intake example](../examples/README.md) to see blank, partial, and complete drafts produce different submission gates. Its two sections teach the shared-validation pattern; they do not reproduce the complete product form or assess eligibility for employment.
