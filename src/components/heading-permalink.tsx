"use client";

import { useEffect, useState } from "react";
import { IconCheck, IconLink } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { Tooltip } from "./tooltip";

type HeadingPermalinkProps = {
  slug: string;
  title: string;
};

export const HeadingPermalink = ({ slug, title }: HeadingPermalinkProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const onCopy = async () => {
    // Fallback if window is not defined (SSR safety, though this is a client component)
    if (typeof window === "undefined") return;

    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Tooltip asChild content={copied ? "Copied!" : "Copy link"} position="top">
      <button
        aria-label={`Copy link to ${title}`}
        className={cn(
          "ml-1 inline-flex items-center justify-center rounded-sm transition-opacity duration-200",
          "text-inherit hover:text-pink-500",
          "focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none",
          // Visible on mobile, hidden on desktop unless group hovered or focused
          "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100",
        )}
        onClick={onCopy}
        type="button"
      >
        {copied ? (
          <IconCheck aria-hidden="true" className="size-4 text-green-500" stroke={2} />
        ) : (
          <IconLink aria-hidden="true" className="size-4" stroke={1.5} />
        )}
      </button>
    </Tooltip>
  );
};
