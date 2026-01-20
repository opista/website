## 2026-01-15 - Accessibility Improvements

**Learning:** Adding a "Skip to content" link is a high-impact, low-effort accessibility win. It requires coordination between the layout (where the link lives) and the page components (which must provide the matching `id`).
**Action:** Always check for "Skip to content" links in new projects. Ensure main content wrappers have a consistent ID.

## 2026-01-15 - Icon Buttons

**Learning:** For icon-only buttons, using `aria-label` on the interactive element is often cleaner than using a nested `sr-only` span, as it directly labels the control for screen readers.
**Action:** Prefer `aria-label` for icon-only buttons in the future.

## 2026-01-16 - Navigation Accessibility

**Learning:** Visual indicators for active navigation links (bold/underline) are insufficient for screen readers. They must be paired with `aria-current="page"`.
**Action:** Ensure all navigation components use `aria-current` for the active state.

## 2026-01-16 - Static Alerts vs Live Alerts

**Learning:** `role="alert"` (assertive) should only be used for time-sensitive, dynamic updates that require immediate user attention. For static "callout" or "admonition" blocks in content (like blog posts), use `role="note"` instead. This ensures screen readers read them sequentially without interrupting the user.
**Action:** Use `role="note"` for static alerts/callouts; reserve `role="alert"` for dynamic error messages.

## 2026-01-20 - External Link Warning

**Learning:** When links open in a new tab (`target="_blank"`), screen reader users need an explicit warning. This can be achieved by appending visually hidden text `(opens in a new tab)` or modifying the `aria-label` if present.
**Action:** Implement automated handling in the base `Link` component to ensure consistency and avoid manual errors.
