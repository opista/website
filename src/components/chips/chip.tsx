import { FC } from "react";
import { IconProps } from "@tabler/icons-react";

import { cn } from "@/util/cn";

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

export const Chip = ({ className, color, containerClassName, icon: Icon, label }: ChipProps) => (
  <div className={cn("inline-block mb-5", containerClassName)}>
    <div
      className={cn(
        "inline-flex items-center rounded-full pl-1 pr-3 gap-1 text-white text-sm",
        className,
        color ? chipColorMap[color] : chipColorMap.blue,
      )}
    >
      <div className="flex items-center justify-center p-1">
        <Icon aria-hidden="true" size={16} stroke={1.5} />
      </div>
      <span>{label}</span>
    </div>
  </div>
);
