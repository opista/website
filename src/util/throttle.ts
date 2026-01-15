export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number = 0;
  let storedArgs: Parameters<T> | null = null;
  let storedThis: any = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = limit - (now - lastRan);

    storedArgs = args;
    storedThis = this;

    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastRan = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastRan = Date.now();
        timeout = null;
        if (storedArgs) {
             func.apply(storedThis, storedArgs);
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastRan = 0;
    storedArgs = null;
    storedThis = null;
  };

  return throttled;
}
