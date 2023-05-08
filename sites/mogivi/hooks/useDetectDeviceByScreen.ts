import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core";

const useDetectDeviceByScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = !isMobile && isTabletOrMobile;
  const isLaptop = useMediaQuery(theme.breakpoints.only("lg"));
  const isLaptopOrPc = !isTabletOrMobile;
  return { isMobile, isTablet, isTabletOrMobile, isLaptop, isLaptopOrPc };
};

export default useDetectDeviceByScreen;
