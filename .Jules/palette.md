[Output truncated for brevity]

## 2026-06-25 - Video Accessibility

**Learning:** Videos must have captions or descriptions to be accessible (WCAG 1.2.2). The `<track>` element provides this functionality for native `<video>` elements. Also, adding a `poster` image improves perceived performance and avoids a blank player state before loading.
**Action:** Ensure all `VideoEmbed` components support and use `tracks` and `poster` props.

## 2026-10-27 - Icon Accessibility in Tables

**Learning:** Using SVG icons as visual status indicators (e.g., checkmarks for "Supported", crosses for "Incompatible") inside data tables creates an accessibility barrier if the icons only have visual `aria-label`s (like "Icon, circle with a tick"). Screen readers will announce the visual description instead of the data's meaning, making the table's information difficult to understand.
**Action:** When using icons to convey data, hide the SVG entirely with `aria-hidden="true"` and provide the semantic meaning using visually hidden text (`<span className="sr-only">Supported</span>`).
## 2026-02-28 - Reading Time Context

**Learning:** Simple text spans like "5 min read" lack context for screen readers when out of visual context, and their brevity might be confusing. Adding an `sr-only` prefix like "Estimated reading time: " provides clarity without affecting the visual design.
**Action:** Always include an `sr-only` prefix describing the context for compact data displays like reading time estimates. Add `title` attribute for native tooltips.

## 2026-03-01 - Alert Component Accessibility

**Learning:** Using `role="alert"` or `role="status"` changes the order in which content is read by screen readers. If the alert colours are just used for visual hierarchy and not to denote actual errors or status changes that need immediate attention, using `role="note"` is correct to maintain the natural reading order.
**Action:** Do not automatically assign `role="alert"` or `role="status"` based on visual style (like "error" or "warning") unless the content truly represents an urgent system state or validation error that needs to interrupt the user.

## 2024-05-18 - Loading Button Accessibility

**Learning:** When a button handles asynchronous operations and displays a loading spinner, its accessibility can be further improved by applying the `aria-busy` attribute. Setting `aria-busy={true}` informs screen readers that the element (and its contents) are currently being updated or are in a loading state, providing crucial context for assistive technologies.
**Action:** Always add `aria-busy={isLoading}` to buttons (and link-buttons) that have an `isLoading` prop and display a loading state.
