import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/page-title";
import Image from "next/image";
import Link from "next/link";

const MAX_IMAGE_WIDTH = 300;

type AppCellProps = {
  name: string;
};

function AppCell({ name }: AppCellProps) {
  const nameAsFilePath = name.toLocaleLowerCase().split(" ").join("-");
  return (
    <Link href={`/apps/${nameAsFilePath}`}>
      <Image
        alt={`${name} logo`}
        className="hover:scale-105 transition-transform rounded-[25%]"
        height={MAX_IMAGE_WIDTH}
        src={`/apps/${nameAsFilePath}/logo.png`}
        width={MAX_IMAGE_WIDTH}
      />
      <p className="text-center mt-2 sm:mt-4 font-bold">{name}</p>
    </Link>
  );
}

export default function Apps() {
  return (
    <PageLayout>
      <PageTitle>Our Apps</PageTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 sm:mt-16">
        <AppCell name="Avios Reminder"></AppCell>
        <AppCell name="Krushme"></AppCell>
      </div>
    </PageLayout>
  );
}
