import slugify from "slugify";

export const toSlug = (...value: string[]): string =>
  slugify(value.join(" "), { lower: true, strict: true });
