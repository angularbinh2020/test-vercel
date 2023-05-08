import { IHotSpotIcon } from "./../models/IHotSpotIcon";
import { ICustomHeaderContentProjectPageBlock } from "./../sites/mogivi/models/blocks/ICustomHeaderContentProjectPageBlock";
import IPageData from "models/IPageData";
import IPage from "models/IPage";
import ISiteNode from "models/ISiteNode";
import IPath from "models/IPath";

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

export function getAllPages(siteId: number): Promise<IPage[]> {
  const queryUrl = API_URL.GET_ALL_PAGES_BY_SITE_ID + siteId;
  return ServerCacheService.queryWithCacheApi(queryUrl, () => {
    return new Promise((resolve, reject) => {
      axios
        .get(queryUrl)
        .then((res) => {
          if (res.data) {
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
            res.data.forEach((page: IPage, parentPageIndex: number) => {
              createGetSubPageRequest("subPageQuery", parentPageIndex, page);
              createGetSubPageRequest(
                "mogiversePageQuery",
                parentPageIndex,
                page
              );
            });
            if (getSubPageRequest.length) {
              Promise.allSettled(getSubPageRequest)
                .then((subPageRequest) => {
                  subPageRequest.forEach((result, requestIndex: number) => {
                    const isGetDataSuccess = result.status === "fulfilled";
                    if (isGetDataSuccess) {
                      const subPages: ISubPage[] = result.value;
                      const parentPageIndex =
                        parentPagesRequest[requestIndex].parentIndex;
                      res.data[parentPageIndex][
                        parentPagesRequest[requestIndex].fieldName
                      ].items = subPages;
                      return;
                    }
                    console.error(result);
                  });
                  resolve(res.data);
                })
                .catch(reject);
              return;
            }
            resolve(res.data);
            return;
          }
          reject("getAllPages error: Data empty");
        })
        .catch(reject);
    });
  });
}

export function getAllSite(): Promise<ISiteNode[]> {
  return ServerCacheService.queryWithCacheApi(API_URL.GET_ALL_ROOT_SITE, () => {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL.GET_ALL_ROOT_SITE)
        .then((res) => {
          if (res.data) {
            resolve(res.data);
            return;
          }
          reject("getAllSite error: Data empty");
        })
        .catch(reject);
    });
  });
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
      const requestUrl = getFullApiUrl(
        `${apiUrl}&pageSize=${pageSize}&pageIndex=`
      );
      let requestPageIndex = pageIndex;
      const subPages: ISubPage[] = [];
      const onGetData = (res: AxiosResponse<any, any>) => {
        res?.data?.items?.forEach((item: ISubPage) => {
          const subPage = { ...item, aliasUrl: parentPath + item.aliasUrl };
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

export function getAllPaths(): Promise<IPath[]> {
  return new Promise((resolve, reject) => {
    getAllSite()
      .then((sites) => {
        const paths: IPath[] = [];
        const currentSite = sites.find(
          (site) => process.env.NEXT_PUBLIC_BUILD_SITE === site.urlSegment
        );
        const pushPath = (urlAlias: string) => {
          const slug = urlAlias.split("/");
          paths.push({
            params: {
              slug: slug,
            },
          });
        };
        if (currentSite) {
          getAllPages(currentSite.id)
            .then((pages) => {
              pages.forEach(
                ({
                  umbracoUrlAlias,
                  subPageQuery,
                  mogiversePageQuery,
                  supportSearchByURL,
                }) => {
                  const isNotHomePage =
                    umbracoUrlAlias && umbracoUrlAlias !== "/";
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
              resolve(paths);
            })
            .catch(reject);
          return;
        }
        reject(
          `getAllPaths error: site not found - ${process.env.NEXT_PUBLIC_BUILD_SITE}`
        );
      })
      .catch(reject);
  });
}

export function getPageNodeDetail(nodeId: number | string): Promise<IPageData> {
  return new Promise((resolve, reject) => {
    getNodeDetail(nodeId)
      .then(async (pageNode) => {
        if (pageNode) {
          let pageNodeData = pageNode;
          pageNodeData = await getBlockSubsData(pageNode, nodeId);
          pageNodeData = await getFilterOptions(pageNode);
          resolve(pageNodeData);
          return;
        }
        reject("getPageNodeDetail error: response data empty");
      })
      .catch(reject);
  });
}

export function getSubPageNodeDetail(getPageApi: string): Promise<IPageData> {
  return new Promise((resolve, reject) => {
    const apiUrl = getFullApiUrl(getPageApi);
    axios
      .get(apiUrl)
      .then((res) => {
        const pageNode: IPageData = res.data;
        if (pageNode) {
          resolve(pageNode);
          return;
        }
        reject("getSubPageNodeDetail error: response data empty");
      })
      .catch(reject);
  });
}

export function getNodeDetail(nodeId: number | string): Promise<IPageData> {
  const apiUrl = API_URL.GET_NODE_CONTENT_BY_NODE_ID + nodeId;
  return ServerCacheService.queryWithCacheApi(
    apiUrl,
    () =>
      new Promise((resolve, reject) => {
        axios
          .get(apiUrl)
          .then((res) => {
            const pageNode: IPageData = res.data;

            if (pageNode) {
              resolve(pageNode);
              return;
            }
            reject("getPageNodeDetail error: response data empty");
          })
          .catch(reject);
      })
  );
}

export function getBlockSubsData(
  pageNode: IPageData,
  siteId: string | number
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
    });
    if (promises.length)
      Promise.all(promises)
        .then((res) => {
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
    const apiSetting = block.fields.settingsAPIBreadcrumb[0]?.fields;

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
                res.data.TabViews || null;
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

export function getVRTourFooterImages(): Promise<IAdsData[]> {
  const apiUrl = API_URL.GET_VR_TOUR_FOOTER_IMAGES;
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

export function getDefaultHomePageNodeId(): Promise<{
  nodeId: string;
  homeId: number;
}> {
  return new Promise(async (resolve, reject) => {
    try {
      const sites = await getAllSite();
      const currentSite = sites.find(
        (site) => process.env.NEXT_PUBLIC_BUILD_SITE === site.urlSegment
      );
      if (currentSite) {
        const pages = await getAllPages(currentSite.id);
        if (pages.length) {
          const homeId =
            pages.find(
              (page) => page.contentType === MOGIVI_CONTENT_TYPE.homeLandingPage
            )?.id || 0;
          const pageNode = await getPageNodeDetail(pages[0].id);
          resolve({
            nodeId: pageNode.siteLanguageNode.fields.defaultPage.id,
            homeId: homeId,
          });
          return;
        }
        throw `[getDefaultHomePageNodeId] pages is empty`;
      }
      throw `[getDefaultHomePageNodeId] Can't find site ${process.env.NEXT_PUBLIC_BUILD_SITE}`;
    } catch (e) {
      reject(e);
    }
  });
}
