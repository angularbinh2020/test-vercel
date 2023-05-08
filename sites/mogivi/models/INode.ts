import { ITagItem } from "./ITagItem";

export interface INode {
  contentName: string;
  contentSegmentUrl: string;
  id: string;
  node: ITagItem;
  linkType: string;
  type: string;
}
