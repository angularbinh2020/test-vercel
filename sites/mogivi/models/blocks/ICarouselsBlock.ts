import { IETCarouselItem } from "../IETCarouselItem";

export interface ICarouselsBlock {
  system: {
    contentType: "carouselsBlock";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    items: IETCarouselItem[];
  };
}
