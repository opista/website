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

const stripMarkdown = (text: string): string => {
  return text
    .replace(/\[\^[^\]]+\]/g, "") // Remove footnotes [^...]
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links [text](url) -> text
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold **text** or __text__ -> text
    .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic *text* or _text_ -> text
    .replace(/`([^`]+)`/g, "$1") // Remove inline code `text` -> text
    .trim();
};

export const generateTableOfContents = (
  content: string,
  maxDepth: number = Infinity
) => {
  const lines = content.split(/\r?\n/);
  const flatHeadings: TOCItem[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for code block toggle
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    const match = line.match(/^ {0,3}(#{1,6})\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      if (level > maxDepth) continue;

      const rawText = match[2];
      const title = stripMarkdown(rawText);

      if (title) {
        const slug = toSlug(title);
        flatHeadings.push({
          children: [],
          level,
          slug,
          title,
        });
      }
    }
  }

  return buildNestedTOC(flatHeadings);
};
