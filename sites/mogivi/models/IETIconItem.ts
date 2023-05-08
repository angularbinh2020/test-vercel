import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "./ILinkInfo";

export interface IETIconItem {
  system: {
    contentType: "eTIconItem";
    id: string;
  };
  fields: {
    icon: IBlockImage;
    title: string;
    text: string;
    link: ILinkInfo;
  };
}
