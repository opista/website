import { ReactNode } from "react";
import clsx from "clsx";

import { Header } from "@/components/header";

import { Footer } from "./footer";

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

    <Wrapper
      className={clsx("py-4 sm:py-8 pb-20 max-w-prose mx-auto main", className)}
    >
      {children}
    </Wrapper>

    <Footer />
  </>
);
