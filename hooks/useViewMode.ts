import { useEffect, useState } from "react";

const useViewMode = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [isMobileS, setIsMobileS] = useState(false);
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    const updateState = function () {
      const initIsDesktop = window?.innerWidth >= 1024;
      const initIsMobile = window?.innerWidth < 1024;
      const initIsMobileS = window?.innerWidth <= 414;
      const searchParams = new URLSearchParams(window?.location?.search);
      const initIsMobileApp = Boolean(searchParams.get("ViewMobileApp"));
      setIsDesktop(initIsDesktop);
      setIsMobileApp(initIsMobileApp);
      setIsMobile(initIsMobile);
      setIsMobileS(initIsMobileS);
    };
    updateState();
    window.addEventListener("resize", updateState);
    setReady(true);
    return () => window.removeEventListener("resize", updateState);
  }, []);
  return { isDesktop, isMobile, isMobileApp, isMobileS, isReady };
};

export default useViewMode;
