import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

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
      <body className={clsx("bg-zinc-950 text-white h-full", inter.className)}>
        <div className="w-full h-full max-w-3xl mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}
