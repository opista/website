import { cn } from "@/util/cn";

type RamIndicatorProps = {
  className?: string;
  ram: 32 | 64;
};

export const RamIndicator = ({ className, ram }: RamIndicatorProps) => (
  <span
    className={cn("inline-block font-bold px-2 py-1 leading-none text-sm rounded-lg", className, {
      "bg-amber-400 text-amber-950": ram === 32,
      "bg-green-400 text-green-950": ram === 64,
    })}
  >
    <span className="sr-only">Memory: </span>
    {ram}MB RAM
  </span>
);
