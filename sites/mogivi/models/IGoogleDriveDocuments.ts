import { IETDownloadGoogleDriveItem } from "./IETDownloadGoogleDriveItem";

export interface IGoogleDriveDocuments {
  system: {
    contentType: "googleDriveDocuments";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    groupBlocks: IETDownloadGoogleDriveItem[];
  };
}
