import { toSlug } from "@/util/to-slug";
import clsx from "clsx";
import slugify from "slugify";

type PageTitleProps = {
  children: string;
  className?: string;
};

export const PageTitle = ({ children, className }: PageTitleProps) => {
  const slug = toSlug(children);
  return (
    <h1 className={clsx("text-3xl sm:text-7xl font-bold", className)} id={slug}>
      {children}
    </h1>
  );
};
