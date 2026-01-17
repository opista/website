## 2024-05-24 - Partial Path Traversal in File Reads
**Vulnerability:** A standard `startsWith` check on file paths allows partial matching. For example, if the intended directory is `/data/posts` and the attacker requests `../posts-secret`, the path `/data/posts-secret` passes the check `path.startsWith('/data/posts')`.
**Learning:** Checking that a path is "inside" another requires appending the path separator to the prefix check or using specific path utility functions.
**Prevention:** Use `path.resolve` and check `fullPath.startsWith(intendedDir + path.sep)`.
