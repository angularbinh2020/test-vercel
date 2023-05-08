import { IMAGE_LINK_THEME } from "const/image-theme";
import React from "react";
import { IBannerImageLink } from "sites/mogivi/models/blocks/IBannerImageLink";
import ListImageInfoBlock from "../ListImageInfoBlock";
import ListImageStandard from "../ListImageStandardBlock";
import PromotionImage from "../PromotionImageBlock";

interface BannerImageLinkProps {
  block: IBannerImageLink;
}

const BannerImageLinkBlock = (props: BannerImageLinkProps) => {
  const { themes } = props.block.fields;
  switch (themes) {
    case IMAGE_LINK_THEME.galleryImage:
      return <ListImageInfoBlock {...props} />;
    case IMAGE_LINK_THEME.galleryImageText:
      return <ListImageStandard {...props} />;
    default:
      return <PromotionImage {...props} />;
  }
};

export default BannerImageLinkBlock;
