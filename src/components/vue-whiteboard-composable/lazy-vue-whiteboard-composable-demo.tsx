"use client";

import dynamic from "next/dynamic";

import { WhiteboardSkeleton } from "./whiteboard-skeleton";

export const LazyVueWhiteboardComposableDemo = dynamic(
  () =>
    import("./vue-whiteboard-composable-demo").then(
      (mod) => mod.VueWhiteboardComposableDemo,
    ),
  {
    loading: () => <WhiteboardSkeleton />,
    ssr: false,
  },
);
