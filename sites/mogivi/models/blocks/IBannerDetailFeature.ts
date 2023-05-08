import IBlockImage from "models/blocks/IBlockImage";
import { IRichTextBlock } from "models/blocks/IRichTextBlock";

interface IHighlightTextFeature {
  system: {
    contentType: "highlightTextFeature";
    id: string;
  };
  fields: {
    title: string;
    textBlocks: IRichTextBlock[];
  };
}

export interface IBannerDetailFeature {
  system: {
    contentType: "bannerDetailFeature";
    id: string;
  };
  fields: {
    title: string;
    subtitle: string;
    itemHighlightFeature: IHighlightTextFeature[];
    secondHighlightFeature: IHighlightTextFeature[];
    image: IBlockImage;
  };
}
