import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";

const BannerSubpageBlock = dynamic(
  () => import("./components/BannerSubpageBlock")
);

const CheckListBlock = dynamic(() => import("./components/CheckListBlock"));

const PromotionBlock = dynamic(
  () => import("./components/PromotionAnimatedBlock")
);

const CarouselsBlock = dynamic(() => import("./components/CarouselsBlock"));

const ServicesAnimatedBlock = dynamic(
  () => import("./components/ServicesAnimatedBlock")
);

const reviewsBlock = dynamic(() => import("./components/ReviewsBlock"));

const FAQsBlock = dynamic(() => import("./components/FAQsBlock"));

const ContactCardBlock = dynamic(() => import("./components/ContactCardBlock"));

const GalleryQuickLink = dynamic(() => import("./components/GalleryQuickLink"));

const FeaturesBlock = dynamic(() => import("./components/FeaturesBlock"));

const JobsBlock = dynamic(() => import("./components/JobsBlock"));

const RichTextBlock = dynamic(
  () => import("../ArticleLandingPage/components/RichTextBlock")
);

const ImageBlock = dynamic(() => import("./components/ImageBlock"));

const TextBlock = dynamic(() => import("./components/TextBlock"));

const ImageCardsBlock = dynamic(() => import("./components/ImageCards"));

const TeamBlock = dynamic(() => import("./components/TeamBlock"));

const GalleryImageSlider = dynamic(
  () => import("./components/GalleryImageSliderBlock")
);

const ContactBlock = dynamic(() => import("./components/ContactBlock"));

const Blocks = {
  bannerSubpageBlock: BannerSubpageBlock,
  checklist: CheckListBlock,
  promotionAnimatedServices: PromotionBlock,
  carouselsBlock: CarouselsBlock,
  servicesAnimated: ServicesAnimatedBlock,
  reviews: reviewsBlock,
  faqsBlock: FAQsBlock,
  contactCardBlock: ContactCardBlock,
  quickLinks: GalleryQuickLink,
  featuresBlock: FeaturesBlock,
  jobsBlock: JobsBlock,
  richTextBlock: RichTextBlock,
  eTImageItem: ImageBlock,
  text: TextBlock,
  imageCardsBlock: ImageCardsBlock,
  teamBlock: TeamBlock,
  imageSlider: GalleryImageSlider,
  contactBlock: ContactBlock,
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
