import slugify from "slugify";

export const toSlug = (value: string): string =>
  slugify(value, { lower: true, strict: true });
