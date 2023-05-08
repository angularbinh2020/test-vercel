import { IETSettingsAPIItem } from "../IETSettingsAPIItem";

type IPropertiesItem = {
  Name: string;
  Text: string;
};

type INewsItem = {
  MgvNewsId: "MGV0257";
  Properties: IPropertiesItem[];
  Tags: string[];
};

type ITabViewsItem = {
  Name: string;
  ViewAllURL: string;
  ViewAllText: string;
  News: INewsItem[];
};

export interface IListingNews {
  system: {
    contentType: "listingNews";
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
    TabViews: ITabViewsItem[];
  };
}
