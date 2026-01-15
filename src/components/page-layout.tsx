import { ReactNode, ElementType } from "react";
import clsx from "clsx";

import { Header } from "@/components/header";

import { Footer } from "./footer";

type PageLayoutProps = {
  children?: ReactNode;
  className?: string;
  tag?: ElementType;
};

export const PageLayout = ({
  children,
  className,
  tag: Wrapper = "div",
}: PageLayoutProps) => (
  <>
    <Header />

    <Wrapper
      className={clsx(
        "py-4 sm:py-8 max-w-prose w-full mx-auto main grow",
        className
      )}
      id="main-content"
    >
      {children}
    </Wrapper>

    <Footer />
  </>
);
