const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const API_URL = {
  GET_ALL_ROOT_SITE: "api/content/GetRootNodes",
  GET_ALL_PAGES_BY_SITE_ID: "api/content/Descendant?rootId=",
  GET_REDIRECT_LINKS_FOR_SELL_NEWS:
    "api/brokerapp/GetRedirectLinksForSellNews?",
  GET_REDIRECT_LINKS_FOR_RENTAL_NEWS:
    "api/brokerapp/GetRedirectLinksForRentalNews?",
};
let apiHost = process.env.NEXT_PUBLIC_API_HOST;
if (apiHost && apiHost[apiHost.length - 1] !== "/") {
  apiHost += "/";
}
for (let property in API_URL) {
  API_URL[property] = apiHost + API_URL[property];
}

function getAllRedirectPages() {
  return new Promise((resolve, reject) => {
    const pageSize = Number(
      process.env.NEXT_PUBLIC_GET_SUB_PAGE_PAGE_SIZE || 100
    );
    const result = [];
    let processCount = 2;
    const onGetCompleted = () => {
      processCount--;
      const isCompletedAll = processCount <= 0;
      if (isCompletedAll) {
        resolve(result);
      }
    };
    const getAllNews = (apiUrl, pageIndex) => {
      const searchParams = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
      fetch(apiUrl + searchParams)
        .then((res) => res.json())
        .then((res) => {
          res.mapping.forEach((urls) => {
            result.push({
              source: urls.fromOldMgvNewsURL,
              destination: urls.toNewMgvNewsURL,
              permanent: true,
            });
          });
          if (res.hasData) {
            getAllNews(apiUrl, pageIndex + 1);
            return;
          }
          onGetCompleted();
        })
        .catch(reject);
    };

    getAllNews(API_URL.GET_REDIRECT_LINKS_FOR_SELL_NEWS, 1);
    getAllNews(API_URL.GET_REDIRECT_LINKS_FOR_RENTAL_NEWS, 1);
  });
}

async function getAllPages() {
  const sites = await (await fetch(API_URL.GET_ALL_ROOT_SITE)).json();
  const currentSite = sites.find(
    (site) => process.env.NEXT_PUBLIC_BUILD_SITE === site.urlSegment
  );
  const pages = await (
    await fetch(API_URL.GET_ALL_PAGES_BY_SITE_ID + currentSite.id)
  ).json();
  return pages;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cms.wallmarttech.com",
      "cms.mogivi.vn",
      "images.pexels.com",
      "img.freepik.com",
      "brokerdev.azureedge.net",
      "cms.porticus.local",
      "www.youtube.com",
      "maps.googleapis.com",
      "apiclient.wallmarttech.com",
      "mogivi-blog.azureedge.net",
      "s3-hn-2.cloud.cmctelecom.vn",
      "uploadapi.mogivi.vn",
      "d3rbb2nnaaacby.cloudfront.net",
    ],
  },
  staticPageGenerationTimeout: 600,
  output: "standalone",
  async rewrites() {
    const pages = await getAllPages();
    const pageSupportSearchByUrl = pages
      .filter((page) => page.supportSearchByURL)
      .sort((a, b) => b.umbracoUrlAlias.length - a.umbracoUrlAlias.length);
    const rewrites = pageSupportSearchByUrl.map((page) => ({
      source: `/${page.umbracoUrlAlias}/:slug*`,
      destination: `/${page.umbracoUrlAlias}`,
    }));
    return rewrites;
  },
  async redirects() {
    const redirects = await getAllRedirectPages();
    const pages = await getAllPages();
    const pagesHaveRedirect = pages.filter((page) => page.redirectTo);
    pagesHaveRedirect.forEach((page) => {
      redirects.push({
        source: `/${page.umbracoUrlAlias}`,
        destination: `/${page.redirectTo}`,
        permanent: true,
      });
    });
    return redirects;
  },
};

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    nextConfig.experimental = {
      workerThreads: false,
      cpus: 2,
    };
  }
  return nextConfig;
};
