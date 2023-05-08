import { IFormBlock } from "models/blocks/IFormBlock";
import { IMinMax } from "models/IMinMax";

export interface ILoanCalculationToolBlock {
  system: {
    contentType: "loanCalculationToolBlock";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    realEstateValue: IMinMax;
    lowestLoan: number;
    maxPercentLoan: number;
    yearInterestRate: IMinMax;
    loanTermYears: string[];
    submitRequestForm: IFormBlock[];
  };
}
