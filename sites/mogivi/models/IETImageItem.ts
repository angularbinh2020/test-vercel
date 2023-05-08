import IBlockImage from "models/blocks/IBlockImage";

export interface IETImageItem {
  system: {
    contentType: "eTImageItem";
  };
  fields: {
    image: IBlockImage;
  };
}
