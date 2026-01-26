import { cache } from "react";
import { open, readdir, readFile } from "fs/promises";
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

export type Page = Omit<PageContent, "content">;

const contentDirectory = join(process.cwd(), "_content");

const readFrontMatter = async (fullPath: string) => {
  try {
    const fd = await open(fullPath, "r");
    const bufferSize = 4096;
    const buffer = Buffer.alloc(bufferSize);

    try {
      const { bytesRead } = await fd.read(buffer, 0, bufferSize, 0);
      const content = buffer.toString("utf8", 0, bytesRead);

      // If file is smaller than buffer, we have the full content
      if (bytesRead < bufferSize) {
        const { data } = matter(content);
        return data;
      }

      // Check for closing delimiter
      // We look for a line starting with ---
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (match) {
        const { data } = matter(match[0]);
        return data;
      }
    } finally {
      await fd.close();
    }
  } catch {
    // Fallthrough to full read on any error
  }

  const fileContents = await readFile(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data;
};

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

    const fileContents = await readFile(fullPath, "utf8");
    const { content, data } = matter(fileContents);
    const now = new Date();

    const [createdAt, modifiedAt] = await Promise.all([
      timestamps?.createdAt ?? pageCreatedAt(fullPath),
      timestamps?.modifiedAt ?? pageModifiedAt(fullPath),
    ]);

    return {
      content,
      createdAt: createdAt ?? now,
      modifiedAt: modifiedAt ?? now,
      slug,
      url: `/${directory}/${slug}`,
      ...data,
    } as PageContent;
  } catch {
    return null;
  }
};

const getPage = async (
  directory: Directory,
  slug: string,
  timestamps?: { createdAt: Date; modifiedAt: Date }
): Promise<Page | null> => {
  try {
    const intendedDir = join(contentDirectory, directory);
    const fullPath = join(intendedDir, `${slug}.mdx`);

    if (!fullPath.startsWith(`${intendedDir}${sep}`)) {
      return null;
    }

    const data = await readFrontMatter(fullPath);
    const now = new Date();

    const [createdAt, modifiedAt] = await Promise.all([
      timestamps?.createdAt ?? pageCreatedAt(fullPath),
      timestamps?.modifiedAt ?? pageModifiedAt(fullPath),
    ]);

    return {
      createdAt: createdAt ?? now,
      modifiedAt: modifiedAt ?? now,
      slug,
      url: `/${directory}/${slug}`,
      ...data,
    } as Page;
  } catch {
    return null;
  }
};

const getPageContentBySlugImpl = async (
  directory: Directory,
  slug: string
): Promise<PageContent | null> => getPageContent(directory, slug);

export const getPageContentBySlug = cache(getPageContentBySlugImpl);

export const getAllPageSlugs = async (directory: Directory) => {
  const fullPath = join(contentDirectory, directory);
  const files = await readdir(fullPath);
  return files.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
};

export const getAllPagesImpl = async (directory: Directory) => {
  const slugs = await getAllPageSlugs(directory);
  const timestamps = await getBulkTimestamps(join(contentDirectory, directory));

  const pagePromises = slugs.map(async ({ slug }) => {
    const fullPath = join(contentDirectory, directory, `${slug}.mdx`);
    return getPage(directory, slug, timestamps.get(fullPath));
  });

  const pages = await Promise.all(pagePromises);

  return pages
    .filter((page): page is Page => !!page)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getAllPages = cache(getAllPagesImpl);
