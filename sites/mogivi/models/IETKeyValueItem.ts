import { IFileContent } from "models/IFileContent";

export interface IETKeyValueItem {
  system: {
    contentType: "eTKeyValueItem";
    id: string;
  };
  fields: {
    key: string;
    value: string;
    label: string;
    text: string;
    image: IFileContent;
    block: string;
    procedure: any;
    moreInfo: IETKeyValueItem[];
  };
}
