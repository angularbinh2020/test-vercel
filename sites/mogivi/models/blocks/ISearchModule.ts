import { IETReviewItem } from "../IETReviewItem";
import { INode } from "../INode";

export interface ISearchModule {
  system: {
    contentType: "searchModule";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    servicesSearch: IETSearchService[];
  };
}

export interface IETSearchService {
  system: {
    contentType: "eTSearchService";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    serviceType: INode;
    apiSecretKey: string;
    filtersOptions: any;
    apiSearchSettings: any;
  };
}
