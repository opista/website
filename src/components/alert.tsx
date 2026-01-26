import { IconAlertCircle, IconAlertTriangle, IconInfoCircle, IconProps } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

import { cn } from "@/util/cn";

type AlertType = "error" | "info" | "warning";

type AlertProps = {
  type?: AlertType;
  children: ReactNode;
};

const iconMap: Record<AlertType, { icon: FC<IconProps>; label: string }> = {
  error: { icon: IconAlertTriangle, label: "Icon, warning symbol" },
  info: { icon: IconInfoCircle, label: "Icon, information symbol" },
  warning: { icon: IconAlertCircle, label: "Icon, circle with an exclamation mark" },
};

const styleMap: Record<AlertType, string> = {
  error: "bg-red-100 text-red-700 border-red-700",
  info: "bg-blue-100 text-blue-700 border-blue-700",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-700",
};

export const Alert = ({ children, type = "info" }: AlertProps) => {
  const { icon: Icon, label } = iconMap[type];
  return (
    <div
      className={cn(
        "alert rounded py-2 pl-3 pr-4 mb-5 flex items-center leading-5 not-prose",
        styleMap[type]
      )}
      role="note"
    >
      <Icon aria-label={label} className="mr-3 size-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
};
