import IBlockImage from "models/blocks/IBlockImage";
import { IFile } from "./IFile";
import { IETImageCardItem } from "./IETImageCardItem";

export interface IETProgressReport {
  system: {
    contentType: "eTProgressReport";
    id: string;
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    images: IETImageCardItem[];
  };
}
