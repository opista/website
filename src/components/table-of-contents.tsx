"use client";

import { createPortal } from "react-dom";

import {
  generateTableOfContents,
  TOCItem,
} from "@/util/generate-table-of-contents";
import { useStickyToc } from "@/hooks/use-sticky-toc";

import { Heading } from "./heading";
import { Link } from "./link";
import { ConditionalWrapper } from "./conditional-wrapper";
import { Accordion } from "./accordion";

export const FIXED_TOC_WIDTH = 300;

type TableOfContentsProps = {
  collapsable?: boolean;
  content: string;
  maxDepth?: number;
  enableSticky?: boolean;
};

const HeadingGroup = ({ headings }: { headings: TOCItem[] }) => (
  <ul className="list-none m-0! pl-4">
    {headings.map((heading) => (
      <li className="m-0!" key={heading.slug}>
        <Link href={`#${heading.slug}`}>{heading.title}</Link>

        {heading.children.length > 0 && (
          <HeadingGroup headings={heading.children} />
        )}
      </li>
    ))}
  </ul>
);

const COMPONENT_TITLE = "Table of Contents";

const TOCContent = ({ headings }: { headings: TOCItem[] }) => (
  <div className="border-l-2 border-pink-400">
    <HeadingGroup headings={headings} />
  </div>
);

export const TableOfContents = ({
  collapsable,
  content,
  maxDepth,
  enableSticky = true,
}: TableOfContentsProps) => {
  const headings = generateTableOfContents(content, maxDepth);
  const { containerRef, isSticky } = useStickyToc({ enabled: enableSticky });

  return (
    <>
      <div ref={containerRef}>
        <ConditionalWrapper
          condition={!!collapsable}
          wrapper={(children) => (
            <Accordion title={COMPONENT_TITLE}>{children}</Accordion>
          )}
        >
          {!collapsable && (
            <Heading className="mt-0 mb-1" level="h2" link>
              {COMPONENT_TITLE}
            </Heading>
          )}
          <TOCContent headings={headings} />
        </ConditionalWrapper>
      </div>
      ``
      {/* Sticky TOC Portal */}
      {isSticky &&
        typeof document !== "undefined" &&
        createPortal(
          <nav
            aria-label="Sticky Table of Contents"
            className="prose prose-invert fixed top-20 left-[calc(50%+65ch/2+1.5rem)] max-h-[calc(100vh-160px)] overflow-y-auto z-40 border p-4"
            style={{ maxWidth: FIXED_TOC_WIDTH }}
          >
            <Heading className="mt-0 mb-2" level="h2">
              {COMPONENT_TITLE}
            </Heading>
            <TOCContent headings={headings} />
          </nav>,
          document.body
        )}
    </>
  );
};
