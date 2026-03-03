"use client";

import { useState } from "react";
import { IconCheck, IconLink } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { Tooltip } from "./tooltip";

type HeadingPermalinkProps = {
  slug: string;
};

export const HeadingPermalink = ({ slug }: HeadingPermalinkProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Tooltip asChild content={copied ? "Copied!" : "Copy permalink"} position="top">
      <button
        aria-label={copied ? "Copied permalink to clipboard" : "Copy permalink to clipboard"}
        className={cn(
          "ml-1 inline-flex items-center justify-center rounded-sm",
          "focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none",
          "transition-opacity duration-200",
          "sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 focus:opacity-100",
          {
            "text-green-500 !opacity-100": copied,
          },
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void onCopy();
        }}
        type="button"
      >
        {copied ? (
          <IconCheck aria-hidden="true" size={16} stroke={3} />
        ) : (
          <IconLink aria-hidden="true" size={16} stroke={1.5} />
        )}
      </button>
    </Tooltip>
  );
};
