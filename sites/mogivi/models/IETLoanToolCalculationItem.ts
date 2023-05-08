import ITag from "models/ITag";
import { IETKeyValueItem } from "./IETKeyValueItem";
import { ILoanToolOption } from "./ILoanToolOption";
import { ILinkInfo } from "./ILinkInfo";
export interface IETLoanToolCalculationItem {
  system: {
    contentType: "eTLoanToolCalculationItem";
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
    loanToolOption: ILoanToolOption;
  };
}
