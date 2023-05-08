import React from "react";
import dynamic from "next/dynamic";
import { IDeviceDetected } from "models/IDeviceDetected";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import UnderConstructionBlock from "components/UnderConstructionBlock";

const BannerSearchBlock = dynamic(
  () => import("./components/HomeBannerSearchBlock")
);
const BannerImageLinkBlock = dynamic(
  () => import("./components/BannerImageLinkBlock")
);
const ProjectsAPIBlock = dynamic(() => import("./components/ProjectsAPIBlock"));
const BannerCarousel = dynamic(
  () => import("../HomeLandingPage/components/BannerCarouselBlock")
);
const CounterBlock = dynamic(() => import("./components/StatisticsBlock"));
const ServicesBlock = dynamic(() => import("./components/ServicesBlock"));
const StepsBlock = dynamic(() => import("./components/StepsBlock"));
const ProductsBlock = dynamic(() => import("./components/ProductsBlock"));
const GalleryBlock = dynamic(() => import("./components/GalleryBlock"));
const ContactInfoBlock = dynamic(() => import("./components/ContactInfoBlock"));

const Blocks = {
  bannerSearch: BannerSearchBlock,
  bannerImageLink: BannerImageLinkBlock,
  projectsAPI: ProjectsAPIBlock,
  promotionBlock: UnderConstructionBlock,
  bannerCarousel: BannerCarousel,
  counter: CounterBlock,
  vRTourServices: ServicesBlock,
  promotionSteps: StepsBlock,
  products: ProductsBlock,
  contactsMethod: ContactInfoBlock,
  imageSlider: GalleryBlock,
};

interface HomeLandingPage extends IDeviceDetected {
  block: any;
}

const HomeLandingPage = (props: HomeLandingPage) => {
  const { block } = props;
  const Component =
    Blocks[block.system.contentType as keyof typeof Blocks] ||
    DefaultMissingBlock;
  //@ts-ignore
  return <Component {...props} />;
};

export default HomeLandingPage;
