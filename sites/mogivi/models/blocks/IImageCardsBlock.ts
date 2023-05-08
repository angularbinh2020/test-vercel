import IBlockImage from "models/blocks/IBlockImage";
import { IETImageCardItem } from "../IETImageCardItem";

export interface IImageCardsBlock {
  system: {
    contentType: "imageCardsBlock";
  };
  fields: {
    contentBgColour: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    excludeFromSearch: boolean;
    itemTitle: string;
    pageSummary: string;
    groupBlocks: IETImageCardItem[];
    backgroundImage: IBlockImage;
  };
}
