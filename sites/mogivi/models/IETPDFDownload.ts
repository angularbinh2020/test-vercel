import IBlockImage from "models/blocks/IBlockImage";
import { IFile } from "./IFile";

export interface IETPDFDownload {
  system: {
    contentType: "eTPDFDownload";
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
    coverPaper: IFile;
    pdfFile: IFile;
  };
}
