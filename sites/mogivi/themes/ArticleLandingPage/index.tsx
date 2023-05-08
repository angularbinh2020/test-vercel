import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";
import IPageData from "models/IPageData";
// import BlankBlock from "components/BlankBlock";

const BannerSubpageBlock = dynamic(
  () => import("./components/BannerSubpageBlock")
);
const ArticleFiltersBlock = dynamic(
  () => import("./components/ArticleFiltersBlock")
);
const RichTextBlock = dynamic(() => import("./components/RichTextBlock"));

const BlankBlock = dynamic(() => import("../../../../components/BlankBlock"));

const Blocks = {
  bannerSubpageBlock: BlankBlock,
  articleFilters: ArticleFiltersBlock,
  richTextBlock: RichTextBlock,
};

interface ArticleLandingPage extends IDeviceDetected {
  block: any;
}

const ArticleLandingPage = (props: ArticleLandingPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;

  //@ts-ignore
  return (
    <>
      <Component {...props} />
    </>
  );
};

export default ArticleLandingPage;
