import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "./ILinkInfo";

export interface IETQuickLink {
  system: {
    contentType: "eTQuickLink";
  };
  fields: {
    image: IBlockImage;
    label: string;
    link: ILinkInfo;
    subheading: string;
  };
}
