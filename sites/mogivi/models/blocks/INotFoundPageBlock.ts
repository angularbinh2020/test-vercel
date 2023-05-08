import IBlockImage from "../../../../models/blocks/IBlockImage";

export interface INotFoundPageBlock {
  system: {
    contentType: "notFoundPageBlock";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    backgroundImage: IBlockImage;
  };
}
