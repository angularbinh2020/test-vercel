import IPageNode from "models/IPageNode";
import { IRootNode } from "./IRootNode";
import { ISiteLanguageNode } from "./ISiteLanguageNode";

interface IPageData {
  currentNode: IPageNode;
  rootNode: IRootNode;
  siteLanguageNode: ISiteLanguageNode;
  siteId: number | string;
  // breadcrumbId: number | string;
  isSubPage?: boolean;
  subPageData?: any;
  isMogiversePage?: boolean;
  mogiversePageType?: string;
}

export default IPageData;
