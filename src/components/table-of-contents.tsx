import {
  generateTableOfContents,
  TOCItem,
} from "@/util/generate-table-of-contents";

import { Heading } from "./heading";
import { Link } from "./link";
import { ConditionalWrapper } from "./conditional-wrapper";
import { Accordion } from "./accordion";

type TableOfContentsProps = {
  collapsable?: boolean;
  content: string;
  maxDepth?: number;
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

const COMPONENT_TITLE = "Table of Contents";

export const TableOfContents = ({
  collapsable,
  content,
  maxDepth,
}: TableOfContentsProps) => {
  const headings = generateTableOfContents(content, maxDepth);

  return (
    <ConditionalWrapper condition={!!collapsable} wrapper={(children) => (
      <Accordion title={COMPONENT_TITLE}>
        {children}
      </Accordion>
    )}>
      {!collapsable && (<Heading className="mt-0 mb-1" level="h2" link>{COMPONENT_TITLE}</Heading>)}
      <div className="border-l-2 border-pink-400">
        <HeadingGroup headings={headings} />
      </div>
    </ConditionalWrapper>
  );
};
