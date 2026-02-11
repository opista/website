"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { IconHandMove } from "@tabler/icons-react";

import { cn } from "@/util/cn";

type ScrollHintProps = {
  children: ReactNode;
  containerClassName?: string;
  className?: string;
  iconClassName?: string;
};

export const ScrollHint = ({
  children,
  className,
  containerClassName,
  iconClassName,
}: ScrollHintProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const hasTriggeredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      return el.scrollWidth > el.clientWidth;
    };

    const triggerHint = () => {
      if (hasTriggeredRef.current) return;

      const isScrollable = checkScroll();
      if (isScrollable) {
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

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div ref={containerRef} className={cn("overflow-auto", className)}>
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
