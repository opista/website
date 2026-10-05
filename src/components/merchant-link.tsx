"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Link } from "@/components/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type MerchantLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  merchant: string;
  product: string;
  section: string;
  placement: string;
};

export const MerchantLink = ({
  href,
  merchant,
  onClick,
  placement,
  product,
  section,
  ...props
}: MerchantLinkProps) => (
  <Link
    {...props}
    href={href}
    onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      window.gtag?.("event", "affiliate_click", {
        link_url: href,
        merchant,
        placement,
        product,
        section,
      });
    }}
  />
);
