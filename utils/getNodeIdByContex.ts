import IContext from "models/IContext";
import INodeDetail from "models/INodeDetail";
import { getAllSite, getAllPages } from "apis/server";
import { CONTENT_TYPE } from "const/content-type";
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

function getNodeDetailByContext(context: IContext): Promise<INodeDetail> {
  return new Promise((resolve, reject) => {
    if (context?.params?.slug?.length) {
      getAllSite()
        .then((sites) => {
          const siteId = sites.find(
            (siteData) =>
              process.env.NEXT_PUBLIC_BUILD_SITE === siteData.urlSegment
          )?.id;
          const pageUrl = context.params.slug.join("/");
          if (siteId) {
            getAllPages(siteId)
              .then((pages) => {
                let subPageGetDetailApi = "";
                let mogiverseGetDetailApi = "";
                let isMogiverseUrl = false;
                let mogiversePageType = "";
                let mogiverserId = 0;
                const notFoundUrlAlias =
                  pages.find(
                    (page) => page.contentType === CONTENT_TYPE.errorContentPage
                  )?.umbracoUrlAlias ?? "";
                const pageNodeId = pages.find(
                  (page) => page.umbracoUrlAlias === pageUrl
                )?.id;
                if (!pageNodeId && context.params.slug.length > 1) {
                  pages.forEach((page) => {
                    page.subPageQuery?.items.forEach((subPage) => {
                      if (subPage.aliasUrl === pageUrl) {
                        subPageGetDetailApi = subPage.detailUrl;
                      }
                    });

                    page.mogiversePageQuery?.items.forEach((subPage) => {
                      if (isMogiverseUrlType(subPage.aliasUrl, pageUrl)) {
                        isMogiverseUrl = true;
                      }
                      if (isMogiverseUrlMatch(subPage.aliasUrl, pageUrl)) {
                        mogiverseGetDetailApi = subPage.detailUrl;
                        mogiversePageType = page.contentType || "";
                        mogiverserId = subPage.id;
                      }
                    });
                  });
                }

                const isNodeExist =
                  pageNodeId || subPageGetDetailApi || mogiverseGetDetailApi;

                if (isNodeExist) {
                  resolve({
                    nodeId: pageNodeId || 0,
                    subPageGetDetailApi,
                    mogiverseGetDetailApi,
                    isMogiverseUrl,
                    mogiversePageType,
                    mogiverserId,
                    notFoundUrlAlias,
                  });
                  return;
                }
                console.log(
                  `getNodeDetailByContext error: can't find page node id for ${pageUrl} at site ${process.env.NEXT_PUBLIC_BUILD_SITE}.`
                );
                resolve({
                  nodeId: 0,
                  isPageNotExist: true,
                });
              })
              .catch(reject);
            return;
          }

          reject(
            `getNodeDetailByContext error: can't parse url format - site did not exist.`
          );
        })
        .catch(reject);
      return;
    }

    reject(`getNodeDetailByContext error: slug must be string array.`);
  });
}

export default getNodeDetailByContext;
