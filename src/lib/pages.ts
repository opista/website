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
  cta?: string;
  description: string;
  link?: string;
  modifiedAt: Date;
  price?: string;
  slug: string;
  title: string;
  url: string;
};

const contentDirectory = join(process.cwd(), "_content");

const getPageContent = (
  directory: Directory,
  slug: string,
  timestamps?: { createdAt: Date; modifiedAt: Date }
): PageContent | null => {
  try {
    const intendedDir = join(contentDirectory, directory);
    const fullPath = join(intendedDir, `${slug}.mdx`);

    if (!fullPath.startsWith(`${intendedDir}${sep}`)) {
      return null;
    }

    const fileContents = readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);
    const now = new Date();

    return {
      content,
      createdAt: timestamps?.createdAt ?? pageCreatedAt(fullPath) ?? now,
      modifiedAt: timestamps?.modifiedAt ?? pageModifiedAt(fullPath) ?? now,
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
): PageContent | null => getPageContent(directory, slug);

export const getPageContentBySlug = cache(getPageContentBySlugImpl);

export const getAllPageSlugs = (directory: Directory) => {
  const fullPath = join(contentDirectory, directory);
  return readdirSync(fullPath).map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
};

export const getAllPagesAndContent = (directory: Directory) => {
  const slugs = getAllPageSlugs(directory);
  const timestamps = getBulkTimestamps(join(contentDirectory, directory));

  return slugs
    .map(({ slug }) => {
      const fullPath = join(contentDirectory, directory, `${slug}.mdx`);
      return getPageContent(directory, slug, timestamps.get(fullPath));
    })
    .filter((page): page is PageContent => !!page)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
