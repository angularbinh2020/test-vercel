import { IETIconItem } from "sites/mogivi/models/IETIconItem";

export interface IContactsMethod {
  system: {
    id: string;
    contentType: string;
  };
  fields: {
    itemTitle: string;
    oldCMSNodeId: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    items: IETIconItem[];
  };
}
