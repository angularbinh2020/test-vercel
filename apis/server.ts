import { IHotSpotIcon } from "./../models/IHotSpotIcon";
import { ICustomHeaderContentProjectPageBlock } from "./../sites/mogivi/models/blocks/ICustomHeaderContentProjectPageBlock";
import IPageData from "models/IPageData";
import IPage from "models/IPage";
import ISiteNode from "models/ISiteNode";
import IPath from "models/IPath";
import { IProjectsAPI } from "sites/mogivi/models/blocks/IProjectsAPI";
import { AxiosResponse } from "axios";
import axios from "apis/axios";
import API_URL from "../const/api-url";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import { IBreadcrumbsProjectPageBlock } from "sites/mogivi/models/blocks/IBreadcrumbsProjectPageBlock";
import { IProjectModule } from "sites/mogivi/models/blocks/IProjectModule";
import ServerCacheService from "utils/serverCache";
import { ISubPage } from "models/ISubPage";
import { getFullApiUrl, getPanoramaTourApis } from "utils";
import { IETValuesFilterTagsItem } from "sites/mogivi/models/IETFilterTags";
import { ITagItem } from "sites/mogivi/models/ITagItem";
import { IAdsData } from "models/IAdsData";
import { TAB_ANCHOR_ID } from "sites/mogivi/const/tab-anchor-id";
import { IETTab } from "sites/mogivi/models/IETTab";
import {
  removePageNodeDetailRedundantData,
  removeSubPageRedundantData,
} from "utils/removePageJsonRedundant";
import { IAnalysis } from "sites/mogivi/models/IAnalysis";

export function getAllPages(siteId: number): Promise<IPage[]> {
  const queryUrl = API_URL.GET_ALL_PAGES_BY_SITE_ID + siteId;
  return ServerCacheService.queryWithCacheApi(queryUrl, async () => {
    const pages = (await axios.get(queryUrl)).data;
    if (!pages) throw "getAllPages error: Data empty";
    const getSubPageRequest: any[] = [];
    const parentPagesRequest: {
      parentIndex: number;
      fieldName: string;
    }[] = [];
    const createGetSubPageRequest = (
      fieldName: "subPageQuery" | "mogiversePageQuery",
      parentPageIndex: number,
      page: IPage
    ) => {
      const queryData = page[fieldName];
      if (queryData) {
        const pageSize = Number(
          process.env.NEXT_PUBLIC_GET_SUB_PAGE_PAGE_SIZE || 10000
        );
        const getSubPagesRequest = getAllSubPages({
          pageIndex: queryData.pageIndex,
          apiUrl: queryData.apiUrl,
          pageSize: pageSize,
          parentPath: page.umbracoUrlAlias,
          panoramaTourApis: getPanoramaTourApis(queryData.type),
        });

        getSubPageRequest.push(getSubPagesRequest);
        parentPagesRequest.push({
          parentIndex: parentPageIndex,
          fieldName,
        });
      }
    };
    pages.forEach((page: IPage, parentPageIndex: number) => {
      page.umbracoUrlAlias = page.umbracoUrlAlias.trim();
      createGetSubPageRequest("subPageQuery", parentPageIndex, page);
      createGetSubPageRequest("mogiversePageQuery", parentPageIndex, page);
    });
    if (getSubPageRequest.length) {
      const subPageRequest = await Promise.allSettled(getSubPageRequest);
      subPageRequest.forEach((result, requestIndex: number) => {
        const isGetDataSuccess = result.status === "fulfilled";
        if (isGetDataSuccess) {
          const subPages: ISubPage[] = result.value;
          const parentPageIndex = parentPagesRequest[requestIndex].parentIndex;
          pages[parentPageIndex][
            parentPagesRequest[requestIndex].fieldName
          ].items = subPages;
          return;
        }
        console.error(result);
      });
    }
    return pages;
  });
}

export function getAllSite(): Promise<ISiteNode[]> {
  return ServerCacheService.queryWithCacheApi(
    API_URL.GET_ALL_ROOT_SITE,
    async () => {
      const res = await axios.get(API_URL.GET_ALL_ROOT_SITE);
      if (res.data) return res.data;
      throw "getAllSite error: Data empty";
    }
  );
}

