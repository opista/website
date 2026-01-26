"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { cn } from "@/util/cn";

import { CheckCircleIcon } from "./icons/check-circle-icon";
import { CopyIcon } from "./icons/copy-icon";

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
      <pre
        ref={ref}
        className={cn("overflow-x-auto", className)}
        {...props}
      >
        {children}
      </pre>
      <button
        aria-label="Copy code"
        className={cn(
          "absolute top-2 right-2 p-2 bg-zinc-950 border transition-all duration-200",
          "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100",
          {
            "text-green-500 border-green-500": copied,
          }
        )}
        onClick={() => {
          void onCopy();
        }}
        type="button"
      >
        {copied ? <CheckCircleIcon /> : <CopyIcon />}
      </button>
    </div>
  );
};
