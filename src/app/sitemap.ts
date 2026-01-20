import { statSync } from "fs";
import type { MetadataRoute } from "next";
import { join } from "path";

import { BASE_SITE_URL } from "@/constant";
import { Directory, getAllPagesAndContent } from "@/lib/pages";

type MetaConfig = MetadataRoute.Sitemap[number];

const getFileLastUpdated = (directory: string = "") => {
  const filePath = join(process.cwd(), "src", "app", directory, "page.tsx");
  const fileStats = statSync(filePath);

  return fileStats.mtime;
};

const getAllPagesInGroup = (
  directory: Directory,
  { changeFrequency, priority }: Partial<MetaConfig>
) => {
  const pages = getAllPagesAndContent(directory);

  return pages.map((page) => ({
    changeFrequency,
    lastModified: page.modifiedAt,
    priority,
    url: `${BASE_SITE_URL}${page.url}`,
  }));
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "yearly",
      lastModified: getFileLastUpdated(),
      priority: 1,
      url: BASE_SITE_URL,
    },
    {
      changeFrequency: "monthly",
      lastModified: getFileLastUpdated("apps"),
      priority: 0.8,
      url: `${BASE_SITE_URL}/apps`,
    },
    ...getAllPagesInGroup("apps", {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    {
      changeFrequency: "monthly",
      lastModified: getFileLastUpdated("posts"),
      priority: 0.8,
      url: `${BASE_SITE_URL}/posts`,
    },
    ...getAllPagesInGroup("posts", { changeFrequency: "daily", priority: 1 }),
  ];
}
