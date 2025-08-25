"use client";

import { useMemo, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";

import { useScrollPosition } from "@/hooks/use-scroll-position";
import { PageContent } from "@/lib/pages";
import { Button } from "../button";

type AppDetailsBarProps = {
  className?: string;
  page: PageContent;
};

const Price = ({ price }: { price?: string }) => {
  if (!price) return null;

  const isFree = price?.toLowerCase() === "free";

  return (
    <span
      className={clsx("font-bold uppercase", {
        "text-green-300": isFree,
      })}
    >
      {price}
    </span>
  );
};

export const AppDetailsBar = ({ className, page }: AppDetailsBarProps) => {
  const scrollPosition = useScrollPosition();
  const ref = useRef<HTMLDivElement>(null);
  const { cta, link, price, title } = page;

  const showSticky = useMemo(() => {
    if (!ref.current) return false;
    const { top } = ref.current.getBoundingClientRect();
    return top <= 16;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, scrollPosition]);

  return (
    <div
      className={clsx(
        "sticky top-4 z-20 flex justify-between items-center p-2 bg-gray-800 rounded-lg",
        className
      )}
      ref={ref}
    >
      <span className="flex items-center gap-4">
        {showSticky && (
          <>
            <div className="relative rounded-[25%] overflow-hidden w-[40px] h-[40px] shrink-0">
              <Image
                alt={`${page.title} logo`}
                className="my-0"
                fill
                sizes="(max-width: 640px) 40px, 70px"
                src={`/apps/${page.slug}/logo.png`}
              />
            </div>
            <span className="hidden sm:block font-bold">{title}</span>
          </>
        )}
      </span>
      <span className="flex items-center gap-4">
        <Price price={price} />
        {link && <Button href={link}>{cta}</Button>}
      </span>
    </div>
  );
};
