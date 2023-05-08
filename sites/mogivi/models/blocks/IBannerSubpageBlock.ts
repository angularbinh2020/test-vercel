import IBlockImage from "../../../../models/blocks/IBlockImage";
import { ILinkInfo } from "../ILinkInfo";

export interface IBannerSubpageBlock {
  system: {
    contentType: "bannerSubpageBlock";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    backgroundImageSize: string;
    backgroundImagePosition: string;
    contentPosition: string;
    buttonArrow: string;
    image: IBlockImage;
    subtitle: string;
    links: ILinkInfo[];
    textBackground: boolean;
  };
}
