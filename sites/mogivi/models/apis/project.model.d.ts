export type IProjectModel = {
  username: string;
};

export type ProjectModel = {
  page: number;
  limit: number;
  keyword: string;
  siteId: string | number;
  method?: string;
  serviceType?: string;
  apiSecretKey?: string;
};

export type ProjectSuggestionResult = {
  labelLevel1: string;
  labelLevel2: string;
  suggestions: Array<{
    keyUrl: string;
    fullKeyUrl: string;
    text: string;
    groupTypeLevel1Text: string;
    groupTypeLevel2Text: string;
    totalResult: number;
  }>;
};
