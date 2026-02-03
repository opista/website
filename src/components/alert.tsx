import { FC, ReactNode } from "react";
import { IconAlertCircle, IconAlertTriangle, IconInfoCircle, IconProps } from "@tabler/icons-react";

import { cn } from "@/util/cn";

type AlertType = "error" | "info" | "warning";

type AlertProps = {
  type?: AlertType;
  children: ReactNode;
};

const iconMap: Record<AlertType, { icon: FC<IconProps>; semanticLabel: string }> = {
  error: { icon: IconAlertTriangle, semanticLabel: "Error" },
  info: { icon: IconInfoCircle, semanticLabel: "Info" },
  warning: { icon: IconAlertCircle, semanticLabel: "Warning" },
};

const styleMap: Record<AlertType, string> = {
  error: "bg-red-100 text-red-700 border-red-700",
  info: "bg-blue-100 text-blue-700 border-blue-700",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-700",
};

export const Alert = ({ children, type = "info" }: AlertProps) => {
  const { icon: Icon, semanticLabel } = iconMap[type];
  return (
    <div
      className={cn(
        "alert rounded py-2 pl-3 pr-4 mb-5 flex items-center leading-5 not-prose",
        styleMap[type]
      )}
      role="note"
    >
      <Icon aria-hidden="true" className="mr-3 size-5 shrink-0" />
      <div>
        <span className="sr-only">{semanticLabel}: </span>
        {children}
      </div>
    </div>
  );
};
