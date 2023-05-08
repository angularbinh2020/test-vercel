import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "../ILinkInfo";

export interface IBannerCover {
  system: {
    contentType: "bannerCover";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    image: IBlockImage;
    text: string;
    links: ILinkInfo[];
  };
}
