import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function PageTitle({ children, className }: Props) {
  return (
    <h1 className={clsx("text-3xl sm:text-7xl font-bold", className)}>
      {children}
    </h1>
  );
}
