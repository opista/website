## 2024-05-24 - Partial Path Traversal in File Reads
**Vulnerability:** A standard `startsWith` check on file paths allows partial matching. For example, if the intended directory is `/data/posts` and the attacker requests `../posts-secret`, the path `/data/posts-secret` passes the check `path.startsWith('/data/posts')`.
**Learning:** Checking that a path is "inside" another requires appending the path separator to the prefix check or using specific path utility functions.
**Prevention:** Use `path.resolve` and check `fullPath.startsWith(intendedDir + path.sep)`.

## 2026-01-20 - Command Injection in Shell Operations
**Vulnerability:** Using `execSync` with string interpolation (e.g., `execSync(\`git log "${path}"\`)`) allows command injection if the input variable contains quotes and shell metacharacters (e.g., `foo"; rm -rf /; echo "`).
**Learning:** Even if files are expected to exist, paths constructed from user input must be treated as untrusted in shell commands.
**Prevention:** Always use `execFileSync` (or `execFile`) with an argument array to pass parameters safely, avoiding shell parsing entirely.

## 2026-01-21 - Argument Injection in Git Commands
**Vulnerability:** Shell commands like `git log` can interpret filenames starting with a hyphen (e.g., `-p`) as flags if not properly separated, even when using `execFileSync`.
**Learning:** Argument arrays prevent shell injection but not argument injection (flag spoofing).
**Prevention:** Always use the double-dash `--` separator before file paths (e.g., `["log", ..., "--", filePath]`) to force treating subsequent arguments as paths.
