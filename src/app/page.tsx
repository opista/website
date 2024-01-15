import Logo from "@/components/logo";
import SiteLinks from "@/components/site-links";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col">
        <Logo className="text-6xl sm:text-9xl" />
        <SiteLinks />
      </div>
    </main>
  );
}
