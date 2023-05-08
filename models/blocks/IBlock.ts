import { IETTab } from "sites/mogivi/models/IETTab";
import IBlockImage from "./IBlockImage";

export interface IBlock {
  system: {
    contentType: string;
    id: string;
    urlSegment?: string;
    editedAt?: string;
  };
  fields: {
    title?: string;
    itemTitle?: string;
    excludeFromSearch?: boolean;
    pageSummary?: string;
    disableDesktopWeb?: boolean;
    disableMobileWeb?: boolean;
    disableMobileApp?: boolean;
    contentBgColour?: string;
    introductionText: string;
    content?: string;
    metaKeywords?: string;
    metaDescription?: string;
    pageTitle?: string;
    items?: {
      fields: {
        question: string;
        answer: string;
      };
    }[];
    blocks?: IBlock[];
    tabs: IETTab[];
    investorLogo?: IBlockImage;
    startDate?: string;
    subcribeAPI?: {
      askMoreInfo?: string;
      callBackToMe?: string;
      receiveLoanSpreadsheets?: string;
    };
    breadcrumbs?: any;
  };
}
