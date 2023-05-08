import { IETLocationItem } from "./IETLocationItem";
import { IGoogleDriveDocuments } from "./IGoogleDriveDocuments";
import { IInfoGridBlock } from "./blocks/IInfoGridBlock";
import { IETLoanToolCalculationItem } from "./IETLoanToolCalculationItem";
import { IListingNews } from "./blocks/IListingNewsBlock";
import { IListingProjects } from "./blocks/IListingProjectsBlock";

export interface IETTab {
  system: {
    contentType: "eTTab";
  };
  fields: {
    anchorID: string;
    title: string;
    blocksInTab: IInfoGridBlock[] &
      IETLocationItem[] &
      IGoogleDriveDocuments[] &
      IETLoanToolCalculationItem[] &
      IListingNews[] &
      IListingProjects[];
  };
}
