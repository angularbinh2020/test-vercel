import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";
import { ErrorContentBlock } from "sites/mogivi/layout/components/ErrorContent";

// const BannerSubpageBlock = dynamic(() => import("./components/BannerSubpageBlock"));

const Blocks = {
  notFoundPageBlock: ErrorContentBlock,
};

interface ErrorContentPage extends IDeviceDetected {
  block: any;
}

const ErrorContentPage = (props: ErrorContentPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;
  //@ts-ignore
  return <Component {...props} />;
};

export default ErrorContentPage;
