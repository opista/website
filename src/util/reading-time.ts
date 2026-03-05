export const calculateReadingTime = (text: string): number => {
  if (!text) {
    return 0;
  }

  const trimmedText = text.trim();
  if (!trimmedText) {
    return 0;
  }

  const words = trimmedText.split(/\s+/).length;
  return Math.ceil(words / 300);
};
