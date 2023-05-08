import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "./ILinkInfo";

export interface IETServiceAnimatedItem {
  system: {
    contentType: "eTServiceAnimatedItem";
  };
  fields: {
    title: string;
    description: string;
    image: IBlockImage;
    buttons: ILinkInfo[];
  };
}
