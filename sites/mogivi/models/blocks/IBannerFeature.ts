import IBlockImage from "models/blocks/IBlockImage";
import { IETIconItem } from "../IETIconItem";

export interface IBannerFeature {
  system: {
    contentType: "bannerFeature";
    id: string;
  };
  fields: {
    title: string;
    subtitle: string;
    leftContent: IETIconItem[];
    middleContent: IBlockImage;
    rightContent: IETIconItem[];
  };
}
