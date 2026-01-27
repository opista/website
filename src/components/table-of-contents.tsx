"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { IconListTree } from "@tabler/icons-react";
import { createPortal } from "react-dom";

import { useActiveHeading } from "@/hooks/use-active-heading";
import { useStickyToc } from "@/hooks/use-sticky-toc";
import { cn } from "@/util/cn";
import { TOCItem } from "@/util/generate-table-of-contents";

import { Accordion } from "./accordion";
import { ConditionalWrapper } from "./conditional-wrapper";
import { Heading } from "./heading";
import { Link } from "./link";

export const FIXED_TOC_WIDTH = 300;

type TableOfContentsProps = {
  collapsable?: boolean;
  enableSticky?: boolean;
  headings: TOCItem[];
};

const flattenSlugs = (items: TOCItem[]): string[] => items.flatMap((item) => [item.slug, ...flattenSlugs(item.children)]);

const TOCContent = ({ headings }: { headings: TOCItem[] }) => (
  <div className="border-l-2 border-gray-700">
    <HeadingGroup headings={headings} />
  </div>
);

type HeadingItemProps = {
  activeSlug?: string | null;
  heading: TOCItem;
  registerRef?: (slug: string, el: HTMLAnchorElement | null) => void;
};

const HeadingItem = memo(
  ({ activeSlug, heading, registerRef }: HeadingItemProps) => {
    const isActive = activeSlug === heading.slug;

    return (
      <li className="m-0!">
        <Link
          ref={(el) => registerRef?.(heading.slug, el)}
          aria-current={isActive ? "location" : undefined}
          className={cn({ ["text-pink-500"]: isActive })}
          href={`#${heading.slug}`}
        >
          {heading.title}
        </Link>

        {heading.children.length > 0 && (
          <HeadingGroup
            activeSlug={activeSlug}
            headings={heading.children}
            registerRef={registerRef}
          />
        )}
      </li>
    );
  }
);

HeadingItem.displayName = "HeadingItem";

type HeadingGroupProps = {
  activeSlug?: string | null;
  headings: TOCItem[];
  registerRef?: (slug: string, el: HTMLAnchorElement | null) => void;
};

const HeadingGroup = ({
  activeSlug,
  headings,
  registerRef,
}: HeadingGroupProps) => (
  <ul className="list-none m-0! pl-4">
    {headings.map((heading) => (
      <HeadingItem
        key={heading.slug}
        activeSlug={activeSlug}
        heading={heading}
        registerRef={registerRef}
      />
    ))}
  </ul>
);

const COMPONENT_TITLE = "Table of contents";

type StickyTOCContentProps = {
  activeSlug: string | null;
  headings: TOCItem[];
};

// TOC content with active indicator and auto-scroll (for sticky display only)
const StickyTOCContent = ({ activeSlug, headings }: StickyTOCContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const registerRef = useCallback(
    (slug: string, el: HTMLAnchorElement | null) => {
      if (el) {
        linkRefs.current.set(slug, el);
      } else {
        linkRefs.current.delete(slug);
      }
    },
    []
  );

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      if (!indicatorRef.current || !containerRef.current) {
        return;
      }

      if (!activeSlug) {
        indicatorRef.current.style.opacity = "0";
        return;
      }

      const activeLink = linkRefs.current.get(activeSlug);
      if (!activeLink) {
        indicatorRef.current.style.opacity = "0";
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      indicatorRef.current.style.height = `${linkRect.height}px`;
      indicatorRef.current.style.top = `${linkRect.top - containerRect.top + containerRef.current.scrollTop}px`;
      indicatorRef.current.style.opacity = "1";

      // Throttle scrollIntoView to avoid excessive calls during fast scrolling
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        activeLink.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeSlug]);

  return (
    <div ref={containerRef} className="relative border-l-2 border-gray-700">
      {/* Active indicator - single div that moves to the active item */}
      <div
        ref={indicatorRef}
        className="absolute left-[-2px] w-1 bg-pink-400 transition-all duration-150"
        style={{
          opacity: 0,
        }}
      />
      <HeadingGroup
        activeSlug={activeSlug}
        headings={headings}
        registerRef={registerRef}
      />
    </div>
  );
};

type StickyTOCWrapperProps = {
  activeSlug: string | null;
  headings: TOCItem[];
};

const StickyTOCWrapper = ({ activeSlug, headings }: StickyTOCWrapperProps) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <nav
      aria-label="Sticky Table of Contents"
      className="prose prose-invert bg-zinc-950 fixed top-20 left-[calc(50%+65ch/2+clamp(1.5rem,5vw,8rem))] max-h-[calc(100vh-160px)] z-40 flex flex-col"
      style={{ maxWidth: FIXED_TOC_WIDTH }}
    >
      <Heading className="mt-0 mb-2 shrink-0" level="h2">
        <IconListTree
          aria-label="Icon, list tree"
          className="w-6 h-6"
        />{" "}
        On this page
      </Heading>
      <div className="overflow-y-auto min-h-0">
        <StickyTOCContent activeSlug={activeSlug} headings={headings} />
      </div>
    </nav>,
    document.body
  );
};

export const TableOfContents = ({
  collapsable,
  enableSticky = true,
  headings,
}: TableOfContentsProps) => {
  const { containerRef, isSticky } = useStickyToc({ enabled: enableSticky });
  const allSlugs = useMemo(() => flattenSlugs(headings), [headings]);
  const activeSlug = useActiveHeading(allSlugs);

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

      {isSticky && (
        <StickyTOCWrapper activeSlug={activeSlug} headings={headings} />
      )}
    </>
  );
};
