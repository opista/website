import { Heading } from "@/components/heading";
import { PageLayout } from "@/components/page-layout";
import { PageContent, getAppPagesAndContent } from "@/lib/pages";
import Image from "next/image";
import Link from "next/link";

const MAX_IMAGE_WIDTH = 300;

type AppCellProps = {
  app: PageContent;
};

const AppCell = ({ app }: AppCellProps) => {
  const { slug, title, url } = app;

  return (
    <Link href={url}>
      <Image
        alt={`${title} logo`}
        className="hover:scale-105 transition-transform rounded-[25%]"
        height={MAX_IMAGE_WIDTH}
        src={`/apps/${slug}/logo.png`}
        width={MAX_IMAGE_WIDTH}
      />
      <p className="text-center mt-2 sm:mt-4 font-bold">{title}</p>
    </Link>
  );
};

export default async function Apps() {
  const apps = await getAppPagesAndContent("apps");

  return (
    <PageLayout>
      <Heading level="h1">Our Apps</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 sm:mt-16">
        {apps.map((app) => (
          <AppCell key={app.slug} app={app} />
        ))}
      </div>
    </PageLayout>
  );
}
