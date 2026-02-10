import { HTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/util/cn";

import { ConditionalWrapper } from "./conditional-wrapper";

type LogoProps = {
  isLink?: boolean;
};

export const Logo = ({
  className,
  isLink = false,
}: LogoProps & HTMLAttributes<HTMLSpanElement>) => (
  <ConditionalWrapper
    condition={isLink}
    wrapper={(children) => (
      <Link className="logo" href="/">
        {children}
      </Link>
    )}
  >
    <span
      className={cn(
        "font-black tracking-wide bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600",
        className,
      )}
    >
      OPISTA
    </span>
  </ConditionalWrapper>
);
