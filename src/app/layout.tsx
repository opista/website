import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OPISTA",
  description: "Building apps to enrich your life",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full scroll-smooth" lang="en">
      <body
        className={clsx("bg-zinc-950 text-white h-full px-4", inter.className)}
      >
        <a
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-white text-black font-bold rounded-md transition-transform -translate-y-[150%] focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <div className="w-full min-h-full flex flex-col">{children}</div>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
    </html>
  );
}
