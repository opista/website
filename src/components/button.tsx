import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes } from "react";

type ButtonProps = {
  center?: boolean;
  href: string;
};

export const Button = ({
  center,
  children,
  className,
  href,
}: HTMLAttributes<HTMLButtonElement> & ButtonProps) => (
  <div
    className={clsx({
      "text-center": center,
    })}
  >
    <Link
      className={clsx(
        "inline-block text-white no-underline bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        className
      )}
      href={href}
      target="_blank"
    >
      {children}
    </Link>
  </div>
);
