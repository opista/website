import { FC, ReactNode } from "react";
import { Icon, IconAlertCircleFilled, IconAlertTriangleFilled, IconInfoCircleFilled, IconProps } from "@tabler/icons-react";

import { cn } from "@/util/cn";

type AlertType = "error" | "info" | "warning";

type AlertProps = {
  type?: AlertType;
  icon?: Icon;
  children: ReactNode;
};

const iconMap: Record<AlertType, { icon: FC<IconProps>; semanticLabel: string }> = {
  error: { icon: IconAlertTriangleFilled, semanticLabel: "Error" },
  info: { icon: IconInfoCircleFilled, semanticLabel: "Info" },
  warning: { icon: IconAlertCircleFilled, semanticLabel: "Warning" },
};

const styleMap: Record<AlertType, string> = {
  error: "bg-red-100 text-red-700 border-red-700",
  info: "bg-blue-100 text-blue-700 border-blue-700",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-700",
};

export const Alert = ({ children, icon: OverrideIcon, type = "info" }: AlertProps) => {
  const { icon: DefaultIcon, semanticLabel } = iconMap[type];
  const Icon = OverrideIcon ?? DefaultIcon;

  return (
    <div
      className={cn(
        "alert p-4 mb-5 flex leading-5 not-prose border",
        styleMap[type]
      )}
      role="note"
    >
      <Icon aria-hidden="true" className="mr-2 size-5 shrink-0" />
      <div>
        <span className="sr-only">{semanticLabel}: </span>
        {children}
      </div>
    </div>
  );
};
