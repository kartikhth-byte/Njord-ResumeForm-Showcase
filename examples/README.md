# Shared validation: runnable intake example

[← Project overview](../README.md) · [Architecture](../docs/architecture.md) · [Validation](../docs/validation.md)

**Illustrative code, synthetic data.** This newly written example demonstrates a pattern found in the private application: draft progress and submission readiness use the same validation results. It is not a production excerpt, a product demo, or a maritime qualification checker.

**[View code](intake-demo.mjs)** · [View scenarios](synthetic-scenarios.json) · [View tests](intake-demo.test.mjs)

## Run

Prerequisite: Node.js 20 or newer. No packages, environment variables, accounts, network requests, or installation steps are required. Run from the repository root:

```sh
node examples/intake-demo.mjs
node --test examples/intake-demo.test.mjs
```

Verified example output:

```text
blank-row: 0/2 sections | 0% | blocked (education, declaration)
partial: 1/2 sections | 50% | blocked (declaration)
complete: 2/2 sections | 100% | ready
```

The test command reports **8 passed, 0 failed**; timings and runner formatting vary by Node version.

## What to inspect

`assessDraft` returns field errors, blocking section names, and a completion count from one set of rules. A blank row, a second invalid row, reversed dates, or missing consent prevents readiness. `formatScenario` renders those results without introducing another definition of completeness.

This example has only education and declaration sections, both mandatory. Its denominator is always two sections. The real product has a larger field contract and different mandatory/optional section rules; these example percentages must not be presented as product completion or applicant-quality metrics. An example signature is simply synthetic text, not an electronic-signature implementation.
