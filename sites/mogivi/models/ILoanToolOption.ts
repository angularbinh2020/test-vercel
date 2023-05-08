import { ILoanCalculationToolBlock } from "./blocks/ILoanCalculationToolBlock";

export interface ILoanToolOption {
  contentName: string;
  contentSegmentUrl: string;
  node: ILoanCalculationToolBlock;
  id: string;
  linkType: string;
  type: string;
}
