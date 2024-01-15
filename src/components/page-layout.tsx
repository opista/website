import Header from "@/components/header";
import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
};

export default function PageLayout({
  children,
  className,
  tag: Wrapper = "div",
}: Props) {
  return (
    <>
      <Header />

      <Wrapper className={clsx("py-4 sm:py-8", className)}>{children}</Wrapper>
    </>
  );
}
