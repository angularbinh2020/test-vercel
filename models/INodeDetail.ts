interface INodeDetail {
  nodeId: number;
  subPageGetDetailApi?: string;
  mogiverseGetDetailApi?: string;
  isMogiverseUrl?: boolean;
  mogiversePageType?: string;
  mogiverserId?: any;
  notFoundUrlAlias?: string;
  isPageNotExist?: boolean;
  redirectUrl?: string;
}

export default INodeDetail;
