import IBlockImage from "models/blocks/IBlockImage";
import { ILinkInfo } from "./ILinkInfo";

export interface IETImageSlider {
  system: {
    contentType: "eTImageSlider";
  };
  fields: {
    itemTitle: string;
    subtitle: string;
    image: IBlockImage;
    link: ILinkInfo;
  };
}
