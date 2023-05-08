import { IETImageSlider } from "../IETImageSlider";

export interface IImagesSliderBlock {
  system: {
    contentType: "imageSlider";
  };
  fields: {
    itemTitle: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    items: IETImageSlider[];
  };
}
