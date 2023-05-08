import { useMemo } from "react";
import useViewMode from "hooks/useViewMode";

interface Options {
  disableDesktopWeb: boolean;
  disableMobileApp: boolean;
  disableMobileWeb: boolean;
}

export const useHiddenOnDevice = (options: Options | any) => {
  const { disableDesktopWeb, disableMobileApp, disableMobileWeb } = options;
  const { isDesktop, isMobile, isMobileApp } = useViewMode();
  const isHidden = useMemo(() => {
    return (
      (disableMobileApp && isMobileApp) ||
      (disableMobileWeb && isMobile) ||
      (disableDesktopWeb && isDesktop)
    );
  }, [isDesktop, isMobile, isMobileApp]);
  return isHidden;
};
