const API_URL = {
  GET_ALL_ROOT_SITE: "api/content/GetRootNodes",
  GET_CHILD_NODES_BY_NODE_ID: `api/content/GetChildNodesById?alias="page"&nodeid=`,
  GET_NODE_CONTENT_BY_NODE_ID: "api/content/",
  GET_NODE_CONTENT_BY_URL: "api/content/url?url=",
  GET_ALL_PAGES_BY_SITE_ID: "api/content/Descendant?rootId=",
  SITE_PROJECT_SEARCH_RESULT: "api/Search/GlobalResult",
  SITE_PROJECT_SEARCH_SUGGESTION: "api/Search",
  GET_FILTER_OPTIONS:
    "api/content/GetChildNodesByGuidId?nodeId=:filterOptionId&isFilterOptions=true",
  GET_LISTING: "api/listing",
  POST_SUBSCRIBE_EMAIL: "api/Subscribe/CallBackToMeOnInvestor",
  POST_SUBSCRIBE_PROJECT: "api/Subscribe/CallBackToMeOnProject",
  POST_ASK_MORE_INFO_PROJECT: "api/Subscribe/AskMoreInfoOnProject",
  POST_SUBSCRIBE_EMAIL_SUPPORT: "api/Subscribe/CallBackToSupport",
  GET_TOP_INVESTOR: "api/listing/GetTopInvestors?top=",
  POST_LOAN: "api/Subscribe/ReceiveLoanSpreadsheetsOnProject",
  GET_VR_TOUR_TAG_ICONS: "api/content/GetVRTourTagIcons",
  GET_VR_TOUR_HOT_SPOT_ICONS: "api/content/GetVRTourHotspotIcons",
  GET_VR_TOUR_LINK_ADS: "api/content/GetLinkAds",
  GET_VR_TOUR_FOOTER_IMAGES: "api/content/GetPanoramaSoleIcons",
  GET_PANORAMA_TOUR_DETAIL_TO_EDIT: "api/Content/RenderVRTourAsEdit?id=",
  GET_PANORAMA_TOUR_DETAIL_TO_VIEW: "api/Content/RenderVRTourAsView?id=",
  GET_THETA_TOUR_DETAIL_TO_EDIT: "api/Content/RenderThetaTourAsEdit?id=",
  GET_THETA_TOUR_DETAIL_TO_VIEW: "api/Content/RenderThetaTourAsView?id=",
};
let apiHost = process.env.NEXT_PUBLIC_API_HOST;

if (apiHost && apiHost[apiHost.length - 1] !== "/") {
  apiHost += "/";
}

for (let property in API_URL) {
  API_URL[property as keyof typeof API_URL] =
    apiHost + API_URL[property as keyof typeof API_URL];
}

export default API_URL;
