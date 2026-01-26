import { IconPencil } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const PencilFilledIcon = ({ className, strokeWidth = 1.5, ...props}: IconProps) => (
  <IconPencil
    {...props}
    aria-label="Icon, pencil"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
