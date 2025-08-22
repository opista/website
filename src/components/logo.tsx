import { HTMLAttributes } from "react";
import clsx from "clsx";
import Link from "next/link";

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
    wrapper={(children) => <Link href="/">{children}</Link>}
  >
    <span
      className={clsx(
        "font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600",
        className
      )}
    >
      OPISTA
    </span>
  </ConditionalWrapper>
);
