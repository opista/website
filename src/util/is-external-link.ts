import { UrlObject } from "url";

export const isInternalLink = (url?: string | UrlObject) => {
  if (!url) return false;

  if (typeof url === "string") {
    return url.startsWith("/") || url.startsWith("#");
  }

  return url.href?.startsWith("/") || url.href?.startsWith("#");
};
