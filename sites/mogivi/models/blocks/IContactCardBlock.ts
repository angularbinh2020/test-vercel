import IBlockImage from "models/blocks/IBlockImage";

export interface IContactCardBlock {
  system: {
    contentType: "contactCardBlock";
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
    topText: string;
    bottomText: string;
  };
}
