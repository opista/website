import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackToTop } from "@/components/back-to-top";
import { Heading } from "@/components/heading";
import { ArticleJsonLd } from "@/components/json-ld";
import { PageLayout } from "@/components/page-layout";
import { PostBody } from "@/components/post-body";
import { BASE_SITE_URL } from "@/constant";
import { getAllPageSlugs, getPageContentBySlug } from "@/lib/pages";

type PostPageParams = {
  slug: string;
};

export function generateStaticParams() {
  return getAllPageSlugs("posts");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PostPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageContentBySlug("posts", slug);

  if (!page) {
    return {};
  }

  const url = `${BASE_SITE_URL}/posts/${page.slug}`;

  return {
    alternates: {
      canonical: url,
    },
    description: page.description,
    openGraph: {
      description: page.description,
      modifiedTime: page.modifiedAt.toISOString(),
      publishedTime: page.datePublished?.toISOString() ?? page.createdAt.toISOString(),
      title: page.title,
      type: "article",
      url,
    },
    title: `${page.title} - OPISTA`,
    twitter: {
      card: "summary_large_image",
      description: page.description,
      title: page.title,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<PostPageParams>;
}) {
  const { slug } = await params;
  const page = getPageContentBySlug("posts", slug);

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
      <ArticleJsonLd
        dateModified={page.modifiedAt.toISOString()}
        datePublished={(page.datePublished ?? page.createdAt).toISOString()}
        description={page.description}
        title={page.title}
        url={`${BASE_SITE_URL}/posts/${page.slug}`}
      />
      <Heading className="mb-0" level="h1">
        {page.title}
      </Heading>
      <p className="text-xs mt-0 mb-8">Last updated: {date}</p>
      <PostBody page={page} />
      <BackToTop />
    </PageLayout>
  );
}

