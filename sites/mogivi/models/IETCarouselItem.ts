import IBlockImage from "models/blocks/IBlockImage";

export interface IETCarouselItem {
  system: {
    contentType: "eTCarouselItem";
  };
  fields: {
    icon: IBlockImage;
    labelIcon: string;
    subtitle: string;
    description: string;
    cover: IBlockImage;
  };
}
