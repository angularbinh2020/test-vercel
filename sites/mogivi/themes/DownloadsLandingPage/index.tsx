import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";
import { LibraryStandardBlock } from "./components/LibraryStandardBlock";
import { BannerSubscribeEmailBlock } from "./components/BannerSubscribeEmail";

const BannerSubpageBlock = dynamic(
  () => import("./components/BannerSubpageBlock")
);

const Blocks = {
  bannerSubpageBlock: BannerSubpageBlock,
  documentsFiltersBlock: LibraryStandardBlock,
};

interface DefaultLandingPage extends IDeviceDetected {
  block: any;
}

const DefaultLandingPage = (props: DefaultLandingPage) => {
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

export default DefaultLandingPage;
