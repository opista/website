import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { PageLayout } from "@/components/page-layout";

const list = [
  {
    label: "Frontplate",
    link: "https://s.click.aliexpress.com/e/_c3J6iGVD",
  },
  {
    label: "Backplate",
    link: "https://s.click.aliexpress.com/e/_c3JQyhzH",
  },
  {
    label: "Storage adaptor (iFlash Quad), or",
    link: "https://www.iflash.xyz/store/iflash-quad/",
  },
  {
    label: "Storage adaptor (iFlash uDUAL) SOLD OUT",
    link: "https://www.iflash.xyz/store/iflash-udual/",
  },
  {
    label: "Battery - pick '79493.8mm Thin Back'",
    link: "https://s.click.aliexpress.com/e/_c3sR1piJ",
  },
  {
    label: "Headphone jack assembly",
    link: "https://s.click.aliexpress.com/e/_c3qxm4lv",
  },
  {
    label: "Hard case (optional)",
    link: "https://s.click.aliexpress.com/e/_c3Uzs8gP",
  },
  {
    label: "Bezel and screws (optional)",
    link: "https://s.click.aliexpress.com/e/_c3D4X0B5",
  },
];

export default function Test() {
  return (
    <PageLayout className="prose prose-invert" tag="article">
      <Heading className="mb-12" level="h1">
        foreverwhatever1312
      </Heading>
      <div className="snap-y markdown">
        <ul>
          {list.map(({ label, link }) => (
            <li key={label}>
              <Link href={link} target="_blank">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
