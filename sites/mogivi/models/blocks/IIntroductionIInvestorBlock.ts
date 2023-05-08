import IBlockImage from "../../../../models/blocks/IBlockImage";
import { ILinkInfo } from "../ILinkInfo";

export interface IIntroductionIInvestorBlock {
  system: {
    contentType: "introductionIInvestorBlock";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    introductionText: string;
    investorLogo: IBlockImage;
    tel: string;
    website: ILinkInfo;
    foundingDate: string;
    addressNo: string;
    location: any;
    locationLatitude: string;
    locationLongitude: string;
  };
}
