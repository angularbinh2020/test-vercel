import { IETCounter } from "../IETCounterItem";

export interface ICounter {
  system: {
    contentType: "counter";
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
    subtitle: string;
    items: IETCounter[];
  };
}
