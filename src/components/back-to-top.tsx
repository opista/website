"use client";

import { HTMLProps, useCallback } from "react";
import clsx from "clsx";

import { useScrollPosition } from "@/hooks/use-scroll-position";

import { Button } from "./button";
import { ArrowUp } from "./icons/arrow-up";

type BackToTopProps = {
  offset?: number;
};

export const BackToTop = ({
  className,
  offset = 300,
}: HTMLProps<HTMLDivElement> & BackToTopProps) => {
  const scrollPosition = useScrollPosition();

  const onClick = useCallback(() => {
    const focusableElement = document.querySelector(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement | null;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    focusableElement?.focus({
      preventScroll: true,
    });
  }, []);

  const showButton = scrollPosition > offset;

  return (
    showButton && (
      <Button
        className={clsx("group fixed bottom-4 right-4 z-10 p-3", className)}
        noPadding
        onClick={onClick}
      >
        <ArrowUp />
        <span className="sr-only">Back to top</span>
      </Button>
    )
  );
};
