"use client";

import { HTMLProps, useCallback } from "react";
import clsx from "clsx";

import { useScrollSelector } from "@/hooks/use-scroll-selector";

import { Button } from "./button";
import { ArrowUp } from "./icons/arrow-up";

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
    const focusableElement = document.querySelector(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement | null;

    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });

    focusableElement?.focus({
      preventScroll: true,
    });
  }, []);

  return (
    showButton && (
      <Button
        aria-label="Back to top"
        className={clsx("group fixed bottom-4 right-4 z-10 p-3", className)}
        noPadding
        onClick={onClick}
      >
        <ArrowUp strokeWidth={4} />
      </Button>
    )
  );
};
