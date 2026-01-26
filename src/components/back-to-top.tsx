"use client";

import { IconArrowUpBar } from "@tabler/icons-react";
import { HTMLProps, useCallback } from "react";

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
        className={cn("group fixed bottom-4 right-4 z-10 p-3", className)}
        noPadding
        onClick={onClick}
      >
        <IconArrowUpBar
          aria-label="Icon, arrow pointing up"
          className="size-4"
          stroke={3}
        />
      </Button>
    )
  );
};
