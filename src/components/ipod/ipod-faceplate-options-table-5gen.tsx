import {
  IpodPlateOptionsTable,
  IpodPlateOptionsTableProps,
} from "./ipod-plate-options-table";

const faceplates: IpodPlateOptionsTableProps["plates"] = [
  {
    name: "Black",
    image: "/posts/ipod-modding/faceplates/gen5/black.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omgf0Lt",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_optC9yP",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_olXvZx5",
      },
    ],
  },
  {
    name: "Blue",
    image: "/posts/ipod-modding/faceplates/gen5/blue.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omgf0Lt",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_optC9yP",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_olXvZx5",
      },
    ],
  },
  {
    name: "Blue (Transparent)",
    image: "/posts/ipod-modding/faceplates/gen5/blue-transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omNrU6d",
      },
    ],
  },
  {
    name: "Green (Transparent)",
    image: "/posts/ipod-modding/faceplates/gen5/green-transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_oFgp8QR",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_oCeJdP9",
      },
    ],
  },

  {
    name: "Grey (Transparent)",
    image: "/posts/ipod-modding/faceplates/gen5/grey-transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omNrU6d",
      },
    ],
  },
  {
    name: "Purple",
    image: "/posts/ipod-modding/faceplates/gen5/purple.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omgf0Lt",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_optC9yP",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_olXvZx5",
      },
    ],
  },

  {
    name: "Purple (Transparent)",
    image: "/posts/ipod-modding/faceplates/gen5/purple-transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omNrU6d",
      },
    ],
  },
  {
    name: "Red",
    image: "/posts/ipod-modding/faceplates/gen5/red.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omgf0Lt",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_optC9yP",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_olXvZx5",
      },
    ],
  },
  {
    name: "Red (Transparent)",
    image: "/posts/ipod-modding/faceplates/gen5/red-transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_oFgp8QR",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_oCeJdP9",
      },
    ],
  },
  {
    name: "Transparent",
    image: "/posts/ipod-modding/faceplates/gen5/transparent.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omgf0Lt",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_optC9yP",
      },
    ],
  },
  {
    name: "White",
    image: "/posts/ipod-modding/faceplates/gen5/white.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omgf0Lt",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_optC9yP",
      },
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_olXvZx5",
      },
    ],
  },
  {
    name: "Yellow",
    image: "/posts/ipod-modding/faceplates/gen5/yellow.png",
    purchase: [
      {
        label: "AliExpress",
        link: "https://s.click.aliexpress.com/e/_omgf0Lt",
      },
    ],
  },
  {
    name: "Atomic (Custom made by EOE)",
    image: "/posts/ipod-modding/faceplates/gen5/eoe-atomic.png",
    purchase: [
      {
        label: "EOE",
        link: "https://eoe.works/collections/atomic-parts-for-ipod-video",
      },
    ],
  },
];

export const IpodFaceplateOptionsTable5Gen = () => (
  <IpodPlateOptionsTable plates={faceplates} />
);
