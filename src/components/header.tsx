import { Logo } from "./logo";
import { SiteLinks } from "./site-links";

export const Header = () => (
  <header className="flex justify-between py-4">
    <Logo className="text-xl" isLink />
    <SiteLinks />
  </header>
);
