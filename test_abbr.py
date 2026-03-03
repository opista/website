from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Start server in background
        import subprocess
        import time
        import os

        server = subprocess.Popen(["pnpm", "start"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(5) # Wait for server to start

        page.goto("http://localhost:3000/posts/ipod-classic-modding-guide")

        # Scroll to the battery table
        battery_table_heading = page.locator("text=iPod Storage, Battery & Backplate Compatibility")
        if battery_table_heading.count() > 0:
            battery_table_heading.scroll_into_view_if_needed()

        page.screenshot(path="abbr_test.png", full_page=True)

        # Clean up
        browser.close()
        server.terminate()
        os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

if __name__ == "__main__":
    run()
