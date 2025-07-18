import {
  TOCItem,
  generateTableOfContents,
} from "@/util/generate-table-of-contents";
import PostHeading from "./post-heading";
import { toSlug } from "@/util/to-slug";
import { Link } from "./link";

type TableOfContentsProps = {
  content: string;
};

const Table = ({ headings }: { headings: TOCItem[] }) => (
  <ul className="list-none m-0 pl-4">
    {headings.map((heading) => (
      <li key={heading.slug}>
        <Link href={`#${heading.slug}`}>{heading.title}</Link>

        {heading.children.length > 0 && <Table headings={heading.children} />}
      </li>
    ))}
  </ul>
);

export default function TableOfContents({ content }: TableOfContentsProps) {
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
      <PostHeading className="mt-0 mb-1" level="h2">
        {componentTitle}
      </PostHeading>
      <div className="border-l-2 border-pink-400">
        <Table headings={[baseHeading, ...headings]} />
      </div>
    </>
  );
}
