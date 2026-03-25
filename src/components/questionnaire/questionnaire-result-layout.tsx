import { ReactNode } from "react";
import clsx from "clsx";

import { Image } from "@/components/image";
import { cn } from "@/util/cn";

export type QuestionnaireResultLayoutProps = {
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  title: string;
};

export const QuestionnaireResultLayout = ({
  children,
  image,
  imageAlt,
  title,
}: QuestionnaireResultLayoutProps) => (
  <div className={cn("grid grid-cols-1 sm:grid-cols-2 min-h-[400px]", !image && "sm:grid-cols-1")}>
    <div className="flex flex-col justify-center">
      <div className="font-bold mb-8 text-center">{title}</div>
      <div className="flex gap-4 flex-wrap justify-center items-start content-start sm:h-[200px]">
        {children}
      </div>
    </div>
    {image && imageAlt && <div className="flex justify-center items-center">
      <Image alt={imageAlt} height={300} quality={100} src={image} width={200} />
    </div>}
  </div>
);
