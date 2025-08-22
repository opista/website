import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";
import { Heading } from "../heading";
import { Image } from "../image";
import { Link } from "../link";

type Heading = {
  label: string;
  width?: string;
};
type PurchaseOption = {
  label: string;
  link: string;
};

type Faceplate = {
  name: string;
  image: string;
  purchase: PurchaseOption[];
};

const headings: Heading[] = [
  { label: "Colour", width: "170px" },
  { label: "Image", width: "250px" },
  { label: "Purchase", width: "150px" },
];

const faceplatesGen5: Faceplate[] = [
  {
    name: "Black",
    image: "/posts/ipod-modding/faceplates/gen5/black.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004655859764.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009179681874.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008072732788.html",
      },
    ],
  },
  {
    name: "Blue",
    image: "/posts/ipod-modding/faceplates/gen5/blue.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004655859764.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009179681874.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008072732788.html",
      },
    ],
  },
  {
    name: "Green (Transparent)",
    image: "/posts/ipod-modding/faceplates/gen5/green-transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009344395215.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009342173766.html",
      },
    ],
  },
  {
    name: "Purple",
    image: "/posts/ipod-modding/faceplates/gen5/purple.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004655859764.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009179681874.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008072732788.html",
      },
    ],
  },
  {
    name: "Red",
    image: "/posts/ipod-modding/faceplates/gen5/red.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004655859764.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009179681874.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008072732788.html",
      },
    ],
  },
  {
    name: "Red (Transparent)",
    image: "/posts/ipod-modding/faceplates/gen5/red-transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009344395215.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009342173766.html",
      },
    ],
  },
  {
    name: "Transparent",
    image: "/posts/ipod-modding/faceplates/gen5/transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004655859764.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009179681874.html",
      },
    ],
  },
  {
    name: "White",
    image: "/posts/ipod-modding/faceplates/gen5/white.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004655859764.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009179681874.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008072732788.html",
      },
    ],
  },
  {
    name: "Yellow",
    image: "/posts/ipod-modding/faceplates/gen5/yellow.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004655859764.html",
      },
    ],
  },
];

const faceplatesGen67: Faceplate[] = [
  {
    name: "Black",
    image: "/posts/ipod-modding/faceplates/gen6/black.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009180769933.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004695492443.html",
      },
    ],
  },
  {
    name: "Blue",
    image: "/posts/ipod-modding/faceplates/gen6/blue.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009180769933.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004695492443.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004627744764.html",
      },
    ],
  },
  {
    name: "Gold",
    image: "/posts/ipod-modding/faceplates/gen6/gold.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009180769933.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004695492443.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004627744764.html",
      },
    ],
  },
  {
    name: "Green",
    image: "/posts/ipod-modding/faceplates/gen6/green.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009180769933.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004695492443.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004627744764.html",
      },
    ],
  },
  {
    name: "Grey",
    image: "/posts/ipod-modding/faceplates/gen6/grey.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009180769933.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004695492443.html",
      },
    ],
  },
  {
    name: "Pink",
    image: "/posts/ipod-modding/faceplates/gen6/pink.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008680263350.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008838097859.html",
      },
    ],
  },
  {
    name: "Purple",
    image: "/posts/ipod-modding/faceplates/gen6/purple.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004627744764.html",
      },
    ],
  },
  {
    name: "Red",
    image: "/posts/ipod-modding/faceplates/gen6/red.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009180769933.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004695492443.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004627744764.html",
      },
    ],
  },
  {
    name: "Silver",
    image: "/posts/ipod-modding/faceplates/gen6/silver.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005009180769933.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005004695492443.html",
      },
    ],
  },
  {
    name: "Turquoise",
    image: "/posts/ipod-modding/faceplates/gen6/turquoise.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008149912335.html",
      },
      {
        label: "AliExpress",
        link: "https://www.aliexpress.com/item/1005008838097859.html",
      },
    ],
  },
];

export const IpodFaceplateOptionsTable = () => (
  <>
    <Heading level="h4">5th Generation</Heading>
    <Table>
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
        {faceplatesGen5.map(({ image, name, purchase }) => (
          <tr key={name}>
            <TableBodyCell className="align-top">
              <p className="mt-0">{name}</p>
            </TableBodyCell>
            <TableBodyCell>
              <Image
                alt={`Example of a ${name} 5th generation faceplate`}
                className="m-0"
                height={500}
                src={image}
                width={500}
              />
            </TableBodyCell>
            <TableBodyCell className="align-top">
              {purchase.map((option) => (
                <Link className="block" href={option.link} key={option.link}>
                  {option.label}
                </Link>
              ))}
            </TableBodyCell>
          </tr>
        ))}
      </tbody>
    </Table>
    <Heading level="h4">6/7th Generation</Heading>
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
        {faceplatesGen67.map(({ image, name, purchase }) => (
          <tr key={name}>
            <TableBodyCell className="align-top">
              <p className="mt-0">{name}</p>
            </TableBodyCell>
            <TableBodyCell>
              <Image
                alt={`Example of a ${name} 67/th generation faceplate`}
                className="m-0"
                height={500}
                src={image}
                width={500}
              />
            </TableBodyCell>
            <TableBodyCell className="align-top">
              {purchase.map((option) => (
                <Link className="block" href={option.link} key={option.link}>
                  {option.label}
                </Link>
              ))}
            </TableBodyCell>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);
