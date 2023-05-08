import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "./ILinkInfo";

export interface IETBannerCarousel {
  system: {
    id: string;
    contentType: "eTBannerCarousel";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    contentBgColour: string;
    text: string;
    backgroundImage: IBlockImage;
    backgroundImageMobile: IBlockImage;
    link: ILinkInfo;
  };
}
