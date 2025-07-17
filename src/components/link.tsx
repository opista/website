import { HTMLProps } from "react";

const isUrlAbsolute = /^(?:[a-z+]+:)?\/\//i;

export default function Link({
  children,
  href,
  target,
  ...rest
}: HTMLProps<HTMLAnchorElement>) {
  const isAbsolute = isUrlAbsolute.test(href);
  const targetAttr = isAbsolute ? "_blank" : target;
  const rel = isAbsolute ? "noopener" : undefined;

  return (
    <a
      className="text-indigo-600 underline transition dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 decoration-wavy decoration-indigo-200 dark:decoration-indigo-600"
      href={href}
      rel={rel}
      target={targetAttr}
      {...rest}
    >
      {children}
    </a>
  );
}
