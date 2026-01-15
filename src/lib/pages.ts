import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join, relative, isAbsolute } from "path";
import { cache } from "react";

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

const getPageContentBySlugImpl = (
  directory: Directory,
  slug: string
): PageContent | null => {
  try {
    const expectedDir = join(contentDirectory, directory);
    const fullPath = join(expectedDir, `${slug}.mdx`);

    // Ensure path is within the expected directory
    const rel = relative(expectedDir, fullPath);
    if (rel.startsWith("..") || isAbsolute(rel)) {
      return null;
    }

    const fileContents = readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    return {
      content,
      createdAt: pageCreatedAt(fullPath),
      modifiedAt: pageModifiedAt(fullPath),
      slug,
      url: `/${directory}/${slug}`,
      ...data,
    } as PageContent;
  } catch (err) {
    return null;
  }
};

export const getPageContentBySlug = cache(getPageContentBySlugImpl);

export const getAllPageSlugs = (directory: Directory) => {
  const fullPath = join(contentDirectory, directory);
  return readdirSync(fullPath).map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
};

export const getAllPagesAndContent = (directory: Directory) => {
  const slugs = getAllPageSlugs(directory);
  return slugs
    .map(({ slug }) => getPageContentBySlug(directory, slug))
    .filter((page): page is PageContent => !!page)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
