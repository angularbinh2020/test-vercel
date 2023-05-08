export type DocumentModel = {
  siteId?: string | number;
  requestParam: string;
  apiUrl: string;
};

export type FilterResultModel = {
  items: any;
  listingEndpointUrl: any;
  noResultsMessage: string;
  pagination: {
    currentlyOnLabel: string;
    endPage: number;
    itemCount: number;
    nextLabel: string;
    page: number;
    pageCount: number;
    previousLabel: string;
    startPage: number;
    url: string;
  };
  title: string;
};
