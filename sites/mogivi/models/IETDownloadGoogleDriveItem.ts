import { IFileContent } from "models/IFileContent";
import { ILinkInfo } from "./ILinkInfo";

export interface IETDownloadGoogleDriveItem {
  system: {
    contentType: "eTDownloadGoogleDriveItem";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    cover: IFileContent;
    googleDriveURL: ILinkInfo;
  };
}
