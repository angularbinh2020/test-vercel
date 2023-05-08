import { IFileContent } from "./../../../models/IFileContent";
export interface IETImageCardItem {
  system: {
    contentType: "eTImageCardItem";
    id: string;
  };
  fields: {
    description: string;
    image: IFileContent;
  };
}
