## 2024-03-24 - [Scroll Event Throttling]
**Learning:** High-frequency events like `scroll` should always be throttled when updating state, especially in custom hooks used by multiple components.
**Action:** When implementing event listeners for `scroll` or `resize`, verify if they trigger state updates and apply throttling or debouncing as appropriate.
