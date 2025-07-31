import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";
import { Image } from "../image";
import { ConditionalWrapper } from "../conditional-wrapper";
import { Link } from "../link";
import { ProsConsList } from "../pros-cons-list";
import { RECOMMENDED_BG_COLOR, RecommendedBadge } from "../recommended-badge";
import clsx from "clsx";
import { Accordion } from "../accordion";

type Heading = {
  label: string;
  width?: string;
};

type Upgrade = {
  cons?: string[];
  option: string;
  image: string;
  description: string;
  recommended?: boolean;
  price: {
    label: string;
    link?: string;
  };
  pros?: string[];
};

const headings: Heading[] = [
  { label: "Option", width: "120px" },
  { label: "Image", width: "150px" },
  { label: "Description", width: "280px" },
  { label: "Price" },
];

const upgrades: Upgrade[] = [
  {
    option: "iFlash Quad",
    image: "/posts/ipod-modding/storage/iflash-quad.jpg",
    description: "Quad MicroSD Adaptor. Supports up to 4 MicroSD cards",
    price: {
      link: "https://www.iflash.xyz/store/iflash-quad/",
      label: "~£36",
    },
    pros: [
      "Reliable and good quality",
      "Fits 4 MicroSD cards",
      "Space for maximum mods",
    ],
    cons: ["More expensive"],
    recommended: true,
  },
  {
    option: "Generic MicroSD",
    image: "/posts/ipod-modding/storage/aliexpress-microsd.jpg",
    description: "Dual MicroSD Adaptor. Supports up to 2 MicroSD cards",
    price: {
      link: "https://www.aliexpress.com/item/1005003944930279.html",
      label: "~£38",
    },
    pros: [
      "Very compact",
      "Great mechanism for holding cards",
      "Space for maximum mods",
    ],
    cons: ["Most expensive"],
  },
  {
    option: "iFlash Solo",
    image: "/posts/ipod-modding/storage/iflash-solo.jpg",
    description: "SD Adaptor. SD/SDHC/SDXC/UHS-1 U1 & U3 Card Compatible",
    price: {
      link: "https://www.iflash.xyz/store/iflash-solo/",
      label: "~£29",
    },
    pros: ["Reliable and good quality"],
    cons: ["Takes up a lot of space", "You'll need to tape down the SD card"],
  },
  {
    option: "iFlash CF",
    image: "/posts/ipod-modding/storage/iflash-cf.jpg",
    description: "CF Adaptor. Supports CF (Compact Flash) cards",
    price: {
      link: "https://www.iflash.xyz/store/iflash-cf/",
      label: "~£15",
    },
    pros: ["Reliable and good quality", "Affordable", "Most power efficient"],
    cons: [
      "Take up lots of space",
      "Storage is more expensive/harder to find in larger sizes",
    ],
  },
  {
    option: "iFlash Dual",
    image: "/posts/ipod-modding/storage/iflash-dual.jpg",
    description: "Dual SD Adaptor. Supports up to 2 SD cards",
    price: {
      link: "https://www.iflash.xyz/store/iflash-dual/",
      label: "~£33",
    },
    pros: ["Reliable and good quality"],
    cons: ["Takes up a lot of space", "You'll need to tape down the SD card"],
  },
  {
    option: "iFlash Sata",
    image: "/posts/ipod-modding/storage/iflash-solo.jpg",
    description: "mSata Adaptor. Supports mSATA SSDs",
    price: {
      link: "https://www.iflash.xyz/store/iflash-sata/",
      label: "~£34",
    },
    pros: ["Reliable and good quality"],
    cons: ["SSDs consume significantly more power than other options"],
  },
  {
    option: "Generic CF",
    image: "/posts/ipod-modding/storage/aliexpress-cf.jpg",
    description: "CF Adaptor. Supports CF (Compact Flash) cards",
    price: {
      link: "https://www.aliexpress.com/item/1005006829426894.html",
      label: "~£3",
    },
    pros: ["Very cheap", "Low power consumption"],
    cons: [
      "Take up lots of space",
      "Storage is more expensive/harder to find in larger sizes",
    ],
  },
  {
    option: "Generic m.2",
    image: "/posts/ipod-modding/storage/aliexpress-m2.jpg",
    description: "m.2 Adaptor. Supports m.2 SSDs",
    price: {
      link: "https://www.aliexpress.com/item/1005005450291603.html",
      label: "~£5",
    },
    pros: ["Very cheap"],
    cons: [
      "SSDs consume significantly more power than other options",
      "Loose fit connector",
    ],
  },
  {
    option: "Generic mSATA",
    image: "/posts/ipod-modding/storage/aliexpress-msata.jpg",
    description: "mSata Adaptor. Supports mSATA SSDs",
    price: {
      link: "https://www.aliexpress.com/item/1005005753470177.html",
      label: "~£4",
    },
    pros: ["Very cheap"],
    cons: [
      "SSDs consume significantly more power than other options",
      "Loose fit connector",
    ],
  },
];

export const IpodStorageAdaptorOptionsTable = () => {
  return (
    <Accordion title="Storage adaptor comparison table">
      <Table containerClassName="!mb-0">
        <thead>
          <tr>
            {headings.map((heading) => (
              <TableHeadCell
                key={heading.label}
                style={{ width: heading.width }}
              >
                {heading.label}
              </TableHeadCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {upgrades.map((upgrade) => (
            <tr
              className={clsx({ [RECOMMENDED_BG_COLOR]: upgrade.recommended })}
              key={upgrade.option}
            >
              <TableBodyCell className="align-top">
                {upgrade.option}
              </TableBodyCell>
              <TableBodyCell>
                <Image
                  alt={`Product image for ${upgrade.option}`}
                  className="m-0"
                  height={500}
                  src={upgrade.image}
                  width={500}
                />
              </TableBodyCell>
              <TableBodyCell className="align-top">
                {upgrade.recommended && <RecommendedBadge />}
                <p>{upgrade.description}</p>
                <ProsConsList list={upgrade.pros} type="pros" />
                <ProsConsList
                  className="!mb-0"
                  list={upgrade.cons}
                  type="cons"
                />
              </TableBodyCell>
              <TableBodyCell className="align-top">
                <ConditionalWrapper
                  condition={!!upgrade.price.link}
                  wrapper={(children) => (
                    <Link href={upgrade.price.link as string}>{children}</Link>
                  )}
                >
                  {upgrade.price.label}
                </ConditionalWrapper>
              </TableBodyCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Accordion>
  );
};
