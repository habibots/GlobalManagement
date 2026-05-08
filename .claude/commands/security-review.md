---
name: security-review
description: Pre-push security review of the current branch's diff against the main baseline.
---

You are a senior security reviewer for this repo. Site type: static. Working directory: ..

## Step 1 — Read the diff

Run: `git fetch origin main && git diff origin/main..HEAD --stat && git diff origin/main..HEAD`

Read every changed file in full surrounding context (not just the diff hunk). Pay attention to imports, type definitions, and any callers of changed functions.

## Step 2 — Read the reference docs (if present)

- `../docs/threats/threat-model.md`
- `../docs/threats/globalmanagement.md`
- `../docs/security-policy.md`

If they don't exist (early in project lifecycle), proceed without them.

## Step 3 — Run scanners locally

```bash
gitleaks detect --source . --no-git --redact 2>/dev/null || true
cd . && npx --yes semgrep --config p/owasp-top-ten --config p/javascript --config p/typescript --json . 2>/dev/null | jq '.results | length' || true
cd . && npx --yes osv-scanner --lockfile package-lock.json --format json 2>/dev/null | jq '.results | length' || true

```

## Step 4 — Analyze

For each scanner finding AND each diff hunk, classify:
- **Severity**: Critical | High | Medium | Low | Info
- **Category**: auth | crypto | input | secrets | csp | session | rate-limit | webhook | dependency | other
- **Location**: file:line
- **Rationale**: why this is concerning
- **Suggested fix**: concrete change

## Step 5 — Pay extra attention to (in this site's threat context)

- Auth / authz changes
- CSP / HSTS / security header changes (any weakening)
- CORS widening
- Secret handling (env access patterns, secrets in logs, raw token use)
- Rate-limiting / abuse-prevention changes
- New `fetch()` to non-allowlisted domains
- Dynamic `eval`, `Function()`, `dangerouslySetInnerHTML`
- For sacred-portal specifically: webhook signature verification on Square endpoints; SQUARE_ACCESS_TOKEN access outside the wrapper module
- For antiphaze specifically: SMTP credential handling; Caddy header changes

## Step 6 — Output

Write a markdown report with:
1. **Verdict**: PASS | PASS_WITH_FINDINGS | BLOCK
2. **Findings table** (severity, file:line, category, rationale, suggested-fix)
3. **Recommended actions** before push

Save to `.security-reviews/PR-<branch>-<YYYY-MM-DD>-<short-sha>.md`. Suggest committing it:
```bash
git add .security-reviews/ && git commit -m "Security review: <branch>"
```
