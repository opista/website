import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BackToTop } from "@/components/back-to-top";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import { PostBody } from "@/components/post-body";
import { ProjectDetailsBar } from "@/components/project/project-details-bar";
import { BASE_SITE_URL } from "@/constant";
import { getAllPageSlugs, getPageContentBySlug } from "@/lib/pages";

type ProjectPageParams = {
  slug: string;
};

export function generateStaticParams() {
  return getAllPageSlugs("projects");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageContentBySlug("projects", slug);

  if (!page) {
    return {};
  }

  const url = `${BASE_SITE_URL}/projects/${page.slug}`;

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
          url: `/projects/${page.slug}/logo.png`,
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

export default async function ProjectPage({ params }: { params: Promise<ProjectPageParams> }) {
  const { slug } = await params;
  const page = await getPageContentBySlug("projects", slug);

  if (!page) {
    return notFound();
  }

  return (
    <article className="prose prose-invert">
      <Breadcrumbs items={[{ href: "/projects", label: "Projects" }, { label: page.title }]} />
      <div className="flex flex-col sm:flex-row items-center">
        <div className="relative my-0 mb-2 sm:mb-0 sm:mr-2 rounded-[25%] overflow-hidden w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] shrink-0">
          <Image
            alt={`${page.title} logo`}
            className="!my-0"
            fill
            sizes="(max-width: 640px) 40px, 70px"
            src={`/projects/${page.slug}/logo.png`}
          />
        </div>
        <Heading className="mb-0" level="h1">
          {page.title}
        </Heading>
      </div>
      <p className="font-bold">{page.description}</p>
      <ProjectDetailsBar className="mb-5" page={page} />
      <PostBody page={page} />
      <BackToTop />
    </article>
  );
}
