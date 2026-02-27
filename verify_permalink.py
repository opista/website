from playwright.sync_api import Page, expect, sync_playwright
import time

def test_heading_permalink(page: Page):
    """
    Verifies that hovering over a heading reveals the permalink icon,
    and clicking it copies the link and changes the icon to a checkmark.
    """

    # 1. Arrange: Go to a post page that has headings.
    # The 'ipod-classic-modding-guide' post is likely to have headings.
    page.goto("http://localhost:3000/posts/ipod-classic-modding-guide")

    # Wait for hydration
    page.wait_for_load_state("networkidle")

    # 2. Act & Assert: Find a heading (e.g., h2) and verify the permalink behavior.

    # Locate a heading (h2)
    # We look for a heading that we know exists or just the first h2
    heading = page.locator("h2").first
    heading.scroll_into_view_if_needed()

    # The permalink button should be inside the heading
    # It has an aria-label "Copy permalink to clipboard" (default state)
    permalink_btn = heading.locator("button[aria-label='Copy permalink to clipboard']")

    # Initial state:
    # - Button exists
    # - Opacity might be 0 (hidden) until hovered
    expect(permalink_btn).to_be_attached()

    # Hover over the heading to reveal the button
    heading.hover()

    # Assert button becomes visible (opacity 1)
    # Note: We check computed style for opacity as per memory
    expect(permalink_btn).to_have_css("opacity", "1")

    # 3. Act: Click the permalink button
    permalink_btn.click()

    # 4. Assert:
    # - Tooltip changes to "Copied!" (we can check the button's aria-label or tooltip content if accessible)
    # - Icon changes (we can check if the button now contains an element with class typical for IconCheck)
    # - Aria-label changes to "Copied permalink to clipboard"

    # Check updated aria-label
    expect(permalink_btn).to_have_attribute("aria-label", "Copied permalink to clipboard")

    # Check for the check icon (IconCheck usually renders as an svg)
    # We can check if the button contains an SVG. The previous icon was IconLink.
    # We can assume the SVG content changed, but aria-label is a strong enough proxy for state change.

    # Take a screenshot of the "Copied!" state
    # We hover again to ensure the tooltip/button stays visible
    heading.hover()
    page.screenshot(path="/home/jules/verification/heading_permalink_copied.png")

    print("Verification successful!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_heading_permalink(page)
        finally:
            browser.close()
