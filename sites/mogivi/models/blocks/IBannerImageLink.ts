import IBlockImage from "models/blocks/IBlockImage";
import { IETImageSlider } from "../IETImageSlider";
import { ILinkInfo } from "../ILinkInfo";

export interface IBannerImageLink {
  system: {
    contentType: "bannerImageLink";
    id: string;
  };
  fields: {
    title: string;
    text: string;
    image: IBlockImage;
    imageLink: IETImageSlider[];
    link: ILinkInfo;
    themes: string;
  };
}
