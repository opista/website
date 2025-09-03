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
];

export const IpodFaceplateOptionsTable5Gen = () => (
  <IpodPlateOptionsTable plates={faceplates} />
);
