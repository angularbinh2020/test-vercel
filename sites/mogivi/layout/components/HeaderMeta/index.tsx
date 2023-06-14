import React, { useMemo } from "react";
import Head from "next/head";
import IPageData from "models/IPageData";
import { getCurrentPageUrl } from "sites/mogivi/utils";
import { SOCIAL_TYPE } from "sites/mogivi/const/social-type";

interface HeaderMetaProps {
  pageData: IPageData;
}

const HeaderMeta = (props: HeaderMetaProps) => {
  const {
    pageData: { rootNode, currentNode, siteLanguageNode },
  } = props;
  const currentPageUrl = useMemo(() => {
    return getCurrentPageUrl(rootNode, currentNode);
  }, []);
  const fakebookSocialInfo = useMemo(() => {
    return siteLanguageNode.fields?.socialAccounts?.find(
      (social) => social?.fields?.icon === SOCIAL_TYPE.FACEBOOK
    );
  }, []);
  const twitterSocialInfo = useMemo(() => {
    return siteLanguageNode?.fields?.socialAccounts?.find(
      (social) => social?.fields?.icon === SOCIAL_TYPE.TWITTER
    );
  }, []);
  const { metaDescription, metaTitle, pageTitle } = currentNode.fields;
  return (
    <Head>
      <title>{pageTitle || "Mogivi"}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta
        name="description"
        content={metaDescription || pageTitle || "Mogivi"}
      />
      <meta name="keywords" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content="Mogivi.vn" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={currentPageUrl} />
      <meta
        property="og:image"
        content={currentNode.fields.socialMediaImage?.fields?.umbracoFile}
      />
      <meta property="og:site_name" content="Mogivi.vn" />
      {fakebookSocialInfo && (
        <>
          <meta
            property="fb:app_id"
            content={fakebookSocialInfo.fields.title}
          />
          <meta
            property="fb:pages"
            content={fakebookSocialInfo.fields.externalUrl}
          />
        </>
      )}
      {twitterSocialInfo && (
        <>
          <meta
            name="twitter:site"
            content={twitterSocialInfo.fields.externalUrl}
          />
          <meta
            name="twitter:creator"
            content={twitterSocialInfo.fields.title}
          />
        </>
      )}

      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content={currentNode.fields.socialMediaImage?.fields?.umbracoFile}
      />
      <meta name="twitter:image:width" content="800" />
      <meta name="twitter:image:height" content="418" />
      <meta name="viewport" content="width=device-width" />
      <link
        id="favicon"
        href={rootNode.fields.favIcon?.fields.umbracoFile}
        rel="shortcut icon"
        type="image/x-icon"
      />
      <link href="https://mogivi.vn" rel="home" />
      <meta
        itemProp="image"
        content={currentNode.fields.socialMediaImage?.fields?.umbracoFile}
      />
      <meta itemProp="name" content={metaTitle} />
      <meta itemProp="description" content={metaDescription} />
    </Head>
  );
};

export default HeaderMeta;
