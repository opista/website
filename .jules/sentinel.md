## 2026-01-15 - Command Injection in Git Helpers
**Vulnerability:** Found `execSync` using string concatenation with user-controlled input (file paths) in `page-created-at.ts` and `page-modified-at.ts`, allowing RCE.
**Learning:** `path.join` does not sanitize inputs for shell execution. It only handles path separators. Using `execSync` with strings is dangerous.
**Prevention:** Always use `execFile` or `execFileSync` (or `spawn`) with an array of arguments to prevent shell injection. Validate inputs even for internal helpers.
