import IPageNode from "./IPageNode";

interface ITag {
  contentName: string;
  contentSegmentUrl: string;
  node: IPageNode;
  id: string;
  linkType: string;
  type: string;
}

export default ITag;
