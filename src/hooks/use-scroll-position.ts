import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = useMemo(
    () =>
      throttle(() => {
        setScrollPosition(window.scrollY);
      }, 100),
    []
  );

  useEffect(() => {
    // Initial set
    setScrollPosition(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      onScroll.cancel();
    };
  }, [onScroll]);

  return scrollPosition;
};
