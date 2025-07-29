import { readFileSync, readdirSync, statSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export type Directory = "apps" | "posts";

export type PageContent = {
  content: string;
  description: string;
  lastUpdated: Date;
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
    const fileStats = statSync(fullPath);
    const { content, data } = matter(fileContents);

    return {
      content,
      lastUpdated: fileStats.mtime,
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
