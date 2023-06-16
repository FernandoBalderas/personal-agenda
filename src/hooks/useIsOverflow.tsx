import React, { MutableRefObject } from "react";

const useIsOverflow = (
  ref: MutableRefObject<any>,
  callback: (hasOverflow: boolean) => any
) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean>();

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      }

      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};

export default useIsOverflow;
