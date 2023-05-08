const API_URL = {
  GET_ALL_ROOT_SITE: "api/content/GetRootNodes",
  GET_ALL_PAGES_BY_SITE_ID: "api/content/Descendant?rootId=",
};
let apiHost = process.env.NEXT_PUBLIC_API_HOST;
if (apiHost && apiHost[apiHost.length - 1] !== "/") {
  apiHost += "/";
}
for (let property in API_URL) {
  API_URL[property] = apiHost + API_URL[property];
}
let pages;
async function getAllPages() {
  if (pages) return pages;
  const sites = await (await fetch(API_URL.GET_ALL_ROOT_SITE)).json();
  const currentSite = sites.find(
    (site) => process.env.NEXT_PUBLIC_BUILD_SITE === site.urlSegment
  );
  pages = await (
    await fetch(API_URL.GET_ALL_PAGES_BY_SITE_ID + currentSite.id)
  ).json();
  return pages;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
    const pages = await getAllPages();
    const pagesHaveRedirect = pages.filter((page) => page.redirectTo);
    return pagesHaveRedirect.map((page) => ({
      source: `/${page.umbracoUrlAlias}`,
      destination: `/${page.redirectTo}`,
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
