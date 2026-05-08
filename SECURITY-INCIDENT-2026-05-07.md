# Security Incident Report — GlobalManagement — 2026-05-07

## Summary
A `PUBLIC_WEB3FORMS_ACCESS_KEY` value was committed in plaintext as a hardcoded default-prop in `src/components/ContactForm.astro`; the key has been live in the public repo since 2026-02-06.

## Timeline (UTC)
- 2026-02-07 01:35 — Secret committed in `57bb04c0e6607fb7049f3c12ae98f6b217ae3cef` ("Full site update: all pages, components, styles, SEO, and build output"). Hardcoded as the default value of the `accessKey` prop in `src/components/ContactForm.astro`. Note: no `.env*` file was ever committed in this repo's history; the key was placed directly in source.
- 2026-05-07 HH:MM — Detected via manual review during DevOps hardening sweep.
- 2026-05-07 HH:MM — Rotation completed (Web3Forms dashboard → regenerate access key).
- 2026-05-07 HH:MM — History rewrite force-pushed (`tools/scripts/scrub-secrets.sh` + `git filter-repo --replace-text`).
- 2026-05-07 HH:MM — Collaborators notified.
- 2026-05-07 HH:MM — GitHub Support ticket opened to purge PR caches (if any forks exist).

## Scope
- Secret type: Web3Forms access key (form-submit token)
- Exposure window: 2026-02-07 01:35 UTC to <rotation time> = ~3 months
- Repo visibility during window: public
- Forks at time of detection: <N> (list URLs)

## Evidence of (non-)abuse
- Web3Forms does not expose per-key audit logs or per-submission API; abuse-window verification is only possible indirectly via destination-inbox volume and quality (review the inbox configured in the Web3Forms account for the exposure window).
- Per Web3Forms documentation (https://docs.web3forms.com/), the access key is designed to be embedded in client-side HTML; rotation here is hygiene rather than urgent containment, but is still recommended because the key is a rate-limit / quota identifier and abuse can lead to inbox flooding.

## Remediation
- Rotated the Web3Forms access key via the Web3Forms dashboard (account → access keys → regenerate).
- Updated the application to read the key from a build-time environment variable (`PUBLIC_WEB3FORMS_ACCESS_KEY`) rather than a hardcoded default; new value is stored in Cloudflare Pages environment variables.
- History rewritten with `git filter-repo --replace-text` to redact the leaked literal string from every reachable commit.
- Force-pushed to `origin`; all collaborators advised to delete their clones and re-clone.

## Root cause
The Web3Forms key was placed inline in `src/components/ContactForm.astro` as the default value of an Astro component prop, instead of being injected via `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY` at build time. The repo was committed and pushed public before any secret-scanning hooks were installed.

## Preventive controls added
- gitleaks pre-commit hook (commit <sha>)
- TruffleHog scheduled scan workflow (commit <sha>)
- GitHub push protection enabled at org level
- `.gitignore` expanded to block `.env*`, `*.pem`, `*.key`, `.dev.vars`
- ContactForm.astro refactored to read key from `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY` (no default literal)
- AWS canarytoken planted in `src/components/` to trip future scrapers

## Lessons learned
- "Public" prefix in env-var names (`PUBLIC_*`) signals client-bundling, not "this string is safe to commit." A key intended to be served to browsers at runtime is still a secret at rest in the repo if it gates a paid quota or controls a destination inbox.
- Initial-commit hooks must be installed before first push, not after.
- Hardcoded defaults in component props (`{ accessKey = '<literal>' }`) are an easy-to-miss leak vector that doesn't show up in `.env`-targeted gitleaks rules; custom Semgrep rules should look for these patterns directly in source files.
