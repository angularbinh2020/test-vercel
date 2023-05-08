import { ILinkInfo } from "sites/mogivi/models/ILinkInfo";

export interface ITextBlock {
  system: {
    contentType: "text";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    content: string;
    buttons: ILinkInfo[];
  };
}
