import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/components/heading";
import { getAllPages, Page } from "@/lib/pages";

const MAX_IMAGE_WIDTH = 300;

type ProjectCellProps = {
  project: Page;
};

export const metadata: Metadata = {
  title: "Projects - OPISTA",
};

const ProjectCell = ({ project }: ProjectCellProps) => {
  const { slug, title, url } = project;

  return (
    <Link href={url}>
      <Image
        alt={`${title} logo`}
        className="hover:scale-105 transition-transform rounded-[25%]"
        height={MAX_IMAGE_WIDTH}
        src={`/projects/${slug}/logo.png`}
        width={MAX_IMAGE_WIDTH}
      />
      <p className="text-center mt-2 sm:mt-4 font-bold">{title}</p>
    </Link>
  );
};

export default async function Projects() {
  const projects = await getAllPages("projects");

  return (
    <>
      <Heading level="h1">Projects</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 sm:mt-16">
        {projects.map((project) => (
          <ProjectCell key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
