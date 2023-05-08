import IBlockImage from "models/blocks/IBlockImage";
import { INode } from "../INode";

export interface IContactBlock {
  system: {
    contentType: "contactBlock";
    id: string;
  };
  fields: {
    itemTitle: string;
    image: IBlockImage;
    imageDescription: string;
    aPISetting: INode[];
  };
}
