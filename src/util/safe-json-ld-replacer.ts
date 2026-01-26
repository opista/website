// Based on Next.js internal htmlescape strategy
// https://github.com/vercel/next.js/blob/canary/packages/next/src/server/htmlescape.ts
const ESCAPE_LOOKUP: { [match: string]: string } = {
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
  "&": "\\u0026",
  "<": "\\u003c",
  ">": "\\u003e",
};

const ESCAPE_REGEX = /[&><\u2028\u2029]/g;

export const safeJsonLdReplacer = (text: string): string => {
  return text.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
};