export function getAllSubPages({
  pageIndex,
  apiUrl,
  pageSize,
  parentPath,
  panoramaTourApis,
}: {
  pageIndex: number;
  apiUrl: string;
  parentPath: string;
  pageSize: number;
  panoramaTourApis?: {
    getDataAsView: string;
    getDataAsEdit: string;
  };
}): Promise<ISubPage[]> {
  return ServerCacheService.queryWithCacheApi(apiUrl, () => {
    return new Promise((resolve, reject) => {
      const connectChar = apiUrl.includes("?") ? "&" : "?";
      const requestUrl = getFullApiUrl(
        `${apiUrl + connectChar}pageSize=${pageSize}&pageIndex=`
      );
      let requestPageIndex = pageIndex;
      const subPages: ISubPage[] = [];
      const onGetData = (res: AxiosResponse<any, any>) => {
        res?.data?.items?.forEach((item: ISubPage) => {
          const aliasUrl =
            (item.aliasUrl
              ? parentPath + item.aliasUrl
              : item.umbracoUrlAlias) ??
            item.page_alias_url ??
            "";
          const detailUrl = item.detailUrl ?? item.apiMgvNewsDetailUrl;
          const subPage = { ...item, aliasUrl, detailUrl };
          subPages.push(subPage);
          if (panoramaTourApis) {
            subPage.detailUrl =
              panoramaTourApis.getDataAsEdit + item.aliasUrl.substring(2);
            const subPageToView = {
              ...item,
              aliasUrl: parentPath + `-i${item.id}`,
            };
            subPageToView.detailUrl = panoramaTourApis.getDataAsView + item.id;
            subPages.push(subPageToView);
          }
        });
        if (res?.data?.hasData) {
          requestPageIndex++;
          getData();
          return;
        }
        resolve(subPages);
      };
      const getData = () => {
        const fullRequestUrl = requestUrl + requestPageIndex;
        ServerCacheService.queryAxios(fullRequestUrl, () =>
          axios.get(fullRequestUrl)
        )
          .then(onGetData)
          .catch(reject);
      };
      getData();
    });
  });
}

export async function getAllPaths(): Promise<IPath[]> {
  const sites = await getAllSite();
  const currentSite = sites.find(
    (site) => process.env.NEXT_PUBLIC_BUILD_SITE === site.urlSegment
  );
  if (!currentSite)
    throw `getAllPaths error: site not found - ${process.env.NEXT_PUBLIC_BUILD_SITE}`;
  const pages = await getAllPages(currentSite.id);
  const paths: IPath[] = [];
  const pushPath = (urlAlias: string) => {
    const slug = urlAlias
      .split("/")
      .map((str) => str.trim())
      .filter((str) => str);
    paths.push({
      params: {
        slug: slug,
      },
    });
  };

  pages.forEach(
    ({
      umbracoUrlAlias,
      subPageQuery,
      supportSearchByURL,
      mogiversePageQuery,
    }) => {
      const isNotHomePage = umbracoUrlAlias && umbracoUrlAlias !== "/";
      if (isNotHomePage) {
        pushPath(umbracoUrlAlias);
      }
      const subPages = [mogiversePageQuery];

      if (!supportSearchByURL) {
        subPages.push(subPageQuery);
      }

      subPages.forEach((subPages) => {
        if (subPages?.items?.length) {
          subPages.items.forEach((subPage) => {
            pushPath(subPage.aliasUrl);
          });
        }
      });
    }
  );
  return paths;
}

export async function getPageNodeDetail(
  nodeId: number | string,
  shouldGetProjectApiBlockData: boolean = false
): Promise<IPageData> {
  const pageNode = await getNodeDetail(nodeId);
  if (!pageNode)
    throw `getPageNodeDetail error: response data empty for nodeId = ${nodeId}`;
  let pageNodeData = pageNode;
  pageNodeData = await getBlockSubsData(
    pageNode,
    nodeId,
    shouldGetProjectApiBlockData
  );
  pageNodeData = await getFilterOptions(pageNode);
  pageNodeData.siteId = nodeId;
  return pageNodeData;
}

export async function getPageNodeDetailOptimal(
  nodeId: number | string
): Promise<IPageData> {
  const pageNodeData = await getPageNodeDetail(nodeId);
  removePageNodeDetailRedundantData(pageNodeData);
  return pageNodeData;
}

export async function getSubPageData(
  nodeId: number | string
): Promise<IPageData> {
  const pageNodeData = await getPageNodeDetail(nodeId);
  removeSubPageRedundantData(pageNodeData);
  return pageNodeData;
}

export async function getSubPageNodeDetail(
  getPageApi: string
): Promise<IPageData> {
  const apiUrl = getFullApiUrl(getPageApi);
  const res = await axios.get(apiUrl);
  const pageNode: IPageData = res.data;
  if (pageNode) {
    return pageNode;
  }
  throw `getSubPageNodeDetail error: response data empty, getPageApi = ${getPageApi}`;
}

