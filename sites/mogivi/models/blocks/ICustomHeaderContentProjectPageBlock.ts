import { IFileContent } from "./../../../../models/IFileContent";
import { IETSettingsAPIItem } from "../IETSettingsAPIItem";

export interface ICustomHeaderContentProjectPageBlock {
  system: {
    contentType: "customHeaderContentProjectPageBlock";
  };
  fields: {
    aPISearchSettings: IETSettingsAPIItem[];
    contentBgColour: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    excludeFromSearch: boolean;
    itemTitle: string;
    leftImage: IFileContent;
    middleImage: IFileContent;
    pageSummary: string;
    apiSearchUrl: string;
  };
}
