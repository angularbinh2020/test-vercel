import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";

const BannerStoriesBlock = dynamic(
  () => import("./components/BannerStoriesBlock")
);
const BannerFeatureBlock = dynamic(
  () => import("./components/BannerFeatureBlock")
);
const BannerReasonBlock = dynamic(
  () => import("./components/BannerReasonBlock")
);
const BannerDetailFeatureBlock = dynamic(
  () => import("./components/BannerDetailFeatureBlock")
);
const BannerFAQBlock = dynamic(() => import("./components/BannerFAQBlock"));
const BannerFooter = dynamic(() => import("./components/BannerFooter"));
const BlankBlock = dynamic(() => import("../../../../components/BlankBlock"));

const Blocks = {
  content: BlankBlock,
  bannerStoryIntroduction: BannerStoriesBlock,
  bannerFeature: BannerFeatureBlock,
  bannerReason: BannerReasonBlock,
  bannerDetailFeature: BannerDetailFeatureBlock,
  mogiviPartnerFAQ: BannerFAQBlock,
  bannerFooterApp: BannerFooter,
};

interface SuccessStoriesLandingPage extends IDeviceDetected {
  block: any;
}

const SuccessStoriesLandingPage = (props: SuccessStoriesLandingPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;
  //@ts-ignore
  return <Component {...props} />;
};

export default SuccessStoriesLandingPage;
