import IBlockImage from "models/blocks/IBlockImage";

export interface IPromotionBlock {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    itemTitle: string;
    oldCMSNodeId: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    image: IBlockImage;
    imagePosition: string;
    text: string;
  };
}
