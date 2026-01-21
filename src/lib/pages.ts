import { cache } from "react";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join, sep } from "path";

import { getBulkTimestamps } from "./bulk-git-timestamps";
import { pageCreatedAt } from "./page-created-at";
import { pageModifiedAt } from "./page-modified-at";

export type Directory = "apps" | "posts";

export type PageContent = {
  content: string;
  createdAt: Date;
  description: string;
  link?: string;
  modifiedAt: Date;
  price?: string;
  slug: string;
  title: string;
  url: string;
};

const contentDirectory = join(process.cwd(), "_content");

const getPageContent = async (
  directory: Directory,
  slug: string,
  timestamps?: { createdAt: Date; modifiedAt: Date }
): Promise<PageContent | null> => {
  try {
    const intendedDir = join(contentDirectory, directory);
    const fullPath = join(intendedDir, `${slug}.mdx`);

    if (!fullPath.startsWith(`${intendedDir}${sep}`)) {
      return null;
    }

    const fileContents = readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);
    const now = new Date();

    const createdAt = timestamps?.createdAt ?? await pageCreatedAt(fullPath) ?? now;
    const modifiedAt = timestamps?.modifiedAt ?? await pageModifiedAt(fullPath) ?? now;

    return {
      content,
      createdAt,
      modifiedAt,
      slug,
      url: `/${directory}/${slug}`,
      ...data,
    } as PageContent;
  } catch {
    return null;
  }
};

const getPageContentBySlugImpl = (
  directory: Directory,
  slug: string
): Promise<PageContent | null> => getPageContent(directory, slug);

export const getPageContentBySlug = cache(getPageContentBySlugImpl);

export const getAllPageSlugs = (directory: Directory) => {
  const fullPath = join(contentDirectory, directory);
  return readdirSync(fullPath).map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
};

export const getAllPagesAndContent = async (directory: Directory) => {
  const slugs = getAllPageSlugs(directory);
  const timestamps = await getBulkTimestamps(join(contentDirectory, directory));

  const pages = await Promise.all(slugs
    .map(({ slug }) => {
      const fullPath = join(contentDirectory, directory, `${slug}.mdx`);
      return getPageContent(directory, slug, timestamps.get(fullPath));
    }));

  return pages
    .filter((page): page is PageContent => !!page)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
