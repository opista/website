import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { OrganizationJsonLd } from "@/components/json-ld";
import { BASE_SITE_URL } from "@/constant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Building apps to enrich your life",
  metadataBase: new URL(BASE_SITE_URL),
  openGraph: {
    siteName: "OPISTA",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "OPISTA logo",
      },
    ],
  },
  twitter: {
    card: "summary",
  },
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
        <OrganizationJsonLd />
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-md"
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

