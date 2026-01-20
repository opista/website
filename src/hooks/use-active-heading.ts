"use client";

import { useEffect, useRef, useState } from "react";

// Cache for heading elements to avoid repeated DOM lookups
type HeadingElementCache = Map<string, HTMLElement>;

const findActiveHeading = (
  headingSlugs: string[],
  cache: HeadingElementCache
) => {
  const viewportTop = 80; // Account for header offset

  // Find the heading that's closest to (but past) the top of viewport
  let activeHeading: string | null = null;

  for (const slug of headingSlugs) {
    const el = cache.get(slug);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    // If this heading is at or above the detection line, it's a candidate
    if (rect.top <= viewportTop + 50) {
      activeHeading = slug;
    } else {
      // Once we find one below the detection line, stop
      // (headings are in document order)
      break;
    }
  }

  return activeHeading;
};

/**
 * Hook to track which heading is currently visible/active as user scrolls.
 * Uses IntersectionObserver to detect when headings enter the viewport.
 */
export function useActiveHeading(headingSlugs: string[]): string | null {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const elementCache = useRef<HeadingElementCache>(new Map());

  useEffect(() => {
    if (headingSlugs.length === 0) return;

    // Build element cache once
    const cache = new Map<string, HTMLElement>();
    for (const slug of headingSlugs) {
      const el = document.getElementById(slug);
      if (el) cache.set(slug, el);
    }
    elementCache.current = cache;

    const headingElements = Array.from(cache.values());
    if (headingElements.length === 0) return;

    // Initialize on mount
    const initialActive = findActiveHeading(headingSlugs, cache);
    if (initialActive) {
      requestAnimationFrame(() => {
        setActiveSlug(initialActive);
      });
    }

    // Track which headings are currently visible
    const visibleHeadings = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleHeadings.add(id);
          } else {
            visibleHeadings.delete(id);
          }
        });

        // Find all visible headings and pick the one closest to the top of viewport
        if (visibleHeadings.size > 0) {
          const visibleWithPosition: { slug: string; top: number }[] = [];

          const visibleArray = Array.from(visibleHeadings);
          for (const slug of visibleArray) {
            const el = cache.get(slug);
            if (el) {
              visibleWithPosition.push({
                slug,
                top: el.getBoundingClientRect().top,
              });
            }
          }

          if (visibleWithPosition.length > 0) {
            // Sort by top position (closest to top first)
            visibleWithPosition.sort((a, b) => a.top - b.top);
            setActiveSlug(visibleWithPosition[0].slug);
            return;
          }
        }

        // No headings in view - use scroll position to find the last passed heading
        const fallback = findActiveHeading(headingSlugs, cache);
        if (fallback) {
          setActiveSlug(fallback);
        }
      },
      {
        // Trigger when heading is near the top of the viewport
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headingSlugs]);

  return activeSlug;
}
