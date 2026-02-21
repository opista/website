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
    <Link
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
      href={url}
    >
      <Image
        alt={`${title} logo`}
        className="group-hover:scale-105 group-focus-visible:scale-105 transition-transform rounded-[25%]"
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
