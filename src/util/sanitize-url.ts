export const sanitizeUrl = (url?: string): string | undefined => {
  if (!url) return undefined;

  // Basic protection against potentially executable URL schemes
  // Case-insensitive check for javascript:, data:, and vbscript:
  const normalizedUrl = url.trim().toLowerCase();
  if (
    normalizedUrl.startsWith("javascript:") ||
    normalizedUrl.startsWith("data:") ||
    normalizedUrl.startsWith("vbscript:")
  ) {
    // Return about:blank to render a safe but non-functional link
    return "about:blank";
  }

  return url;
};
