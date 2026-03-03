import { cn } from "@/util/cn";
import { ConditionalWrapper } from "../conditional-wrapper";
import { Image } from "../image";
import { Link } from "../link";
import { ProsConsList } from "../pros-cons-list";
import { RECOMMENDED_BG_COLOR, RecommendedBadge } from "../recommended-badge";
import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";

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
];

const upgrades: Upgrade[] = [
  {
    cons: ["More expensive"],
    description: "Dual MicroSD Adaptor. Supports up to 2 MicroSD cards",
    image: "/posts/ipod-modding/storage/iflash-udual.jpg",
    option: "iFlash uDUAL",
    price: "~£33",
    pros: [
      "Reliable and good quality",
      "Fits 2 MicroSD cards",
      'Has a "break line" to dispose of the adaptor above the card slots',
    ],
    purchase: {
      label: "iFlash",
      link: "https://www.iflash.xyz/store/iflash-udual/",
    },
    recommended: true,
  },
  {
    cons: ["More expensive"],
    description: "Quad MicroSD Adaptor. Supports up to 4 MicroSD cards",
    image: "/posts/ipod-modding/storage/iflash-quad.jpg",
    option: "iFlash Quad",
    price: "~£36",
    pros: ["Reliable and good quality", "Fits 4 MicroSD cards", "Space for maximum mods"],
    purchase: {
      label: "iFlash",
      link: "https://www.iflash.xyz/store/iflash-quad/",
    },
  },
  {
    cons: ["Loose fit connector"],
    description: "Dual MicroSD Adaptor. Supports up to 2 MicroSD cards",
    image: "/posts/ipod-modding/storage/aliexpress-speedier-microsd.jpg",
    option: 'Generic MicroSD "Speedier"',
    price: "~£9",
    pros: ["Incredibly cheap", "Fits 2 MicroSD cards", "Small form factor"],
    purchase: {
      label: "AliExpress",
      link: "https://s.click.aliexpress.com/e/_c4bAJGqJ",
    },
  },
  {
    cons: ["Most expensive"],
    description: "Dual MicroSD Adaptor. Supports up to 2 MicroSD cards",
    image: "/posts/ipod-modding/storage/aliexpress-microsd.jpg",
    option: "Generic MicroSD (imCort Design)",
    price: "~£38",
    pros: ["Very compact", "Great mechanism for holding cards", "Space for maximum mods"],
    purchase: {
      label: "AliExpress",
      link: "https://s.click.aliexpress.com/e/_oC7IDBH",
    },
  },
  {
    cons: ["Takes up a lot of space", "You'll need to tape down the SD card"],
    description: "SD Adaptor. SD/SDHC/SDXC/UHS-1 U1 & U3 Card Compatible",
    image: "/posts/ipod-modding/storage/iflash-solo.jpg",
    option: "iFlash Solo",
    price: "~£29",
    pros: ["Reliable and good quality"],
    purchase: {
      label: "iFlash",
      link: "https://www.iflash.xyz/store/iflash-solo/",
    },
  },
  {
    cons: ["Take up lots of space", "Storage is expensive in larger sizes"],
    description: "CF Adaptor. Supports CF (Compact Flash) cards",
    image: "/posts/ipod-modding/storage/iflash-cf.jpg",
    option: "iFlash CF",
    price: "~£15",
    pros: ["Reliable and good quality", "Affordable", "Most power efficient"],
    purchase: {
      label: "iFlash",
      link: "https://www.iflash.xyz/store/iflash-cf/",
    },
  },
  {
    cons: ["Takes up a lot of space", "You'll need to tape down the SD card"],
    description: "Dual SD Adaptor. Supports up to 2 SD cards",
    image: "/posts/ipod-modding/storage/iflash-dual.jpg",
    option: "iFlash Dual",
    price: "~£33",
    pros: ["Reliable and good quality"],
    purchase: {
      label: "iFlash",
      link: "https://www.iflash.xyz/store/iflash-dual/",
    },
  },
  {
    cons: ["SSDs consume significantly more power than other options"],
    description: "mSata Adaptor. Supports mSATA SSDs",
    image: "/posts/ipod-modding/storage/iflash-solo.jpg",
    option: "iFlash Sata",
    price: "~£34",
    pros: ["Reliable and good quality"],
    purchase: {
      label: "iFlash",
      link: "https://www.iflash.xyz/store/iflash-sata/",
    },
  },
  {
    cons: ["Take up lots of space", "Storage is expensive in larger sizes"],
    description: "CF Adaptor. Supports CF (Compact Flash) cards",
    image: "/posts/ipod-modding/storage/aliexpress-cf.jpg",
    option: "Generic CF",
    price: "~£3",
    pros: ["Very cheap", "Low power consumption"],
    purchase: {
      label: "AliExpress",
      link: "https://s.click.aliexpress.com/e/_omitNyJ",
    },
  },
  {
    cons: ["SSDs consume significantly more power than other options", "Loose fit connector"],
    description: "m.2 Adaptor. Supports m.2 SSDs",
    image: "/posts/ipod-modding/storage/aliexpress-m2.jpg",
    option: "Generic m.2",
    price: "~£5",
    pros: ["Very cheap"],
    purchase: {
      label: "AliExpress",
      link: "https://s.click.aliexpress.com/e/_oDrGLNZ",
    },
  },
  {
    cons: ["SSDs consume significantly more power than other options", "Loose fit connector"],
    description: "mSata Adaptor. Supports mSATA SSDs",
    image: "/posts/ipod-modding/storage/aliexpress-msata.jpg",
    option: "Generic mSATA",
    price: "~£4",
    pros: ["Very cheap"],
    purchase: {
      label: "AliExpress",
      link: "https://s.click.aliexpress.com/e/_oBHuxph",
    },
  },
];

export const IpodStorageAdaptorOptionsTable = () => (
  <Table containerClassName="mb-0!">
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
        <tr className={cn({ [RECOMMENDED_BG_COLOR]: upgrade.recommended })} key={upgrade.option}>
          <TableBodyCell className="align-top">
            <p className="mt-0">{upgrade.option}</p>
            <p>{upgrade.price}</p>
            <div>
              <p className="mb-0">Purchase:</p>
              <ConditionalWrapper
                condition={!!upgrade.purchase.link}
                wrapper={(children) => (
                  <Link href={upgrade.purchase.link as string}>{children}</Link>
                )}
              >
                {upgrade.purchase.label}
              </ConditionalWrapper>
            </div>
          </TableBodyCell>
          <TableBodyCell>
            <Image
              alt={`Product image for ${upgrade.option}`}
              className="m-0!"
              expandable
              height={500}
              src={upgrade.image}
              width={500}
            />
          </TableBodyCell>
          <TableBodyCell className="align-top">
            {upgrade.recommended && <RecommendedBadge />}
            <p className="mt-0">{upgrade.description}</p>
            <ProsConsList list={upgrade.pros} type="pros" />
            <ProsConsList className="mb-0!" list={upgrade.cons} type="cons" />
          </TableBodyCell>
          <TableBodyCell className="align-top"></TableBodyCell>
        </tr>
      ))}
    </tbody>
  </Table>
);
