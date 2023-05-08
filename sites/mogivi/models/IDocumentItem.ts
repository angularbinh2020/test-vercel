export type DocumentInfo = {
  description: string;
  logoUrl: string;
  cropUrls: any;
  fileSize: string;
  extension: string;
};

type TagItem = {
  nodeId: number;
  name: string;
  keyword: string;
};

export interface IDocumentItem {
  title: string;
  coverImage: DocumentInfo;
  downloadFile: DocumentInfo;
  tags: TagItem[];
  publicationDate: string;
  url: string;
  alias: string;
  breadcrumb: any | null;
  backLink: string;
}
