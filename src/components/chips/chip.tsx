import { FC } from "react";

import { cn } from "@/util/cn";
import { IconProps } from "../icons/icon.types";

type ChipProps = {
  className?: string;
  color?: "blue" | "green" | "red" | "yellow";
  containerClassName?: string;
  icon: FC<IconProps>;
  label: string;
};

const chipColorMap: Record<NonNullable<ChipProps["color"]>, string> = {
  blue: "bg-blue-800",
  green: "bg-green-800",
  red: "bg-red-800",
  yellow: "bg-yellow-700",
};

export const Chip = ({
  className,
  color,
  containerClassName,
  icon: Icon,
  label,
}: ChipProps) => (
  <div className={cn("inline-block mb-5 select-none", containerClassName)}>
    <div
      className={cn(
        "inline-flex items-center rounded-full pl-1 pr-2 gap-1 text-white text-sm",
        className,
        color ? chipColorMap[color] : chipColorMap.blue
      )}
    >
      <div className="rounded-full bg-white bg-white/40 flex items-center justify-center">
        <Icon />
      </div>
      <span>{label}</span>
    </div>
  </div>
);
