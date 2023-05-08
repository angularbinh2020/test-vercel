import { IETReviewItem } from "../IETReviewItem";

export interface IReviewsBlock {
  system: {
    contentType: "reviews";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    reviewsList: IETReviewItem[];
  };
}
