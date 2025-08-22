import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

import { pageCreatedAt } from "./page-created-at";
import { pageModifiedAt } from "./page-modified-at";

export type Directory = "apps" | "posts";

export type PageContent = {
  content: string;
  createdAt: Date;
  description: string;
  modifiedAt: Date;
  slug: string;
  title: string;
  url: string;
};

const contentDirectory = join(process.cwd(), "_content");

export const getPageContentBySlug = (
  directory: Directory,
  slug: string
): PageContent | null => {
  try {
    const fullPath = join(contentDirectory, directory, `${slug}.mdx`);
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
    .filter((page): page is PageContent => !!page);
};
