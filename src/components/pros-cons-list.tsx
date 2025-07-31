import { FC } from "react";
import { CheckCircleIcon } from "./icons/check-circle-icon";
import { CrossCircleIcon } from "./icons/cross-circle-icon";
import clsx from "clsx";

type ListType = "cons" | "pros";

type ProsConsListProps = {
  className?: string;
  list?: string[];
  type: ListType;
};

const iconMap: Record<ListType, { icon: FC<IconProps>; className: string }> = {
  pros: {
    icon: CheckCircleIcon,
    className: "text-green-600",
  },
  cons: {
    icon: CrossCircleIcon,
    className: "text-red-600",
  },
};

export const ProsConsList = ({ className, list, type }: ProsConsListProps) => {
  if (!list) return null;

  const { className: iconClassName, icon: Icon } = iconMap[type];

  return (
    <ul className={clsx("not-prose list-none mb-5", className)}>
      {list.map((item, idx) => (
        <li className="flex pl-0" key={idx}>
          <Icon className={clsx(iconClassName, "shrink-0 mt-1 mr-1")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
