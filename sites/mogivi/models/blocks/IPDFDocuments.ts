import { IETPDFDownload } from "../IETPDFDownload";

export interface IPDFDocuments {
  system: {
    contentType: "pDFDocuments";
    id: string;
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    documents: IETPDFDownload[];
  };
}
