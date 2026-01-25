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

## 2026-01-21 - Semantic Buttons

**Learning:** Replacing `div` with `role="button"` with native `<button>` elements improves accessibility (free keyboard support, focus handling) but requires handling polymorphism if the component also supports `href` (rendering as a link). When both `onClick` and `onEnter` props are supported, care must be taken to not duplicate event triggers, as native buttons fire `onClick` on Enter/Space keypresses.
**Action:** Use polymorphic rendering to switch between `<button>` and `<div>`/`<a>`. Remove manual `onKeyDown` handlers for Enter/Space unless custom non-click behavior is required.

## 2026-02-12 - Tooltip Accessibility

**Learning:** Tooltip triggers should be interactive elements like `<button>`, not `<a>` tags without hrefs. This ensures keyboard accessibility (tab focus) and correct semantic role. Also, generating IDs from content (`toSlug`) is fragile; `useId` provides stable, unique IDs for ARIA relationships.
**Action:** Use `<button type="button">` for interactive toggles and `useId` for accessibility attribute pairing.

## 2026-10-24 - Semantic Icons & Visual Metaphors

**Learning:** Icons often convey meaning visually (e.g. checkmark = "Pro", cross = "Con") that is lost to screen readers if the icon just says "check icon". It is better to hide the icon (`aria-hidden`) and provide semantic text (e.g., "Pro: ") via `sr-only` classes. To support this, all icon components must accept and spread `...props` to the underlying `<svg>`.
**Action:** Ensure all icon components extend standard SVG props and spread them. Replace visual metaphors with semantic text for screen readers.
