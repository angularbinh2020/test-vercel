import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";

const RichTextBlock = dynamic(() => import("./components/RichTextBlock"));
const UnderConstructionBlock = dynamic(
  () => import("components/UnderConstructionBlock")
);

const Blocks = {
  bannerSubpageBlock: UnderConstructionBlock,
  richTextBlock: RichTextBlock,
};

interface ArticleLandingPage extends IDeviceDetected {
  block: any;
}

const ComingSoonPage = (props: ArticleLandingPage) => {
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

export default ComingSoonPage;
