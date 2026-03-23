import { ReactNode, useEffect, useRef } from "react";

import { Image } from "@/components/image";

export type QuestionnaireStepLayoutProps = {
  children: ReactNode;
  image: string;
  imageAlt: string;
  title: string;
};

export const QuestionnaireStepLayout = ({
  children,
  image,
  imageAlt,
  title,
}: QuestionnaireStepLayoutProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    titleRef.current?.focus();
  }, [title]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[400px]">
      <div className="flex flex-col justify-center">
        <div className="font-bold mb-8 text-center focus:outline-none" ref={titleRef} tabIndex={-1}>
          {title}
        </div>
        <div className="flex gap-4 flex-wrap justify-center items-start content-start sm:h-[200px]">
          {children}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Image alt={imageAlt} height={300} quality={100} src={image} width={200} />
      </div>
    </div>
  );
};
