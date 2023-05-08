import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "./ILinkInfo";

export interface IETImageLink {
  system: {
    id: string;
    contentType: "eTImageLink";
  };
  fields: {
    title: "IOS app";
    imageDesktop: IBlockImage;
    imageMobile: IBlockImage;
    links: ILinkInfo[];
  };
}
