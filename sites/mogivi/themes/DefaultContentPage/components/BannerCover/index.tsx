import React from "react";
import BannerCover from "sites/mogivi/layout/components/BannerCover";
import { IBannerCover } from "sites/mogivi/models/blocks/IBannerCover";

export interface IBannerCoverModel {
  block: IBannerCover;
}

const BannerCoverBlock = (props: IBannerCoverModel) => {
  return <BannerCover {...props} />;
};
export default BannerCoverBlock;
