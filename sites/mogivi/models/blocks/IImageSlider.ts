import { IETImageSlider } from "../IETImageSlider";

export interface IImageSlider {
  system: {
    contentType: string;
    id: string;
  };
  fields: {
    itemTitle: string;
    oldCMSNodeId: string;
    excludeFromSearch: boolean;
    pageSummary: string;
    disableDesktopWeb: boolean;
    disableMobileWeb: boolean;
    disableMobileApp: boolean;
    contentBgColour: string;
    subtitle: string;
    items: IETImageSlider[];
  };
}
