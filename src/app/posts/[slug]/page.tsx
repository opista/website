import { PageLayout } from "@/components/page-layout";
import { getAllPageSlugs, getPageContentBySlug } from "@/lib/pages";
import { PostBody } from "@/components/post-body";
import { Heading } from "@/components/heading";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/back-to-top";

type AppPageParams = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllPageSlugs("posts");
}

export default async function PostPage({ params }: { params: AppPageParams }) {
  const page = getPageContentBySlug("posts", params.slug);

  if (!page) {
    return notFound();
  }

  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "long",
    timeZone: "UTC",
  }).format(page.lastUpdated);

  return (
    <PageLayout className="prose dark:prose-invert" tag="article">
      <div className="flex flex-col sm:flex-row items-center">
        <Heading className="mb-0" level="h1">
          {page.title}
        </Heading>
      </div>
      <p className="text-xs mt-0 mb-8">Last updated: {date}</p>
      <PostBody page={page} />
      <BackToTop />
    </PageLayout>
  );
}