export function getNodeDetail(nodeId: number | string): Promise<IPageData> {
  const apiUrl = API_URL.GET_NODE_CONTENT_BY_NODE_ID + nodeId;
  return ServerCacheService.queryWithCacheApi(apiUrl, async () => {
    const res = await axios.get(apiUrl);
    const pageNode: IPageData = res.data;
    if (pageNode) {
      return pageNode;
    }
    throw `getPageNodeDetail error: response data empty, nodeId = ${nodeId}`;
  });
}

export const getProjectApiBlockData = async (block: IProjectsAPI) => {
  const { settingAPI } = block.fields;
  const response = await axios.get(
    settingAPI[0].fields.aPIKeyTag.node.fields.itemTitle || ""
  );
  block.fields.dataResult = response?.data;
};

export function getBlockSubsData(
  pageNode: IPageData,
  siteId: string | number,
  shouldGetProjectApiBlockData: boolean = false
): Promise<IPageData> {
  return new Promise((resolve, reject) => {
    let promises: Promise<any>[] = [];
    pageNode.currentNode.fields.blocks?.map((block: any) => {
      const contentType = block.system.contentType;
      if (contentType === MOGIVI_CONTENT_TYPE.breadcrumbsProjectPageBlock) {
        promises.push(getBreadcrumbData(block, siteId));
      }
      if (
        contentType === MOGIVI_CONTENT_TYPE.customHeaderContentProjectPageBlock
      ) {
        promises.push(getSearchApiData(block));
      }
      if (contentType === MOGIVI_CONTENT_TYPE.projectModuleBlock) {
        promises.push(getApartmentProjectData(block, siteId));
        promises.push(getNeighborProjectData(block, siteId));
      }
      if (
        contentType === MOGIVI_CONTENT_TYPE.documentsFiltersBlock ||
        contentType === MOGIVI_CONTENT_TYPE.articleFilters
      ) {
        promises.push(getFilterOptions(block));
      }
      if (
        shouldGetProjectApiBlockData &&
        contentType === MOGIVI_CONTENT_TYPE.projectsAPI
      ) {
        promises.push(getProjectApiBlockData(block));
      }
      if (contentType === MOGIVI_CONTENT_TYPE.bannerSurveyPriceText) {
        promises.push(getAnalysisData(block));
      }
    });
    if (promises.length)
      Promise.all(promises)
        .then(() => {
          resolve(pageNode);
        })
        .catch(reject);
    else resolve(pageNode);
  });
}

export function getBreadcrumbData(
  block: IBreadcrumbsProjectPageBlock,
  siteId: string | number
): Promise<any> {
  return new Promise((resolve, reject) => {
    const fields = block.fields;
    const apiSetting = fields.settingsAPIBreadcrumb[0]?.fields;
    delete fields["settingsAPIBreadcrumb" as keyof typeof fields];
    if (apiSetting) {
      getNodeDetail(apiSetting.apiKeyTag.id)
        .then((pageNode) => {
          const apiUrl = pageNode.currentNode.fields.itemTitle;
          if (apiUrl) {
            const onGetResponse = (res: AxiosResponse) => {
              block.fields.breadcrumbs = res.data.topLinks.map(
                (breadcrumb: any, index: number) => ({
                  ...breadcrumb,
                  position: index,
                  isShowAngle: index + 1 !== res.data.topLinks.length,
                })
              );
              block.fields.subcribeAPI = res.data.subcribeAPI;
              resolve(block);
            };
            if (apiSetting.method.toUpperCase().trim() === "GET") {
              const searchParams = new URLSearchParams();
              apiSetting.parameters.forEach((param) => {
                const { key, value } = param.fields;
                if (key === "cmsId") {
                  searchParams.append(key, String(siteId));
                } else {
                  searchParams.append(key, value);
                }
              });
              const fullApiUrl = apiUrl + "?" + searchParams.toString();
              ServerCacheService.queryAxios(fullApiUrl, () =>
                axios.get(fullApiUrl)
              )
                .then(onGetResponse)
                .catch(reject);
            } else {
              const data: any = {};
              apiSetting.parameters.forEach((param) => {
                const { key, value } = param.fields;
                if (key === "cmsId") {
                  data[key] = siteId;
                } else {
                  data[key] = value;
                }
              });
              axios.post(apiUrl, data).then(onGetResponse).catch(reject);
            }

            return;
          }
          reject("getBreadcrumbData error : api Url is empty ");
        })
        .catch(reject);
      return;
    }
    reject("getBreadcrumbData error : api setting empty ");
  });
}

