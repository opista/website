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

## 2026-10-25 - Focus State on Wrapped Elements

**Learning:** Wrapping a styled `div` inside a `Link` (anchor) breaks focus visibility because the browser focuses the anchor (which has no styles) while the `div` (which has the styles) is not focused.
**Action:** Always apply interactive styles (focus rings, cursor, etc.) directly to the interactive element (`<a href>` or `<button>`), not a nested container.

## 2026-02-12 - Reading Time Estimates

**Learning:** Providing an estimated reading time helps users gauge the commitment required for an article, improving the decision-making process. Calculating this server-side in Next.js (using a simple words/WPM formula) ensures the data is available immediately without layout shifts or client-side calculation delays.
**Action:** Include reading time estimates for all long-form text content.

## 2026-02-13 - Redundant Icon Labels

**Learning:** When an interactive element (button, link) has an explicit `aria-label`, any icons inside it should have `aria-hidden="true"` and no `aria-label`. Otherwise, screen readers will announce the icon label as well, creating noise (e.g., "Copy code button. Icon, copy to clipboard.").
**Action:** Always strip `aria-label` from decorative icons inside labeled controls and use `aria-hidden="true"`.

## 2026-02-14 - Heading Permalink Accessibility

**Learning:** Permalinks inside headings often include an icon. If this icon has an accessible name (e.g. "Icon, link symbol") and is part of the link text, screen readers announce it as part of the heading text (e.g. "Heading Text Icon, link symbol"). This is noisy and redundant.
**Action:** Ensure permalink icons inside headings are hidden with `aria-hidden="true"` so the link text matches the heading text exactly.
