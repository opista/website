type Options = {
  time?: boolean;
};

const ordinalRules = new Intl.PluralRules("en-GB", { type: "ordinal" });
const suffixes: Record<Intl.LDMLPluralRule, string> = {
  few: "rd",
  many: "th",
  one: "st",
  other: "th",
  two: "nd",
  zero: "th",
};

const getOrdinal = (number: number) => {
  const category = ordinalRules.select(number);
  return `${number}${suffixes[category]}`;
};

export const formatDate = (
  date: Date,
  { time }: Options = { time: false }
) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: time ? "long" : undefined,
    timeZone: "UTC",
  });

  return formatter
    .formatToParts(date)
    .map(({ type, value }) => {
      if (type === "day") {
        return getOrdinal(parseInt(value, 10));
      }
      return value;
    })
    .join("");
};