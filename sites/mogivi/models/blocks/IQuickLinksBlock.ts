import { IETQuickLink } from "../IETQuickLink";

export interface IQuickLinksBlock {
  system: {
    contentType: "quickLinks";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    items: IETQuickLink[];
  };
}
