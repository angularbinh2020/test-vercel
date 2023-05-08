import IBlockImage from "models/blocks/IBlockImage";

export interface IArticleItem {
  title: string;
  summaryText: string;
  image: IBlockImage;
  publicationDate: string;
  publicationDateText: string;
  tags: string;
  publicationDateV2: string;
  publicationDateTextV2: string;
  tagSearchLinks: {
    name: string;
    gid: string;
    cmsNodeId: number;
    segmentTagURL: string;
    searchTagItemURL: string;
  }[];
  url: string;
  alias: string;
  breadcrumb: null;
  backLink: null;
}
