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
  price: string;
  pros?: string[];
  purchase: {
    label: string;
    link?: string;
  };
};

const headings: Heading[] = [
  { label: "Option", width: "150px" },
  { label: "Image", width: "150px" },
  { label: "Description", width: "280px" },
  { label: "Purchase", width: "110px" },
];

const upgrades: Upgrade[] = [
  {
    option: "iFlash μDual",
    image: "/posts/ipod-modding/storage/iflash-udual.jpg",
    description: "Dual MicroSD Adaptor. Supports up to 2 MicroSD cards",
    price: "~£33",
    purchase: {
      link: "https://www.iflash.xyz/store/iflash-udual/",
      label: "iFlash",
    },
    pros: [
      "Reliable and good quality",
      "Fits 2 MicroSD cards",
      'Has a "break line" to dispose of the adaptor above the card slots',
    ],
    cons: ["More expensive"],
    recommended: true,
  },
  {
    option: "iFlash Quad",
    image: "/posts/ipod-modding/storage/iflash-quad.jpg",
    description: "Quad MicroSD Adaptor. Supports up to 4 MicroSD cards",
    price: "~£36",
    purchase: {
      link: "https://www.iflash.xyz/store/iflash-quad/",
      label: "iFlash",
    },
    pros: [
      "Reliable and good quality",
      "Fits 4 MicroSD cards",
      "Space for maximum mods",
    ],
    cons: ["More expensive"],
  },
  {
    option: "Generic MicroSD (imCort Design)",
    image: "/posts/ipod-modding/storage/aliexpress-microsd.jpg",
    description: "Dual MicroSD Adaptor. Supports up to 2 MicroSD cards",
    price: "~£38",
    purchase: {
      link: "https://www.aliexpress.com/item/1005003944930279.html",
      label: "AliExpress",
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
    price: "~£29",
    purchase: {
      link: "https://www.iflash.xyz/store/iflash-solo/",
      label: "iFlash",
    },
    pros: ["Reliable and good quality"],
    cons: ["Takes up a lot of space", "You'll need to tape down the SD card"],
  },
  {
    option: "iFlash CF",
    image: "/posts/ipod-modding/storage/iflash-cf.jpg",
    description: "CF Adaptor. Supports CF (Compact Flash) cards",
    price: "~£15",
    purchase: {
      link: "https://www.iflash.xyz/store/iflash-cf/",
      label: "iFlash",
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
    price: "~£33",
    purchase: {
      link: "https://www.iflash.xyz/store/iflash-dual/",
      label: "iFlash",
    },
    pros: ["Reliable and good quality"],
    cons: ["Takes up a lot of space", "You'll need to tape down the SD card"],
  },
  {
    option: "iFlash Sata",
    image: "/posts/ipod-modding/storage/iflash-solo.jpg",
    description: "mSata Adaptor. Supports mSATA SSDs",
    price: "~£34",
    purchase: {
      link: "https://www.iflash.xyz/store/iflash-sata/",
      label: "iFlash",
    },
    pros: ["Reliable and good quality"],
    cons: ["SSDs consume significantly more power than other options"],
  },
  {
    option: "Generic CF",
    image: "/posts/ipod-modding/storage/aliexpress-cf.jpg",
    description: "CF Adaptor. Supports CF (Compact Flash) cards",
    price: "~£3",
    purchase: {
      link: "https://www.aliexpress.com/item/1005006829426894.html",
      label: "AliExpress",
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
    price: "~£5",
    purchase: {
      link: "https://www.aliexpress.com/item/1005005450291603.html",
      label: "AliExpress",
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
    price: "~£4",
    purchase: {
      link: "https://www.aliexpress.com/item/1005005753470177.html",
      label: "AliExpress",
    },
    pros: ["Very cheap"],
    cons: [
      "SSDs consume significantly more power than other options",
      "Loose fit connector",
    ],
  },
];

export const IpodStorageAdaptorOptionsTable = () => (
  <Table containerClassName="!mb-0">
    <thead>
      <tr>
        {headings.map((heading) => (
          <TableHeadCell key={heading.label} style={{ width: heading.width }}>
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
            <p className="mt-0">{upgrade.option}</p>
            <p>{upgrade.price}</p>
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
            <p className="mt-0">{upgrade.description}</p>
            <ProsConsList list={upgrade.pros} type="pros" />
            <ProsConsList className="!mb-0" list={upgrade.cons} type="cons" />
          </TableBodyCell>
          <TableBodyCell className="align-top">
            <ConditionalWrapper
              condition={!!upgrade.purchase.link}
              wrapper={(children) => (
                <Link href={upgrade.purchase.link as string}>{children}</Link>
              )}
            >
              {upgrade.purchase.label}
            </ConditionalWrapper>
          </TableBodyCell>
        </tr>
      ))}
    </tbody>
  </Table>
);
