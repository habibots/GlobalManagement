# Contributing to GlobalManagement

## Branch model

- **`main`** — protected. CI gates required (signed commits, status checks). Force-push disabled.
- **`devops`** — primary working branch for hardening + DevOps work. PRs flow `devops` → `main`.
- All work happens on a topic branch off `devops`. Never push directly to `main` or `devops` without a PR.

## Pre-push checklist

1. Run `/security-review` in Claude Code (the slash command does the work; you address findings).
2. Save the output to `.security-reviews/PR-<branch>-<YYYY-MM-DD>-<short-sha>.md`.
3. `git add .security-reviews/ && git commit -m "Security review: <branch>"`.
4. `git push origin <branch>`.

## CI gates (run automatically on every push to `main` or `devops`, and on every PR)

- `secrets` (gitleaks)
- `sast` (Semgrep OSS + custom rules)
- `sca` (OSV-Scanner)
- `iac` (Checkov + actionlint + zizmor)
- `container` (Trivy — antiphaze only)
- `policy` (OPA Conftest — docker compose, GitHub Actions)
- `build` (npm ci + build + SBOM)

The aggregated `gate` job must pass for branch protection to allow merge.

## Pre-commit hooks (lefthook)

Installed via `lefthook install` after first clone. Runs gitleaks (staged diff) and actionlint (workflow files) on every commit. Fast: under 5 seconds.

## Severity gating

CI blocks merge on Critical and High findings. Medium and Low go to the GitHub Security tab for triage. Allowlists in `.gitleaksignore`, `osv-scanner.toml`, etc. require `# justified: <reason> <YYYY-MM-DD-expiry>` and expire automatically.

## Secrets

NEVER commit `.env*` files (except `.env.example`). NEVER hardcode credentials. Use:
- Local dev: `.env.local` (gitignored), populated from your password manager
- CI: GitHub Encrypted Secrets, scoped to the `production` environment with required reviewers
- Runtime: `wrangler secret put` (sacred-portal Workers), SOPS+age (antiphaze droplet), Cloudflare Pages env vars (GlobalManagement)

## Questions

See `docs/runbooks/` in the meta-repo (`echoeslabwebsite`) for operational procedures (secrets rotation, incident response, Cloudflare fallback).
