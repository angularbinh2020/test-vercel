import { ISubPage } from "./ISubPage";

interface SubPageQuery {
  apiUrl: string;
  type: string;
  pageIndex: number;
  pageSize: number;
  items: ISubPage[];
}

interface IPage {
  id: number; // page node id
  umbracoUrlAlias: string;
  name: string;
  urlSegment: string;
  contentType: string;
  supportSearchByURL?: boolean;
  subPageQuery?: SubPageQuery;
  mogiversePageQuery?: SubPageQuery;
}

export default IPage;
