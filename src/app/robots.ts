import { MetadataRoute } from "next";

import { BASE_SITE_URL } from "@/constant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: "/private/",
      userAgent: "*",
    },
    sitemap: `${BASE_SITE_URL}/sitemap.xml`,
  };
}
