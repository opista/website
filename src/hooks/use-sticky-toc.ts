"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "lodash-es";

import { FIXED_TOC_WIDTH } from "@/components/table-of-contents";

const CONTENT_MAX_WIDTH = 660; // max-w-prose = 65ch ≈ 656px (measured)
const RIGHT_MARGIN = 24; // Space from viewport edge

type UseStickyTocOptions = {
  enabled?: boolean;
};

type UseStickyTocResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isSticky: boolean;
  hasEnoughSpace: boolean;
};

export function useStickyToc({
  enabled = true,
}: UseStickyTocOptions = {}): UseStickyTocResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOutOfView, setIsOutOfView] = useState(false);
  const [hasEnoughSpace, setHasEnoughSpace] = useState(false);

  // Calculate if there's enough horizontal space for sticky TOC
  const calculateSpace = useCallback(() => {
    if (typeof window === "undefined") return false;

    // Available space = (viewport width - content width) / 2 - margin
    const availableSpace =
      (window.innerWidth - CONTENT_MAX_WIDTH) / 2 - (RIGHT_MARGIN * 2);
    return availableSpace >= FIXED_TOC_WIDTH;
  }, []);

  // Handle resize events to recalculate space
  useEffect(() => {
    if (!enabled) return;

    const handleResize = throttle(() => {
      setHasEnoughSpace(calculateSpace());
    }, 200);

    // Initial calculation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasEnoughSpace(calculateSpace());

    window.addEventListener("resize", handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled, calculateSpace]);

  // Set up IntersectionObserver to detect when TOC scrolls out of view
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When TOC scrolls fully out of view (above viewport), enable sticky
        // We check if it's not intersecting AND the top is above the viewport
        setIsOutOfView(
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        );
      },
      {
        rootMargin: "-80px 0px 0px 0px", // Account for potential header
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [enabled]);

  return {
    containerRef,
    hasEnoughSpace,
    isSticky: enabled && isOutOfView && hasEnoughSpace,
  };
}
