import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";

const BannerSearchBlock = dynamic(
  () => import("./components/BannerSearchBlock")
);
const ListArticlesBlock = dynamic(
  () => import("./components/ListArticlesBlock")
);

const Blocks = {
  bannerSubpageBlock: BannerSearchBlock,
  projectsAPI: ListArticlesBlock,
};

interface InvestorsLandingPage extends IDeviceDetected {
  block: any;
}

const InvestorsLandingPage = (props: InvestorsLandingPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;
  //@ts-ignore
  return <Component {...props} />;
};

export default InvestorsLandingPage;
