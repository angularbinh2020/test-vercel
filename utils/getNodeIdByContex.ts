import IContext from "models/IContext";
import INodeDetail from "models/INodeDetail";
import { getAllSite, getAllPages } from "apis/server";
import { CONTENT_TYPE } from "const/content-type";
import { getUrlWithoutPagination } from "utils";
import { ISubPage } from "models/ISubPage";
import IPage from "models/IPage";
function isMogiverseUrlMatch(url1: string, url2: string) {
  const slugs1 = url1.split("/");
  const slugs2 = url2.split("/");
  return slugs1[0] === slugs2[0] && slugs1[1] === slugs2[1];
}

function isMogiverseUrlType(url1: string, url2: string) {
  const slugs1 = url1.split("/");
  const slugs2 = url2.split("/");
  return slugs1[0] === slugs2[0];
}

async function getNodeDetailByContext(context: IContext): Promise<INodeDetail> {
  if (!context?.params?.slug?.length)
    throw `getNodeDetailByContext error: slug must be string array.`;
  const sites = await getAllSite();
  const siteId = sites.find(
    (siteData) => process.env.NEXT_PUBLIC_BUILD_SITE === siteData.urlSegment
  )?.id;
  if (!siteId)
    throw `getNodeDetailByContext error: can't parse url format - site did not exist.`;
  const { pageUrl } = getUrlWithoutPagination(context.params.slug);
  const pages = await getAllPages(siteId);
  let subPageGetDetailApi = "";
  let mogiverseGetDetailApi = "";
  let isMogiverseUrl = false;
  let mogiversePageType = "";
  let mogiverserId = 0;
  const supportSearchPage = {
    umbracoUrlAlias: "",
    id: 0,
  };
  const setSupportSearchPage = (page: IPage | ISubPage) => {
    if (
      page.supportSearchByURL &&
      page.umbracoUrlAlias &&
      pageUrl.startsWith(page.umbracoUrlAlias) &&
      page.umbracoUrlAlias > supportSearchPage.umbracoUrlAlias
    ) {
      supportSearchPage.umbracoUrlAlias = page.umbracoUrlAlias;
      supportSearchPage.id = page.id;
    }
  };
  const notFoundUrlAlias =
    pages.find((page) => page.contentType === CONTENT_TYPE.errorContentPage)
      ?.umbracoUrlAlias ?? "";
  let pageNodeId = pages.find((page) => page.umbracoUrlAlias === pageUrl)?.id;
  const findNodeMatchAtSubPage = !pageNodeId;
  if (findNodeMatchAtSubPage) {
    let pageIndex = 0;
    let breakPageLoop = false;
    while (pages[pageIndex]) {
      const page = pages[pageIndex];
      setSupportSearchPage(page);
      const subPageItems = page.subPageQuery?.items;
      if (subPageItems) {
        let subPageIndex = 0;
        while (subPageItems[subPageIndex]) {
          const subPage = subPageItems[subPageIndex];
          setSupportSearchPage(subPage);
          if (
            subPage.supportSearchByURL &&
            subPage.umbracoUrlAlias === pageUrl
          ) {
            pageNodeId = page.id;
            breakPageLoop = true;
            break;
          }
          if (subPage.aliasUrl === pageUrl) {
            subPageGetDetailApi = subPage.detailUrl;
            breakPageLoop = true;
            break;
          }
          subPageIndex++;
        }
      }
      const mogiverseSubPageItems = page.mogiversePageQuery?.items;
      if (mogiverseSubPageItems) {
        let subPageIndex = 0;
        while (mogiverseSubPageItems[subPageIndex]) {
          const subPage = mogiverseSubPageItems[subPageIndex];
          if (isMogiverseUrlType(subPage.aliasUrl, pageUrl)) {
            isMogiverseUrl = true;
          }
          if (isMogiverseUrlMatch(subPage.aliasUrl, pageUrl)) {
            mogiverseGetDetailApi = subPage.detailUrl;
            mogiversePageType = page.contentType || "";
            mogiverserId = subPage.id;
            breakPageLoop = true;
            break;
          }
          subPageIndex++;
        }
      }
      if (breakPageLoop) break;
      pageIndex++;
    }
  }
  if (!pageNodeId && supportSearchPage.id) {
    pageNodeId = supportSearchPage.id;
  }
  const isNodeExist =
    pageNodeId || subPageGetDetailApi || mogiverseGetDetailApi;

  if (isNodeExist) {
    return {
      nodeId: pageNodeId || 0,
      subPageGetDetailApi,
      mogiverseGetDetailApi,
      isMogiverseUrl,
      mogiversePageType,
      mogiverserId,
      notFoundUrlAlias,
    };
  }
  console.log(
    `getNodeDetailByContext error: can't find page node id for ${pageUrl} at site ${process.env.NEXT_PUBLIC_BUILD_SITE}.`
  );
  return {
    nodeId: 0,
    isPageNotExist: true,
  };
}

export default getNodeDetailByContext;
