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
  alternates: {
    types: {
      "application/rss+xml": `${BASE_SITE_URL}/feed.xml`,
    },
  },
  description: "Making things for fun (and sometimes profit)",
  metadataBase: new URL(BASE_SITE_URL),
  openGraph: {
    images: [
      {
        alt: "OPISTA logo",
        height: 512,
        url: "/logo.png",
        width: 512,
      },
    ],
    locale: "en_GB",
    siteName: "OPISTA",
    type: "website",
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
        className={clsx("bg-zinc-950 text-white h-full", inter.className)}
      >
        <OrganizationJsonLd />
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
    </html>
  );
}

