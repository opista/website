import { ReactNode } from "react";
import { Image } from "../../image";

export type IpodIdentifierLayoutProps = {
  children: ReactNode;
  image: string;
  title: string;
};

export const IpodIdentifierLayout = ({
  children,
  image,
  title,
}: IpodIdentifierLayoutProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[400px]">
    <div className="flex flex-col justify-center">
      <div className="font-bold mb-8 text-center">{title}</div>
      <div className="flex gap-4 flex-wrap justify-center items-start content-start sm:h-[200px]">
        {children}
      </div>
    </div>
    <div className="flex justify-center items-center">
      <Image
        alt="An iPod graphic"
        height={300}
        quality={100}
        src={image}
        width={200}
      />
    </div>
  </div>
);
