import IBlockImage from "models/blocks/IBlockImage";
import { IETSearchService } from "./ISearchModule";

export interface IBannerSearch {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    itemTitle: string;
    contentBgColour: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    excludeFromSearch: boolean;
    pageSummary: string;
    subtitle: string;
    iconSearch: IBlockImage;
    bannerBackground: IBlockImage;
    blocks: IETSearchService[];
  };
}
