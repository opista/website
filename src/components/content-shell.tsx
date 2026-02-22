import { ReactNode } from "react";

import { Footer } from "./footer";
import { Header } from "./header";

export type ContentShellProps = {
  children?: ReactNode;
};

export const ContentShell = ({ children }: ContentShellProps) => (
  <>
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-md"
      href="#main-content"
    >
      Skip to content
    </a>
    <div className="w-full min-h-full flex flex-col px-4">
      <Header />
      <main
        className="py-4 sm:py-8 max-w-prose w-full mx-auto main grow focus:outline-none"
        id="main-content"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  </>
);
