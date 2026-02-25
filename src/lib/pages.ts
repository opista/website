import { cache } from "react";
import { open, readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { join, sep } from "path";

import { calculateReadingTime } from "@/util/reading-time";

import { getBulkTimestamps } from "./bulk-git-timestamps";
import { pageCreatedAt } from "./page-created-at";
import { pageModifiedAt } from "./page-modified-at";

export type Directory = "posts" | "projects";

export type PageContent = {
  content: string;
  createdAt: Date;
  description: string;
  link?: string;
  modifiedAt: Date;
  popular?: boolean;
  price?: string;
  readingTime: number;
  slug: string;
  title: string;
  url: string;
};

export type Page = Omit<PageContent, "content">;

const contentDirectory = join(process.cwd(), "_content");

const readFrontMatter = async (fullPath: string) => {
  let fileHandle;
  try {
    fileHandle = await open(fullPath, "r");
    const bufferSize = 4096;
    const buffer = Buffer.alloc(bufferSize);

    try {
      const { bytesRead } = await fileHandle.read(buffer, 0, bufferSize, 0);
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
      await fileHandle.close();
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
  timestamps?: { createdAt: Date; modifiedAt: Date },
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

    return {
      content,
      createdAt: timestamps?.createdAt ?? pageCreatedAt(fullPath) ?? now,
      modifiedAt: timestamps?.modifiedAt ?? pageModifiedAt(fullPath) ?? now,
      readingTime: calculateReadingTime(content),
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
  timestamps?: { createdAt: Date; modifiedAt: Date },
): Promise<Page | null> => {
  try {
    const intendedDir = join(contentDirectory, directory);
    const fullPath = join(intendedDir, `${slug}.mdx`);

    if (!fullPath.startsWith(`${intendedDir}${sep}`)) {
      return null;
    }

    // Optimization: For projects, we can skip reading the full file
    // For posts, we need the content to calculate reading time
    let data;
    let readingTime = 0;

    if (directory === "posts") {
      const fileContents = await readFile(fullPath, "utf8");
      const { content, data: frontMatter } = matter(fileContents);
      data = frontMatter;
      readingTime = calculateReadingTime(content);
    } else {
      data = await readFrontMatter(fullPath);
    }

    const now = new Date();

    return {
      createdAt: timestamps?.createdAt ?? pageCreatedAt(fullPath) ?? now,
      modifiedAt: timestamps?.modifiedAt ?? pageModifiedAt(fullPath) ?? now,
      readingTime,
      slug,
      url: `/${directory}/${slug}`,
      ...data,
    } as Page;
  } catch {
    return null;
  }
};

const getPageContentBySlugImpl = (directory: Directory, slug: string) =>
  getPageContent(directory, slug);

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

  const pages = await Promise.all(
    slugs.map(async ({ slug }) => {
      const fullPath = join(contentDirectory, directory, `${slug}.mdx`);
      return getPage(directory, slug, timestamps.get(fullPath));
    }),
  );

  return pages
    .filter((page): page is Page => !!page)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getAllPages = cache(getAllPagesImpl);
