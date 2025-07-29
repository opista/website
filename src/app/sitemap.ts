import { Directory, getAllPagesAndContent } from "@/lib/pages";
import { statSync } from "fs";
import type { MetadataRoute } from "next";
import { join } from "path";

const BASE_URL = "https://opista.com";

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
    url: `${BASE_URL}${page.url}`,
    lastModified: page.lastUpdated,
    changeFrequency,
    priority,
  }));
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: getFileLastUpdated(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/apps`,
      lastModified: getFileLastUpdated("apps"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getAllPagesInGroup("apps", {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...getAllPagesInGroup("posts", { changeFrequency: "daily", priority: 1 }),
  ];
}
