import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import { toSlug } from "./to-slug";

export type TOCItem = {
  children: TOCItem[];
  level: number;
  slug: string;
  title: string;
};

const buildNestedTOC = (headings: TOCItem[]): TOCItem[] => {
  const root: TOCItem[] = [];
  const stack: TOCItem[] = [];

  for (const heading of headings) {
    while (stack.length > 0 && heading.level <= stack[stack.length - 1].level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(heading);
      stack.push(heading);
    } else {
      const parent = stack[stack.length - 1];
      parent.children.push(heading);
      stack.push(heading);
    }
  }

  return root;
};

export const generateTableOfContents = (
  content: string,
  maxDepth: number = Infinity
) => {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(content);

  const flatHeadings: TOCItem[] = [];

  visit(tree, "heading", (node: any) => {
    if (node.depth > maxDepth) return;

    const text = node.children
      .filter(
        (child: any) => child.type === "text" || child.type === "inlineCode"
      )
      .map((child: any) => child.value)
      .join(" ")
      .trim();

    if (text) {
      const slug = toSlug(text);
      flatHeadings.push({
        children: [],
        level: node.depth,
        slug,
        title: text,
      });
    }
  });

  const nested = buildNestedTOC(flatHeadings);

  return nested;
};
