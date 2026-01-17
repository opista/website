export interface ThrottleSettings {
  leading?: boolean;
  trailing?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ThrottledFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds.
 *
 * Adapted from Lodash 4.17.21 (https://github.com/lodash/lodash)
 * to provide a lightweight alternative without the full library dependency.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleSettings = {}
): ThrottledFunc<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let context: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let args: any[] | null;
  let result: ReturnType<T> | undefined;
  let previous = 0;

  const { leading = true, trailing = true } = options;

  const later = function () {
    previous = leading === false ? 0 : Date.now();
    timeout = null;
    if (args) {
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttled = function (this: any, ..._args: Parameters<T>) {
    const now = Date.now();
    if (!previous && leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = _args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    if (timeout) clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
