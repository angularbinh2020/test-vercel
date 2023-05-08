import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "./ILinkInfo";

export interface IETProductItem {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    title: string;
    text: string;
    image: IBlockImage;
    links: ILinkInfo[];
  };
}
