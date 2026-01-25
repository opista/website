import { ComponentPropsWithoutRef } from "react";

export type IconProps = ComponentPropsWithoutRef<"svg"> & {
  className?: string;
  strokeWidth?: number;
};
