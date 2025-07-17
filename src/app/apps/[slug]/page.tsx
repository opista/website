import PageLayout from "@/components/page-layout";
import { getAllPageSlugs, getPageContentBySlug } from "@/lib/pages";
import { serialize } from "next-mdx-remote-client/serialize";
import PageTitle from "@/components/page-title";
import Image from "next/image";
import PostBody from "@/components/post-body";

type AppPageParams = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllPageSlugs("apps");
}

async function getPageContent(params: AppPageParams) {
  const post = getPageContentBySlug("apps", params.slug);
  const source = await serialize({ source: post.content });
  return { post, source };
}

export default async function AppPage({ params }: { params: AppPageParams }) {
  const { post, source } = await getPageContent(params);

  return (
    <PageLayout className="prose dark:prose-invert" tag="article">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="relative my-0 mb-2 sm:mb-0 sm:mr-2 rounded-[25%] overflow-hidden w-[40px] h-[40px] sm:w-[70px] sm:h-[70px]">
          <Image
            alt={`${post.title} logo`}
            className="my-0"
            fill
            sizes="(max-width: 640px) 40px, 70px"
            src={`/apps/${post.slug}/logo.png`}
          />
        </div>
        <PageTitle className="mb-0">{post.title}</PageTitle>
      </div>
      <PostBody source={source} />
    </PageLayout>
  );
}
