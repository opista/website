import clsx from "clsx";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href: string;
};

export default function LinkButton({ children, className, href }: Props) {
  return (
    <Link
      className={clsx(
        "text-white no-underline bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        className
      )}
      href={href}
      target="_blank"
    >
      {children}
    </Link>
  );
}
