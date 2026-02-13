"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { IconHandMove } from "@tabler/icons-react";

import { cn } from "@/util/cn";

type ScrollHintProps = {
  ariaLabel?: string;
  children: ReactNode;
  containerClassName?: string;
  className?: string;
  iconClassName?: string;
};

export const ScrollHint = ({
  ariaLabel = "Scrollable content",
  children,
  className,
  containerClassName,
  iconClassName,
}: ScrollHintProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const hasTriggeredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return false;
      const scrollable = el.scrollWidth > el.clientWidth;
      setIsScrollable(scrollable);
      return scrollable;
    };

    const triggerHint = () => {
      if (hasTriggeredRef.current) return;

      const scrollable = checkScroll();
      if (scrollable) {
        hasTriggeredRef.current = true;
        setShowScrollHint(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setShowScrollHint(false);
        }, 6000);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        triggerHint();
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
      if (isVisibleRef.current && !hasTriggeredRef.current) {
        triggerHint();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
      resizeObserver.observe(containerRef.current);
    }

    // Initial check
    checkScroll();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleFocus = () => {
    if (isScrollable) {
      setShowScrollHint(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowScrollHint(false);
      }, 6000);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div
        aria-label={isScrollable ? ariaLabel : undefined}
        className={cn(
          "overflow-auto focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-sm",
          className,
        )}
        onFocus={handleFocus}
        ref={containerRef}
        role={isScrollable ? "region" : undefined}
        tabIndex={isScrollable ? 0 : undefined}
      >
        {children}
      </div>
      {showScrollHint && (
        <div className="absolute top-px right-0 z-10 p-4 pointer-events-none transition-opacity duration-500 bg-zinc-950">
          <IconHandMove
            size={23}
            stroke={1.5}
            className={cn("text-white drop-shadow-md origin-bottom", iconClassName)}
            style={{ animation: "hand-scroll 2s ease-in-out infinite" }}
          />
        </div>
      )}
    </div>
  );
};
