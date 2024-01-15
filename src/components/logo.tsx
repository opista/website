import clsx from "clsx";
import ConditionalWrapper from "./conditional-wrapper";

type Props = {
  isLink?: boolean;
};

export default function Logo({
  className,
  isLink = false,
}: Props & React.HTMLAttributes<HTMLSpanElement>) {
  return (
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
}
