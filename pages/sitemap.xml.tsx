import { getAllPaths } from "apis/server";
import IPath from "models/IPath";

function generateSiteMap(paths: IPath[], basePath: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${paths
       .map(({ params }) => {
         const pageUrl = `${basePath}/${params.slug.join("/")}`;
         const isPageUrlWrongFormat = pageUrl
           .toUpperCase()
           .includes("&".toUpperCase());
         if (isPageUrlWrongFormat) return "";
         return `
       <url>
           <loc>${pageUrl}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
  const isProd = Boolean(process.env.NEXT_PUBLIC_PROD_DOMAIN_BUILD_SITE_MAP);
  if (isProd) {
    const paths = await getAllPaths();
    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(
      paths,
      process.env.NEXT_PUBLIC_PROD_DOMAIN_BUILD_SITE_MAP ?? ""
    );
    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();
  }

  return {
    props: {},
  };
}

export default SiteMap;
