import IBlockImage from "models/blocks/IBlockImage";

export interface IETTeamItem {
  system: {
    contentType: "eTTeamItem";
  };
  fields: {
    image: IBlockImage;
    fullname: string;
    title: string;
    description: string;
  };
}
