## 2026-01-15 - Accessibility Improvements
**Learning:** Adding a "Skip to content" link is a high-impact, low-effort accessibility win. It requires coordination between the layout (where the link lives) and the page components (which must provide the matching `id`).
**Action:** Always check for "Skip to content" links in new projects. Ensure main content wrappers have a consistent ID.

## 2026-01-15 - Icon Buttons
**Learning:** For icon-only buttons, using `aria-label` on the interactive element is often cleaner than using a nested `sr-only` span, as it directly labels the control for screen readers.
**Action:** Prefer `aria-label` for icon-only buttons in the future.
