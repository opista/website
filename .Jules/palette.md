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

## 2024-11-20 - Dimensional Abbreviations Accessibility

**Learning:** Using single letters like "H", "W", and "D" for dimensional measurements saves visual space but harms screen reader accessibility by reading them literally ("H 20mm x W 30mm"). Replacing them with `<abbr title="Height">H</abbr>` makes the interface visually identical while providing hover tooltips for sighted users and expanding the abbreviation for screen reader users, improving clarity for everyone. Adding `no-underline cursor-help` is often needed to hide default browser styling for abbreviations and hint at the hover state.
**Action:** When using abbreviations like "H", "W", or "D" for compact data display, wrap them in an `<abbr>` tag with a descriptive `title` attribute.

## 2026-11-04 - Chip Accessibility with True/False Status

**Learning:** When using components like `Chip` to display a true/false status via color (e.g., green for true, red for false) and icons alongside a label (e.g., "Supported"), the visual meaning is easily understood by sighted users. However, for users relying on screen readers, if the icon is hidden (`aria-hidden="true"`) and the color isn't announced, the screen reader only reads the label (e.g., "Supported"). This can be confusing or misleading when the status is actually false (i.e., meaning "Not Supported" visually).
**Action:** Always add an `sr-only` span containing a clarifying prefix (like "Yes: ", "No: ", or "Status: ") to the label when the component's status is conveyed purely through color and icons, ensuring the meaning is fully communicated to assistive technologies.

## 2026-11-05 - Indicator Context for Screen Readers

**Learning:** Compact visual indicators (like "thin" for a backplate or "64MB RAM" for memory) are easily understood by sighted users within the context of a table or device breakdown. However, for screen reader users, encountering these raw values without context can be confusing.
**Action:** Always include an `sr-only` descriptive prefix (like "Backplate: " or "Memory: ") inside visual indicator components to provide necessary context to assistive technologies.
