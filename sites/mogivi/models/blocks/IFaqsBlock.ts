import { IETFAQItem } from "../IETFAQItem";

export interface IFAQTabs {
  system: {
    contentType: "faqTabs";
  };
  fields: {
    title: string;
    faqItem: IETFAQItem[];
  };
}

export interface IFaqsBlock {
  system: {
    contentType: "faqsBlock";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    item: IETFAQItem[];
    tabItems: IFAQTabs[];
  };
}
