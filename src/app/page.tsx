import { Logo } from "@/components/logo";
import { SiteLinks } from "@/components/site-links";

export default function Home() {
  return (
    <main className="flex h-svh items-center justify-center">
      <div className="flex flex-col">
        <Logo className="text-5xl sm:text-9xl" />
        <SiteLinks />
      </div>
    </main>
  );
}
