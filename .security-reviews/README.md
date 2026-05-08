# Security Review Audit Artifacts

This directory contains AI-driven security reviews performed before each significant push, generated via the `/security-review` slash command in Claude Code.

## Convention

- Filename: `PR-<branch>-<YYYY-MM-DD>-<short-sha>.md`
- One file per review session
- Committed alongside the change being reviewed
- Read-only audit trail — do not edit historical reviews; instead add a new dated review

## Why local AI review (not CI Claude API)?

We chose local Claude Code review over Anthropic API in CI for cost reasons (zero variable spend) and depth (Claude Code can navigate the whole repo with full context, far beyond the diff window of an API call). The deterministic CI scanners (gitleaks, Semgrep, OSV-Scanner, Trivy, Checkov, conftest) are the truth source — they enforce the floor regardless of whether the AI review happened. The pipeline is structured so flipping to API-in-CI later is a single feature-flag change.

See `docs/runbooks/cloudflare-bootstrap.md` and `docs/security-policy.md` in the meta-repo for the full security model.
