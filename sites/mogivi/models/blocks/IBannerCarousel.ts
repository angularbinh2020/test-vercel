import { IETBannerCarousel } from "../IETBannerCarousel";

export interface IBannerCarousel {
  system: {
    contentType: "bannerCarousel";
    id: string;
  };
  fields: {
    title: string;
    items: IETBannerCarousel[];
  };
}
