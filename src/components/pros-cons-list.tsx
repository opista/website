import { FC } from "react";
import { IconCircleCheckFilled, IconCircleXFilled, IconProps } from "@tabler/icons-react";

import { cn } from "@/util/cn";

type ListType = "cons" | "pros";

type ProsConsListProps = {
  className?: string;
  list?: string[];
  type: ListType;
};

const listConfig: Record<ListType, { icon: FC<IconProps>; className: string; prefix: string }> = {
  cons: {
    className: "text-red-600",
    icon: IconCircleXFilled,
    prefix: "Con: ",
  },
  pros: {
    className: "text-green-600",
    icon: IconCircleCheckFilled,
    prefix: "Pro: ",
  },
};

export const ProsConsList = ({ className, list, type }: ProsConsListProps) => {
  if (!list) return null;

  const { className: iconClassName, icon: Icon, prefix } = listConfig[type];

  return (
    <ul className={cn("not-prose list-none mb-5", className)}>
      {list.map((item, idx) => (
        <li className="flex pl-0" key={idx}>
          <Icon aria-hidden="true" className={cn(iconClassName, "size-4 shrink-0 mt-1 mr-1")} />
          <span>
            <span className="sr-only">{prefix}</span>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
};
