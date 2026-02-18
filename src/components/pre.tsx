"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { IconCopy, IconCopyCheckFilled } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { Tooltip } from "./tooltip";

export const Pre = ({ children, className, ...props }: HTMLAttributes<HTMLPreElement>) => {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const onCopy = async () => {
    if (ref.current) {
      try {
        await navigator.clipboard.writeText(ref.current.innerText);
        setCopied(true);
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    }
  };

  return (
    <div className="relative group">
      <pre ref={ref} className={cn("overflow-x-auto border rounded-none", className)} {...props}>
        {children}
      </pre>
      <Tooltip
        className={cn(
          "absolute bottom-[10px] sm:bottom-auto sm:top-[10px] right-[10px]",
          "sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity",
        )}
        content={copied ? "Copied!" : "Copy code"}
        position="left"
      >
        <button
          aria-label={copied ? "Copied successfully" : "Copy code"}
          className={cn(
            "text-pink-400 hover:text-pink-500 flex justify-center items-center border border-2 border-current bg-black size-10 p-1",
            "cursor-pointer focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-sm",
            {
              "text-green-500 hover:text-green-500 border-green-500": copied,
            },
          )}
          onClick={() => {
            void onCopy();
          }}
          type="button"
        >
          {copied ? (
            <IconCopyCheckFilled aria-hidden="true" className="size-5" />
          ) : (
            <IconCopy aria-hidden="true" className="size-5" stroke={1.5} />
          )}
        </button>
      </Tooltip>
    </div>
  );
};
