import {
  IpodFaceplateOptionsTable,
  IpodFaceplateOptionsTableProps,
} from "./ipod-faceplate-options-table";

const faceplates: IpodFaceplateOptionsTableProps["faceplates"] = [
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

export const IpodFaceplateOptionsTable5Gen = () => (
  <IpodFaceplateOptionsTable faceplates={faceplates} />
);
