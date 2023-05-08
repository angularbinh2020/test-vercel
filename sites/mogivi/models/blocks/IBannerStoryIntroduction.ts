import IBlockImage from "../../../../models/blocks/IBlockImage";
import { IETImageLink } from "../IETImageLink";

export interface IBannerStoryIntroduction {
  system: {
    contentType: "bannerStoryIntroduction";
    id: string;
  };
  fields: {
    title: string;
    subtitle: string;
    imageText: IBlockImage;
    imageDesktop: IBlockImage;
    imageMobile: IBlockImage;
    qRCode: IBlockImage;
    links: IETImageLink[];
  };
}
