export const sanitizeUrl = (url?: string): string | undefined => {
  if (!url) return undefined;

  // Basic protection against javascript: pseudo-protocol
  // Case-insensitive check for javascript:
  if (url.trim().toLowerCase().startsWith("javascript:")) {
    // Return about:blank to render a safe but non-functional link
    return "about:blank";
  }

  return url;
};
