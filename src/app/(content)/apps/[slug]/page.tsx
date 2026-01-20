import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AppDetailsBar } from "@/components/app/app-details-bar";
import { BackToTop } from "@/components/back-to-top";
import { Heading } from "@/components/heading";
import { PostBody } from "@/components/post-body";
import { BASE_SITE_URL } from "@/constant";
import { getAllPageSlugs, getPageContentBySlug } from "@/lib/pages";

type AppPageParams = {
  slug: string;
};

export function generateStaticParams() {
  return getAllPageSlugs("apps");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<AppPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageContentBySlug("apps", slug);

  if (!page) {
    return {};
  }

  const url = `${BASE_SITE_URL}/apps/${page.slug}`;

  return {
    alternates: {
      canonical: url,
    },
    description: page.description,
    openGraph: {
      description: page.description,
      images: [
        {
          alt: `${page.title} logo`,
          url: `/apps/${page.slug}/logo.png`,
        },
      ],
      title: page.title,
      url,
    },
    title: `${page.title} - OPISTA`,
    twitter: {
      card: "summary",
      description: page.description,
      title: page.title,
    },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<AppPageParams>;
}) {
  const { slug } = await params;
  const page = getPageContentBySlug("apps", slug);

  if (!page) {
    return notFound();
  }

  return (
    <article className="prose prose-invert">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="relative my-0 mb-2 sm:mb-0 sm:mr-2 rounded-[25%] overflow-hidden w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] shrink-0">
          <Image
            alt={`${page.title} logo`}
            className="!my-0"
            fill
            sizes="(max-width: 640px) 40px, 70px"
            src={`/apps/${page.slug}/logo.png`}
          />
        </div>
        <Heading className="mb-0" level="h1">
          {page.title}
        </Heading>
      </div>
      <p className="font-bold">{page.description}</p>
      <AppDetailsBar className="mb-5" page={page} />
      <PostBody page={page} />
      <BackToTop />
    </article>
  );
}
