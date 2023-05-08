import IBlockImage from "models/blocks/IBlockImage";

export interface IETReviewItem {
  system: {
    contentType: "eTReviewItem";
  };
  fields: {
    image: IBlockImage;
    review: string;
    authorIcon: IBlockImage;
    authorName: string;
    authorTitle: string;
  };
}
