import IBlockImage from "models/blocks/IBlockImage";

export interface IBannerReason {
  system: {
    contentType: "bannerReason";
    id: string;
  };
  fields: {
    title: string;
    subtitle: string;
    image: IBlockImage;
  };
}
