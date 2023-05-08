import IBlockImage from "models/blocks/IBlockImage";
import { IETImageLink } from "../IETImageLink";

export interface IBannerFooterApp {
  system: {
    contentType: "bannerFooterApp";
    id: string;
  };
  fields: {
    title: string;
    subtitle: string;
    subtitleMobile: string;
    qRCode: IBlockImage;
    links: IETImageLink[];
    backgroundImage: IBlockImage;
    footerMobileImage: IBlockImage;
    footerMobileLogo: IBlockImage;
  };
}