export function getApartmentProjectData(
  block: IProjectModule,
  siteId: number | string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const tabApartment = block.fields.tabs.find(
      (item) => item.fields.anchorID === TAB_ANCHOR_ID.PROJECT_APARTMENT
    ) as IETTab;
    const apiSetting =
      tabApartment.fields.blocksInTab[0].fields.settingsAPI[0].fields;
    if (apiSetting) {
      getNodeDetail(apiSetting.apiKeyTag.id)
        .then((pageNode) => {
          const apiUrl = pageNode.currentNode.fields.itemTitle;
          if (apiUrl) {
            const onGetResponse = (res: AxiosResponse) => {
              tabApartment.fields.blocksInTab[0].fields.TabViews =
                res.data.TabViews || res.data || null;
              resolve(block);
            };
            if (apiSetting.method.toUpperCase().trim() === "GET") {
              const searchParams = new URLSearchParams();
              apiSetting.parameters.forEach((param) => {
                const { key, value } = param.fields;
                if (key === "cmsId") {
                  searchParams.append(key, String(siteId));
                } else {
                  searchParams.append(key, value);
                }
              });
              const fullApiUrl = apiUrl + "?" + searchParams.toString();
              ServerCacheService.queryAxios(fullApiUrl, () =>
                axios.get(fullApiUrl)
              )
                .then(onGetResponse)
                .catch(reject);
            } else {
              const data: any = {};
              apiSetting.parameters.forEach((param) => {
                const { key, value } = param.fields;
                if (key === "cmsId") {
                  data[key] = siteId;
                } else {
                  data[key] = value;
                }
              });
              axios.post(apiUrl, data).then(onGetResponse).catch(reject);
            }

            return;
          }
          reject("getApartmentProjectData error : api Url is empty ");
        })
        .catch(reject);
      return;
    }
    reject("getApartmentProjectData error : api setting empty ");
  });
}

export function getNeighborProjectData(
  block: IProjectModule,
  siteId: number | string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const tabNeighorProject = block?.fields?.tabs.find(
      (item) => item.fields.anchorID === TAB_ANCHOR_ID.NEIGHBORHOOD_PROJECTS
    ) as IETTab;
    const apiSetting =
      tabNeighorProject.fields.blocksInTab[0].fields.settingsAPI[0].fields;
    if (apiSetting) {
      getNodeDetail(apiSetting.apiKeyTag.id)
        .then((pageNode) => {
          const apiUrl = pageNode.currentNode.fields.itemTitle;
          if (apiUrl) {
            const onGetResponse = (res: AxiosResponse) => {
              tabNeighorProject.fields.blocksInTab[0].fields.projectViews =
                res.data;
              resolve(block);
            };
            if (apiSetting.method.toUpperCase().trim() === "GET") {
              const searchParams = new URLSearchParams();
              apiSetting.parameters.forEach((param) => {
                const { key, value } = param.fields;
                if (key === "cmsId") {
                  searchParams.append(key, String(siteId));
                } else {
                  searchParams.append(key, value);
                }
              });
              const fullApiUrl = apiUrl + "?" + searchParams.toString();
              ServerCacheService.queryAxios(fullApiUrl, () =>
                axios.get(fullApiUrl)
              )
                .then(onGetResponse)
                .catch(reject);
            } else {
              const data: any = {};
              apiSetting.parameters.forEach((param) => {
                const { key, value } = param.fields;
                if (key === "cmsId") {
                  data[key] = siteId;
                } else {
                  data[key] = value;
                }
              });
              axios.post(apiUrl, data).then(onGetResponse).catch(reject);
            }

            return;
          }
          reject("getProjectsNearlyProject error : api Url is empty ");
        })
        .catch(reject);
      return;
    }
    reject("getProjectsNearlyProject error : api setting empty ");
  });
}

export function getSearchApiData(
  block: ICustomHeaderContentProjectPageBlock
): Promise<any> {
  return new Promise((resolve, reject) => {
    const apiSetting = block.fields.aPISearchSettings[0]?.fields;
    if (apiSetting) {
      getNodeDetail(apiSetting.apiKeyTag.id)
        .then((pageNode) => {
          block.fields.apiSearchUrl = pageNode.currentNode.fields.itemTitle;
          resolve(block);
        })
        .catch(reject);
      return;
    }
    reject("getBreadcrumbData error : api setting empty ");
  });
}

