import { IETTab } from "../IETTab";

export interface IProjectModule {
  system: {
    contentType: "projectModule";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    contentBgColour: string;
    pageSummary: string;
    tabs: IETTab[];
  };
}
