import { IETIconItem } from "../IETIconItem";

export interface IChecklistBlock {
  system: {
    contentType: "checklist";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    icons: IETIconItem[];
    checklistItems: string[];
  };
}
