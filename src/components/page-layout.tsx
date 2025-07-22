import { Header } from "@/components/header";
import clsx from "clsx";
import { ReactNode } from "react";

type PageLayoutProps = {
  children?: ReactNode;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
};

export const PageLayout = ({
  children,
  className,
  tag: Wrapper = "div",
}: PageLayoutProps) => (
  <>
    <Header />

    <Wrapper className={clsx("py-4 sm:py-8", className)}>{children}</Wrapper>
  </>
);
