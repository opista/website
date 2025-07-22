import {
  TOCItem,
  generateTableOfContents,
} from "@/util/generate-table-of-contents";
import { toSlug } from "@/util/to-slug";
import { Link } from "./link";
import { Heading } from "./heading";

type TableOfContentsProps = {
  content: string;
};

const HeadingGroup = ({ headings }: { headings: TOCItem[] }) => (
  <ul className="list-none m-0 pl-4">
    {headings.map((heading) => (
      <li key={heading.slug}>
        <Link href={`#${heading.slug}`}>{heading.title}</Link>

        {heading.children.length > 0 && (
          <HeadingGroup headings={heading.children} />
        )}
      </li>
    ))}
  </ul>
);

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const componentTitle = "Table of Contents";
  const headings = generateTableOfContents(content);

  const baseHeading: TOCItem = {
    children: [],
    level: 2,
    slug: toSlug(componentTitle),
    title: componentTitle,
  };

  return (
    <>
      <Heading className="mt-0 mb-1" level="h2" link>
        {componentTitle}
      </Heading>
      <div className="border-l-2 border-pink-400">
        <HeadingGroup headings={[baseHeading, ...headings]} />
      </div>
    </>
  );
};
