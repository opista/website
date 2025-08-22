import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackToTop } from "@/components/back-to-top";
import { Heading } from "@/components/heading";
import { PageLayout } from "@/components/page-layout";
import { PostBody } from "@/components/post-body";
import { getAllPageSlugs, getPageContentBySlug } from "@/lib/pages";

type AppPageParams = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllPageSlugs("posts");
}

export async function generateMetadata({
  params,
}: {
  params: AppPageParams;
}): Promise<Metadata> {
  const page = getPageContentBySlug("posts", params.slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} - OPISTA`,
    description: page.description,
  };
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
  }).format(page.modifiedAt);

  return (
    <PageLayout className="prose prose-invert" tag="article">
      <Heading className="mb-0" level="h1">
        {page.title}
      </Heading>
      <p className="text-xs mt-0 mb-8">Last updated: {date}</p>
      <PostBody page={page} />
      <BackToTop />
    </PageLayout>
  );
}
