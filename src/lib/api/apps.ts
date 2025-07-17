import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export type AppPageContent = {
  content: string;
  logo: string;
  slug: string;
  title: string;
  url: string;
};

const appsDirectory = join(process.cwd(), "_content", "apps");

export const getAppPageContentBySlug = (slug: string): AppPageContent => {
  const fullPath = join(appsDirectory, `${slug}.mdx`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    content,
    logo: `/apps/${slug}/logo.png`,
    slug,
    url: `/apps/${slug}`,
    ...data,
  } as AppPageContent;
};

export const getAllAppPageSlugs = () =>
  readdirSync(appsDirectory).map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));

export const getAllAppPages = () => {
  const slugs = getAllAppPageSlugs();
  return slugs.map(({ slug }) => getAppPageContentBySlug(slug));
};
