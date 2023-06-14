import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";
import { IDeviceDetected } from "models/IDeviceDetected";

const BannerSubpageBlock = dynamic(
  () => import("./components/BannerSubpageBlock")
);

const RichTextBlock = dynamic(() => import("./components/RichTextBlock"));

const CheckListBlock = dynamic(() => import("./components/CheckListBlock"));

const PromotionAnimatedBlock = dynamic(
  () => import("./components/PromotionAnimatedBlock")
);

const CarouselsBlock = dynamic(() => import("./components/CarouselsBlock"));

const ServicesAnimatedBlock = dynamic(
  () => import("./components/ServicesAnimatedBlock")
);

const ReviewsBlock = dynamic(() => import("./components/ReviewsBlock"));

const FAQsBlock = dynamic(() => import("./components/FAQsBlock"));

const ContactCardBlock = dynamic(() => import("./components/ContactCardBlock"));
const PromotionBlock = dynamic(() => import("./components/PromotionBlock"));
const ContactInfoBlock = dynamic(() => import("./components/ContactInfoBlock"));
const YoutubeVideoBlock = dynamic(
  () => import("./components/YoutubeVideoBlock")
);
const BannerCover = dynamic(() => import("./components/BannerCover"));
const BannerSurveyPriceText = dynamic(
  () => import("./components/BannerSurveyPriceText")
);

const Blocks = {
  bannerSubpageBlock: BannerSubpageBlock,
  richTextBlock: RichTextBlock,
  checklist: CheckListBlock,
  promotionAnimatedServices: PromotionAnimatedBlock,
  carouselsBlock: CarouselsBlock,
  servicesAnimated: ServicesAnimatedBlock,
  reviews: ReviewsBlock,
  faqsBlock: FAQsBlock,
  contactCardBlock: ContactCardBlock,
  contactsMethod: ContactInfoBlock,
  youtubeVideo: YoutubeVideoBlock,
  promotionBlock: PromotionBlock,
  bannerCover: BannerCover,
  bannerSurveyPriceText: BannerSurveyPriceText,
};

interface DefaultContentPage extends IDeviceDetected {
  block: any;
}

const DefaultContentPage = (props: DefaultContentPage) => {
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

export default DefaultContentPage;
