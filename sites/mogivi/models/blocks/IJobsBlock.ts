import { IETJobItem } from "../IETJobItem";

export interface IJobTabs {
  system: {
    contentType: "jobTabs";
  };
  fields: {
    title: string;
    jobTabItem: IETJobItem[];
  };
}

export interface IJobsBlock {
  system: {
    contentType: "jobsBlock";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    anchorId: string;
    tabItems: IJobTabs[];
  };
}
