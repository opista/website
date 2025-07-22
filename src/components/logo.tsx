import clsx from "clsx";
import { ConditionalWrapper } from "./conditional-wrapper";
import { HTMLAttributes } from "react";

type LogoProps = {
  isLink?: boolean;
};

export const Logo = ({
  className,
  isLink = false,
}: LogoProps & HTMLAttributes<HTMLSpanElement>) => (
  <ConditionalWrapper
    condition={isLink}
    wrapper={(children) => <a href="/">{children}</a>}
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
