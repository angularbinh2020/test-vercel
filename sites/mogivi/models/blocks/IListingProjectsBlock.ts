import { IETSettingsAPIItem } from "../IETSettingsAPIItem";

type IPropertiesItem = {
  Name: string;
  Text: string;
};

type IProjectsItem = {
  Properties: IPropertiesItem[];
  Tags: string[];
  items: any;
};

export interface IListingProjects {
  system: {
    contentType: "listingProjects";
  };
  fields: {
    contentBgColour: string;
    disableDesktopWeb: boolean;
    disableMobileApp: boolean;
    disableMobileWeb: boolean;
    excludeFromSearch: boolean;
    itemTitle: string;
    pageSummary: string;
    settingsAPI: IETSettingsAPIItem[];
    // projectViews: IProjectsItem[];
    projectViews: IProjectsItem;
  };
}
