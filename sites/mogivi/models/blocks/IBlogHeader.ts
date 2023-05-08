import IBlockImage from "../../../../models/blocks/IBlockImage";

export interface IBlogHeader {
  system: {
    contentType: "blogHeader";
  };
  fields: {
    title: string;
    image: IBlockImage;
  };
}
