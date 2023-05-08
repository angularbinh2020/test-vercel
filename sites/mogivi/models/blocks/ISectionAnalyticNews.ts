export interface ISectionAnalyticNews {
  seoTitle: string;
  seoDescription: string;
  mainImageForMobile: string;
  mainImage: string;
  name: string;
  introText: string;
  bodyText: string;
  mainHeading: string;
  breadcrumb: string;
  breadcrumbUrl: string;
  dateLine: string;
  byLine: string;
  tags: {
    keyword: string;
    url: string;
    keywordSEO: null;
  }[];
  pageUrl: string;
}
