import IBlockImage from "models/blocks/IBlockImage";
import { IETKeyValueItem } from "./IETKeyValueItem";
import { ILinkInfo } from "./ILinkInfo";
import { ITagItem } from "./ITagItem";

export interface IETServiceItem {
  system: {
    contentType: "eTServiceItem";
  };
  fields: {
    icon: IBlockImage;
    title: string;
    bodyText: string;
    link: ILinkInfo[];
  };
}
