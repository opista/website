## 2024-03-24 - [Scroll Event Throttling]

**Learning:** High-frequency events like `scroll` should always be throttled when updating state, especially in custom hooks used by multiple components.
**Action:** When implementing event listeners for `scroll` or `resize`, verify if they trigger state updates and apply throttling or debouncing as appropriate.

## 2024-05-23 - [Build vs Buy]

**Learning:** Rolling custom implementations of complex utilities (like `throttle`) increases maintenance surface area.
**Action:** Weigh the cost of adding/keeping a dependency against the maintenance cost of custom code. For complex logic, prefer battle-tested libraries unless the size savings are critical and the implementation is standard.

## 2026-01-17 - [Bulk Git Timestamps]

**Learning:** Fetching git timestamps for many files individually (N+1) using `execSync` is a major build performance bottleneck (process spawning overhead).
**Action:** Use a single `git log` command to fetch history for an entire directory and map it to files in memory, reducing complexity from O(N) to O(1) process spawns.

## 2026-01-20 - [Keep Lodash Throttle]

**Learning:** Writing a custom `throttle` implementation to save bundle size introduced maintenance risk without sufficient justification.
**Action:** Keep `lodash-es` (or similar robust libraries) for complex utilities like `throttle`. Do not replace them with custom implementations unless absolutely necessary and proven to be a bottleneck.
