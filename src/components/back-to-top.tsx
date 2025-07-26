"use client";

import clsx from "clsx";
import { HTMLProps, useCallback } from "react";
import { ArrowUp } from "./icons/arrow-up";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Button } from "./button";

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
        className={clsx(
          "group select-none fixed bottom-4 right-4 z-10 px-0 py-0 w-10 h-10 flex items-center justify-center",
          className
        )}
        onClick={onClick}
      >
        <ArrowUp />
        <span className="sr-only">Back to top</span>
      </Button>
    )
  );
};