export async function getAnalysisData(block: any): Promise<any> {
  const { priceStatsByProjects } = block.fields;
  const apiGetAllAnalysis =
    priceStatsByProjects[0]?.fields?.apiKeyTag?.node?.fields?.itemTitle ?? "";
  const res = (await axios.get(apiGetAllAnalysis)).data;
  const initAnalysis: IAnalysis[] = res?.data || [];
  block.fields.analysisData = initAnalysis.map((analysis) => ({
    projectId: analysis._source.ProjectId,
    projectName: analysis._source.ProjectName,
    projectType: analysis._source.ProjectType,
    year: analysis._source.Year,
    month: analysis._source.Month,
    bedroomNumber: analysis._source.BedroomNumber,
    priceAvg: analysis._source.PriceAvg,
  }));
}

export function getFilterOptions(block: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let filterBlocks: IETValuesFilterTagsItem[] = [];
    if (block.currentNode) {
      filterBlocks = block.currentNode.fields.filtersOptions;
    } else {
      filterBlocks = block.fields.filtersOptions;
    }

    if (filterBlocks?.length) {
      const promiseCallApi: Promise<AxiosResponse>[] = [];
      filterBlocks.forEach((filterBlock: IETValuesFilterTagsItem) => {
        const filterOptionsId = filterBlock.fields.filters.id;
        const requestUrl = API_URL.GET_FILTER_OPTIONS.replace(
          ":filterOptionId",
          filterOptionsId
        );
        const request = axios.get(requestUrl);
        promiseCallApi.push(request);
      });
      Promise.all(promiseCallApi)
        .then((res) => {
          filterBlocks.forEach((filterBlock: any, blockIndex: number) => {
            filterBlock.fields.options = res[blockIndex].data || [];
            const defaultValueTitle = filterBlock.fields.title;
            const defaultValue: ITagItem = {
              system: {
                contentType: "tagItem",
                id: "",
                name: defaultValueTitle,
                urlSegment: "",
              },
              fields: {
                itemTitle: defaultValueTitle,
              },
            };
            if (defaultValueTitle) {
              const selected = filterBlock.fields.options.find(
                (option: ITagItem) =>
                  defaultValueTitle === option.fields.itemTitle ||
                  defaultValueTitle === option.system.name
              );
              if (selected) {
                filterBlock.fields.selected = selected;
                filterBlock.fields.defaultValue = selected;
                return;
              }
            }
            filterBlock.fields.options.unshift(defaultValue);
            filterBlock.fields.selected = defaultValue;
            filterBlock.fields.defaultValue = defaultValue;
          });
          resolve(block);
        })
        .catch(reject);
      return;
    }
    resolve(block);
  });
}

export function getTagHotSpotIcon(): Promise<IHotSpotIcon[]> {
  const apiUrl = API_URL.GET_VR_TOUR_TAG_ICONS;
  return ServerCacheService.queryWithCacheApi(apiUrl, () => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl)
        .then((res) => {
          resolve(res?.data || []);
        })
        .catch(reject);
    });
  });
}

export function getHotSpotIcon(): Promise<IHotSpotIcon[]> {
  const apiUrl = API_URL.GET_VR_TOUR_HOT_SPOT_ICONS;
  return ServerCacheService.queryWithCacheApi(apiUrl, () => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl)
        .then((res) => {
          const data: IHotSpotIcon[] = res?.data || [];
          resolve(data);
        })
        .catch(reject);
    });
  });
}

export function getVRTourAds(): Promise<IAdsData[]> {
  const apiUrl = API_URL.GET_VR_TOUR_LINK_ADS;
  return ServerCacheService.queryWithCacheApi(apiUrl, async () => {
    const res = await axios.get(apiUrl);
    return res?.data || [];
  });
}

export function getVRTourFooterImages(): Promise<IAdsData[]> {
  const apiUrl = API_URL.GET_VR_TOUR_FOOTER_IMAGES;
  return ServerCacheService.queryWithCacheApi(apiUrl, async () => {
    const res = await axios.get(apiUrl);
    return res?.data || [];
  });
}

export async function getDefaultHomePageNodeId(): Promise<{
  nodeId: string;
  homeId: number;
}> {
  const sites = await getAllSite();
  const currentSite = sites.find(
    (site) => process.env.NEXT_PUBLIC_BUILD_SITE === site.urlSegment
  );
  if (!currentSite)
    throw `[getDefaultHomePageNodeId] Can't find site ${process.env.NEXT_PUBLIC_BUILD_SITE}`;
  const pages = await getAllPages(currentSite.id);
  if (!pages.length) throw `[getDefaultHomePageNodeId] pages is empty`;
  const homeId =
    pages.find(
      (page) => page.contentType === MOGIVI_CONTENT_TYPE.homeLandingPage
    )?.id || 0;
  const pageNode = await getPageNodeDetail(pages[0].id);
  return {
    nodeId: pageNode.siteLanguageNode.fields.defaultPage.id,
    homeId: homeId,
  };
}
