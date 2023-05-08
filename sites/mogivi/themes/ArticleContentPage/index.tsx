import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";
import IPageData from "models/IPageData";

const BannerSubpageBlock = dynamic(
  () => import("./components/BannerSubpageBlock")
);
const RichTextBlock = dynamic(() => import("./components/RichTextBlock"));
const ImageBlock = dynamic(() => import("./components/ImageBlock"));
const BlogHeaderBlock = dynamic(() => import("./components/BlogHeaderBlock"));

const Blocks = {
  bannerSubpageBlock: BannerSubpageBlock,
  richTextBlock: RichTextBlock,
  imageItem: ImageBlock,
  blogHeader: BlogHeaderBlock,
};

interface ArticleContentPage extends IDeviceDetected {
  block: any;
  pageData: IPageData;
}

const ArticleContentPage = (props: ArticleContentPage) => {
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

export default ArticleContentPage;
