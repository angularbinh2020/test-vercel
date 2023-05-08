import React from "react";
import { BannerCarousel } from "sites/mogivi/layout/components/BannerCarousel";
import { IBannerCarousel } from "sites/mogivi/models/blocks/IBannerCarousel";

export interface IBannerCarouselModel {
  block: IBannerCarousel;
}

const BannerCarouselBlock = (props: IBannerCarouselModel) => {
  return <BannerCarousel {...props} />;
};

export default BannerCarouselBlock;
