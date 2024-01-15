import Link from "next/link";

export default function SiteLinks() {
  return (
    <div className="text-right text-pink-600 font-bold">
      <Link className="p-2 hover:underline decoration-2" href="/apps">
        apps
      </Link>
      &#x2022;
      <Link
        className="p-2 pr-1 hover:underline decoration-2"
        href="mailto:contact@opista.com"
      >
        contact
      </Link>
    </div>
  );
}
