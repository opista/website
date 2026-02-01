"use client";

import { HTMLProps, useCallback } from "react";
import { IconArrowUp } from "@tabler/icons-react";

import { useScrollSelector } from "@/hooks/use-scroll-selector";
import { cn } from "@/util/cn";

import { Button } from "./button";

type BackToTopProps = {
  offset?: number;
};

export const BackToTop = ({
  className,
  offset = 300,
}: HTMLProps<HTMLDivElement> & BackToTopProps) => {
  const showButton = useScrollSelector(
    useCallback((y: number) => y > offset, [offset])
  );

  const onClick = useCallback(() => {
    const focusableElement = document.querySelector<HTMLAnchorElement>('.logo');
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      left: 0,
      top: 0,
    });

    focusableElement?.focus({
      preventScroll: true,
    });
  }, []);

  return (
    <Button
      aria-hidden={!showButton}
      aria-label="Back to top"
      className={cn(
        "group fixed bottom-4 right-4 z-10 p-3 transition-all duration-300",
        {
          "opacity-0 translate-y-4 pointer-events-none": !showButton,
          "opacity-100 translate-y-0": showButton,
        },
        className
      )}
      noPadding
      onClick={onClick}
      tabIndex={showButton ? 0 : -1}
    >
      <IconArrowUp
        aria-hidden="true"
        className="size-4"
        stroke={3}
      />
    </Button>
  );
};
