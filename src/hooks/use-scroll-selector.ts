import { useCallback, useSyncExternalStore } from "react";

import { throttle } from "@/util/throttle";

export function useScrollSelector<T>(
  selector: (scrollY: number) => T,
  wait = 100
): T {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleScroll = throttle(onStoreChange, wait);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        handleScroll.cancel();
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [wait]
  );

  const getSnapshot = () =>
    selector(typeof window !== "undefined" ? window.scrollY : 0);
  const getServerSnapshot = () => selector(0);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
