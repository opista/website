export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let args: any[] | null = null;
  let context: any = null;
  const { leading = true, trailing = true } = options;

  const later = () => {
    previous = leading === false ? 0 : Date.now();
    timeout = null;
    if (args) func.apply(context, args);
    if (!timeout) args = context = null;
  };

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
      func.apply(context, args);
      if (!timeout) args = context = null;
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    previous = 0;
    timeout = null;
    args = context = null;
  };

  return throttled;
}
