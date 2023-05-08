import IBlockImage from "models/blocks/IBlockImage";
import { IETServiceItem } from "../IETServiceItem";

export interface IPromotionAnimatedServices {
  system: {
    contentType: "promotionAnimatedServices";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    contentBgColour: string;
    video: IBlockImage;
    cover: IBlockImage;
    items: IETServiceItem[];
  };
}
