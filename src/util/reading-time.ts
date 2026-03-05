export const calculateReadingTime = (text: string): number => {
  if (!text) {
    return 0;
  }

  const words = text.trim().match(/\S+/g)?.length ?? 0;
  return Math.ceil(words / 300);
};
