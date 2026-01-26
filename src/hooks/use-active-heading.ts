"use client";

import { useEffect, useState } from "react";

type HeadingState = "ABOVE" | "INSIDE" | "BELOW";

/**
 * Hook to track which heading is currently visible/active as user scrolls.
 * Uses IntersectionObserver to detect when headings enter the viewport.
 *
 * Optimized to avoid force reflows (getBoundingClientRect) by tracking
 * relative positions using Observer entries.
 */
export function useActiveHeading(headingSlugs: string[]): string | null {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (headingSlugs.length === 0) return;

    // Track the state of each heading relative to the active zone
    // We use a Map to store the state of each slug
    const headingStates = new Map<string, HeadingState>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            headingStates.set(id, "INSIDE");
          } else {
            // The active zone starts at 80px from the top (due to rootMargin)
            // If the element is above this zone, it's "ABOVE" (passed)
            if (entry.boundingClientRect.top <= 80) {
              headingStates.set(id, "ABOVE");
            } else {
              headingStates.set(id, "BELOW");
            }
          }
        });

        // Determine the active heading based on priority:
        // 1. First "INSIDE" heading (visible)
        // 2. Last "ABOVE" heading (passed sections)
        // 3. Null (if everything is BELOW)
        let newActiveSlug: string | null = null;

        // Iterate in document order
        for (const slug of headingSlugs) {
          const state = headingStates.get(slug);

          if (state === "ABOVE") {
            newActiveSlug = slug;
          } else if (state === "INSIDE") {
            // Found a visible one. This takes precedence.
            // Since we iterate in order, this is the top-most visible one.
            newActiveSlug = slug;
            break; // Stop looking
          }
        }

        setActiveSlug(newActiveSlug);
      },
      {
        // Active zone: Top 80px excluded (header), Bottom 70% excluded
        // This focuses on the top ~30% of the screen
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headingSlugs.forEach((slug) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headingSlugs]);

  return activeSlug;
}
