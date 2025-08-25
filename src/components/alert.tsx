import { FC, ReactNode } from "react";
import clsx from "clsx";

import { ExclamationCircleIcon } from "./icons/exclamation-circle-icon";
import { ExclamationTriangleIcon } from "./icons/exclamation-triangle-icon";
import { IconProps } from "./icons/icon.types";
import { InformationIcon } from "./icons/information-icon";

type AlertType = "error" | "info" | "warning";

type AlertProps = {
  type?: AlertType;
  children: ReactNode;
};

const iconMap: Record<AlertType, FC<IconProps>> = {
  error: ExclamationTriangleIcon,
  info: InformationIcon,
  warning: ExclamationCircleIcon,
};

const styleMap: Record<AlertType, string> = {
  error: "bg-red-100 text-red-700 border-red-700",
  info: "bg-blue-100 text-blue-700 border-blue-700",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-700",
};

export const Alert = ({ children, type = "info" }: AlertProps) => {
  const Icon = iconMap[type];
  return (
    <div
      className={clsx(
        "rounded py-2 pl-3 pr-4 mb-5 flex items-center leading-5 not-prose",
        styleMap[type]
      )}
    >
      <Icon className="mr-3 size-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
};
