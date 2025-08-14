import slugify from "slugify";

export const toSlug = (...value: (number | string)[]): string =>
  slugify(value.join(" "), { lower: true, strict: true });
