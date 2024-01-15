import Logo from "./logo";
import SiteLinks from "./site-links";

export default function Header() {
  return (
    <div className="flex justify-between py-4">
      <Logo isLink />
      <SiteLinks />
    </div>
  );
}
