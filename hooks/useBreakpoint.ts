import { useState, useEffect } from "react";
import { throttle } from "lodash";
import { Breakpoint } from "~/constants/global";

const getDeviceConfig = (width: number) => {
  if (width < 480) {
    return Breakpoint.XS;
  } else if (width >= 480 && width < 720) {
    return Breakpoint.SM;
  } else if (width >= 720 && width < 1024) {
    return Breakpoint.MD;
  } else if (width >= 1024) {
    return Breakpoint.LG;
  }
};

const useBreakpoint = (): Breakpoint | undefined => {
  const [brkPnt, setBrkPnt] = useState<Breakpoint | undefined>(undefined);
  const [isMounted, setIsMouted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setBrkPnt(getDeviceConfig(window.innerWidth));
      setIsMouted(!isMounted);
    }

    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, 200);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, [isMounted]);

  return brkPnt;
};
export default useBreakpoint;
