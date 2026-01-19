## 2024-05-24 - Partial Path Traversal in File Reads
**Vulnerability:** A standard `startsWith` check on file paths allows partial matching. For example, if the intended directory is `/data/posts` and the attacker requests `../posts-secret`, the path `/data/posts-secret` passes the check `path.startsWith('/data/posts')`.
**Learning:** Checking that a path is "inside" another requires appending the path separator to the prefix check or using specific path utility functions.
**Prevention:** Use `path.resolve` and check `fullPath.startsWith(intendedDir + path.sep)`.

## 2025-01-17 - Command Injection in Git Operations
**Vulnerability:** Using `execSync` with string concatenation (e.g., `execSync("git log " + filePath)`) exposes the application to command injection if `filePath` contains shell metacharacters.
**Learning:** Shell strings are dangerous for variable input.
**Prevention:** Use `execFileSync` (e.g., `execFileSync("git", ["log", filePath])`) which passes arguments directly to the process without invoking a shell, eliminating injection risks.
