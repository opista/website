import asyncio
from playwright.async_api import async_playwright, expect

async def verify_heading_permalink():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            permissions=['clipboard-read', 'clipboard-write']
        )
        page = await context.new_page()

        # Create a temporary MDX file with headings for testing
        # This is not possible via playwright script, assuming we can browse existing pages
        # Let's browse a page that we know exists from the build output
        # /posts/blind-trust-in-vs-code-extensions

        target_url = "http://localhost:3000/posts/blind-trust-in-vs-code-extensions"
        print(f"Navigating to {target_url}")

        try:
            await page.goto(target_url)

            # Wait for content to load
            await page.wait_for_selector("h2")

            # Find a heading (h2)
            heading = page.locator("h2").first
            heading_text = await heading.text_content()
            print(f"Found heading: {heading_text}")

            # Hover over the heading to reveal the permalink
            # The structure is h2 > span.group > ... > button
            # We need to hover the span.group
            heading_span = heading.locator("span.group")
            await heading_span.hover()

            # Find the permalink button
            # It should be a button with aria-label containing "Copy link to"
            permalink_button = heading.get_by_role("button", name=f"Copy link to {heading_text.strip()}")

            # Verify it's visible on hover (desktop) or always (mobile - but we are in desktop mode by default)
            # The button has 'opacity-0' by default on desktop, 'opacity-100' on hover
            # We can check if it is visible and clickable

            print("Clicking permalink button...")
            await permalink_button.click()

            # Verify "Copied!" tooltip appears
            # Tooltip implementation uses react-tooltip, which might render a separate element
            # But the button text/icon might change or a tooltip might appear
            # The HeadingPermalink component changes icon to IconCheck on copy

            # Check for the Check icon (we can't easily check for the icon SVG path, but we can check the class)
            # IconCheck has 'text-green-500' class
            check_icon = permalink_button.locator(".text-green-500")
            await expect(check_icon).to_be_visible()
            print("Verified check icon is visible")

            # Verify clipboard content
            clipboard_text = await page.evaluate("navigator.clipboard.readText()")
            print(f"Clipboard text: {clipboard_text}")

            expected_slug = (await heading.get_attribute("id"))
            expected_url_suffix = f"#{expected_slug}"

            if expected_url_suffix in clipboard_text:
                print("SUCCESS: Clipboard contains the correct anchor link.")
            else:
                print(f"FAILURE: Clipboard does not contain '{expected_url_suffix}'. Got: {clipboard_text}")

            # Take a screenshot
            await page.screenshot(path=".Jules/verification/heading_permalink.png")
            print("Screenshot saved to .Jules/verification/heading_permalink.png")

        except Exception as e:
            print(f"Error: {e}")
            await page.screenshot(path=".Jules/verification/error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_heading_permalink())
