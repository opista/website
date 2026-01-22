import { stat } from "fs/promises";
import type { MetadataRoute } from "next";
import { join } from "path";

import { BASE_SITE_URL } from "@/constant";
import { Directory, getAllPages } from "@/lib/pages";

type MetaConfig = MetadataRoute.Sitemap[number];

const getFileLastUpdated = async (directory: string = "") => {
  const filePath = join(process.cwd(), "src", "app", directory, "page.tsx");
  const fileStats = await stat(filePath);

  return fileStats.mtime;
};

const getAllPagesInGroup = (
  directory: Directory,
  { changeFrequency, priority }: Partial<MetaConfig>
) => {
  const pages = getAllPages(directory);

  return pages.map((page) => ({
    changeFrequency,
    lastModified: page.modifiedAt,
    priority,
    url: `${BASE_SITE_URL}${page.url}`,
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [homeLastModified, appsLastModified, postsLastModified] =
    await Promise.all([
      getFileLastUpdated(),
      getFileLastUpdated("(content)/apps"),
      getFileLastUpdated("(content)/posts"),
    ]);

  return [
    {
      changeFrequency: "yearly",
      lastModified: homeLastModified,
      priority: 1,
      url: BASE_SITE_URL,
    },
    {
      changeFrequency: "monthly",
      lastModified: appsLastModified,
      priority: 0.8,
      url: `${BASE_SITE_URL}/apps`,
    },
    ...getAllPagesInGroup("apps", {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    {
      changeFrequency: "monthly",
      lastModified: postsLastModified,
      priority: 0.8,
      url: `${BASE_SITE_URL}/posts`,
    },
    ...getAllPagesInGroup("posts", { changeFrequency: "daily", priority: 1 }),
  ];
}
